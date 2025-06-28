import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, Filter, Building2, Users, Briefcase, Mail } from 'lucide-react';
import { mockCandidates } from '../data/mockData';

const HirerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Candidates' },
    { id: 'it', label: 'IT Professionals' },
    { id: 'non-it', label: 'Non-IT Professionals' },
    { id: 'freshers', label: 'Freshers' },
    { id: 'experienced', label: 'Experienced' }
  ];

  const filteredCandidates = mockCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'it' && candidate.domain.toLowerCase().includes('it')) ||
                         (selectedFilter === 'non-it' && !candidate.domain.toLowerCase().includes('it')) ||
                         (selectedFilter === 'freshers' && candidate.experience === 'Fresher') ||
                         (selectedFilter === 'experienced' && candidate.experience !== 'Fresher');
    
    return matchesSearch && matchesFilter;
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-[#4FD1C5] mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Hirer Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">{filteredCandidates.length} candidates</span>
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
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-[#4FD1C5]" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Candidates</p>
                <p className="text-2xl font-bold text-gray-900">{mockCandidates.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-[#FFD700]" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">IT Professionals</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockCandidates.filter(c => c.domain.toLowerCase().includes('it')).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-[#4FD1C5]" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Non-IT Professionals</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockCandidates.filter(c => !c.domain.toLowerCase().includes('it')).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-[#FFD700]" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Messages</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search candidates by name, skills, or domain..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#4FD1C5] focus:border-[#4FD1C5]"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#4FD1C5] focus:border-[#4FD1C5]"
              >
                {filters.map(filter => (
                  <option key={filter.id} value={filter.id}>{filter.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <div key={candidate.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={candidate.avatar}
                    alt={candidate.name}
                    className="h-12 w-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                    <p className="text-sm text-[#4FD1C5]">{candidate.domain}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Experience:</span> {candidate.experience}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Location:</span> {candidate.location}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="bg-[#4FD1C5] bg-opacity-20 text-[#4FD1C5] px-2 py-1 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {candidate.skills.length > 3 && (
                      <span className="text-xs text-gray-500">+{candidate.skills.length - 3} more</span>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/profile/${candidate.id}`)}
                    className="flex-1 bg-[#070744] text-white py-2 px-3 rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors duration-200"
                  >
                    View Profile
                  </button>
                  <button className="flex-1 bg-[#4FD1C5] text-[#070744] py-2 px-3 rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors duration-200">
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HirerDashboard; 