import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tracks } from '../data/tracks';
import CosmicBackground from '../components/ui/CosmicBackground';

const TracksPage: React.FC = () => {
  const { trackId } = useParams<{ trackId: string }>();
  const navigate = useNavigate();
  const trackIndex = tracks.findIndex(t => t.id === trackId);
  const track = tracks[trackIndex];
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false); // State for smooth transition
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault(); // Prevent scrolling when spacebar is pressed
        togglePlay();
      } else if (e.code === 'ArrowLeft') {
        // Handle single press for skip backward
        e.preventDefault();
        skipBackward();
      } else if (e.code === 'ArrowRight') {
        // Handle single press for skip forward
        e.preventDefault();
        skipForward();
      }
    };

    let lastKeyPressTime = 0;

    const handleDoubleKeyPress = (e: KeyboardEvent) => {
      const currentTime = Date.now();

      if (e.code === 'ArrowLeft' && currentTime - lastKeyPressTime < 300) {
        // Handle double press for previous track
        e.preventDefault();
        handlePreviousTrack();
      } else if (e.code === 'ArrowRight' && currentTime - lastKeyPressTime < 300) {
        // Handle double press for next track
        e.preventDefault();
        handleNextTrack();
      }

      lastKeyPressTime = currentTime;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keydown', handleDoubleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keydown', handleDoubleKeyPress);
    };
  }, [isPlaying, currentTime, duration]);

  if (!track) {
    return (
      <div className="text-center text-gray-300 py-16">
        <p>Track not found.</p>
      </div>
    );
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      setIsTransitioning(true); // Start transition
      setTimeout(() => {
        navigate(`/tracks/${tracks[trackIndex + 1].id}`);
        setIsTransitioning(false); // End transition
      }, 500); // Match the duration of the animation
    }
  };

  const handlePreviousTrack = () => {
    if (trackIndex > 0) {
      setIsTransitioning(true); // Start transition
      setTimeout(() => {
        navigate(`/tracks/${tracks[trackIndex - 1].id}`);
        setIsTransitioning(false); // End transition
      }, 500); // Match the duration of the animation
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = parseFloat(e.target.value);
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration); // Skip forward 10 seconds
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0); // Skip backward 10 seconds
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cosmic Background */}
      <CosmicBackground />

      {/* Main Content */}
      <div className="bg-gradient-to-br from-black/50 to-gray-800/50 backdrop-blur-md p-12 border border-gray-700 shadow-lg max-w-6xl w-full h-[500px] flex flex-col">
        {/* Animated Section */}
        <div
          className={`flex w-full items-start justify-between mb-6 transition-all duration-500 ${
            isTransitioning ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'
          }`}
        >
          {/* Song Info */}
          <div className="flex-1 flex flex-col justify-start items-start mr-8">
            {/* Track Title */}
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white mb-4">
              {track.name}
            </h1>

            {/* Track Details */}
            <div className="grid grid-cols-2 gap-4 text-md text-gray-300 mb-6 mt-6">
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">
                <strong>Genre:</strong> {track.genre}
              </p>
              <p className="col-span-3 text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">
                <strong>BPM:</strong> {track.bpm}
              </p>
              <p className="col-span-3 text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">
                <strong>Description:</strong> {track.description}
              </p>
            </div>
          </div>

          {/* Vinyl Player */}
          <div className="relative flex items-center justify-center">
            {/* Neon Light Effect (only visible while playing) */}
            {isPlaying && (
              <div
                className="absolute w-64 h-64 rounded-full blur-[6px] z-[-1]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))', // Changed to white gradient
                  opacity: 0.6,
                }}
              />
            )}
            <div
              className={`w-64 h-64 rounded-full bg-black flex items-center justify-center shadow-lg ${
                isPlaying ? 'animate-spin' : ''
              }`}
            >
              {/* Vinyl Circles */}
              <div className="relative w-full h-full rounded-full flex items-center justify-center">
                {/* Outer Thin Transparent Circle */}
                <div className="absolute w-60 h-60 border-[0.5px] border-gray-500/30 rounded-full"></div>
                {/* Middle Thin Transparent Circle */}
                <div className="absolute w-56 h-56 border-[0.5px] border-gray-400/30 rounded-full"></div>
                {/* New Inner Thin Transparent Circle */}
                <div className="absolute w-52 h-52 border-[0.5px] border-gray-300/30 rounded-full"></div>
                {/* Additional Circles (always visible) */}
                <div className="absolute w-48 h-48 border-[0.5px] border-gray-200/30 rounded-full"></div>
                <div className="absolute w-44 h-44 border-[0.5px] border-gray-100/30 rounded-full"></div>
                {/* Picture with Dark Overlay (only while playing) */}
                <div
                  className={`absolute w-40 h-40 rounded-full bg-gray-800 flex items-center justify-center ${
                    isPlaying ? 'bg-black/50' : ''
                  }`}
                >
                  <img
                    src={track.imageUrl}
                    alt={track.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Player Controls */}
        <div className="w-full flex flex-col items-center mt-6">
          <div className="flex items-center justify-center mb-4 space-x-6">
            {/* Previous */}
            <button
              onClick={handlePreviousTrack}
              className="text-white hover:text-gray-300"
              disabled={trackIndex === 0}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.5 12L18 16.5V7.5L11.5 12ZM6 16.5V7.5H8V16.5H6Z" />
              </svg>
            </button>
            {/* Skip Backward */}
            <button
              onClick={skipBackward}
              className="text-white hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 19V5l-7 7m0 0l7 7m-7-7h12" />
              </svg>
            </button>
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="text-white hover:text-gray-300 transition-all"
            >
              {isPlaying ? (
                // Pause Icon
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h3v16H6zM15 4h3v16h-3z" />
                </svg>
              ) : (
                // Play Icon
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            {/* Skip Forward */}
            <button
              onClick={skipForward}
              className="text-white hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 5v14l7-7m0 0l-7-7m7 7H9" />
              </svg>
            </button>
            {/* Next */}
            <button
              onClick={handleNextTrack}
              className="text-white hover:text-gray-300"
              disabled={trackIndex === tracks.length - 1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.5 12L6 7.5V16.5L12.5 12ZM16 7.5V16.5H18V7.5H16Z" />
              </svg>
            </button>
          </div>

          {/* Progress Bar */}
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none mb-2"
          />
          {/* Progress Bar Time */}
          <div className="flex justify-between w-full text-sm text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">
            <span>{new Date(currentTime * 1000).toISOString().substr(14, 5)}</span>
            <span>{new Date((duration - currentTime) * 1000).toISOString().substr(14, 5)}</span>
          </div>
        </div>

        {/* Demand Track Button */}
        <a
          href={`mailto:noirghost.noircode@gmail.com?subject=Demand for Track: ${track.name}&body=I want the full track.%0D%0A%0D%0ATrack Details:%0D%0A- Title: ${track.name}%0D%0A- Genre: ${track.genre.join(', ')}%0D%0A- BPM: ${track.bpm}%0D%0A- Description: ${track.description}`}
          className="absolute bottom-[-20px] right-[-10px] px-8 py-4 text-white bg-black border border-gray-700 transition-all rounded-lg text-lg font-bold hover:bg-gray-800 hover:shadow-[0_0_20px_5px_rgba(255,255,255,0.8)]"
        >
          full track
        </a>

        {/* Audio Element */}
        <audio
          ref={audioRef}
          src={track.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />
      </div>
    </div>
  );
};

export default TracksPage;