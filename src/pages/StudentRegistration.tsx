import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Info } from 'lucide-react';

type JobType = 'In-Office' | 'Hybrid' | 'Remote';
type WorkTime = 'Full-time' | 'Part-time';
type RegistrationType = 'JOB' | 'INTERNSHIP' | 'FREELANCER' | 'TRAINER';

interface EducationEntry {
  degree: string;
  university: string;
  field: string;
  year: string;
}

interface ExperienceEntry {
  type: 'Internship' | 'Job';
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
}

const StudentRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<RegistrationType>('JOB');
  const [education, setEducation] = useState<EducationEntry[]>([{ degree: '', university: '', field: '', year: '' }]);
  const [experience, setExperience] = useState<ExperienceEntry[]>([
    { type: 'Job', company: '', role: '', description: '', startDate: '', endDate: '' }
  ]);
  
  const [formData, setFormData] = useState({
    jobTitle: '',
    experience: '',
    technicalSkills: '',
    softSkills: '',
    languages: '',
    joinDays: '30',
    jobType: [] as JobType[],
    workTime: '' as WorkTime,
    ctcTotal: '',
    ctcFixed: '',
    ctcVariable: '',
    perks: {
      fiveDayWeek: false,
      insurance: false,
      flexPolicy: false
    }
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    if (name.startsWith('perks.')) {
      const perkName = name.split('.')[1];
      setFormData({
        ...formData,
        perks: {
          ...formData.perks,
          [perkName]: checked
        }
      });
    } else if (name === 'jobType') {
      const jobType = e.target.value as JobType;
      setFormData({
        ...formData,
        jobType: checked 
          ? [...formData.jobType, jobType] 
          : formData.jobType.filter(type => type !== jobType)
      });
    } else {
      setFormData({ ...formData, [name]: checked });
    }
  };
  
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleAddEducation = () => {
    setEducation([...education, { degree: '', university: '', field: '', year: '' }]);
  };
  
  const handleEducationChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [name]: value };
    setEducation(newEducation);
  };
  
  const handleAddExperience = () => {
    setExperience([...experience, { type: 'Job', company: '', role: '', description: '', startDate: '', endDate: '' }]);
  };
  
  const handleExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newExperience = [...experience];
    newExperience[index] = { ...newExperience[index], [name]: value };
    setExperience(newExperience);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    console.log({ ...formData, education, experience, type: activeTab });
    
    // Show success message and redirect
    alert('Registration successful!');
    navigate('/');
  };
  
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-[#070744] mb-8 text-center">Register Your Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="flex border-b">
          <button 
            className={`flex-1 py-3 px-4 text-center font-medium ${activeTab === 'JOB' ? 'bg-[#070744] text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('JOB')}
          >
            JOB
          </button>
          <button 
            className={`flex-1 py-3 px-4 text-center font-medium ${activeTab === 'INTERNSHIP' ? 'bg-[#070744] text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('INTERNSHIP')}
          >
            INTERNSHIP
          </button>
          <button 
            className={`flex-1 py-3 px-4 text-center font-medium ${activeTab === 'FREELANCER' ? 'bg-[#070744] text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('FREELANCER')}
          >
            FREELANCER
          </button>
          <button 
            className={`flex-1 py-3 px-4 text-center font-medium ${activeTab === 'TRAINER' ? 'bg-[#070744] text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('TRAINER')}
          >
            TRAINER
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                placeholder="Senior Executive manager"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                required
              />
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
              <input
                type="text"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="Years of experience"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                required
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="technicalSkills" className="block text-sm font-medium text-gray-700 mb-1">Technical Skills</label>
            <input
              type="text"
              id="technicalSkills"
              name="technicalSkills"
              value={formData.technicalSkills}
              onChange={handleInputChange}
              placeholder="Java, Python, React, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="softSkills" className="block text-sm font-medium text-gray-700 mb-1">Soft Skills</label>
            <input
              type="text"
              id="softSkills"
              name="softSkills"
              value={formData.softSkills}
              onChange={handleInputChange}
              placeholder="Communication, Problem-solving, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="languages" className="block text-sm font-medium text-gray-700 mb-1">Languages</label>
            <input
              type="text"
              id="languages"
              name="languages"
              value={formData.languages}
              onChange={handleInputChange}
              placeholder="English, Hindi, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
              required
            />
          </div>
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">Education</label>
              <button 
                type="button"
                onClick={handleAddEducation}
                className="text-[#4FD1C5] hover:text-[#3db9af] flex items-center text-sm font-medium"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add More
              </button>
            </div>
            
            {education.map((edu, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                    <select
                      name="degree"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, e)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                      required
                    >
                      <option value="">Select Degree</option>
                      <option value="Bachelor">Bachelor's</option>
                      <option value="Master">Master's</option>
                      <option value="PhD">PhD</option>
                      <option value="Diploma">Diploma</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                    <input
                      type="text"
                      name="university"
                      value={edu.university}
                      onChange={(e) => handleEducationChange(index, e)}
                      placeholder="University Name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                    <input
                      type="text"
                      name="field"
                      value={edu.field}
                      onChange={(e) => handleEducationChange(index, e)}
                      placeholder="e.g., Computer Science"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                    <input
                      type="text"
                      name="year"
                      value={edu.year}
                      onChange={(e) => handleEducationChange(index, e)}
                      placeholder="e.g., 2023"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">Past Experience</label>
              <button 
                type="button"
                onClick={handleAddExperience}
                className="text-[#4FD1C5] hover:text-[#3db9af] flex items-center text-sm font-medium"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add More
              </button>
            </div>
            
            {experience.map((exp, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    name="type"
                    value={exp.type}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                    required
                  >
                    <option value="Internship">Internship</option>
                    <option value="Job">Job</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(index, e)}
                      placeholder="Company Name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <input
                      type="text"
                      name="role"
                      value={exp.role}
                      onChange={(e) => handleExperienceChange(index, e)}
                      placeholder="Job Title/Role"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role Description</label>
                  <textarea
                    name="description"
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(index, e)}
                    placeholder="Describe your responsibilities and achievements"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5] min-h-[100px]"
                    required
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(index, e)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={exp.endDate}
                      onChange={(e) => handleExperienceChange(index, e)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                    />
                    <div className="mt-1 flex items-center">
                      <input
                        type="checkbox"
                        id={`current-${index}`}
                        className="h-4 w-4 text-[#4FD1C5] focus:ring-[#4FD1C5] border-gray-300 rounded"
                      />
                      <label htmlFor={`current-${index}`} className="ml-2 text-sm text-gray-600">
                        I currently work here
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mb-6">
            <label htmlFor="joinDays" className="block text-sm font-medium text-gray-700 mb-1">How soon can you join</label>
            <input
              type="number"
              id="joinDays"
              name="joinDays"
              value={formData.joinDays}
              onChange={handleInputChange}
              placeholder="Days"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="inOffice"
                  name="jobType"
                  value="In-Office"
                  checked={formData.jobType.includes('In-Office')}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-[#4FD1C5] focus:ring-[#4FD1C5] border-gray-300 rounded"
                />
                <label htmlFor="inOffice" className="ml-2 text-sm text-gray-700">
                  In Office
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hybrid"
                  name="jobType"
                  value="Hybrid"
                  checked={formData.jobType.includes('Hybrid')}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-[#4FD1C5] focus:ring-[#4FD1C5] border-gray-300 rounded"
                />
                <label htmlFor="hybrid" className="ml-2 text-sm text-gray-700">
                  Hybrid
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remote"
                  name="jobType"
                  value="Remote"
                  checked={formData.jobType.includes('Remote')}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-[#4FD1C5] focus:ring-[#4FD1C5] border-gray-300 rounded"
                />
                <label htmlFor="remote" className="ml-2 text-sm text-gray-700">
                  Remote
                </label>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Part-time/Full-time</label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="partTime"
                  name="workTime"
                  value="Part-time"
                  checked={formData.workTime === 'Part-time'}
                  onChange={handleRadioChange}
                  className="h-4 w-4 text-[#4FD1C5] focus:ring-[#4FD1C5] border-gray-300"
                />
                <label htmlFor="partTime" className="ml-2 text-sm text-gray-700">
                  Part-time
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="fullTime"
                  name="workTime"
                  value="Full-time"
                  checked={formData.workTime === 'Full-time'}
                  onChange={handleRadioChange}
                  className="h-4 w-4 text-[#4FD1C5] focus:ring-[#4FD1C5] border-gray-300"
                />
                <label htmlFor="fullTime" className="ml-2 text-sm text-gray-700">
                  Full-time
                </label>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Salary & Perks Expectations</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">CTC Breakdown</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="ctcTotal" className="block text-sm text-gray-600 mb-1">Total CTC</label>
                  <input
                    type="text"
                    id="ctcTotal"
                    name="ctcTotal"
                    value={formData.ctcTotal}
                    onChange={handleInputChange}
                    placeholder="e.g., 800,000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                  />
                </div>
                <div>
                  <label htmlFor="ctcFixed" className="block text-sm text-gray-600 mb-1">Fixed Component</label>
                  <input
                    type="text"
                    id="ctcFixed"
                    name="ctcFixed"
                    value={formData.ctcFixed}
                    onChange={handleInputChange}
                    placeholder="e.g., 650,000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                  />
                </div>
                <div>
                  <label htmlFor="ctcVariable" className="block text-sm text-gray-600 mb-1">Variable Component</label>
                  <input
                    type="text"
                    id="ctcVariable"
                    name="ctcVariable"
                    value={formData.ctcVariable}
                    onChange={handleInputChange}
                    placeholder="e.g., 150,000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Perks</label>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="fiveDayWeek"
                    name="perks.fiveDayWeek"
                    checked={formData.perks.fiveDayWeek}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-[#4FD1C5] focus:ring-[#4FD1C5] border-gray-300 rounded"
                  />
                  <label htmlFor="fiveDayWeek" className="ml-2 text-sm text-gray-700">
                    5 Days/Week
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="insurance"
                    name="perks.insurance"
                    checked={formData.perks.insurance}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-[#4FD1C5] focus:ring-[#4FD1C5] border-gray-300 rounded"
                  />
                  <label htmlFor="insurance" className="ml-2 text-sm text-gray-700">
                    Insurance Policy
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="flexPolicy"
                    name="perks.flexPolicy"
                    checked={formData.perks.flexPolicy}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-[#4FD1C5] focus:ring-[#4FD1C5] border-gray-300 rounded"
                  />
                  <label htmlFor="flexPolicy" className="ml-2 text-sm text-gray-700">
                    Flexed Policy
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button 
              type="submit"
              className="bg-[#FFD700] text-[#070744] py-3 px-10 rounded-md font-medium hover:bg-opacity-90 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistration;