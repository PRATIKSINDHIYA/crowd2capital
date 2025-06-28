import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, Mail, Bell } from 'lucide-react';

const WaitingForOffers: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-200px)] py-8 px-4 sm:px-6 lg:px-8 gradient-bg">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Created Successfully!</h1>
          <p className="text-gray-600">Your professional profile is now live and ready to receive job offers.</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <Clock className="h-12 w-12 text-[#4FD1C5] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Waiting for Offers</h2>
            <p className="text-gray-600">
              We're actively matching your profile with hiring companies. You'll receive notifications when job offers come in.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <Bell className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">What happens next?</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Your profile is being reviewed by our team</li>
                    <li>• We'll match you with relevant job opportunities</li>
                    <li>• You'll receive email notifications for new offers</li>
                    <li>• Companies can directly contact you through the platform</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Stay Updated</h3>
                  <p className="text-sm text-green-800">
                    Check your email regularly for job offers and platform updates. You can also log in to your dashboard to see your profile status.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3" />
                <div>
                  <h3 className="font-semibold text-yellow-900 mb-1">Profile Optimization Tips</h3>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Keep your skills and experience up to date</li>
                    <li>• Add a professional profile picture</li>
                    <li>• Complete all sections of your profile</li>
                    <li>• Respond promptly to job offers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={() => navigate('/hiree-dashboard')}
              className="w-full bg-[#070744] text-white py-3 px-4 rounded-md font-medium hover:bg-opacity-90 transition-colors duration-200"
            >
              Go to Dashboard
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-md font-medium hover:bg-gray-200 transition-colors duration-200"
            >
              Back to Home
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@lyfex.com" className="text-[#4FD1C5] hover:text-[#3db9af]">
              support@lyfex.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WaitingForOffers; 