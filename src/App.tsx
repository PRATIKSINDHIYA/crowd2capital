import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StudentRegistration from './pages/StudentRegistration';
import CompanyDashboard from './pages/CompanyDashboard';
import CandidateProfile from './pages/CandidateProfile';
import Login from './pages/Login';
import Registration from './pages/Registration';
import HirerRegistration from './pages/HirerRegistration';
import HireeRegistration from './pages/HireeRegistration';
import HirerDashboard from './pages/HirerDashboard';
import HireeDashboard from './pages/HireeDashboard';
import HireeProfile from './pages/HireeProfile';
import WaitingForOffers from './pages/WaitingForOffers';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { AuthProvider } from './context/AuthContext';
import HireeAccountCreate from './pages/HireeAccountCreate';
import HireeProfileDetails from './pages/HireeProfileDetails';
import RegistrationSuccess from './pages/RegistrationSuccess';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/hirer-registration" element={<HirerRegistration />} />
              <Route path="/hiree-account-create" element={<HireeAccountCreate />} />
              <Route path="/hiree-profile-details" element={<HireeProfileDetails />} />
              <Route path="/registration-success" element={<RegistrationSuccess />} />
              <Route path="/hiree-registration" element={<HireeRegistration />} />
              <Route path="/hirer-dashboard" element={<HirerDashboard />} />
              <Route path="/hiree-dashboard" element={<HireeDashboard />} />
              <Route path="/hiree-profile" element={<HireeProfile />} />
              <Route path="/waiting-for-offers" element={<WaitingForOffers />} />
              <Route path="/dashboard" element={<CompanyDashboard />} />
              <Route path="/profile/:id" element={<CandidateProfile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/student-register" element={<StudentRegistration />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;