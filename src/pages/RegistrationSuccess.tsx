import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const RegistrationSuccess: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center py-12 px-4">
      <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Registration Successful!</h1>
      <p className="text-gray-600 mb-6">Your profile has been created. You can now login and start receiving job offers.</p>
      <button
        onClick={() => navigate('/login')}
        className="bg-[#070744] text-white px-8 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors duration-200"
      >
        Go to Login
      </button>
    </div>
  );
};

export default RegistrationSuccess; 