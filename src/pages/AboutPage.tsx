import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Code, Headphones, Shield, Zap } from 'lucide-react';
import CosmicBackground from '../components/ui/CosmicBackground';

const AboutPage: React.FC = () => {
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
            {/* Page Title */}
            <h1 className="text-5xl font-bold text-gradient-gray-white text-center mb-4">
              About Noir Code
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We are ghost producers specializing in cutting-edge techno.
              Our identity remains anonymous so yours can shine.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gradient-gray-white mb-6">
                Our Mission
              </h2>
              <p className="text-gray-300 mb-4">
                In the hyper-connected world of electronic music, maintaining artistic anonymity
                is increasingly difficult. Yet many artists need fresh ideas and professional
                productions to stay competitive.
              </p>
              <p className="text-gray-300 mb-4">
                Our mission is to provide premium, exclusive techno productions with complete
                anonymity. When you purchase a track from us, all rights transfer to you—no questions
                asked, no credits required.
              </p>
              <p className="text-gray-300">
                We operate in the shadows so you can shine in the spotlight. Quality, anonymity,
                and exclusivity are our core values.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-gradient-to-br from-black/80 to-gray-800/80 backdrop-blur-md rounded-lg p-6 border border-gray-700"
            >
              <h2 className="text-2xl font-bold text-gradient-gray-white mb-6">
                Our Process
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                    <Headphones size={20} className="text-neon-cyan" />
                  </div>
                  <div>
                    <h3 className="font-orbitron text-white mb-1">Production</h3>
                    <p className="text-gray-300 text-sm">
                      We create high-quality techno tracks using professional-grade equipment and techniques.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                    <Code size={20} className="text-electric-purple" />
                  </div>
                  <div>
                    <h3 className="font-orbitron text-white mb-1">Anonymization</h3>
                    <p className="text-gray-300 text-sm">
                      All metadata is scrubbed, ensuring no connection to us exists in the final files.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                    <Zap size={20} className="text-toxic-green" />
                  </div>
                  <div>
                    <h3 className="font-orbitron text-white mb-1">Transaction</h3>
                    <p className="text-gray-300 text-sm">
                      Secure purchase process via email, with privacy-focused payment options.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                    <Shield size={20} className="text-neon-cyan" />
                  </div>
                  <div>
                    <h3 className="font-orbitron text-white mb-1">Rights Transfer</h3>
                    <p className="text-gray-300 text-sm">
                      Full ownership rights are transferred. Each track is sold only once.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            className="bg-gradient-to-br from-black/80 to-gray-800/80 backdrop-blur-md rounded-lg p-8 mb-16 border border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gradient-gray-white mb-6 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FaqItem 
                question="What do I receive after purchase?"
                answer="You receive all project files, stems, and the final master in high resolution. You also get a document transferring all rights to you."
              />
              <FaqItem 
                question="Can I request custom productions?"
                answer="Yes, we offer custom production services. Contact us with your requirements for a custom quote."
              />
              <FaqItem 
                question="Do you retain any rights to sold tracks?"
                answer="No. Once sold, we completely relinquish all rights. The track becomes 100% yours."
              />
              <FaqItem 
                question="How do I know tracks are truly exclusive?"
                answer="Each track is sold only once and removed from our catalog. We maintain our reputation through strict adherence to this policy."
              />
            </div>
          </motion.div>
          
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <h2 className="font-orbitron text-2xl text-gradient bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent mb-6">
              
            </h2>
            <Link to="/tracks">
              <Button
                variant="outline"
                size="lg" // Changed size to 'lg' for a bigger button
                className="text-white border-white hover:bg-dark-border hover:text-neon-cyan transition-colors px-8 py-4" // Added padding for a larger appearance
              >
                Browse Our Tracks
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  return (
    <div className="p-4 border border-dark-border rounded-lg">
      <h3 className="font-orbitron text-neon-cyan mb-2">{question}</h3>
      <p className="text-gray-400 text-sm">{answer}</p>
    </div>
  );
};

export default AboutPage;