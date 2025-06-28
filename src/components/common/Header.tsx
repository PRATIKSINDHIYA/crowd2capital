import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, LogIn, Building2, User } from 'lucide-react';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <BookOpen className="h-8 w-8 text-primary-color" color="#070744" />
          <span className="ml-2 text-2xl font-bold text-[#070744]">Crowd2Capital</span>
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <Link 
            to="/" 
            className={`nav-link font-medium ${location.pathname === '/' ? 'active-nav-link' : ''}`}
          >
            Home
          </Link>
          
          {!isAuthenticated && (
            <Link 
              to="/register" 
              className={`nav-link font-medium ${location.pathname === '/register' ? 'active-nav-link' : ''}`}
            >
              Register
            </Link>
          )}
          
          {isAuthenticated && user?.type === 'hirer' && (
            <Link 
              to="/hirer-dashboard" 
              className={`nav-link font-medium ${location.pathname === '/hirer-dashboard' ? 'active-nav-link' : ''}`}
            >
              <Building2 className="h-4 w-4 mr-1 inline" />
              Hirer Dashboard
            </Link>
          )}
          
          {isAuthenticated && user?.type === 'hiree' && (
            <Link 
              to="/hiree-dashboard" 
              className={`nav-link font-medium ${location.pathname === '/hiree-dashboard' ? 'active-nav-link' : ''}`}
            >
              <User className="h-4 w-4 mr-1 inline" />
              Hiree Dashboard
            </Link>
          )}
          
          <Link 
            to="/about" 
            className={`nav-link font-medium ${location.pathname === '/about' ? 'active-nav-link' : ''}`}
          >
            About
          </Link>
          
          <Link 
            to="/contact" 
            className={`nav-link font-medium ${location.pathname === '/contact' ? 'active-nav-link' : ''}`}
          >
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center">
          {isAuthenticated ? (
            <div className="flex items-center">
              <span className="mr-4 font-medium hidden md:inline">
                Hi, {user?.name}
                {user?.type && (
                  <span className="ml-2 text-xs bg-[#4FD1C5] text-[#070744] px-2 py-1 rounded-full">
                    {user.type === 'hirer' ? 'Hirer' : 'Hiree'}
                  </span>
                )}
              </span>
              <button 
                onClick={logout}
                className="btn-secondary px-4 py-2 rounded-md font-medium text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center btn-primary px-4 py-2 rounded-md font-medium text-sm">
              <LogIn className="h-4 w-4 mr-2" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;