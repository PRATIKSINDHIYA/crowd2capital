import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#070744] text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4">ABOUT</h3>
            <p className="text-sm leading-relaxed">
              Crowd2Capital is a modern hiring platform designed to connect talent with opportunity. 
              Whether you're a company looking to hire skilled professionals or an individual seeking 
              freelance work, internships, full-time jobs, or training gigs — we bring everyone 
              together under one platform.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-[#4FD1C5] transition duration-300">Home</Link></li>
              <li><Link to="/about" className="text-sm hover:text-[#4FD1C5] transition duration-300">About</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-[#4FD1C5] transition duration-300">Contact</Link></li>
              <li><Link to="/faq" className="text-sm hover:text-[#4FD1C5] transition duration-300">FAQs</Link></li>
              <li><Link to="/privacy" className="text-sm hover:text-[#4FD1C5] transition duration-300">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5" />
                <span className="text-sm">support@crowd2capital.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 mt-0.5" />
                <span className="text-sm">+91-8929825255</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5" />
                <span className="text-sm">3rd Floor, Startup Hub, Delhi, India</span>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="bg-white text-[#070744] p-2 rounded-full hover:bg-[#4FD1C5] transition duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white text-[#070744] p-2 rounded-full hover:bg-[#4FD1C5] transition duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white text-[#070744] p-2 rounded-full hover:bg-[#4FD1C5] transition duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white text-[#070744] p-2 rounded-full hover:bg-[#4FD1C5] transition duration-300">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
            
            <button className="bg-[#FFD700] text-[#070744] py-2 px-6 rounded-md font-medium hover:bg-opacity-90 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-700 text-center text-sm">
          <p>© 2024 Crowd2Capital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;