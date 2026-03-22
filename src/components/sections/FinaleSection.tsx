import { useEffect, useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion, useAnimation, useInView } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

export default function FinaleSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-200px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <Box
      ref={containerRef}
      component="section"
      sx={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'transparent',
        overflow: 'hidden',
        textAlign: 'center'
      }}
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(circle, rgba(188, 19, 254, 0.15) 0%, transparent 70%)',
        filter: 'blur(60px)',
        zIndex: 0,
      }} />

      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { duration: 1.5, ease: "easeOut" } }
        }}
        initial="hidden"
        animate={mainControls}
        style={{ zIndex: 1 }}
      >
        <Typography variant="h2" sx={{ color: '#00f0ff', fontWeight: 800, mb: 1, fontSize: { xs: '2.5rem', md: '3.75rem' }, textAlign: 'center' }}>
          The Transformation
        </Typography>
        
        <Box sx={{ minHeight: '120px', mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography align="center" variant="h4" sx={{ color: '#bc13fe', fontFamily: '"Fira Code", monospace', minHeight: '60px', fontSize: { xs: '1.2rem', md: '2.125rem' }, px: 2 }}>
            <TypeAnimation
              sequence={[
                'The late nights...', 1000,
                'The errors...', 1000,
                'The frustration...', 1000,
              ]}
              wrapper="span"
              speed={50}
              cursor={false}
            />
          </Typography>
          
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { delay: 4, duration: 2 } }
            }}
            initial="hidden"
            animate={mainControls}
          >
            <Typography align="center" variant="h5" sx={{ color: 'text.secondary', fontStyle: 'italic', mt: 4 }}>
              "It was all part of the journey.<br/>You didn't just learn to code..."
            </Typography>
            <Typography align="center" variant="h4" sx={{ color: 'text.primary', fontWeight: 'bold', mt: 1 }}>
              You became a developer.
            </Typography>
          </motion.div>
        </Box>

        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { delay: 6.5, duration: 2 } }
          }}
          initial="hidden"
          animate={mainControls}
        >
          <Typography 
            variant="h1" 
            sx={{ 
              background: 'linear-gradient(45deg, #00f0ff 30%, #bc13fe 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '4rem' },
              mb: 4,
              textAlign: 'center'
            }}
          >
            Welcome to the world of builders.
          </Typography>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { delay: 8, duration: 1 } }
          }}
          initial="hidden"
          animate={mainControls}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', mb: 8, color: '#00f0ff', fontFamily: '"Fira Code", monospace', fontSize: '1.2rem' }}>
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>Bugs fixed: ∞</Typography>
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>Coffee consumed: ☕☕☕☕☕</Typography>
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>Sleep lost: Yes</Typography>
          </Box>

          <Button 
            variant="outlined" 
            size="large"
            onClick={() => window.location.reload()}
            sx={{ 
              color: '#00f0ff', 
              borderColor: '#00f0ff',
              fontFamily: '"Fira Code", monospace',
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
                bgcolor: 'rgba(0, 240, 255, 0.1)',
                borderColor: '#bc13fe',
                color: '#bc13fe'
              }
            }}
          >
            Start Again
          </Button>
        </motion.div>
      </motion.div>
    </Box>
  );
}
