import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GlitchText from '../ui/GlitchText';
import Button from '../ui/Button';
import NoirGhostImage from '../../assets/noir ghost text.png'; // Import the image
import Spline from '@splinetool/react-spline'; // Import the Spline component
import CosmicBackground from '../ui/CosmicBackground'; // Import the CosmicBackground component

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center">
      {/* Cosmic Background */}
      <CosmicBackground /> {/* Add the CosmicBackground component here */}

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden z-0"> {/* Keep z-index lower */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-electric-purple/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-neon-cyan/5 blur-[100px] rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-1/4 h-1/4 bg-toxic-green/5 blur-[100px] rounded-full" />
      </div>

      {/* Spline Component */}
      <div
        className="absolute inset-0 z-10" // Ensure Spline is above the CosmicBackground
        style={{
          marginRight: '-2rem',
          marginTop: '-3rem',
          backgroundColor: 'transparent',
          filter: 'brightness(0.8)', // Reduce brightness to make it less bright
        }}
      >
        <Spline
          scene="https://prod.spline.design/MDzAmxr6dG7P5XDd/scene.splinecode"
          width="100%"
          height="100%"
        />
      </div>

      {/* Hero Content */}
      <motion.div 
        className="container mx-auto px-4 pt-32 pb-16 relative z-20" // Ensure content is above everything
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-center">
            <img
              src={NoirGhostImage}
              alt="noir ghost"
              className="mx-auto w-auto h-auto"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </h1>
          
          <motion.div
            className="max-w-md mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="text-white text-sm"> {/* Changed text color to brighter white */}
              Your <strong>Sound</strong>, your <strong>Vision</strong>
            </p>
            <p className="text-white text-lg mt-2"> {/* Changed text color to brighter white */}
              the <strong>Noir Code</strong>
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Link to="/tracks">
              <Button variant="outline" size="lg" className="text-white border-white">
                Browse Tracks
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="text-white border-white">
                About Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;