import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/logo.png'; // Ensure the image is saved in this path
import NoirCodeTextImage from '../../assets/noircodetext.png'; // Import the "noir code" text image

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', withText = true }) => {
  const sizeMap = {
    sm: 'w-8 h-8', // Increased from w-6 h-6
    md: 'w-12 h-12', // Increased from w-8 h-8
    lg: 'w-16 h-16', // Increased from w-12 h-12
  };

  return (
    <Link 
      to="/" 
      className="flex items-center gap-4 hover:opacity-90 transition-opacity no-underline"
    >
      <img 
        src={logoImage} 
        alt="Logo" 
        className={`object-contain ${sizeMap[size]}`} 
      />
      <img
        src={NoirCodeTextImage} // Use the imported image
        alt="noir code"
        className="h-10 -mt-2" // Increase height and move it higher
        style={{ marginLeft: '-0.5rem', maxHeight: '2.5rem' }} // Move closer to the logo and ensure proportional scaling
      />
    </Link>
  );
};

export default Logo;