import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Track } from '../../types';

interface TracksPortfolioProps {
  tracks: Track[];
}

const TracksPortfolio: React.FC<TracksPortfolioProps> = ({ tracks }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {tracks.map(track => (
        <div
          key={track.id}
          className="relative group bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => navigate(`/tracks/${track.id}`)}
        >
          {/* Track Image */}
          <img
            src={track.imageUrl}
            alt={track.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Track Info */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <h3 className="text-lg font-bold text-white">{track.name}</h3>
            <p className="text-sm text-gray-300">{track.artist}</p>
          </div>

          {/* Hover Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      ))}
    </div>
  );
};

export default TracksPortfolio;