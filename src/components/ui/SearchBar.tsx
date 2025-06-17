import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import Fuse from 'fuse.js';
import { tracks } from '../../data/tracks';
import { useNavigate } from 'react-router-dom';

const fuse = new Fuse(tracks, {
  keys: ['name', 'bpm', 'key', 'genre', 'tags'],
  threshold: 0.4,
});

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Fuse.FuseResult<any>[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length > 2) {
      const searchResults = fuse.search(value);
      setResults(searchResults.slice(0, 5));
    } else {
      setResults([]);
    }
  };

  const handleResultClick = (track: any) => {
    setQuery('');
    setResults([]);
    navigate(`/tracks?highlight=${track.id}`);
  };

  return (
    <div className="relative">
      <div className={`
        flex items-center bg-dark-surface/80 backdrop-blur-md
        border border-dark-border rounded-lg overflow-hidden
        transition-all duration-300
        ${isFocused ? 'ring-2 ring-neon-cyan' : ''}
      `}>
        <Search size={20} className="ml-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search tracks by name, BPM, or key..."
          className="w-full bg-transparent text-white px-4 py-2 focus:outline-none"
        />
      </div>

      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 bg-dark-surface/95 backdrop-blur-md border border-dark-border rounded-lg overflow-hidden z-50"
        >
          {results.map(({ item }) => (
            <button
              key={item.id}
              onClick={() => handleResultClick(item)}
              className="w-full px-4 py-3 text-left hover:bg-dark-border/50 transition-colors flex items-center justify-between group"
            >
              <div>
                <p className="text-white font-medium">{item.name}</p>
                <p className="text-sm text-gray-400">
                  {item.bpm} BPM • {item.key}
                </p>
              </div>
              <span className="text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                View →
              </span>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;