import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ref as dbRef, set } from 'firebase/database';
import { database, auth } from '../config/firebase';
import { Hiree } from '../types';
import { X } from 'lucide-react';

const HireeProfileDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userState = location.state as { uid: string; email: string; firstName: string; lastName: string; mobile: string } | null;

  // Get current user from Firebase Auth
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<{ uid: string; email: string; firstName: string; lastName: string; mobile: string } | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        // If we have userState from navigation, use it; otherwise try to get from user profile
        if (userState) {
          setUserInfo(userState);
        } else {
          // Try to extract name from displayName
          const displayName = user.displayName || '';
          const nameParts = displayName.split(' ');
          setUserInfo({
            uid: user.uid,
            email: user.email || '',
            firstName: nameParts[0] || '',
            lastName: nameParts.slice(1).join(' ') || '',
            mobile: '' // We don't have mobile from auth, so leave empty
          });
        }
      } else {
        // No user logged in, redirect to login
        navigate('/login');
      }
    });

    return unsubscribe;
  }, [userState, navigate]);

  const [formData, setFormData] = useState({
    jobTitle: '',
    jobType: '',
    experience: { years: 0, months: 0 },
    technicalSkills: [] as string[],
    softSkills: [] as string[],
    languages: [] as string[],
    education: { degree: '', field: '', year: new Date().getFullYear() },
    pastExperience: [{ company: '', role: '', description: '' }],
    joiningTime: 30,
    workType: 'Hybrid' as 'Remote' | 'In-office' | 'Hybrid',
    employmentType: 'Full-time' as 'Full-time' | 'Part-time',
    salaryExpectation: { fixed: 0, variable: 0 },
    perks: [] as string[],
    imageUrl: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handlers for dynamic fields (skills, languages, perks, etc.)
  const [skillInput, setSkillInput] = useState('');
  const [languageInput, setLanguageInput] = useState('');
  const [perkInput, setPerkInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseInt(value) || 0;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: numValue
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: numValue }));
    }
  };

  // Add/Remove for dynamic fields
  const addSkill = () => {
    if (skillInput.trim() && !formData.technicalSkills.includes(skillInput.trim())) {
      setFormData(prev => ({ ...prev, technicalSkills: [...prev.technicalSkills, skillInput.trim()] }));
      setSkillInput('');
    }
  };
  const removeSkill = (skill: string) => {
    setFormData(prev => ({ ...prev, technicalSkills: prev.technicalSkills.filter(s => s !== skill) }));
  };
  const addLanguage = () => {
    if (languageInput.trim() && !formData.languages.includes(languageInput.trim())) {
      setFormData(prev => ({ ...prev, languages: [...prev.languages, languageInput.trim()] }));
      setLanguageInput('');
    }
  };
  const removeLanguage = (language: string) => {
    setFormData(prev => ({ ...prev, languages: prev.languages.filter(l => l !== language) }));
  };
  const addPerk = () => {
    if (perkInput.trim() && !formData.perks.includes(perkInput.trim())) {
      setFormData(prev => ({ ...prev, perks: [...prev.perks, perkInput.trim()] }));
      setPerkInput('');
    }
  };
  const removePerk = (perk: string) => {
    setFormData(prev => ({ ...prev, perks: prev.perks.filter(p => p !== perk) }));
  };
  const addPastExperience = () => {
    setFormData(prev => ({ ...prev, pastExperience: [...prev.pastExperience, { company: '', role: '', description: '' }] }));
  };
  const updatePastExperience = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      pastExperience: prev.pastExperience.map((exp, i) => i === index ? { ...exp, [field]: value } : exp)
    }));
  };
  const removePastExperience = (index: number) => {
    setFormData(prev => ({ ...prev, pastExperience: prev.pastExperience.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      setError('Request timed out. Please try again.');
    }, 30000); // 30 seconds timeout
    
    try {
      // Check if we have user info
      if (!userInfo || !userInfo.uid) {
        setError('User information not available. Please try logging in again.');
        return;
      }

      // Debug: Log the form data at the time of submission
      console.log('=== FORM SUBMISSION STARTED ===');
      console.log('Form data at submission time:', formData);
      console.log('User info:', userInfo);
      
      console.log('=== PREPARING DATA FOR FIREBASE ===');
      
      const dataToSave = {
        jobTitle: formData.jobTitle,
        jobType: formData.jobType,
        experience: formData.experience,
        technicalSkills: formData.technicalSkills,
        softSkills: formData.softSkills,
        languages: formData.languages,
        education: formData.education,
        pastExperience: formData.pastExperience,
        joiningTime: formData.joiningTime,
        workType: formData.workType,
        employmentType: formData.employmentType,
        salaryExpectation: formData.salaryExpectation,
        perks: formData.perks,
        imageUrl: '', // Empty string since we removed image upload
        id: userInfo.uid,
        createdAt: Date.now(),
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        mobile: userInfo.mobile
      };
      
      console.log('=== SAVING TO FIREBASE ===');
      console.log('Complete data being saved to Firebase:', dataToSave);
      console.log('Saving to path: hirees/' + userInfo.uid);
      
      // Try to save to Firebase
      await set(dbRef(database, `hirees/${userInfo.uid}`), dataToSave);
      
      console.log('=== SUCCESS ===');
      console.log('Data saved successfully!');
      
      // Clear timeout since we succeeded
      clearTimeout(timeoutId);
      
      navigate('/waiting-for-offers');
    } catch (err) {
      console.error('=== ERROR ===');
      console.error('Error during submission:', err);
      console.error('Error details:', {
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : 'No stack trace'
      });
      setError('Failed to complete registration. Please try again.');
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  // Show loading while user info is being fetched
  if (!userInfo) {
    return (
      <div className="min-h-[calc(100vh-200px)] py-8 px-4 sm:px-6 lg:px-8 gradient-bg">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4FD1C5] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading user information...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-200px)] py-8 px-4 sm:px-6 lg:px-8 gradient-bg">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hiree Registration</h1>
          <p className="text-gray-600">Step 2: Complete your profile</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Title & Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                <input type="text" name="jobTitle" required value={formData.jobTitle} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Job Title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Type *</label>
                <input type="text" name="jobType" required value={formData.jobType} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g. Trainer, Intern" />
              </div>
            </div>
            {/* Experience */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
                <input type="number" name="experience.years" min="0" value={formData.experience.years} onChange={handleNumberInput} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Years" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience (Months)</label>
                <input type="number" name="experience.months" min="0" max="11" value={formData.experience.months} onChange={handleNumberInput} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Months" />
              </div>
            </div>
            {/* Technical Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Technical Skills</label>
              <div className="flex gap-2 mb-2">
                <input type="text" value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addSkill())} placeholder="Add a skill" className="flex-1 px-3 py-2 border border-gray-300 rounded-md" />
                <button type="button" onClick={addSkill} className="px-4 py-2 bg-[#4FD1C5] text-white rounded-md">Add</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technicalSkills.map((skill, index) => (
                  <span key={index} className="flex items-center gap-1 bg-[#4FD1C5] bg-opacity-20 text-[#4FD1C5] px-3 py-1 rounded-full text-sm">{skill}<button type="button" onClick={() => removeSkill(skill)} className="text-[#4FD1C5] hover:text-red-500"><X className="h-3 w-3" /></button></span>
                ))}
              </div>
            </div>
            {/* Soft Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Soft Skills</label>
              <input type="text" name="softSkills" value={formData.softSkills.join(', ')} onChange={e => setFormData(prev => ({ ...prev, softSkills: e.target.value.split(',').map(s => s.trim()) }))} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g. Communication, Teamwork" />
            </div>
            {/* Languages */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Languages</label>
              <div className="flex gap-2 mb-2">
                <input type="text" value={languageInput} onChange={e => setLanguageInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addLanguage())} placeholder="Add a language" className="flex-1 px-3 py-2 border border-gray-300 rounded-md" />
                <button type="button" onClick={addLanguage} className="px-4 py-2 bg-[#4FD1C5] text-white rounded-md">Add</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.languages.map((language, index) => (
                  <span key={index} className="flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">{language}<button type="button" onClick={() => removeLanguage(language)} className="text-gray-600 hover:text-red-500"><X className="h-3 w-3" /></button></span>
                ))}
              </div>
            </div>
            {/* Education */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                <input type="text" name="education.degree" value={formData.education.degree} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Degree" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                <input type="text" name="education.field" value={formData.education.field} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Field of Study" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                <input type="number" name="education.year" min="1950" max={new Date().getFullYear() + 5} value={formData.education.year} onChange={handleNumberInput} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Year" />
              </div>
            </div>
            {/* Past Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Past Experience</label>
              {formData.pastExperience.map((exp, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">Experience {index + 1}</h4>
                    {formData.pastExperience.length > 1 && (
                      <button type="button" onClick={() => removePastExperience(index)} className="text-red-500 hover:text-red-700"><X className="h-4 w-4" /></button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                      <input type="text" value={exp.company} onChange={e => updatePastExperience(index, 'company', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <input type="text" value={exp.role} onChange={e => updatePastExperience(index, 'role', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea value={exp.description} onChange={e => updatePastExperience(index, 'description', e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                </div>
              ))}
              <button type="button" onClick={addPastExperience} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#4FD1C5] hover:text-[#4FD1C5]">+ Add Another Experience</button>
            </div>
            {/* Joining Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">How soon can you join (days)?</label>
              <input type="number" name="joiningTime" min="1" value={formData.joiningTime} onChange={handleNumberInput} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Eg: 30 days" />
            </div>
            {/* Job Type & Full-time/Part-time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                <select name="workType" value={formData.workType} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="In-office">In Office</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full-time/Part-time</label>
                <select name="employmentType" value={formData.employmentType} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                </select>
              </div>
            </div>
            {/* Salary & Perks */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">Salary & Perks Expectations</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fixed Salary (₹)</label>
                  <input type="number" name="salaryExpectation.fixed" min="0" value={formData.salaryExpectation.fixed} onChange={handleNumberInput} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Fixed" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Variable Salary (₹)</label>
                  <input type="number" name="salaryExpectation.variable" min="0" value={formData.salaryExpectation.variable} onChange={handleNumberInput} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Variable" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Perks</label>
                <div className="flex gap-2 mb-2">
                  <input type="text" value={perkInput} onChange={e => setPerkInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addPerk())} placeholder="Add a perk" className="flex-1 px-3 py-2 border border-gray-300 rounded-md" />
                  <button type="button" onClick={addPerk} className="px-4 py-2 bg-[#4FD1C5] text-white rounded-md">Add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.perks.map((perk, index) => (
                    <span key={index} className="flex items-center gap-1 bg-[#FFD700] bg-opacity-20 text-[#070744] px-3 py-1 rounded-full text-sm">{perk}<button type="button" onClick={() => removePerk(perk)} className="text-[#070744] hover:text-red-500"><X className="h-3 w-3" /></button></span>
                  ))}
                </div>
              </div>
            </div>
            {error && <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-md">{error}</div>}
            <div className="pt-4">
              <button type="submit" disabled={isLoading} className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#070744] hover:bg-opacity-90 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>{isLoading ? 'Submitting...' : 'Submit'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HireeProfileDetails; 