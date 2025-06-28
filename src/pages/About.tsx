import React from 'react';
import { Users, Target, Heart, CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] py-12 px-4 sm:px-6 lg:px-8 gradient-bg">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Crowd2Capital
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting talent with opportunity through modern hiring solutions
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="h-6 w-6 mr-2 text-[#4FD1C5]" />
                Our Platform
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Crowd2Capital is a modern hiring platform designed to connect talent with opportunity. 
                Whether you're a company looking to hire skilled professionals or an individual seeking 
                freelance work, internships, full-time jobs, or training gigs — we bring everyone 
                together under one platform.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="h-6 w-6 mr-2 text-[#4FD1C5]" />
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to simplify the hiring process through smart filters, verified profiles, 
                and a transparent booking system. From hiring interns to experienced trainers, we help 
                hirers find the right fit based on domain, skill, availability, and experience.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Heart className="h-6 w-6 mr-2 text-[#4FD1C5]" />
                Our Belief
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We believe every skill deserves the right opportunity — and we're here to make that 
                connection happen.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-[#4FD1C5] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Matching</h3>
            <p className="text-gray-600">
              Advanced algorithms match the right talent with the right opportunities
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-[#4FD1C5] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Profiles</h3>
            <p className="text-gray-600">
              All profiles are verified to ensure quality and trust
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-[#4FD1C5] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Transparent Booking</h3>
            <p className="text-gray-600">
              Clear and transparent booking system for seamless transactions
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#4FD1C5] to-[#3db9af] rounded-lg shadow-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of professionals and companies already using Crowd2Capital
          </p>
          <div className="space-x-4">
            <a
              href="/register"
              className="inline-block bg-white text-[#4FD1C5] px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started
            </a>
            <a
              href="/contact"
              className="inline-block border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-[#4FD1C5] transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 