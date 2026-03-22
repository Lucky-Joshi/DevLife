import { useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import theme from './theme';
import './index.css';

// Sections
import HeroSection from './components/sections/HeroSection';
import LearningPhase from './components/sections/LearningPhase';
import DebuggingChaos from './components/sections/DebuggingChaos';
import ProjectsShowcase from './components/sections/ProjectsShowcase';
import FinaleSection from './components/sections/FinaleSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HeroSection />
      <LearningPhase />
      <DebuggingChaos />
      <ProjectsShowcase />
      <FinaleSection />
    </ThemeProvider>
  );
}

export default App;
