import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Bell, Briefcase, Mail, Edit, Eye, CheckCircle, Clock } from 'lucide-react';

const HireeDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for job offers
  const jobOffers = [
    {
      id: 1,
      company: 'TechCorp Solutions',
      position: 'Senior Software Developer',
      salary: '₹12,00,000 - ₹18,00,000',
      location: 'Bangalore',
      type: 'Full-time',
      status: 'pending',
      receivedAt: '2024-01-15'
    },
    {
      id: 2,
      company: 'InnovateTech',
      position: 'UI/UX Designer',
      salary: '₹8,00,000 - ₹12,00,000',
      location: 'Mumbai',
      type: 'Full-time',
      status: 'accepted',
      receivedAt: '2024-01-10'
    },
    {
      id: 3,
      company: 'DataFlow Systems',
      position: 'Data Analyst',
      salary: '₹6,00,000 - ₹10,00,000',
      location: 'Remote',
      type: 'Part-time',
      status: 'rejected',
      receivedAt: '2024-01-05'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'text-green-600 bg-green-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <Clock className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <User className="h-8 w-8 text-[#4FD1C5] mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Hiree Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">Notifications</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">Messages</span>
              </div>
              
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name || 'Professional'}!
              </h2>
              <p className="text-gray-600">
                Your profile is active and receiving job offers. Keep it updated to increase your chances.
              </p>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => navigate('/hiree-profile')}
                className="flex items-center px-4 py-2 bg-[#4FD1C5] text-white rounded-md hover:bg-opacity-90 transition-colors duration-200"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
              <button 
                onClick={() => navigate('/hiree-profile')}
                className="flex items-center px-4 py-2 bg-[#070744] text-white rounded-md hover:bg-opacity-90 transition-colors duration-200"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Profile
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-[#4FD1C5]" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Offers</p>
                <p className="text-2xl font-bold text-gray-900">{jobOffers.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Accepted</p>
                <p className="text-2xl font-bold text-gray-900">
                  {jobOffers.filter(offer => offer.status === 'accepted').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {jobOffers.filter(offer => offer.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-[#FFD700]" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Messages</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-[#4FD1C5] text-[#4FD1C5]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('offers')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'offers'
                    ? 'border-[#4FD1C5] text-[#4FD1C5]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Job Offers
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-[#4FD1C5] text-[#4FD1C5]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Profile
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <div>
                      <p className="font-medium text-green-900">Offer Accepted</p>
                      <p className="text-sm text-green-700">You accepted the UI/UX Designer position at InnovateTech</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                    <Bell className="h-5 w-5 text-blue-500 mr-3" />
                    <div>
                      <p className="font-medium text-blue-900">New Job Offer</p>
                      <p className="text-sm text-blue-700">TechCorp Solutions sent you a job offer for Senior Software Developer</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
                    <Eye className="h-5 w-5 text-yellow-500 mr-3" />
                    <div>
                      <p className="font-medium text-yellow-900">Profile Viewed</p>
                      <p className="text-sm text-yellow-700">Your profile was viewed by 3 companies this week</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'offers' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Offers</h3>
                <div className="space-y-4">
                  {jobOffers.map((offer) => (
                    <div key={offer.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{offer.position}</h4>
                          <p className="text-[#4FD1C5] font-medium">{offer.company}</p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(offer.status)}`}>
                          {getStatusIcon(offer.status)}
                          <span className="ml-1 capitalize">{offer.status}</span>
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Salary</p>
                          <p className="font-medium text-gray-900">{offer.salary}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Location</p>
                          <p className="font-medium text-gray-900">{offer.location}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Type</p>
                          <p className="font-medium text-gray-900">{offer.type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Received</p>
                          <p className="font-medium text-gray-900">{new Date(offer.receivedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-[#070744] text-white rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors duration-200">
                          View Details
                        </button>
                        {offer.status === 'pending' && (
                          <>
                            <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors duration-200">
                              Accept
                            </button>
                            <button className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors duration-200">
                              Decline
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Personal Information</h4>
                    <div className="space-y-2">
                      <p><span className="text-gray-600">Name:</span> {user?.name || 'Not set'}</p>
                      <p><span className="text-gray-600">Email:</span> {user?.email || 'Not set'}</p>
                      <p><span className="text-gray-600">User Type:</span> {user?.type || 'Not set'}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Profile Status</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">Profile Complete</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">Skills Added</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">Experience Listed</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">Profile Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireeDashboard;