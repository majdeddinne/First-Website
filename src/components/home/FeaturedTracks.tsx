import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { tracks } from '../../data/tracks';
import TrackGrid from '../tracks/TrackGrid';
import Button from '../ui/Button';

const FeaturedTracks: React.FC = () => {
  // Get first 3 tracks as featured
  const featuredTracks = tracks.slice(0, 3);
  
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-4">
            Featured <span className="text-toxic-green">Tracks</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Exclusive productions crafted with precision for the underground techno scene.
            Each track is sold only once, ensuring your sound remains unique.
          </p>
        </motion.div>
        
        <TrackGrid tracks={featuredTracks} />
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link to="/tracks">
            <Button
              variant="outline"
              size="lg" // Changed size to 'lg' for a larger button
              className="text-white border-white hover:bg-dark-border hover:text-neon-cyan transition-colors px-8 py-4" // Added padding for a larger appearance
            >
              View All Tracks
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedTracks;