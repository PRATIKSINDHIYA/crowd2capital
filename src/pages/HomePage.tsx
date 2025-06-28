import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, BookOpen, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import CandidateCard from '../components/candidates/CandidateCard';
import { mockCandidates } from '../data/mockData';
import CompanyDashboard from './CompanyDashboard';

const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const featuredCandidates = mockCandidates.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="gradient-bg py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#070744]">
              Hire Trainers, Employees, Interns or Freelancers – All in One Bazaar
            </h1>
            <p className="text-lg mb-8 text-gray-700">Where Talent Meets Demand</p>
            
            <div className="relative w-full max-w-md mb-8">
              <input
                type="text"
                placeholder="Search for talent..."
                className="w-full px-4 py-3 pr-12 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
              />
              <button className="absolute right-0 top-0 bg-[#FFD700] text-[#070744] font-medium px-4 py-3 rounded-r-md">
                Hire
              </button>
            </div>
            
            <div className="flex flex-wrap justify-start gap-8 mb-6">
              <div className="text-center">
                <p className="text-xl font-bold text-[#070744]">30+</p>
                <p className="text-sm text-gray-600">Trainers</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-[#070744]">50k+</p>
                <p className="text-sm text-gray-600">Employees</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-[#070744]">10k+</p>
                <p className="text-sm text-gray-600">Interns</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-[#070744]">10k+</p>
                <p className="text-sm text-gray-600">Freelancers</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Student with laptop" 
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
              <div className="absolute -right-8 -top-8 bg-white p-4 rounded-lg shadow-md">
                <p className="text-sm font-bold">50K+</p>
                <p className="text-xs text-gray-600">Employees</p>
              </div>
              <div className="absolute -right-4 bottom-20 bg-white p-4 rounded-lg shadow-md">
                <p className="text-sm font-bold">Learners</p>
                <p className="text-xs text-gray-600">Active Students</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Find Talent Section - Moved above Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-[#070744]">
            Find Who matches your Requirements
          </h2>
          <div className="flex flex-col lg:flex-row justify-center items-start gap-10">
            {/* Candidate Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm border border-gray-200 flex flex-col items-center relative" style={{ minWidth: 340 }}>
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Dr. Sudha Murthy"
                className="w-40 h-40 rounded-full object-cover mb-4 border-4 border-white shadow"
              />
              <div className="w-full text-center">
                <div className="inline-block bg-white px-2 py-1 rounded shadow mb-2 font-bold text-lg" style={{marginTop: '-2rem'}}>
                  Dr. Sudha Murthy
                </div>
                <div className="font-semibold text-md mt-2 mb-1">
                  <span className="text-black">Business Research</span>
                  <span className="text-gray-700">- Interactive Guidance</span>
                </div>
                <div className="flex items-center justify-center text-gray-700 text-sm mb-1">
                  <span className="mr-2">🌟</span> 3+ Years Experience
                </div>
                <div className="text-left w-full mb-1">
                  <span className="font-semibold">Role</span>
                  <ul className="ml-2 mt-1 space-y-1">
                    <li className="flex items-center text-sm"><span className="text-green-600 mr-1">✔</span>Trainer(8 Year onward)</li>
                    <li className="flex items-center text-sm"><span className="text-green-600 mr-1">✔</span>Employee</li>
                    <li className="flex items-center text-sm"><span className="text-green-600 mr-1">✔</span>Freelancer</li>
                  </ul>
                </div>
                <div className="flex items-center text-gray-700 text-sm mb-4">
                  <span className="mr-2">🗓️</span> 20 days
                </div>
                <div className="flex gap-3 w-full justify-center mt-2">
                  <button className="bg-[#FFD700] text-[#070744] px-5 py-2 rounded-md font-semibold shadow hover:bg-yellow-400 transition">Send Interest</button>
                  <button className="bg-[#FFD700] text-[#070744] px-5 py-2 rounded-md font-semibold shadow hover:bg-yellow-400 transition">Hire</button>
                </div>
              </div>
              {/* Navigation Arrows */}
              <div className="flex justify-between w-24 mx-auto mt-8">
                <button className="text-2xl text-gray-400 hover:text-[#070744]">&#8592;</button>
                <button className="text-2xl text-gray-400 hover:text-[#070744]">&#8594;</button>
              </div>
            </div>
            {/* Filter Form */}
            <form className="w-full max-w-md bg-white rounded-xl p-8 border-2 border-yellow-400 shadow-lg">
              <div className="mb-6">
                <label className="block text-lg font-semibold mb-2 text-[#070744]">Domain</label>
                <input
                  type="text"
                  placeholder="Eg : AI/ML Specialist"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-semibold mb-2 text-[#070744]">Skills required</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full">Java</span>
                  <span className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full">R</span>
                </div>
                <input
                  type="text"
                  placeholder="Add skill"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-semibold mb-2 text-[#070744]">Availability</label>
                <input
                  type="text"
                  placeholder=""
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-semibold mb-2 text-[#070744]">Role</label>
                <input
                  type="text"
                  placeholder=""
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-semibold mb-2 text-[#070744]">Year of Experience</label>
                <input
                  type="text"
                  placeholder=""
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                />
              </div>
            </form>
          </div>
        </div>
      </section>
      
      <CompanyDashboard /> {/* 👈 yahan component use karo */}


      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-[#070744]">
            Why Choose LYFeX?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-[#e6f7f5] p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-[#4FD1C5]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#070744]">Precise Matching</h3>
              <p className="text-gray-600">Find the exact talent you need with our advanced filtering system.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-[#e6f7f5] p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-[#4FD1C5]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#070744]">Diverse Talent Pool</h3>
              <p className="text-gray-600">Access a wide range of professionals from trainers to freelancers.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-[#e6f7f5] p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-[#4FD1C5]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#070744]">Real-world Experience</h3>
              <p className="text-gray-600">Connect with candidates who have hands-on industry experience.</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            {!isAuthenticated && (
            <Link to="/register" className="btn-secondary inline-flex items-center px-6 py-3 rounded-md text-base font-medium">
              Register Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;