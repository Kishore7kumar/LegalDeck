import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Shield, Clock, MessageSquare, Users, Award, Scale, ArrowRight, Star, CheckCircle2, FileText, Globe } from 'lucide-react';

const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 text-white min-h-screen flex items-center hero-pattern">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Expert Legal <span className="text-indigo-300">Consultation</span> at Your Fingertips
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-300">
                Connect with verified lawyers, schedule consultations, and manage your legal matters securely online.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/lawyers"
                  className="group bg-white text-indigo-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center"
                >
                  Find a Lawyer
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/consultation"
                  className="bg-transparent border-2 border-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-indigo-700 transition-all duration-300 flex items-center justify-center"
                >
                  Book Consultation
                  <Clock className="ml-2" />
                </Link>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div className="flex items-center">
                  <Shield className="w-8 h-8 text-indigo-300 mr-3" />
                  <div>
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-sm text-gray-300">Secure</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-indigo-300 mr-3" />
                  <div>
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-sm text-gray-300">Lawyers</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="w-8 h-8 text-indigo-300 mr-3" />
                  <div>
                    <div className="text-2xl font-bold">4.8/5</div>
                    <div className="text-sm text-gray-300">Rating</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:block animate-float relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl"></div>
              <img
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80"
                alt="Law office"
                className="rounded-2xl shadow-2xl glass-effect"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-xl">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-gray-900 font-medium">Verified Experts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
              <div className="text-gray-600">Verified Lawyers</div>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-indigo-600 mb-2">10k+</div>
              <div className="text-gray-600">Consultations</div>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-indigo-600 mb-2">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-indigo-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Why Choose LegalDeck?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of legal consultations with our comprehensive platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Search,
                title: "Easy Lawyer Discovery",
                description: "Find the right lawyer based on expertise, location, and reviews."
              },
              {
                icon: Shield,
                title: "Secure Platform",
                description: "End-to-end encryption for documents and communications."
              },
              {
                icon: Clock,
                title: "24/7 Access",
                description: "Schedule consultations and access documents anytime, anywhere."
              },
              {
                icon: MessageSquare,
                title: "Virtual Consultations",
                description: "Connect with lawyers through secure video calls and messaging."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to get started with LegalDeck</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Users,
                title: "Create Account",
                description: "Sign up and complete your profile in minutes.",
                path:"/register",
              },
              {
                icon: Search,
                title: "Find Your Lawyer",
                description: "Browse through verified lawyers and choose the best match."
              },
              {
                icon: MessageSquare,
                title: "Start Consultation",
                description: "Schedule and conduct secure online consultations."
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="bg-indigo-50 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                  <step.icon className="h-12 w-12 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Coverage Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 gradient-text">Global Legal Network</h2>
              <p className="text-xl text-gray-600 mb-8">
                Access legal expertise across multiple jurisdictions with our network of verified lawyers worldwide.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Globe className="w-6 h-6 text-indigo-600" />
                  <span className="text-gray-700">50+ Countries</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-indigo-600" />
                  <span className="text-gray-700">All Practice Areas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-indigo-600" />
                  <span className="text-gray-700">Expert Network</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-indigo-600" />
                  <span className="text-gray-700">Verified Lawyers</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl"></div>
              <img
                src="https://images.unsplash.com/photo-1577415124269-fc1140a69e91?auto=format&fit=crop&q=80"
                alt="Global Legal Network"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of clients who trust LegalDeck for their legal needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-50 transition-all duration-300 inline-flex items-center justify-center"
            >
              Create Free Account
              <ArrowRight className="ml-2" />
            </Link>
            <Link
              to="/lawyers"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300 inline-flex items-center justify-center"
            >
              Browse Lawyers
              <Search className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;