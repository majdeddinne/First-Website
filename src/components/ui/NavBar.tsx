import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Logo from './Logo';
import Button from './Button';


const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Noir Code Text */}
          <div className="flex items-center space-x-2">
            <Logo />

          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" label="Home" />
            <NavLink to="/tracks" label="Tracks" />
            <NavLink to="/services" label="Services" />
            <NavLink to="/contact" label="Contact Us" />
            <NavLink to="/about" label="About" />
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/profile">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-white border-white whitespace-nowrap flex items-center"
                    style={{
                      padding: '6px 12px',
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                    }}
                  >
                    <User size={16} className="mr-2" />
                    Profile
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-white border-white"
                  style={{
                    padding: '6px 12px',
                    fontWeight: 'bold',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                  }}
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-white border-white"
                    style={{
                      padding: '6px 12px',
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                    }}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-white border-white"
                    style={{
                      padding: '6px 12px',
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                    }}
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </motion.header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  mobile?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, mobile = false }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`relative font-orbitron ${
        mobile ? 'block py-2' : ''
      } text-${isActive ? 'neon-cyan' : 'white'} hover:text-neon-cyan transition-colors`}
    >
      {label}
      {isActive && (
        <motion.div
          className="absolute -bottom-1 left-0 w-full h-0.5 bg-neon-cyan"
          layoutId="navbar-indicator"
          transition={{ type: 'spring', duration: 0.5 }}
        />
      )}
    </Link>
  );
};

export default NavBar;