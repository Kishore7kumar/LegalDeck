import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Star, 
  Award, 
  Shield, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  DollarSign,
  ThumbsUp,
  Building2,
  Scale,
  BookOpen,
  Users
} from 'lucide-react';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
  helpful: number;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: number;
  verified: boolean;
}

const LawyerProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'credentials'>('overview');
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Mock data
  const lawyer = {
    name: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    expertise: ["Criminal Law", "Family Law"],
    location: "New York, NY",
    rating: 4.8,
    reviews: 127,
    hourlyRate: 200,
    experience: 12,
    casesWon: 234,
    totalCases: 289,
    barNumber: "NY123456",
    verificationStatus: {
      kyc: true,
      barAssociation: true,
      identity: true
    },
    badges: [
      { name: "Top Rated", icon: Star },
      { name: "Bar Verified", icon: Shield },
      { name: "Expert", icon: Award }
    ],
    about: "Sarah Johnson is a highly experienced attorney specializing in criminal and family law. With over 12 years of practice, she has successfully handled numerous high-profile cases and maintains an exceptional track record of client satisfaction.",
    education: [
      {
        degree: "Juris Doctor",
        institution: "Harvard Law School",
        year: 2012
      },
      {
        degree: "Bachelor of Arts in Political Science",
        institution: "Yale University",
        year: 2009
      }
    ]
  };

  const certifications: Certification[] = [
    {
      id: "1",
      name: "New York State Bar Association",
      issuer: "NY State Bar",
      year: 2012,
      verified: true
    },
    {
      id: "2",
      name: "Criminal Law Specialist",
      issuer: "National Board of Legal Specialty Certification",
      year: 2015,
      verified: true
    },
    {
      id: "3",
      name: "Family Law Mediator",
      issuer: "American Academy of Matrimonial Lawyers",
      year: 2016,
      verified: true
    }
  ];

  const reviews: Review[] = [
    {
      id: "1",
      userName: "John D.",
      rating: 5,
      comment: "Excellent lawyer! Sarah handled my case professionally and achieved the best possible outcome.",
      date: new Date(2024, 2, 15),
      helpful: 12
    },
    {
      id: "2",
      userName: "Emily R.",
      rating: 4,
      comment: "Very knowledgeable and responsive. Would recommend her services.",
      date: new Date(2024, 2, 10),
      helpful: 8
    },
    {
      id: "3",
      userName: "Michael S.",
      rating: 5,
      comment: "Sarah's expertise in criminal law is outstanding. She guided me through the entire process with clarity.",
      date: new Date(2024, 2, 5),
      helpful: 15
    }
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <img
                src={lawyer.image}
                alt={lawyer.name}
                className="w-full h-64 object-cover rounded-xl"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                {lawyer.badges.map((badge, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm"
                  >
                    <badge.icon className="w-4 h-4 mr-1" />
                    {badge.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{lawyer.name}</h1>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="flex items-center">
                      {renderStars(lawyer.rating)}
                      <span className="ml-2 text-gray-600">({lawyer.reviews} reviews)</span>
                    </div>
                    <span className="text-gray-400">|</span>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {lawyer.location}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-indigo-600">
                    ${lawyer.hourlyRate}
                  </div>
                  <div className="text-sm text-gray-600">per hour</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Clock className="w-6 h-6 text-indigo-600 mb-2" />
                  <div className="text-2xl font-bold">{lawyer.experience}+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Scale className="w-6 h-6 text-indigo-600 mb-2" />
                  <div className="text-2xl font-bold">{lawyer.casesWon}</div>
                  <div className="text-sm text-gray-600">Cases Won</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Users className="w-6 h-6 text-indigo-600 mb-2" />
                  <div className="text-2xl font-bold">{lawyer.totalCases}</div>
                  <div className="text-sm text-gray-600">Total Cases</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Building2 className="w-6 h-6 text-indigo-600 mb-2" />
                  <div className="text-sm font-medium">Bar #{lawyer.barNumber}</div>
                  <div className="text-sm text-gray-600">Licensed</div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Verification Status</h3>
                <div className="flex space-x-4">
                  {Object.entries(lawyer.verificationStatus).map(([key, verified]) => (
                    <div
                      key={key}
                      className={`flex items-center px-3 py-1 rounded-full text-sm ${
                        verified
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {verified ? (
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                      ) : (
                        <Clock className="w-4 h-4 mr-1" />
                      )}
                      {key.charAt(0).toUpperCase() + key.slice(1)} Verified
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b">
            <div className="flex">
              {(['overview', 'reviews', 'credentials'] as const).map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === tab
                      ? 'border-b-2 border-indigo-600 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">About</h3>
                  <p className="text-gray-600">{lawyer.about}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Education</h3>
                  <div className="space-y-4">
                    {lawyer.education.map((edu, index) => (
                      <div key={index} className="flex items-start">
                        <BookOpen className="w-5 h-5 text-indigo-600 mt-1 mr-3" />
                        <div>
                          <div className="font-medium">{edu.degree}</div>
                          <div className="text-gray-600">{edu.institution}</div>
                          <div className="text-sm text-gray-500">{edu.year}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Practice Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {lawyer.expertise.map((area, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {reviews.slice(0, showAllReviews ? undefined : 3).map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{review.userName}</div>
                        <div className="flex items-center mt-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {review.date.toLocaleDateString()}
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600">{review.comment}</p>
                    <button className="mt-2 flex items-center text-sm text-gray-500 hover:text-gray-700">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      Helpful ({review.helpful})
                    </button>
                  </div>
                ))}
                {reviews.length > 3 && (
                  <button
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                    onClick={() => setShowAllReviews(!showAllReviews)}
                  >
                    {showAllReviews ? 'Show Less' : 'Show All Reviews'}
                  </button>
                )}
              </div>
            )}

            {activeTab === 'credentials' && (
              <div className="space-y-6">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex items-start space-x-4 border-b pb-6 last:border-0">
                    <Shield className="w-6 h-6 text-indigo-600" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{cert.name}</h4>
                        {cert.verified && (
                          <span className="flex items-center text-green-600 text-sm">
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mt-1">{cert.issuer}</p>
                      <p className="text-sm text-gray-500 mt-1">Issued {cert.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerProfile;