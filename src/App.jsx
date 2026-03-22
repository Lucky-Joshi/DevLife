import { useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import theme from './theme';
import './index.css';

import HeroSection from './components/sections/HeroSection';
import LearningPhase from './components/sections/LearningPhase';
import DebuggingChaos from './components/sections/DebuggingChaos';
import ProjectsShowcase from './components/sections/ProjectsShowcase';
import FinaleSection from './components/sections/FinaleSection';
import ThreeBackground from './components/ThreeBackground';
import { StoryProvider, useStory } from './context/StoryContext';
import MusicPlayer from './components/MusicPlayer';

gsap.registerPlugin(ScrollTrigger);

function MainApp() {
  const { unlockedHero } = useStory();

  useEffect(() => {
    // Only enable scroll if Hero is unlocked!
    if (!unlockedHero) {
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = 'auto';

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
      document.body.style.overflow = 'auto';
    };
  }, [unlockedHero]);

  return (
    <>
      <ThreeBackground />
      <MusicPlayer />
      <HeroSection />
      <LearningPhase />
      <DebuggingChaos />
      <ProjectsShowcase />
      <FinaleSection />
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StoryProvider>
        <MainApp />
      </StoryProvider>
    </ThemeProvider>
  );
}

export default App;
