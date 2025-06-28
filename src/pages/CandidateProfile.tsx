import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { mockCandidates } from '../data/mockData';

const CandidateProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const candidate = mockCandidates.find(c => c.id === id);
  
  if (!candidate) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Candidate Not Found</h2>
        <p className="text-gray-600 mb-6">We couldn't find the candidate you're looking for.</p>
        <button 
          onClick={() => navigate('/dashboard')}
          className="btn-primary px-4 py-2 rounded-md"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }
  
  const currentIndex = mockCandidates.findIndex(c => c.id === id);
  const prevCandidate = currentIndex > 0 ? mockCandidates[currentIndex - 1] : null;
  const nextCandidate = currentIndex < mockCandidates.length - 1 ? mockCandidates[currentIndex + 1] : null;
  
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-[#070744] hover:text-[#4FD1C5]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to HomePage
          </button>
          
          <div className="flex space-x-4">
            {prevCandidate && (
              <button 
                onClick={() => navigate(`/profile/${prevCandidate.id}`)}
                className="text-[#070744] hover:text-[#4FD1C5]"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            
            {nextCandidate && (
              <button 
                onClick={() => navigate(`/profile/${nextCandidate.id}`)}
                className="text-[#070744] hover:text-[#4FD1C5]"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-[#070744] text-white py-4 px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <img 
                  src={candidate.avatar} 
                  alt={candidate.name} 
                  className="h-20 w-20 rounded-full object-cover border-4 border-white"
                />
                <div className="ml-4">
                  <h1 className="text-xl font-bold">{candidate.name}</h1>
                  <p className="text-[#4FD1C5]">{candidate.domain}</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="bg-[#4FD1C5] text-[#070744] px-4 py-1 rounded-md text-sm font-medium">
                  Send Interest
                </button>
                <button className="bg-[#FFD700] text-[#070744] px-4 py-1 rounded-md text-sm font-medium">
                  Hire
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-8">
              <p className="text-lg text-gray-800 mb-4">
                I am Dr. {candidate.name}, and my experience and skills are here to make a real difference for your team. Let's take the next step together!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-gray-500 text-sm mb-2">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, index) => (
                      <span key={index} className="bg-[#FFD700] text-[#070744] px-3 py-1 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-gray-500 text-sm mb-2">Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#4FD1C5] bg-opacity-20 text-[#4FD1C5] px-3 py-1 rounded-full text-sm">
                      Communication
                    </span>
                    <span className="bg-[#4FD1C5] bg-opacity-20 text-[#4FD1C5] px-3 py-1 rounded-full text-sm">
                      Problem-solving
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-gray-500 text-sm mb-2">Languages</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  English
                </span>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  Hindi
                </span>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-4">Education:</h3>
              <ul className="space-y-3">
                <li>
                  <p className="font-medium">Ph.D. in Business Management(2024)</p>
                  <p className="text-gray-600">M.B.A. in Strategic Management</p>
                  <p className="text-gray-600">B.Com (Honors)</p>
                </li>
              </ul>
            </div>
            
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-4">Past Experience:</h3>
              <ul className="space-y-5">
                <li>
                  <p className="font-medium">Senior Research Analyst at XYZ Consulting</p>
                  <p className="text-gray-600">Corporate Trainer for Fortune 500 companies</p>
                  <p className="text-gray-600">Guest Lecturer at IIM Bangalore</p>
                </li>
              </ul>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-lg mb-4">Job Type</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-[#FFD700] text-[#070744] px-3 py-1 rounded-full text-sm font-medium">
                    Hybrid
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    In Office
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-4">Part-time/Full-time</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-[#FFD700] text-[#070744] px-3 py-1 rounded-full text-sm font-medium">
                    Full-Time
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    Part-Time
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="font-semibold text-lg mb-4">Reviews:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex text-[#FFD700] mb-2">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5" />
                  </div>
                  <p className="text-gray-700 italic">
                    "An inspiring mentor and deeply knowledgeable professional. Translates complex concepts into strategic thinking with actionable insights."
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex text-[#FFD700] mb-2">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                  <p className="text-gray-700 italic">
                    "An inspiring mentor and deeply knowledgeable professional. Translates complex concepts into strategic thinking with actionable insights."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;