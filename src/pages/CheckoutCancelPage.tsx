import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';
import Button from '../components/ui/Button';

const CheckoutCancelPage: React.FC = () => {
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
            <XCircle size={64} className="text-red-500" />
          </div>
          
          <h1 className="font-orbitron text-3xl font-bold text-white mb-4">
            Checkout Cancelled
          </h1>
          
          <p className="text-gray-400 mb-8">
            Your payment was cancelled. No charges were made to your account.
          </p>
          
          <div className="space-y-4">
            <Link to="/tracks">
              <Button variant="primary" fullWidth>
                Return to Tracks
              </Button>
            </Link>
            
            <Link to="/">
              <Button variant="outline" fullWidth>
                Go to Homepage
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutCancelPage;