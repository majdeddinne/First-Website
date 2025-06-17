import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Track } from '../../types';
import TrackCard from './TrackCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface TrackGridProps {
  tracks: Track[];
}

const TrackGrid: React.FC<TrackGridProps> = ({ tracks }) => {
  const [currentlyPlayingTrack, setCurrentlyPlayingTrack] = useState<Track | null>(null);

  const handleSlideChange = () => {
    // Stop the currently playing track when the slide changes
    setCurrentlyPlayingTrack(null); // Notify all TrackCards to stop playback
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative py-12"
    >
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="max-w-5xl mx-auto"
        onSlideChange={handleSlideChange} // Triggered when the slide changes
      >
        {tracks.map(track => (
          <SwiperSlide key={track.id}>
            <div className="flex flex-col md:flex-row items-center gap-8 p-4">
              <div className="w-64 h-64 md:w-80 md:h-80 flex-shrink-0">
                <TrackCard
                  track={track}
                  currentlyPlayingTrack={currentlyPlayingTrack}
                  setCurrentlyPlayingTrack={setCurrentlyPlayingTrack}
                />
              </div>
              <div className="flex-1 bg-gradient-to-br from-black/80 to-gray-800/80 backdrop-blur-md rounded-lg p-6 border border-gray-700">
                <h2 className="font-orbitron text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white mb-4">
                  {track.name}
                </h2>
                <p className="text-neon-cyan text-lg mb-6">{track.artist}</p>

                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div>
                    <p className="text-gray-400 text-sm">BPM</p>
                    <p className="text-white font-medium">{track.bpm}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Genre</p>
                    <p className="text-white font-medium">{track.genre.join(', ')}</p>
                  </div>
                </div>

                <p className="text-gray-300 mb-6">{track.description}</p>

                <div className="flex flex-wrap gap-2">
                  {track.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm bg-electric-purple/20 text-electric-purple border border-electric-purple/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default TrackGrid;