import { useState, useRef } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

import { useStory } from '../../context/StoryContext';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { unlockedHero, setUnlockedHero } = useStory();
  const [inputVal, setInputVal] = useState('');
  const [errorShake, setErrorShake] = useState(false);

  // Fallback sound if URL doesn't exist, we can just use empty or simple beep logic
  // For safety without external assets, we will not strictly require the sound file to load

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputVal.trim() === 'console.log("Hello World")') {
        setUnlockedHero(true);
      } else {
        setErrorShake(true);
        setTimeout(() => setErrorShake(false), 500);
      }
    }
  };

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
        bgcolor: 'transparent'
      }}
    >
      <AnimatePresence mode="wait">
        {!unlockedHero ? (
          <motion.div
            key="locked"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            style={{ zIndex: 10, textAlign: 'center', width: '100%', maxWidth: '600px', padding: '20px' }}
          >
            <Typography variant="h4" sx={{ color: '#bc13fe', mb: 4, fontFamily: '"Fira Code", monospace', fontSize: { xs: '1.2rem', md: '2.125rem' } }}>
              <TypeAnimation
                sequence={[
                  'It started with a single line...', 1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={0}
              />
            </Typography>

            <motion.div animate={errorShake ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
              <Box sx={{ bgcolor: '#000', p: 3, borderRadius: 2, border: '1px solid #333', textAlign: 'left', boxShadow: '0 0 30px rgba(0, 240, 255, 0.1)' }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5f56' }} />
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#27c93f' }} />
                </Box>
                <Typography sx={{ color: 'text.secondary', fontFamily: '"Fira Code", monospace', mb: 1 }}>// Task: Log "Hello World" to the console to proceed</Typography>
                <TextField
                  fullWidth
                  variant="standard"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleSubmit}
                  autoFocus
                  placeholder="console.log(...)"
                  InputProps={{
                    sx: { color: '#00f0ff', fontFamily: '"Fira Code", monospace', fontSize: '1.2rem' },
                    disableUnderline: true
                  }}
                />
              </Box>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, scale: 1.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
            style={{ zIndex: 10, textAlign: 'center' }}
          >
            <Typography
              variant="h1"
              sx={{
                fontFamily: '"Fira Code", monospace',
                color: '#00f0ff',
                textShadow: '0 0 30px rgba(0,240,255,0.8)',
                fontSize: { xs: '2.5rem', sm: '4rem', md: '5rem', lg: '7rem' },
                mt: { xs: -10, md: 0 }
              }}
            >
              &gt; Hello World_
            </Typography>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }}>
              <Typography variant="h4" sx={{ mt: 4, color: '#00f0ff', letterSpacing: 2, fontFamily: '"Fira Code", monospace', fontSize: { xs: '1.2rem', md: '2.125rem' }, px: 2 }}>
                <TypeAnimation
                  sequence={[
                    'And just like that...', 1000,
                    'a new world opened.', 1500,
                    'No idea what lies ahead...', 1000,
                    'but curiosity is enough. (Scroll)', 2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  cursor={false}
                />
              </Typography>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
