import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/auth';
import { useAuth } from '../contexts/AuthContext';
import CosmicBackground from '../components/ui/CosmicBackground';

const TechnoPreferencesPage = () => {
  const navigate = useNavigate();
  const { refreshTechnoPreferencesStatus, user } = useAuth(); // Assuming `user` is available in the AuthContext
  const [formData, setFormData] = useState({
    attendedEvent: '',
    eventDetails: '',
    favoriteGenres: [],
    favoriteArtists: [],
    otherArtist: '',
    userType: '',
    knowledgeLevel: '',
  });
  const [showGenresDropdown, setShowGenresDropdown] = useState(false);
  const [showArtistsDropdown, setShowArtistsDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const genresDropdownRef = useRef(null);
  const artistsDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        genresDropdownRef.current &&
        !genresDropdownRef.current.contains(event.target)
      ) {
        setShowGenresDropdown(false);
      }
      if (
        artistsDropdownRef.current &&
        !artistsDropdownRef.current.contains(event.target)
      ) {
        setShowArtistsDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Load existing preferences
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) return;

        const { data, error: fetchError } = await supabase
          .from('techno_preferences')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (fetchError) throw fetchError;

        if (data) {
          setFormData({
            attendedEvent: data.attended_event || '',
            eventDetails: data.event_details || '',
            favoriteGenres: data.favorite_genres || [],
            favoriteArtists: data.favorite_artists || [],
            otherArtist: data.other_artist || '',
            userType: data.user_type || '',
            knowledgeLevel: data.knowledge_level || '',
          });
        }
      } catch (err) {
        console.error('Error loading preferences:', err);
      }
    };

    loadPreferences();
  }, []);

  const saveData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error(authError?.message || 'User not authenticated');
      }

      const dataToSave = {
        user_id: user.id,
        attended_event: formData.attendedEvent || null,
        event_details: formData.eventDetails || null,
        favorite_genres: formData.favoriteGenres.length > 0 ? formData.favoriteGenres : null,
        favorite_artists: formData.favoriteArtists.length > 0 ? formData.favoriteArtists : null,
        other_artist: formData.otherArtist || null,
        user_type: formData.userType || null,
        knowledge_level: formData.knowledgeLevel || null,
      };

      const { error: upsertError } = await supabase
        .from('techno_preferences')
        .upsert(dataToSave, { onConflict: 'user_id' });

      if (upsertError) throw upsertError;

      await refreshTechnoPreferencesStatus();
      navigate('/', { state: { success: true } });
    } catch (err) {
      console.error('Save error:', err);
      setError(err.message || 'Failed to save preferences. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const technoGenres = [
    'Acid Techno', 'Afro Techno', 'Ambient Techno', 'Berlin Techno',
    'Detroit Techno', 'Dub Techno', 'Hard Techno', 'Hyper Techno',
    'Hypnotic Techno', 'Industrial Techno', 'Melodic Techno', 'Minimal Techno',
    'Peak-Time Techno', 'Raw Techno', 'Schranz', 'Stroboscopic Techno',
    'Tech House', 'Techno-Dub', 'Tribal Techno', 'UK Techno',
    'Warehouse Techno', 'Wave Techno',
  ];

  const technoArtists = [
    'Adam Beyer', 'Amelie Lens', 'Aphex Twin', 'Ben Klock',
    'Carl Cox', 'Charlotte de Witte', 'Dax J', 'Derrick May',
    'I Hate Models', 'Jeff Mills', 'Juan Atkins', 'Kevin Saunderson',
    'Maceo Plex', 'Marcel Dettmann', 'Nicole Moudaber', 'Pan-Pot',
    'Paula Temple', 'Richie Hawtin (Plastikman)', 'Robert Hood',
    'Tale Of Us', 'Other',
  ];

  const handleSavePreferences = () => {
    // Logic to save preferences
  };

  return (
    <div className="relative min-h-screen">
      <CosmicBackground />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-black/80 to-gray-800/80 text-gray-300">
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-300 to-white mb-8">
              Techno Preferences
            </h3>


            {error && (
              <div className="mb-6 p-4 bg-red-900/50 border border-red-500 text-red-100 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {/* Question 1 */}
              <div className="p-6 rounded-lg shadow-md bg-gradient-to-r from-black/90 to-transparent border border-gray-700">
                <label className="block text-sm font-bold text-white mb-2">
                  Have you ever attended an event?
                </label>
                <div className="flex gap-4">
                  {['yes', 'no'].map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="attendedEvent"
                        value={option}
                        checked={formData.attendedEvent === option}
                        onChange={(e) => handleChange('attendedEvent', e.target.value)}
                        className="accent-gray-500"
                        disabled={isLoading}
                      />
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </label>
                  ))}
                </div>
                {formData.attendedEvent === 'yes' && (
                  <div className="mt-4">
                    <label className="block text-sm font-bold text-white mb-2">
                      Name some events
                    </label>
                    <input
                      type="text"
                      value={formData.eventDetails}
                      onChange={(e) => handleChange('eventDetails', e.target.value)}
                      className="w-full bg-transparent border border-gray-700 text-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-500 focus:outline-none disabled:opacity-50"
                      disabled={isLoading}
                    />
                  </div>
                )}
              </div>

              {/* Question 2 */}
              <div className="p-6 rounded-lg shadow-md bg-gradient-to-r from-black/90 to-transparent border border-gray-700">
                <label className="block text-sm font-bold text-white mb-2">
                  What are your favorite techno genres? (Select all that apply)
                </label>
                <div className="relative" ref={genresDropdownRef}>
                  {/* Transparent Button */}
                  <button
                    onClick={() => setShowGenresDropdown(!showGenresDropdown)}
                    disabled={isLoading}
                    className="w-full bg-transparent border border-gray-700 text-gray-300 rounded-lg px-4 py-2 text-left flex justify-between items-center focus:ring-2 focus:ring-gray-500 focus:outline-none disabled:opacity-50"
                  >
                    <span>
                      {formData.favoriteGenres.length > 0
                        ? formData.favoriteGenres.join(', ')
                        : 'Select genres'}
                    </span>
                    <span>{showGenresDropdown ? '▲' : '▼'}</span>
                  </button>

                  {/* Dropdown List with Black-to-Transparent Gradient */}
                  {showGenresDropdown && (
                    <div className="absolute mt-1 w-full bg-gradient-to-r from-black/90 to-transparent border border-gray-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                      {technoGenres.map((genre) => (
                        <div
                          key={genre}
                          onClick={() => {
                            const updatedGenres = formData.favoriteGenres.includes(genre)
                              ? formData.favoriteGenres.filter((g) => g !== genre)
                              : [...formData.favoriteGenres, genre];
                            handleChange('favoriteGenres', updatedGenres);
                          }}
                          className={`flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer ${
                            formData.favoriteGenres.includes(genre) ? 'font-bold' : ''
                          }`}
                        >
                          {genre}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Question 3 */}
              <div className="p-6 rounded-lg shadow-md bg-gradient-to-r from-black/90 to-transparent border border-gray-700">
                <label className="block text-sm font-bold text-white mb-2">
                  Who are your favorite artists? (Select all that apply)
                </label>
                <div className="relative" ref={artistsDropdownRef}>
                  {/* Transparent Button */}
                  <button
                    onClick={() => setShowArtistsDropdown(!showArtistsDropdown)}
                    disabled={isLoading}
                    className="w-full bg-transparent border border-gray-700 text-gray-300 rounded-lg px-4 py-2 text-left flex justify-between items-center focus:ring-2 focus:ring-gray-500 focus:outline-none disabled:opacity-50"
                  >
                    <span>
                      {formData.favoriteArtists.length > 0
                        ? formData.favoriteArtists.join(', ')
                        : 'Select artists'}
                    </span>
                    <span>{showArtistsDropdown ? '▲' : '▼'}</span>
                  </button>

                  {/* Dropdown List with Black-to-Transparent Gradient */}
                  {showArtistsDropdown && (
                    <div className="absolute mt-1 w-full bg-gradient-to-r from-black/90 to-transparent border border-gray-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                      {technoArtists.map((artist) => (
                        <div
                          key={artist}
                          onClick={() => {
                            const updatedArtists = formData.favoriteArtists.includes(artist)
                              ? formData.favoriteArtists.filter((a) => a !== artist)
                              : [...formData.favoriteArtists, artist];
                            handleChange('favoriteArtists', updatedArtists);
                          }}
                          className={`flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer ${
                            formData.favoriteArtists.includes(artist) ? 'font-bold' : ''
                          }`}
                        >
                          {artist}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {formData.favoriteArtists.includes('Other') && (
                  <div className="mt-4">
                    <label className="block text-sm font-bold text-white mb-2">
                      Specify other artists
                    </label>
                    <input
                      type="text"
                      value={formData.otherArtist}
                      onChange={(e) => handleChange('otherArtist', e.target.value)}
                      className="w-full bg-transparent border border-gray-700 text-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-500 focus:outline-none disabled:opacity-50"
                      disabled={isLoading}
                      placeholder="Comma separated names"
                    />
                  </div>
                )}
              </div>

              {/* Question 4 */}
              <div className="p-6 rounded-lg shadow-md bg-gradient-to-r from-black/90 to-transparent border border-gray-700">
                <label className="block text-sm font-bold text-white mb-2">
                  Who are you?
                </label>
                <div className="flex flex-wrap gap-4">
                  {['Producer', 'DJ', 'Techno Fan'].map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="userType"
                        value={type}
                        checked={formData.userType === type}
                        onChange={(e) => handleChange('userType', e.target.value)}
                        className="accent-gray-500"
                        disabled={isLoading}
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              {/* Question 5 */}
              <div className="p-6 rounded-lg shadow-md bg-gradient-to-r from-black/90 to-transparent border border-gray-700">
                <label className="block text-sm font-bold text-white mb-2">
                  Knowledge Level
                </label>
                <div className="flex flex-wrap gap-4">
                  {['High', 'Medium', 'Low'].map((level) => (
                    <label
                      key={level}
                      className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="knowledgeLevel"
                        value={level}
                        checked={formData.knowledgeLevel === level}
                        onChange={(e) => handleChange('knowledgeLevel', e.target.value)}
                        className="accent-gray-500"
                        disabled={isLoading}
                      />
                      {level}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={() => navigate(-1)}
                disabled={isLoading}
                className="px-6 py-3 text-lg font-bold border border-gray-500 text-gray-300 hover:text-white rounded-lg disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={saveData}
                disabled={isLoading || !formData.userType || !formData.knowledgeLevel}
                className={`px-6 py-3 text-lg font-bold rounded-lg transition-all border ${
                  isLoading
                    ? 'bg-transparent border-gray-600 text-gray-600 cursor-not-allowed'
                    : 'bg-transparent border-white text-white hover:bg-white hover:text-black'
                } ${
                  (!formData.userType || !formData.knowledgeLevel) && !isLoading
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Saving...
                  </span>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnoPreferencesPage;