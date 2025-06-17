// filepath: c:\Users\user\Desktop\noircode\backup\src\pages\ServicesPage.tsx
import React from 'react';
import CosmicBackground from '../components/ui/CosmicBackground';
import { motion } from 'framer-motion';

const services = [
  { id: 1, name: 'Basic Production', price: '$200', description: 'A basic track production with minimal edits.' },
  { id: 2, name: 'Premium Production', price: '$500', description: 'A full production service with detailed edits and mixing.' },
  { id: 3, name: 'Custom Track', price: '$800', description: 'A fully customized track tailored to your specifications.' },
  { id: 4, name: 'Mixing & Mastering', price: '$300', description: 'Professional mixing and mastering for your tracks.' },
];

const ServicesPage: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      <CosmicBackground />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-white">Our Services</h1>
            <p className="text-gray-400 mt-4">Explore our range of services and pricing.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            {services.map(service => (
              <div key={service.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-white">{service.name}</h2>
                <p className="text-lg text-neon-cyan">{service.price}</p>
                <p className="text-gray-400 mt-2">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;