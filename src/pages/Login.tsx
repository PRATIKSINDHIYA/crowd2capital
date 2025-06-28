import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Chrome, Linkedin } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'hirer' | 'hiree'>('hiree');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, loginWithGoogle, loginWithLinkedIn } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate(userType === 'hirer' ? '/hirer-dashboard' : '/hiree-dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      await loginWithGoogle();
      navigate(userType === 'hirer' ? '/hirer-dashboard' : '/hiree-dashboard');
    } catch (err) {
      setError('Google login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkedInLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      await loginWithLinkedIn();
      navigate(userType === 'hirer' ? '/hirer-dashboard' : '/hiree-dashboard');
    } catch (err) {
      setError('LinkedIn login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 gradient-bg">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <div className="flex justify-center">
            <LogIn className="h-12 w-12 text-[#4FD1C5]" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="/register" className="font-medium text-[#4FD1C5] hover:text-[#3db9af]">
              register as a new talent
            </a>
          </p>
        </div>
        
        {/* <div className="flex justify-center mb-6">
          <div className="flex rounded-md overflow-hidden border border-gray-300">
            <button
              type="button"
              className={`px-4 py-2 font-medium text-sm ${
                userType === 'hiree'
                  ? 'bg-[#4FD1C5] text-white'
                  : 'bg-white text-gray-700'
              }`}
              onClick={() => setUserType('hiree')}
            >
              Hiree
            </button>
            <button
              type="button"
              className={`px-4 py-2 font-medium text-sm ${
                userType === 'hirer'
                  ? 'bg-[#4FD1C5] text-white'
                  : 'bg-white text-gray-700'
              }`}
              onClick={() => setUserType('hirer')}
            >
              Hirer
            </button>
          </div>
        </div> */}

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4FD1C5]"
          >
            <Chrome className="h-5 w-5 mr-2 text-red-500" />
            Continue with Google
          </button>
          
          <button
            onClick={handleLinkedInLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4FD1C5]"
          >
            <Linkedin className="h-5 w-5 mr-2 text-blue-600" />
            Continue with LinkedIn
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#4FD1C5] focus:border-[#4FD1C5] focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#4FD1C5] focus:border-[#4FD1C5] focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#4FD1C5] focus:ring-[#4FD1C5] border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-[#4FD1C5] hover:text-[#3db9af]">
                Forgot your password?
              </a>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#070744] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4FD1C5] ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <Mail className="h-4 w-4 mr-2" />
              {isLoading ? 'Signing in...' : 'Sign in with Email'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;