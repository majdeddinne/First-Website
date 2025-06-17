import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause } from 'lucide-react';

interface AudioPlayerProps {
  url: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ url, onPlayStateChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const wavesurfer = WaveSurfer.create({
      container: containerRef.current,
      waveColor: '#4A5568',
      progressColor: '#00D1D1',
      cursorColor: '#7A5BFF',
      barWidth: 2,
      barGap: 3,
      height: 60,
      responsive: true,
      normalize: true,
      backend: 'WebAudio',
    });

    wavesurfer.load(url);
    wavesurferRef.current = wavesurfer;

    wavesurfer.on('play', () => {
      setIsPlaying(true);
      onPlayStateChange?.(true);
    });

    wavesurfer.on('pause', () => {
      setIsPlaying(false);
      onPlayStateChange?.(false);
    });

    return () => {
      wavesurfer.destroy();
    };
  }, [url, onPlayStateChange]);

  const togglePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
    }
  };

  return (
    <div className="bg-dark-surface/80 backdrop-blur-md rounded-lg p-4 border border-dark-border">
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlayPause}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-neon-cyan hover:bg-neon-cyan/90 transition-colors"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <div ref={containerRef} className="flex-1" />
      </div>
    </div>
  );
};

export default AudioPlayer;