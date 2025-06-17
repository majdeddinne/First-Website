import React from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ 
  text, 
  as: Component = 'h1', 
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      <Component
        className={`glitch relative inline-block ${className} before:content-[attr(data-text)] before:absolute before:left-[-2px] before:text-white before:top-0 before:w-full before:h-full before:animate-glitch-1 after:content-[attr(data-text)] after:absolute after:left-[2px] after:text-white after:top-0 after:w-full after:h-full after:animate-glitch-2`}
        data-text={text}
      >
        <span className="relative z-10">
          {text}
        </span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-electric-purple/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </Component>
    </motion.div>
  );
};

export default GlitchText;