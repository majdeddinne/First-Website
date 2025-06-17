import { Track } from '../types';

export const fetchTracks = async (): Promise<Track[]> => {
  const response = await fetch('/audios');
  const audioFiles = await response.json();

  // Map audio files to track objects
  return audioFiles.map((file: string, index: number) => {
    const name = file.replace(/\.mp3$/, ''); // Remove file extension
    return {
      id: `${index + 1}`,
      name,
      artist: 'Unknown Artist', // Default value
      bpm: 0, // Default value
      key: 'Unknown', // Default value
      genre: ['Unknown'], // Default value
      preview: `/audios/${file}`,
      audioUrl: `/audios/${file}`,
      price: 0, // Default value
      imageUrl: '/logo.png', // Default placeholder image
      description: 'No description available.',
      tags: [],
      duration: '0:00', // Default value
    };
  });
};