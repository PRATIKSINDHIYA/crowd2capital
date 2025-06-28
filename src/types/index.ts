export interface User {
  id: string;
  name: string;
  email: string;
  type: 'hirer' | 'hiree';
  createdAt: number;
}

export interface Hirer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  recruiterType: string;
  companyName: string;
  city: string;
  companyAddress?: string;
  professionalType: 'IT' | 'Non-IT';
  experienceRequired: string;
  createdAt: number;
}

export interface Hiree {
  id: string;
  jobTitle: string;
  jobType: string;
  experience: {
    years: number;
    months: number;
  };
  technicalSkills: string[];
  softSkills: string[];
  languages: string[];
  education: {
    degree: string;
    field: string;
    year: number;
  };
  pastExperience: {
    company: string;
    role: string;
    description: string;
  }[];
  joiningTime: number; // days
  workType: 'Remote' | 'In-office' | 'Hybrid';
  employmentType: 'Full-time' | 'Part-time';
  salaryExpectation: {
    fixed: number;
    variable: number;
  };
  perks: string[];
  imageUrl?: string;
  createdAt: number;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithLinkedIn: () => Promise<void>;
  logout: () => void;
  registerHirer: (hirerData: Omit<Hirer, 'id' | 'createdAt'>) => Promise<void>;
  registerHiree: (hireeData: Omit<Hiree, 'id' | 'createdAt'>) => Promise<void>;
} 