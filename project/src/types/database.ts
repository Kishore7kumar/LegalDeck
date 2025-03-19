export interface Lawyer {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone?: string;
  location: string;
  expertise: string[];
  hourly_rate_usd: number;
  hourly_rate_inr: number;
  bar_number: string;
  experience_years: number;
  cases_won: number;
  total_cases: number;
  rating: number;
  review_count: number;
  kyc_verified: boolean;
  bar_verified: boolean;
  identity_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Consultation {
  id: string;
  lawyer_id: string;
  client_id: string;
  scheduled_at: string;
  duration_minutes: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  amount_usd: number;
  amount_inr: number;
  payment_status: 'pending' | 'paid' | 'refunded';
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  consultation_id: string;
  amount_usd: number;
  amount_inr: number;
  conversion_rate: number;
  payment_method: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transaction_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  lawyer_id: string;
  client_id: string;
  consultation_id: string;
  rating: number;
  comment?: string;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}