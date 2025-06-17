import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import GlitchText from '../components/ui/GlitchText';
import { AtSign, Lock } from 'lucide-react';
import { SiSpotify, SiFacebook } from 'react-icons/si';
import { signInWithGoogle, signInWithSpotify, signInWithFacebook } from '../lib/auth';
import CosmicBackground from '../components/ui/CosmicBackground'; // Adjust the import path as needed

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signIn(email, password);
      navigate('/profile');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="relative min-h-screen">
      <CosmicBackground /> {/* Add the cosmic background */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-4">
          <div className="neon-border-wrapper">
            <motion.div
              className="relative max-w-md mx-auto bg-dark-surface border border-dark-border rounded-lg overflow-hidden shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-8">
                <div className="text-center mb-8">
                  <GlitchText
                    text="ACCESS PORTAL"
                    as="h1"
                    className="font-sans text-3xl font-extrabold text-white tracking-wider"
                  />
                  <p className="text-gray-400 mt-2">
                    Enter your credentials to access your account
                  </p>
                </div>

                {/* Social Auth Icons */}
                <div className="flex justify-center gap-10 mb-12">
                  {/* Google */}
                  <button
                    onClick={signInWithGoogle}
                    className="group bg-transparent p-0 hover:scale-125 transition-transform duration-200"
                    title="Sign in with Google"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      className="w-10 h-10 group-hover:animate-bounce"
                      style={{
                        filter: 'drop-shadow(0 0 16px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))',
                      }}
                    >
                      <path fill="#EA4335" d="M24 9.5c3.9 0 7.1 1.6 9.3 3.3l7-7C36.3 2.5 30.7 0 24 0 14.6 0 6.4 5.5 2.5 13.5l8.2 6.4C12.8 13.1 17.9 9.5 24 9.5z" />
                      <path fill="#34A853" d="M46.5 24c0-1.5-.2-3-.5-4.5H24v9h12.7c-.5 2.5-2 4.6-4.2 6.1l6.6 5.1c3.9-3.6 6.4-8.9 6.4-15.7z" />
                      <path fill="#FBBC05" d="M13.7 27.9c-.5-1.5-.8-3-.8-4.9s.3-3.4.8-4.9L5 12.6C3.2 16 2 19.9 2 24s1.2 8 3 11.4l8.7-7.5z" />
                      <path fill="#4285F4" d="M24 48c6.5 0 12-2.1 16-5.7l-8-6.4c-2.2 1.5-5 2.4-8 2.4-6.1 0-11.3-4.1-13.2-9.6l-8.7 7.5C6.4 42.5 14.6 48 24 48z" />
                      <path fill="none" d="M0 0h48v48H0z" />
                    </svg>
                    <span className="sr-only">Sign in with Google</span>
                  </button>
                  {/* Spotify */}
                  <button
                    onClick={signInWithSpotify}
                    className="group bg-transparent p-0 hover:scale-125 transition-transform duration-200"
                    title="Sign in with Spotify"
                    type="button"
                  >
                    <SiSpotify
                      size={40}
                      className="group-hover:animate-bounce"
                      style={{
                        color: "#1ED760",
                        filter: "drop-shadow(0 0 16px #1ED760cc) drop-shadow(0 0 8px #fff8)",
                      }}
                    />
                    <span className="sr-only">Sign in with Spotify</span>
                  </button>
                  {/* Facebook */}
                  <button
                    onClick={signInWithFacebook}
                    className="group bg-transparent p-0 hover:scale-125 transition-transform duration-200"
                    title="Sign in with Facebook"
                    type="button"
                  >
                    <SiFacebook
                      size={40}
                      className="group-hover:animate-bounce"
                      style={{
                        color: "#1877F3",
                        filter: "drop-shadow(0 0 16px #1877F3cc) drop-shadow(0 0 8px #fff8)",
                      }}
                    />
                    <span className="sr-only">Sign in with Facebook</span>
                  </button>
                </div>
                {/* End Social Auth Icons */}

                <p className="text-center text-sm text-gray-400 mb-6">
                  <strong>We recommend signing in with Google</strong> for the best experience and to easily contact us.
                </p>

                <form onSubmit={handleLogin}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-neon-cyan font-medium mb-2 flex items-center gap-2">
                        <AtSign size={16} />
                        Email
                      </label>
                      <motion.input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-dark-bg border border-dark-border text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent transition-all shadow-[0_0_16px_2px_rgba(0,255,255,0.15)] hover:shadow-[0_0_32px_4px_rgba(0,255,255,0.25)]"
                        placeholder="your@email.com"
                        required
                        whileFocus={{ scale: 1.04, boxShadow: "0 0 32px 8px rgba(0,255,255,0.35)" }}
                        whileHover={{ scale: 1.02, boxShadow: "0 0 24px 4px rgba(0,255,255,0.25)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-neon-cyan font-medium mb-2 flex items-center gap-2">
                        <Lock size={16} />
                        Password
                      </label>
                      <motion.input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-dark-bg border border-dark-border text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent transition-all shadow-[0_0_16px_2px_rgba(0,255,255,0.15)] hover:shadow-[0_0_32px_4px_rgba(0,255,255,0.25)]"
                        placeholder="••••••••"
                        required
                        whileFocus={{ scale: 1.04, boxShadow: "0 0 32px 8px rgba(0,255,255,0.35)" }}
                        whileHover={{ scale: 1.02, boxShadow: "0 0 24px 4px rgba(0,255,255,0.25)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 text-toxic-green focus:ring-toxic-green border-dark-border rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                          Remember me
                        </label>
                      </div>
                      
                      <div className="text-sm">
                        <a href="#" className="text-neon-cyan hover:text-neon-cyan/80">
                          Forgot password?
                        </a>
                      </div>
                    </div>
                    
                    <div>
                      <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        className={`relative ${isLoading ? 'opacity-70' : ''} transition-all duration-700 ease-in-out`}
                        disabled={isLoading}
                        style={{
                          boxShadow: '0 0 10px 2px rgba(0, 255, 255, 0.4), 0 0 20px 4px rgba(0, 255, 255, 0.3)',
                          background: 'linear-gradient(135deg, #00FFFF, #1E90FF)', // Original gradient
                          color: 'white',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          padding: '12px 0',
                          fontWeight: 'bold',
                          fontSize: '1.25rem',
                          textTransform: 'uppercase',
                          letterSpacing: '1.5px',
                          transition: 'all 0.7s ease-in-out', // Smooth transition for hover effect
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLElement).style.background =
                            'linear-gradient(135deg, #FF1493, #8A2BE2, #00BFFF)'; // Vibrant gradient on hover
                          (e.target as HTMLElement).style.boxShadow =
                            '0 0 20px 4px rgba(255, 20, 147, 0.4), 0 0 40px 8px rgba(138, 43, 226, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLElement).style.background =
                            'linear-gradient(135deg, #00FFFF, #1E90FF)'; // Revert to original gradient
                          (e.target as HTMLElement).style.boxShadow =
                            '0 0 10px 2px rgba(0, 255, 255, 0.4), 0 0 20px 4px rgba(0, 255, 255, 0.3)';
                        }}
                      >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                      </Button>
                    </div>
                  </div>
                </form>
                
                <div className="mt-8 text-center text-sm text-gray-400">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-neon-cyan font-medium hover:text-neon-cyan/80">
                    Sign up here
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;