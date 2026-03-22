import { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileCode2, Paintbrush, MonitorPlay } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const learningItems = [
  {
    title: 'HTML: The Skeleton',
    desc: 'Learning the structure. Every tag felt like magic.',
    icon: <FileCode2 size={40} color="#e34f26" />,
    color: '#e34f26',
  },
  {
    title: 'CSS: The Beauty',
    desc: 'Making things look good. Flexbox was a revelation.',
    icon: <Paintbrush size={40} color="#2965f1" />,
    color: '#2965f1',
  },
  {
    title: 'JavaScript: The Brains',
    desc: 'Making things move. Callbacks, promises, and a new dimension.',
    icon: <MonitorPlay size={40} color="#f7df1e" />,
    color: '#f7df1e',
  }
];

export default function LearningPhase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinning the section to show timeline evolution
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1500",
          scrub: 1,
          pin: true,
        }
      });

      tl.fromTo('.learning-card-0', { y: 100, opacity: 0 }, { y: 0, opacity: 1 })
        .fromTo('.learning-card-1', { y: 100, opacity: 0 }, { y: 0, opacity: 1 }, "+=0.5")
        .fromTo('.learning-card-2', { y: 100, opacity: 0 }, { y: 0, opacity: 1 }, "+=0.5")
        .fromTo('.timeline-line', { scaleY: 0 }, { scaleY: 1, transformOrigin: 'top center' }, 0);
        
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box ref={sectionRef} component="section" sx={{ minHeight: '100vh', py: 10, bgcolor: '#111', position: 'relative', display: 'flex', alignItems: 'center' }}>
      <Container>
        <Typography variant="h2" align="center" gutterBottom sx={{ color: '#00f0ff', mb: 8 }}>
          The Learning Phase
        </Typography>

        <Box sx={{ position: 'relative' }}>
          {/* Vertical Timeline Line */}
          <Box className="timeline-line" sx={{
            position: 'absolute',
            left: { xs: '30px', md: '50%' },
            top: 0,
            bottom: 0,
            width: '4px',
            bgcolor: 'rgba(255,255,255,0.1)',
            transform: 'translateX(-50%)',
            zIndex: 0
          }} />

          <Grid container spacing={6} ref={timelineRef}>
            {learningItems.map((item, index) => (
              <Grid item xs={12} md={6} key={index} 
                sx={{ 
                  ml: { xs: '50px', md: index % 2 === 0 ? 'auto' : 0 },
                  mr: { xs: 0, md: index % 2 !== 0 ? 'auto' : 0 },
                  pl: { md: index % 2 !== 0 ? 6 : 0 },
                  pr: { md: index % 2 === 0 ? 6 : 0 },
                  display: 'flex',
                  justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start'
                }}
              >
                <motion.div
                  className={`learning-card-${index}`}
                  whileHover={{ scale: 1.05, boxShadow: `0 0 25px ${item.color}55` }}
                  style={{ width: '100%', maxWidth: '400px', zIndex: 1 }}
                >
                  <Card sx={{ 
                    bgcolor: 'rgba(20,20,20,0.8)', 
                    border: `1px solid ${item.color}44`,
                    borderRadius: 4,
                    overflow: 'visible'
                  }}>
                    <CardContent sx={{ p: 4, position: 'relative' }}>
                      <Box sx={{ 
                        position: 'absolute',
                        top: '50%',
                        [index % 2 === 0 ? 'right' : 'left']: { xs: '-40px', md: '-60px' },
                        transform: 'translateY(-50%)',
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        bgcolor: item.color,
                        boxShadow: `0 0 15px ${item.color}`,
                        display: { xs: 'none', md: 'block' }
                      }} />
                      
                      <Box sx={{ mb: 2 }}>{item.icon}</Box>
                      <Typography variant="h5" gutterBottom sx={{ color: item.color, fontWeight: 700 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {item.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
