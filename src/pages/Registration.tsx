import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, User, ArrowLeft } from 'lucide-react';

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<'hirer' | 'hiree' | null>(null);

  const handleContinue = () => {
    if (selectedType === 'hirer') {
      navigate('/hirer-registration');
    } else if (selectedType === 'hiree') {
      navigate('/hiree-registration');
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] py-8 px-4 sm:px-6 lg:px-8 gradient-bg">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-[#070744] hover:text-[#000000] mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Registration Type</h1>
            <p className="text-gray-600">Select how you want to use our platform</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Hirer Option */}
          <div 
            className={`bg-white rounded-lg shadow-md p-8 cursor-pointer transition-all duration-200 ${
              selectedType === 'hirer' 
                ? 'ring-2 ring-[#4FD1C5] transform scale-105' 
                : 'hover:shadow-lg hover:transform hover:scale-105'
            }`}
            onClick={() => setSelectedType('hirer')}
          >
            <div className="text-center">
              <Building2 className="h-16 w-16 text-[#4FD1C5] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Register as Hirer</h2>
              <p className="text-gray-600 mb-6">
                Looking to hire talented professionals? Complete your company profile and start finding the perfect candidates.
              </p>
              
              <div className="text-left space-y-3">
                <h3 className="font-semibold text-gray-900 mb-2">What you'll get:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#4FD1C5] rounded-full mr-2"></span>
                    Access to qualified candidates
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#4FD1C5] rounded-full mr-2"></span>
                    Advanced filtering options
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#4FD1C5] rounded-full mr-2"></span>
                    Direct communication with candidates
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#4FD1C5] rounded-full mr-2"></span>
                    Company dashboard and analytics
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Hiree Option */}
          <div 
            className={`bg-white rounded-lg shadow-md p-8 cursor-pointer transition-all duration-200 ${
              selectedType === 'hiree' 
                ? 'ring-2 ring-[#4FD1C5] transform scale-105' 
                : 'hover:shadow-lg hover:transform hover:scale-105'
            }`}
            onClick={() => setSelectedType('hiree')}
          >
            <div className="text-center">
              <User className="h-16 w-16 text-[#4FD1C5] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Register as Hiree</h2>
              <p className="text-gray-600 mb-6">
                Ready to showcase your skills? Create your professional profile and start receiving job offers.
              </p>
              
              <div className="text-left space-y-3">
                <h3 className="font-semibold text-gray-900 mb-2">What you'll get:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#4FD1C5] rounded-full mr-2"></span>
                    Professional profile showcase
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#4FD1C5] rounded-full mr-2"></span>
                    Job offers from top companies
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#4FD1C5] rounded-full mr-2"></span>
                    Skill-based matching
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#4FD1C5] rounded-full mr-2"></span>
                    Career growth opportunities
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {selectedType && (
          <div className="mt-8 text-center">
            <button
              onClick={handleContinue}
              className="bg-[#070744] text-white px-8 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors duration-200"
            >
              Continue as {selectedType === 'hirer' ? 'Hirer' : 'Hiree'}
            </button>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-[#4FD1C5] hover:text-[#3db9af] font-medium">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration; 