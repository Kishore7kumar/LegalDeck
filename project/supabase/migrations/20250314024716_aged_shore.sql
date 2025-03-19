/*
  # Initial Schema Setup for LegalDeck

  1. New Tables
    - lawyers
      - Basic profile information
      - Verification status
      - Pricing details
    - consultations
      - Consultation bookings
      - Payment tracking
    - payments
      - Payment records
      - Currency conversion tracking
    - reviews
      - Lawyer reviews and ratings
    
  2. Security
    - Enable RLS on all tables
    - Add policies for data access
*/

-- Create lawyers table
CREATE TABLE IF NOT EXISTS lawyers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  location text,
  expertise text[] NOT NULL,
  hourly_rate_usd numeric NOT NULL,
  hourly_rate_inr numeric NOT NULL,
  bar_number text UNIQUE,
  experience_years integer,
  cases_won integer DEFAULT 0,
  total_cases integer DEFAULT 0,
  rating numeric DEFAULT 0,
  review_count integer DEFAULT 0,
  kyc_verified boolean DEFAULT false,
  bar_verified boolean DEFAULT false,
  identity_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create consultations table
CREATE TABLE IF NOT EXISTS consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lawyer_id uuid REFERENCES lawyers(id),
  client_id uuid REFERENCES auth.users(id),
  scheduled_at timestamptz NOT NULL,
  duration_minutes integer NOT NULL,
  status text NOT NULL CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  amount_usd numeric NOT NULL,
  amount_inr numeric NOT NULL,
  payment_status text NOT NULL CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_id uuid REFERENCES consultations(id),
  amount_usd numeric NOT NULL,
  amount_inr numeric NOT NULL,
  conversion_rate numeric NOT NULL,
  payment_method text NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  transaction_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lawyer_id uuid REFERENCES lawyers(id),
  client_id uuid REFERENCES auth.users(id),
  consultation_id uuid REFERENCES consultations(id),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  helpful_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE lawyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Lawyers policies
CREATE POLICY "Public lawyers are viewable by everyone"
  ON lawyers FOR SELECT
  USING (true);

CREATE POLICY "Lawyers can update their own profile"
  ON lawyers FOR UPDATE
  USING (auth.uid() = user_id);

-- Consultations policies
CREATE POLICY "Users can view their own consultations"
  ON consultations FOR SELECT
  USING (auth.uid() = client_id OR 
         auth.uid() IN (SELECT user_id FROM lawyers WHERE id = lawyer_id));

CREATE POLICY "Users can create consultations"
  ON consultations FOR INSERT
  WITH CHECK (auth.uid() = client_id);

-- Payments policies
CREATE POLICY "Users can view their own payments"
  ON payments FOR SELECT
  USING (auth.uid() IN (
    SELECT client_id FROM consultations WHERE id = consultation_id
    UNION
    SELECT user_id FROM lawyers WHERE id = (
      SELECT lawyer_id FROM consultations WHERE id = consultation_id
    )
  ));

-- Reviews policies
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Clients can create reviews for their consultations"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = client_id AND
             consultation_id IN (
               SELECT id FROM consultations WHERE client_id = auth.uid()
             ));

-- Create function to update lawyer ratings
CREATE OR REPLACE FUNCTION update_lawyer_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE lawyers
  SET rating = (
    SELECT AVG(rating)
    FROM reviews
    WHERE lawyer_id = NEW.lawyer_id
  ),
  review_count = (
    SELECT COUNT(*)
    FROM reviews
    WHERE lawyer_id = NEW.lawyer_id
  )
  WHERE id = NEW.lawyer_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating lawyer ratings
CREATE TRIGGER update_lawyer_rating_trigger
AFTER INSERT OR UPDATE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_lawyer_rating();