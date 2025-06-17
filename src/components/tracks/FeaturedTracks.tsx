import React from 'react';
import { tracks } from '../../data/tracks';

const FeaturedTracks: React.FC = () => {
  const featuredTracks = tracks.slice(0, 4); // Display the first 4 tracks as featured

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Tracks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {featuredTracks.map(track => (
          <div
            key={track.id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <img
              src={track.imageUrl}
              alt={track.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            {/* Track Title with Gradient */}
            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">
              {track.name}
            </h3>
            <p className="text-gray-400">{track.genre.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedTracks;