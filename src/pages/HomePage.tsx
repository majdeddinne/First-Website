import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedTracks from '../components/home/FeaturedTracks';
import Features from '../components/home/Features';
import Testimonials from '../components/home/Testimonials';
import CosmicBackground from '../components/ui/CosmicBackground';

const HomePage: React.FC = () => {
  return (
    <div>
      <CosmicBackground />
      <Hero />
      {/* Hero Section Title */}
      <h1 className="text-5xl font-bold text-gradient-gray-white text-center">
      </h1>
      <FeaturedTracks />
      {/* Section Titles */}
      <h2 className="text-3xl font-bold text-gradient-gray-white mb-4">
      </h2>
      <Features />
      {/* Section Titles */}
      <h2 className="text-3xl font-bold text-gradient-gray-white mb-4">
      </h2>
      <Testimonials />
    </div>
  );
};

export default HomePage;