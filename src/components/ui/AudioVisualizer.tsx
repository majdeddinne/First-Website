import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AudioVisualizerProps {
  audioUrl?: string;
  className?: string;
}

const barCount = 32;

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ 
  audioUrl, 
  className = '' 
}) => {
  const visualizerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const barsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!audioUrl) return;

    audioRef.current = new Audio(audioUrl);
    audioRef.current.loop = true;
    audioRef.current.play(); // Autoplay when component mounts

    const bars: HTMLDivElement[] = [];
    const container = visualizerRef.current;
    
    if (container) {
      container.innerHTML = '';
      
      const barWidth = container.clientWidth / barCount;
      
      for (let i = 0; i < barCount; i++) {
        const bar = document.createElement('div');
        bar.className = 'visualizer-bar';
        bar.style.left = `${i * barWidth}px`;
        bar.style.width = `${barWidth * 0.8}px`;
        container.appendChild(bar);
        bars.push(bar);
      }
      
      barsRef.current = bars;
    }

    // Start visualization immediately
    simulateAudioVisualization();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioUrl]);

  const simulateAudioVisualization = () => {
    const bars = barsRef.current;
    if (!bars.length) return;

    const gradientStartColors = [81, 112, 255]; // RGB for #5170FF (Bright Blue)
    const gradientMidColors = [255, 102, 196]; // RGB for #FF66C4 (Hot Pink)
    const gradientEndColors = [255, 255, 255]; // RGB for original color (white or existing)

    const interpolateColor = (start: number[], end: number[], factor: number) => {
      return start.map((startVal, index) => 
        Math.round(startVal + factor * (end[index] - startVal))
      );
    };

    const animate = () => {
      const containerWidth = visualizerRef.current?.clientWidth || 1;

      bars.forEach((bar, i) => {
        const height = 10 + Math.random() * 70;
        const factor = i / (barCount - 1); // Gradient factor based on bar position

        // Blend from blue to pink for the first half, then pink to original color
        const color = factor < 0.5
          ? interpolateColor(gradientStartColors, gradientMidColors, factor * 2)
          : interpolateColor(gradientMidColors, gradientEndColors, (factor - 0.5) * 2);

        const colorString = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

        bar.style.height = `${height}px`;
        bar.style.background = colorString;
        bar.style.transform = `scaleY(${1 + Math.random() * 0.2})`;
        bar.style.transition = `all ${0.1 + i * 0.01}s ease`;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div 
        ref={visualizerRef} 
        className="visualizer-container"
      />
    </div>
  );
}

export default AudioVisualizer;