import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  avatar: string;
  domain: string;
  specialization: string;
  experience: string;
  roles: string[];
  skills: string[];
  availableDays: number;
}

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover border border-gray-100">
      <div className="p-5">
        <div className="flex items-center mb-4">
          <img 
            src={candidate.avatar} 
            alt={candidate.name} 
            className="h-14 w-14 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
            <p className="text-sm text-[#4FD1C5]">{candidate.domain}- {candidate.specialization}</p>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>{candidate.experience} Years Experience</span>
        </div>
        
        <div className="mb-3">
          <p className="text-sm text-gray-600">Role</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {candidate.roles.map((role, index) => (
              <div key={index} className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-gray-800">{role}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-3">
          <p className="text-sm text-gray-600">Training(8 Year onwards)</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {candidate.roles.includes('Employee') && (
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-gray-800">Employee</span>
              </div>
            )}
            {candidate.roles.includes('Freelancer') && (
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-gray-800">Freelancer</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <Clock className="h-4 w-4 mr-1" />
          <span>{candidate.availableDays} days</span>
        </div>
        
        <div className="flex justify-between">
          <Link 
            to={`/profile/${candidate.id}`}
            className="text-[#4FD1C5] hover:text-[#3db9af] text-sm font-medium px-4 py-1 border border-[#4FD1C5] rounded-md"
          >
            Send Interest
          </Link>
          <Link 
            to={`/profile/${candidate.id}`}
            className="bg-[#FFD700] text-[#070744] hover:bg-opacity-90 text-sm font-medium px-4 py-1 rounded-md"
          >
            Hire
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;