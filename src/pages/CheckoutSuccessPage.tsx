import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';

const CheckoutSuccessPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-md mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 flex justify-center">
            <CheckCircle size={64} className="text-toxic-green" />
          </div>
          
          <h1 className="font-orbitron text-3xl font-bold text-white mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-gray-400 mb-8">
            Thank you for your purchase. You will receive an email with your download instructions shortly.
          </p>
          
          <div className="space-y-4">
            <Link to="/profile">
              <Button variant="primary" fullWidth>
                View Order History
              </Button>
            </Link>
            
            <Link to="/tracks">
              <Button variant="outline" fullWidth>
                Browse More Tracks
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;