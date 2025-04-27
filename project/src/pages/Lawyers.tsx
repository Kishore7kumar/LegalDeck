import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import {
  Search,
  MapPin,
  DollarSign,
  Clock,
  Star,
  Filter,
  Calendar,
  ArrowRight,
} from "lucide-react";
import "react-day-picker/dist/style.css";

interface Lawyer {
  id: number;
  name: string;
  expertise: string[];
  location: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  image: string;
  available: boolean;
}

const lawyers: Lawyer[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    expertise: ["Criminal Law", "Family Law"],
    location: "New York, NY",
    rating: 4.8,
    reviews: 127,
    hourlyRate: 200,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    available: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    expertise: ["Corporate Law", "Intellectual Property"],
    location: "San Francisco, CA",
    rating: 4.9,
    reviews: 89,
    hourlyRate: 250,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    available: true,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    expertise: ["Immigration Law", "Civil Rights"],
    location: "Miami, FL",
    rating: 4.7,
    reviews: 156,
    hourlyRate: 180,
    image:
      "https://img.freepik.com/premium-photo/portrait-young-indian-female-lawyer-smiling-happy-her-workplace-office-indian-lawyer-technologist-professional-face-female-lawyer-legal-consultant-law-firm_785351-3584.jpg",
    available: true,
  },
];

const expertiseOptions = [
  "Criminal Law",
  "Family Law",
  "Corporate Law",
  "Immigration Law",
  "Civil Rights",
  "Intellectual Property",
  "Real Estate Law",
  "Tax Law",
];

const LawyersPage = () => {
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [showBooking, setShowBooking] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const filteredLawyers = lawyers.filter((lawyer) => {
    const matchesExpertise =
      selectedExpertise.length === 0 ||
      lawyer.expertise.some((exp) => selectedExpertise.includes(exp));
    const matchesPrice =
      lawyer.hourlyRate >= priceRange[0] && lawyer.hourlyRate <= priceRange[1];
    const matchesSearch =
      lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.expertise.some((exp) =>
        exp.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesExpertise && matchesPrice && matchesSearch;
  });

  const handleBooking = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer);
    setShowBooking(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, location, or expertise..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowBooking(false)}
              className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Expertise</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {expertiseOptions.map((expertise) => (
                  <label
                    key={expertise}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      checked={selectedExpertise.includes(expertise)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedExpertise([
                            ...selectedExpertise,
                            expertise,
                          ]);
                        } else {
                          setSelectedExpertise(
                            selectedExpertise.filter((exp) => exp !== expertise)
                          );
                        }
                      }}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>{expertise}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Price Range (per hour)</h3>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lawyers List */}
          <div className="profile-hover">
            <div className={`lg:col-span-${showBooking ? "2" : "3"} space-y-6`}>
              {filteredLawyers.map((lawyer) => (
                <div
                  key={lawyer.id}
                  className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6"
                >
                  <img
                    src={lawyer.image}
                    alt={lawyer.name}
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold">{lawyer.name}</h3>
                        <div className="flex items-center text-gray-600 mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{lawyer.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="ml-1 font-semibold">
                          {lawyer.rating}
                        </span>
                        <span className="text-gray-500 ml-1">
                          ({lawyer.reviews} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {lawyer.expertise.map((exp) => (
                          <span
                            key={exp}
                            className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="w-5 h-5 mr-1" />
                        <span className="font-semibold">
                          ${lawyer.hourlyRate}
                        </span>
                        <span className="ml-1">/ hour</span>
                      </div>
                      <button
                        onClick={() => handleBooking(lawyer)}
                        className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Book Consultation
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Calendar */}
          {showBooking && selectedLawyer && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  Book Consultation with {selectedLawyer.name}
                </h3>
                <p className="text-gray-600">
                  Select your preferred date and time
                </p>
              </div>

              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="mx-auto"
                modifiers={{
                  available: (date) => {
                    const day = date.getDay();
                    return day !== 0 && day !== 6; // Exclude weekends
                  },
                  selectedAvailable: (date) => {
                    const day = date.getDay();
                    return (
                      day !== 0 &&
                      day !== 6 &&
                      selectedDate &&
                      date.toDateString() === selectedDate.toDateString()
                    );
                  },
                }}
                modifiersStyles={{
                  available: { color: "#4F46E5" },
                  selectedAvailable: {
                    color: "#ffffff",
                    backgroundColor: "#4F46E5",
                  },
                }}
              />

              {selectedDate && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Available Time Slots</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM"].map(
                      (time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`flex items-center justify-center px-4 py-2 border rounded-lg transition-colors
      ${
        selectedTime === time
          ? "bg-indigo-600 text-white"
          : "border-indigo-600 text-indigo-600 hover:bg-indigo-50"
      }`}
                        >
                          <Clock className="w-4 h-4 mr-2" />
                          {time}
                        </button>
                      )
                    )}
                  </div>
                  <button
                    disabled={!selectedDate || !selectedTime}
                    className={`w-full mt-6 px-6 py-3 rounded-lg flex items-center justify-center transition-colors 
    ${
      selectedDate && selectedTime
        ? "bg-indigo-600 text-white hover:bg-indigo-700"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
                  >
                    Confirm Booking
                    <Calendar className="ml-2 w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LawyersPage;
