// Lawyers.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

const Lawyers = () => {
  const navigate = useNavigate();

  const handleBookNow = (lawyer) => {
    const selectedDate = "2025-05-01";
    const selectedTime = "14:00";

    navigate(`/consultation/${lawyer.id}`, {
      state: {
        lawyer,
        date: selectedDate,
        time: selectedTime,
      },
    });
  };

  const lawyers = [
    {
      id: "1",
      name: "Sarah Johnson",
      expertise: "Criminal Law",
      hourlyRate: 200,
      rating: 4.8,
      reviews: 120,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    },
    {
      id: "2",
      name: "David Smith",
      expertise: "Corporate Law",
      hourlyRate: 180,
      rating: 4.6,
      reviews: 95,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    },
    {
      id: "3",
      name: "Emily Carter",
      expertise: "Family Law",
      hourlyRate: 150,
      rating: 4.9,
      reviews: 88,
      image:
        "https://img.freepik.com/premium-photo/portrait-young-indian-female-lawyer-smiling-happy-her-workplace-office-indian-lawyer-technologist-professional-face-female-lawyer-legal-consultant-law-firm_785351-3584.jpg",
    },
  ];

  return (
    <div className="p-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {lawyers.map((lawyer) => (
        <div
          key={lawyer.id}
          className="bg-white p-6 rounded-xl shadow-lg space-y-4"
        >
          <img
            src={lawyer.image}
            alt={lawyer.name}
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h3 className="text-center text-xl font-semibold">{lawyer.name}</h3>
          <p className="text-center text-gray-600">{lawyer.expertise}</p>
          <div className="flex justify-center items-center space-x-1 text-yellow-500">
            <Star className="w-4 h-4" />
            <span className="text-sm">{lawyer.rating}</span>
            <span className="text-gray-400">({lawyer.reviews})</span>
          </div>
          <p className="text-center font-medium">
            ${lawyer.hourlyRate}/hour
          </p>
          <button
            onClick={() => handleBookNow(lawyer)}
            className="block w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default Lawyers;
