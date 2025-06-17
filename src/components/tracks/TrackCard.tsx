import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Track } from '../../types';

interface TrackCardProps {
  track: Track;
  currentlyPlayingTrack: Track | null; // Track currently playing
  setCurrentlyPlayingTrack: (track: Track | null) => void; // Function to update the currently playing track
}

const TrackCard: React.FC<TrackCardProps> = ({ track, currentlyPlayingTrack, setCurrentlyPlayingTrack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [neonColor, setNeonColor] = useState<string>('rgba(255, 255, 255, 0.8)'); // Default bright white neon color
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      // Pause the current track
      audioRef.current?.pause();
      setIsPlaying(false);
      setCurrentlyPlayingTrack(null);
    } else {
      // Play the current track and stop any other playing track
      if (currentlyPlayingTrack && currentlyPlayingTrack.id !== track.id) {
        setCurrentlyPlayingTrack(null); // Stop other tracks
      }
      audioRef.current?.play();
      setIsPlaying(true);
      setCurrentlyPlayingTrack(track);
    }
  };

  useEffect(() => {
    // Stop playback if another track starts playing or if the currentlyPlayingTrack is null
    if (!currentlyPlayingTrack || currentlyPlayingTrack.id !== track.id) {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  }, [currentlyPlayingTrack, track.id]);

  useEffect(() => {
    // Extract dominant color from the image (mocked for simplicity)
    const extractDominantColor = async (imageUrl: string) => {
      // Replace this with a library like `color-thief` or `vibrant` for real implementation
      // Mocked color for now
      return 'rgba(255, 255, 255, 0.8)'; // Bright white
    };

    extractDominantColor(track.imageUrl).then((color) => setNeonColor(color));
  }, [track.imageUrl]);

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Neon Light Effect */}
      <div
        className={`absolute inset-0 rounded-full blur-[8px] transition-opacity duration-500`}
        style={{
          background: neonColor,
          opacity: isPlaying ? 1 : 0, // Show neon light only when playing
          zIndex: -1, // Place behind the vinyl
        }}
      />

      <div className="relative aspect-square">
        {/* Vinyl disc */}
        <motion.div
          className="absolute inset-0 bg-black rounded-full"
          animate={{
            rotate: isPlaying ? 360 : 0, // Reset rotation when stopped
          }}
          transition={{
            duration: isPlaying ? 2 : 0.4, // Smooth rotation when playing, smooth reset when paused
            repeat: isPlaying ? Infinity : 0, // Infinite rotation while playing
            ease: "linear", // Smooth linear rotation
          }}
        >
          {/* Vinyl grooves (visible only when playing) */}
          {isPlaying && (
            <div className="absolute inset-0 opacity-30">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 border border-gray-500 rounded-full"
                  style={{
                    margin: `${(i + 1) * 5}%`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Center hole */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-dark-surface rounded-full" />
        </motion.div>

        {/* Album art overlay */}
        <motion.div
          className="absolute inset-0 bg-center bg-cover rounded-full"
          style={{ backgroundImage: `url(${track.imageUrl})` }}
          animate={{
            opacity: isPlaying ? 0.4 : 0.9, // Stays dark while playing, resets only when paused
            rotate: isPlaying ? 360 : 0, // Reset rotation when stopped
          }}
          transition={{
            opacity: { duration: isPlaying ? 0.4 : 0.4 }, // Smooth fade when playing and pausing
            rotate: {
              duration: isPlaying ? 2 : 0.4, // Smooth rotation when playing, smooth reset when paused
              repeat: isPlaying ? Infinity : 0, // Infinite rotation while playing
              ease: "linear", // Smooth linear rotation
            },
          }}
        />

        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-80 transition-opacity"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24 opacity-70" // Bigger size and added transparency
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 4h4v16H6zM14 4h4v16h-4z" /> {/* Pause Icon */}
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24 opacity-70" // Bigger size and added transparency
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5 3l14 9-14 9V3z" /> {/* Play Icon */}
            </svg>
          )}
        </button>
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} src={track.preview} />
    </motion.div>
  );
};

export default TrackCard;