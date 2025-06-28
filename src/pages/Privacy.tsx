import React from 'react';
import { Shield, Lock, Eye, UserCheck, Calendar } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] py-12 px-4 sm:px-6 lg:px-8 gradient-bg">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-[#4FD1C5]" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            How we collect, use, and protect your information
          </p>
        </div>

        {/* Last Updated */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-center text-gray-600">
            <Calendar className="h-5 w-5 mr-2" />
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Privacy Policy Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <UserCheck className="h-6 w-6 mr-2 text-[#4FD1C5]" />
                Information We Collect
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We collect user information such as name, email, contact details, profile information, 
                and images. This data helps us provide better services and improve your experience on our platform.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Eye className="h-6 w-6 mr-2 text-[#4FD1C5]" />
                How We Use Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed">
                This data is used to improve matching, personalize experiences, and notify users about 
                relevant opportunities and updates. We use your information to connect you with the right 
                opportunities and ensure a seamless experience on our platform.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Lock className="h-6 w-6 mr-2 text-[#4FD1C5]" />
                Data Security
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We use secure platforms (Firebase) to protect all data. Your information is encrypted 
                and stored using industry-standard security measures to ensure your privacy and data protection.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="h-6 w-6 mr-2 text-[#4FD1C5]" />
                Data Sharing
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We don't share data without permission. Your personal information is only shared when 
                you explicitly consent or when required by law. We are committed to protecting your privacy.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <UserCheck className="h-6 w-6 mr-2 text-[#4FD1C5]" />
                Your Rights
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Users can request modification or deletion of their data anytime. You have full control 
                over your personal information and can update or remove it from our platform at any time.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-[#4FD1C5]" />
                Policy Updates
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Policy updates will be reflected on this page. We will notify users of any significant 
                changes to our privacy policy and ensure transparency in how we handle your information.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-[#4FD1C5] to-[#3db9af] rounded-lg shadow-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Questions About Privacy?</h2>
          <p className="text-lg mb-6 opacity-90">
            If you have any questions about our privacy policy or how we handle your data, 
            please don't hesitate to contact us.
          </p>
          <div className="space-x-4">
            <a
              href="/contact"
              className="inline-block bg-white text-[#4FD1C5] px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="/faq"
              className="inline-block border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-[#4FD1C5] transition-colors"
            >
              View FAQ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy; 