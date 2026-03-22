import { useEffect, useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion, useAnimation, useInView } from 'framer-motion';

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
        bgcolor: '#050505',
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
        <Typography variant="h1" sx={{ color: '#fff', fontWeight: 800, mb: 2, fontSize: { xs: '3rem', md: '5rem' } }}>
          You are now a
        </Typography>
        <Typography 
          variant="h1" 
          sx={{ 
            background: 'linear-gradient(45deg, #00f0ff 30%, #bc13fe 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
            fontSize: { xs: '4rem', md: '6rem' }
          }}
        >
          DEVELOPER
        </Typography>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { delay: 1, duration: 1 } }
          }}
          initial="hidden"
          animate={mainControls}
        >
          <Typography variant="h5" sx={{ color: 'text.secondary', mt: 4, mb: 8, maxWidth: '600px', mx: 'auto' }}>
            The bugs never truly disappear, but your ability to conquer them becomes legendary.
          </Typography>

          <Button 
            variant="outlined" 
            size="large"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            sx={{ 
              borderColor: '#00f0ff', 
              color: '#00f0ff',
              '&:hover': {
                borderColor: '#bc13fe',
                bgcolor: 'rgba(188,19,254,0.1)'
              },
              px: 4, py: 1.5,
              fontSize: '1.2rem',
              borderRadius: '50px'
            }}
          >
            Start Another Project
          </Button>
        </motion.div>
      </motion.div>
    </Box>
  );
}
