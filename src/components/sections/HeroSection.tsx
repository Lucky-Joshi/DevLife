import { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background particles/gradient animation
      gsap.to('.hero-bg', {
        backgroundPosition: '200% center',
        duration: 15,
        repeat: -1,
        ease: 'none',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const typingVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.1,
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const text = "> Hello World_";

  return (
    <Box
      ref={containerRef}
      component="section"
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        bgcolor: '#0a0a0a'
      }}
    >
      <Box
        className="hero-bg"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.15,
          background: 'radial-gradient(circle at center, rgba(0,240,255,0.4) 0%, transparent 60%)',
          backgroundSize: '200% 200%',
        }}
      />
      
      <motion.div
        ref={textRef}
        variants={typingVariants}
        initial="hidden"
        animate="visible"
        style={{ zIndex: 10, textAlign: 'center' }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: '"Fira Code", monospace',
            color: '#00f0ff',
            textShadow: '0 0 20px rgba(0,240,255,0.5)',
            fontSize: { xs: '3rem', md: '5rem', lg: '7rem' }
          }}
        >
          {text.split('').map((char, index) => (
            <motion.span key={index} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </Typography>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <Typography
            variant="h4"
            sx={{
              mt: 4,
              color: 'text.secondary',
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            The Journey Begins
          </Typography>
        </motion.div>
      </motion.div>
    </Box>
  );
}
