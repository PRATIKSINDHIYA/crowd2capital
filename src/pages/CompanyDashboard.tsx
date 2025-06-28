import React, { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import { mockCandidates } from '../data/mockData';
import CandidateCard from '../components/candidates/CandidateCard';

interface FilterState {
  domain: string;
  availability: string;
  role: string;
  experience: string;
  skills: string[];
}

const CompanyDashboard: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    domain: '',
    availability: '',
    role: '',
    experience: '',
    skills: [],
  });
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
  
  const handleSkillAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
      setFilters({
        ...filters,
        skills: [...filters.skills, e.currentTarget.value.trim()]
      });
      e.currentTarget.value = '';
    }
  };
  
  const handleSkillRemove = (skill: string) => {
    setFilters({
      ...filters,
      skills: filters.skills.filter(s => s !== skill)
    });
  };
  
  const filteredCandidates = mockCandidates.filter(candidate => {
    // Search filter
    if (searchTerm && !candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !candidate.domain.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Domain filter
    if (filters.domain && candidate.domain !== filters.domain) {
      return false;
    }
    
    // Availability filter
    if (filters.availability && candidate.availableDays > parseInt(filters.availability)) {
      return false;
    }
    
    // Role filter
    if (filters.role && !candidate.roles.includes(filters.role)) {
      return false;
    }
    
    // Experience filter
    if (filters.experience) {
      const expYears = parseInt(candidate.experience);
      if (filters.experience === '0-1' && expYears > 1) return false;
      if (filters.experience === '1-3' && (expYears < 1 || expYears > 3)) return false;
      if (filters.experience === '3-5' && (expYears < 3 || expYears > 5)) return false;
      if (filters.experience === '5+' && expYears < 5) return false;
    }
    
    // Skills filter
    if (filters.skills.length > 0) {
      return filters.skills.every(skill => 
        candidate.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
      );
    }
    
    return true;
  });
  
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#070744]">Company Dashboard</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-sm font-medium text-[#4FD1C5] hover:text-[#3db9af]"
          >
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, domain, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        
        {showFilters && (
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-lg font-semibold mb-4 text-[#070744]">FILTER BY</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Domain</label>
                <select
                  name="domain"
                  value={filters.domain}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                >
                  <option value="">All Domains</option>
                  <option value="Web Development">Web Development</option>
                  <option value="AI & Machine Learning">AI & Machine Learning</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Business Research">Business Research</option>
                  <option value="UI/UX Designing">UI/UX Designing</option>
                </select>
                <button className="text-sm text-[#4FD1C5] mt-1">Show more</button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                <select
                  name="availability"
                  value={filters.availability}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                >
                  <option value="">Any Availability</option>
                  <option value="15">Within 15 days</option>
                  <option value="30">Within 30 days</option>
                  <option value="60">Within 60 days</option>
                </select>
                <button className="text-sm text-[#4FD1C5] mt-1">Show more</button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  name="role"
                  value={filters.role}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                >
                  <option value="">Any Role</option>
                  <option value="Employee">Employee</option>
                  <option value="Freelancer">Freelancer</option>
                  <option value="Trainer">Trainer</option>
                  <option value="Intern">Intern</option>
                </select>
                <button className="text-sm text-[#4FD1C5] mt-1">Show more</button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year of Experience</label>
                <select
                  name="experience"
                  value={filters.experience}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                >
                  <option value="">Any Experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
                <button className="text-sm text-[#4FD1C5] mt-1">Show more</button>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {filters.skills.map((skill, index) => (
                  <span key={index} className="bg-[#e6f7f5] text-[#070744] text-sm px-3 py-1 rounded-full flex items-center">
                    {skill}
                    <button 
                      onClick={() => handleSkillRemove(skill)}
                      className="ml-2 text-[#070744] hover:text-red-500"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add skill and press Enter"
                onKeyDown={handleSkillAdd}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
              />
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map(candidate => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-gray-600">No candidates match your search criteria.</p>
              <p className="mt-2">Try adjusting your filters or search term.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;