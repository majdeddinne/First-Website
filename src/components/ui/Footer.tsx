import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Logo from './Logo';


const Footer: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleEmailClick = () => {
    navigate('/contact'); // Redirect to the Contact Us page
  };

  return (
    <footer className="bg-gradient-to-br from-black/80 to-gray-800/80 backdrop-blur-md border-t border-gray-700 mt-16 rounded-lg">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h1 className="font-orbitron text-3xl text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-white">
              NOIR CODE
            </h1>
            <p className="mt-4 text-gray-300 max-w-md">
              Hyper Techno Weaponry – Untraceable. Uncompromising. 
              Premium ghost production for the most demanding techno artists.
            </p>
          </div>
          
          <div>
            <h3 className="font-orbitron text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-white mb-4">
              Links
            </h3>
            <ul className="space-y-2">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/tracks" label="Tracks" />
              <FooterLink to="/about" label="About" />
              <FooterLink to="/login" label="Login" />
            </ul>
          </div>
          
          <div>
            <h3 className="font-orbitron text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-white mb-4">
              Contact
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button
                  onClick={handleEmailClick}
                  className="text-gray-400 hover:text-neon-cyan transition-colors underline"
                >
                  noirghost.noircode@gmail.com
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm">
          <p className="font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-white">
            © {new Date().getFullYear()} NOIR CODE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  to: string;
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, label }) => {
  return (
    <li>
      <Link to={to} className="text-gray-400 hover:text-neon-cyan transition-colors">
        {label}
      </Link>
    </li>
  );
};

export default Footer;