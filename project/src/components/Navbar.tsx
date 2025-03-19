import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Menu, FileText } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Scale className="h-8 w-8" />
              <span className="text-xl font-bold">LegalDeck</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/lawyers" className="hover:text-indigo-200">Find Lawyers</Link>
            <Link to="/documents" className="hover:text-indigo-200 flex items-center">
              <FileText className="w-4 h-4 mr-1" />
              Documents
            </Link>
            <Link to="/services" className="hover:text-indigo-200">Services</Link>
            <Link to="/about" className="hover:text-indigo-200">About</Link>
            <Link to="/contact" className="hover:text-indigo-200">Contact</Link>
            <Link to="/login" className="bg-white text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-100">
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-indigo-600"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/lawyers" className="block px-3 py-2 hover:bg-indigo-600 rounded-md">Find Lawyers</Link>
              <Link to="/documents" className="block px-3 py-2 hover:bg-indigo-600 rounded-md flex items-center">
                <FileText className="w-4 h-4 mr-1" />
                Documents
              </Link>
              <Link to="/services" className="block px-3 py-2 hover:bg-indigo-600 rounded-md">Services</Link>
              <Link to="/about" className="block px-3 py-2 hover:bg-indigo-600 rounded-md">About</Link>
              <Link to="/contact" className="block px-3 py-2 hover:bg-indigo-600 rounded-md">Contact</Link>
              <Link to="/login" className="block px-3 py-2 bg-white text-indigo-700 rounded-md mt-4">Login</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;