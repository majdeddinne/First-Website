import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import CosmicBackground from '../components/ui/CosmicBackground';

const ContactUsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to Login Page if not authenticated
    }
  }, [user, navigate]);

  const handleSendEmail = () => {
    if (!message.trim()) {
      setError('Message cannot be empty.');
      return;
    }

    const mailtoLink = `mailto:noircode.noirghost@gmail.com?subject=Contact Us&body=${encodeURIComponent(
      message
    )}`;
    window.location.href = mailtoLink;
    setSuccess(true);
  };

  return (
    <div className="relative min-h-screen">
      <CosmicBackground />
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-black/80 to-gray-800/80 backdrop-blur-md rounded-lg p-8 border border-gray-700">
            <h1 className="text-3xl font-orbitron text-gray-400 hover:text-white transition-colors duration-300 mb-6">
              Contact Us
            </h1>
            <p className="text-gray-300 mb-4">
<<<<<<< HEAD
              Send us a message. Your email will be included automatically...
=======
              Send us a message. Your email will be included automatically..
>>>>>>> 69ee5f0 (Your update message here)
            </p>
            {error && (
              <div className="mb-4 p-4 bg-red-900/50 border border-red-500 text-red-100 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-4 bg-green-900/50 border border-green-500 text-green-100 rounded-lg">
                Your message has been successfully sent!
              </div>
            )}
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="w-full bg-dark-bg border border-gray-700 text-white rounded-lg px-4 py-2 mb-4"
              placeholder="Write your message here..."
            />
            <button
              onClick={handleSendEmail}
              className="px-6 py-3 text-lg font-orbitron bg-toxic-green text-white rounded-lg hover:bg-toxic-green/90 transition-all"
            >
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
