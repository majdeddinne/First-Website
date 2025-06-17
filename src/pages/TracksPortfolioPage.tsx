import React, { useState, useRef, useEffect } from 'react';
import { tracks } from '../data/tracks';
import TracksPortfolio from '../components/tracks/TracksPortfolio';
import CosmicBackground from '../components/ui/CosmicBackground';
import AuthGuard from '../components/auth/AuthGuard';

const TracksPortfolioPage: React.FC = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [bpmFilter, setBpmFilter] = useState<number | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);

  // Close filter when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };

    if (showFilters) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilters]);

  // Extract unique genres
  const allGenres = [...new Set(tracks.flatMap(track => track.genre))];

  // Filter tracks based on selected genres and BPM
  const filteredTracks = tracks.filter(track => {
    const matchesGenre = selectedGenres.length
      ? track.genre.some(genre => selectedGenres.includes(genre))
      : true;
    const matchesBpm = bpmFilter !== null ? track.bpm <= bpmFilter : true;
    return matchesGenre && matchesBpm;
  });

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setBpmFilter(null);
  };

  return (
    <AuthGuard>
      <div className="relative min-h-screen">
        {/* Cosmic Background */}
        <CosmicBackground />

        <div className="min-h-screen pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Page Title */}
            <h1 className="text-5xl font-bold text-gradient-gray-white text-center mb-8">
              Tracks Portfolio
            </h1>

            {/* Filter Button */}
            <div className="flex justify-start mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-300 hover:text-gray-500 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 12.414V19a1 1 0 01-.553.894l-4 2A1 1 0 019 21v-8.586L3.293 6.707A1 1 0 013 6V4z"
                  />
                </svg>
              </button>
            </div>

            {/* Main Content */}
            <div className={`flex ${showFilters ? 'gap-8' : ''}`}>
              {/* Filters Section */}
              {showFilters && (
                <div
                  ref={filterRef}
                  className="w-1/4 bg-gradient-to-br from-black/80 to-gray-800/80 backdrop-blur-md rounded-lg p-6 border border-gray-700"
                >
                  {/* Filter Section Title */}
                  <h3 className="text-xl font-bold text-gradient-gray-white mb-4">
                    Filter by
                  </h3>

                  {/* Genre Filter */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-300 mb-2">
                      Type
                    </h4>
                    <ul className="space-y-2">
                      {allGenres.map(genre => (
                        <li key={genre}>
                          <button
                            onClick={() => toggleGenre(genre)}
                            className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium shadow-md transition-transform transform hover:scale-105 ${
                              selectedGenres.includes(genre)
                                ? 'bg-gradient-to-r from-green-400 to-green-600 text-white'
                                : 'bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 hover:from-gray-600 hover:to-gray-700'
                            }`}
                          >
                            {genre}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* BPM Filter */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-300 mb-2">
                      BPM
                    </h4>
                    <input
                      type="range"
                      min="60"
                      max="200"
                      step="1"
                      className="w-full"
                      value={bpmFilter || 60} // Default to 60 if bpmFilter is null
                      onChange={e => setBpmFilter(Number(e.target.value))}
                    />
                    <div className="text-gray-300 text-sm mt-2">
                      Selected BPM: {bpmFilter !== null ? bpmFilter : 'All'}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  {(selectedGenres.length > 0 || bpmFilter !== null) && (
                    <button
                      onClick={clearFilters}
                      className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors w-full"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              )}

              {/* Tracks Portfolio */}
              <div className={`${showFilters ? 'w-3/4' : 'w-full'}`}>
                <TracksPortfolio
                  tracks={filteredTracks}
                  className={`grid gap-4 ${
                    showFilters ? 'grid-cols-3' : 'grid-cols-4'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default TracksPortfolioPage;