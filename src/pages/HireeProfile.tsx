import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ref as dbRef, get, set } from 'firebase/database';
import { database, auth } from '../config/firebase';
import { ArrowLeft, Edit, Save, X } from 'lucide-react';
import { Hiree } from '../types';

const HireeProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [profileData, setProfileData] = useState<any>(null);
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

  // Input states for dynamic fields
  const [skillInput, setSkillInput] = useState('');
  const [languageInput, setLanguageInput] = useState('');
  const [perkInput, setPerkInput] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }
      
      try {
        console.log('Fetching profile data for user:', user.id);
        
        // First try to get data from users path (basic user info)
        const userRef = dbRef(database, `users/${user.id}`);
        const userSnapshot = await get(userRef);
        
        let userData = null;
        if (userSnapshot.exists()) {
          userData = userSnapshot.val();
          console.log('Basic user data found:', userData);
        }
        
        // Then try to get detailed profile data from hirees path
        const hireeRef = dbRef(database, `hirees/${user.id}`);
        const hireeSnapshot = await get(hireeRef);
        
        let hireeData = null;
        if (hireeSnapshot.exists()) {
          hireeData = hireeSnapshot.val();
          console.log('Detailed hiree data found:', hireeData);
        }
        
        // Combine the data sources
        let combinedData = { ...userData };
        
        if (hireeData) {
          combinedData = { ...combinedData, ...hireeData };
        }
        
        console.log('Combined profile data:', combinedData);
        
        // Check if this is a hiree user
        if (combinedData.type === 'hiree' || userData?.type === 'hiree') {
          setProfileData(combinedData);
          setFormData({
            jobTitle: combinedData.jobTitle || '',
            jobType: combinedData.jobType || '',
            experience: combinedData.experience || { years: 0, months: 0 },
            technicalSkills: combinedData.technicalSkills || [],
            softSkills: combinedData.softSkills || [],
            languages: combinedData.languages || [],
            education: combinedData.education || { degree: '', field: '', year: new Date().getFullYear() },
            pastExperience: combinedData.pastExperience || [{ company: '', role: '', description: '' }],
            joiningTime: combinedData.joiningTime || 30,
            workType: combinedData.workType || 'Hybrid',
            employmentType: combinedData.employmentType || 'Full-time',
            salaryExpectation: combinedData.salaryExpectation || { fixed: 0, variable: 0 },
            perks: combinedData.perks || [],
            imageUrl: combinedData.imageUrl || ''
          });
        } else {
          setError('This account is not registered as a hiree.');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [user?.id]);

  const handleSave = async () => {
    if (!user?.id) return;
    
    setIsSaving(true);
    setError('');
    setSuccess('');
    
    try {
      const updatedProfile = {
        ...profileData!,
        ...formData,
        id: user.id,
        updatedAt: Date.now()
      };
      
      // Save to both users and hirees paths to keep them in sync
      const userRef = dbRef(database, `users/${user.id}`);
      const hireeRef = dbRef(database, `hirees/${user.id}`);
      
      await Promise.all([
        set(userRef, updatedProfile),
        set(hireeRef, updatedProfile)
      ]);
      
      setProfileData(updatedProfile);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

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

  const addSkill = (type: 'technical' | 'soft') => {
    if (skillInput.trim()) {
      const newSkills = type === 'technical' 
        ? [...formData.technicalSkills, skillInput.trim()]
        : [...formData.softSkills, skillInput.trim()];
      
      setFormData(prev => ({
        ...prev,
        [type === 'technical' ? 'technicalSkills' : 'softSkills']: newSkills
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (type: 'technical' | 'soft', index: number) => {
    const newSkills = type === 'technical' 
      ? formData.technicalSkills.filter((_, i) => i !== index)
      : formData.softSkills.filter((_, i) => i !== index);
    
    setFormData(prev => ({
      ...prev,
      [type === 'technical' ? 'technicalSkills' : 'softSkills']: newSkills
    }));
  };

  const addLanguage = () => {
    if (languageInput.trim()) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, languageInput.trim()]
      }));
      setLanguageInput('');
    }
  };

  const removeLanguage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  const addPerk = () => {
    if (perkInput.trim()) {
      setFormData(prev => ({
        ...prev,
        perks: [...prev.perks, perkInput.trim()]
      }));
      setPerkInput('');
    }
  };

  const removePerk = (index: number) => {
    setFormData(prev => ({
      ...prev,
      perks: prev.perks.filter((_, i) => i !== index)
    }));
  };

  const addPastExperience = () => {
    setFormData(prev => ({
      ...prev,
      pastExperience: [...prev.pastExperience, { company: '', role: '', description: '' }]
    }));
  };

  const removePastExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      pastExperience: prev.pastExperience.filter((_, i) => i !== index)
    }));
  };

  const updatePastExperience = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      pastExperience: prev.pastExperience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4FD1C5] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md max-w-md">
            <p className="font-medium">Error Loading Profile</p>
            <p className="text-sm mt-1">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md max-w-md">
            <p className="font-medium">No Profile Found</p>
            <p className="text-sm mt-1">Profile data not found. Please complete your profile registration first.</p>
            <button 
              onClick={() => navigate('/dashboard')} 
              className="mt-3 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/hiree-dashboard')}
                className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
               Dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            </div>
            
            <div className="flex space-x-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-4 py-2 bg-[#4FD1C5] text-white rounded-md hover:bg-opacity-90 transition-colors"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        jobTitle: profileData.jobTitle || '',
                        jobType: profileData.jobType || '',
                        experience: profileData.experience || { years: 0, months: 0 },
                        technicalSkills: profileData.technicalSkills || [],
                        softSkills: profileData.softSkills || [],
                        languages: profileData.languages || [],
                        education: profileData.education || { degree: '', field: '', year: new Date().getFullYear() },
                        pastExperience: profileData.pastExperience || [{ company: '', role: '', description: '' }],
                        joiningTime: profileData.joiningTime || 30,
                        workType: profileData.workType || 'Hybrid',
                        employmentType: profileData.employmentType || 'Full-time',
                        salaryExpectation: profileData.salaryExpectation || { fixed: 0, variable: 0 },
                        perks: profileData.perks || [],
                        imageUrl: profileData.imageUrl || ''
                      });
                    }}
                    className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-opacity-90 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center px-4 py-2 bg-[#070744] text-white rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
            {success}
          </div>
        )}
        
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {/* Profile Content */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-semibold text-[#070744] mb-6">Profile Information</h2>
          
          {/* Basic Information */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name || ''}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    placeholder="First Name"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.name || 'Not specified'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.lastName || ''}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    placeholder="Last Name"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.lastName || 'Not specified'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email || ''}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    placeholder="Email"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.email || 'Not specified'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.mobile || ''}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    placeholder="Mobile"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.mobile || 'Not specified'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Job Information */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Job Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Job Title"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.jobTitle || 'Not specified'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Job Type"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.jobType || 'Not specified'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Type</label>
                {isEditing ? (
                  <select
                    name="workType"
                    value={formData.workType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Remote">Remote</option>
                    <option value="In-office">In-office</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                ) : (
                  <p className="text-gray-900">{profileData.workType || 'Not specified'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Joining Time (days)</label>
                {isEditing ? (
                  <input
                    type="number"
                    name="joiningTime"
                    value={formData.joiningTime}
                    onChange={handleNumberInput}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Joining Time"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.joiningTime || 0} days</p>
                )}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Skills</h3>
            
            {/* Technical Skills */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Technical Skills</label>
              {isEditing ? (
                <div>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill('technical'))}
                      placeholder="Add technical skill"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => addSkill('technical')}
                      className="px-4 py-2 bg-[#4FD1C5] text-white rounded-md"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.technicalSkills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill('technical', index)}
                          className="text-blue-600 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profileData.technicalSkills && Object.values(profileData.technicalSkills).map((skill: any, index: number) => (
                    <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {skill}
                    </div>
                  ))}
                  {(!profileData.technicalSkills || Object.keys(profileData.technicalSkills).length === 0) && (
                    <p className="text-gray-500">No technical skills added</p>
                  )}
                </div>
              )}
            </div>

            {/* Soft Skills */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Soft Skills</label>
              {isEditing ? (
                <div>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill('soft'))}
                      placeholder="Add soft skill"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => addSkill('soft')}
                      className="px-4 py-2 bg-[#4FD1C5] text-white rounded-md"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.softSkills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill('soft', index)}
                          className="text-green-600 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profileData.softSkills && Object.values(profileData.softSkills).map((skill: any, index: number) => (
                    <div key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                      {skill}
                    </div>
                  ))}
                  {(!profileData.softSkills || Object.keys(profileData.softSkills).length === 0) && (
                    <p className="text-gray-500">No soft skills added</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Languages */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Languages</h3>
            {isEditing ? (
              <div>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={languageInput}
                    onChange={(e) => setLanguageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
                    placeholder="Add language"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={addLanguage}
                    className="px-4 py-2 bg-[#4FD1C5] text-white rounded-md"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.languages.map((language, index) => (
                    <div key={index} className="flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                      {language}
                      <button
                        type="button"
                        onClick={() => removeLanguage(index)}
                        className="text-purple-600 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {profileData.languages && Object.values(profileData.languages).map((language: any, index: number) => (
                  <div key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                    {language}
                  </div>
                ))}
                {(!profileData.languages || Object.keys(profileData.languages).length === 0) && (
                  <p className="text-gray-500">No languages added</p>
                )}
              </div>
            )}
          </div>

          {/* Salary Expectations */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Salary Expectations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fixed Salary (LPA)</label>
                {isEditing ? (
                  <input
                    type="number"
                    name="salaryExpectation.fixed"
                    value={formData.salaryExpectation.fixed}
                    onChange={handleNumberInput}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Fixed Salary"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.salaryExpectation?.fixed || 0} LPA</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Variable Salary (LPA)</label>
                {isEditing ? (
                  <input
                    type="number"
                    name="salaryExpectation.variable"
                    value={formData.salaryExpectation.variable}
                    onChange={handleNumberInput}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Variable Salary"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.salaryExpectation?.variable || 0} LPA</p>
                )}
              </div>
            </div>
          </div>

          {/* Perks */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Perks</h3>
            {isEditing ? (
              <div>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={perkInput}
                    onChange={(e) => setPerkInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPerk())}
                    placeholder="Add perk"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={addPerk}
                    className="px-4 py-2 bg-[#4FD1C5] text-white rounded-md"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.perks.map((perk, index) => (
                    <div key={index} className="flex items-center gap-1 bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                      {perk}
                      <button
                        type="button"
                        onClick={() => removePerk(index)}
                        className="text-orange-600 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {profileData.perks && Object.values(profileData.perks).map((perk: any, index: number) => (
                  <div key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                    {perk}
                  </div>
                ))}
                {(!profileData.perks || Object.keys(profileData.perks).length === 0) && (
                  <p className="text-gray-500">No perks added</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireeProfile; 