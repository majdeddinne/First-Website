import React from 'react';

const services = [
  { id: 1, name: 'Basic Mixing', price: '$50' },
  { id: 2, name: 'Full Production', price: '$200' },
  { id: 3, name: 'Mastering', price: '$100' },
  { id: 4, name: 'Custom Track', price: '$300' },
];

const ServicesPage: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">Our Services</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <div key={service.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-white">{service.name}</h2>
                <p className="text-gray-400">{service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};