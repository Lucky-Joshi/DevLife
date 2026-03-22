import { useRef, useEffect } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileCode2, Paintbrush, MonitorPlay, Lock } from 'lucide-react';
import { useStory } from '../../context/StoryContext';

gsap.registerPlugin(ScrollTrigger);

const learningItems = [
  {
    id: 1,
    title: 'HTML: The Skeleton',
    desc: 'Learning the structure. Every tag felt like magic.',
    icon: <FileCode2 size={40} color="#e34f26" />,
    color: '#e34f26',
  },
  {
    id: 2,
    title: 'CSS: The Beauty',
    desc: 'Making things look good. Flexbox was a revelation.',
    icon: <Paintbrush size={40} color="#2965f1" />,
    color: '#2965f1',
  },
  {
    id: 3,
    title: 'JavaScript: The Brains',
    desc: 'Making things move. Callbacks, promises, and a new dimension.',
    icon: <MonitorPlay size={40} color="#f7df1e" />,
    color: '#f7df1e',
  }
];

export default function LearningPhase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { unlockedSkills, setUnlockedSkills } = useStory();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.learning-title', {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 50, opacity: 0, duration: 1
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleUnlock = (id) => {
    if (unlockedSkills === id - 1) {
      setUnlockedSkills(id);
    }
  };

  const getNarratorText = () => {
    if (unlockedSkills === 0) return 'At first, everything feels magical.';
    if (unlockedSkills === 1) return 'HTML gives structure...';
    if (unlockedSkills === 2) return 'CSS brings beauty...';
    if (unlockedSkills === 3) return 'JavaScript adds life...';
    return '';
  };

  return (
    <Box ref={sectionRef} component="section" sx={{ minHeight: '100vh', py: 10, bgcolor: 'rgba(17, 17, 17, 0.7)', position: 'relative', display: 'flex', alignItems: 'center' }}>
      <Container>
        <Typography className="learning-title" variant="h2" align="center" gutterBottom sx={{ color: '#00f0ff', mb: 2, fontWeight: 800, fontSize: { xs: '2.5rem', md: '3.75rem' } }}>
          The Excitement
        </Typography>
        
        <Box sx={{ minHeight: '60px', mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={unlockedSkills}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Typography className="learning-title" align="center" variant="h5" sx={{ color: '#bc13fe', fontFamily: '"Fira Code", monospace', fontSize: { xs: '1rem', md: '1.5rem' }, px: 2 }}>
                <TypeAnimation
                  key={unlockedSkills} // re-trigger type animation when state changes
                  sequence={[getNarratorText(), 2000]}
                  wrapper="span"
                  speed={50}
                  cursor={false}
                />
              </Typography>
            </motion.div>
          </AnimatePresence>
          <AnimatePresence>
            {unlockedSkills === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 2 }}
                style={{ marginTop: '20px' }}
              >
                <Typography align="center" variant="h6" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                  "Every small win feels like a big victory. You start to believe... you can build anything."
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        <Box sx={{ position: 'relative' }}>
          <Box className="timeline-line" sx={{
            position: 'absolute', left: { xs: '30px', md: '50%' }, top: 0, bottom: 0, width: '4px', bgcolor: 'rgba(255,255,255,0.1)', transform: 'translateX(-50%)', zIndex: 0
          }} />

          <Grid container spacing={6}>
            {learningItems.map((item, index) => {
              const isUnlocked = unlockedSkills >= item.id;
              const isNext = unlockedSkills === item.id - 1;

              return (
                <Grid size={{ xs: 12, md: 6 }} key={item.id} 
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
                    layout
                    whileHover={isUnlocked || isNext ? { scale: 1.05 } : {}}
                    whileTap={isNext ? { scale: 0.95 } : {}}
                    onClick={() => handleUnlock(item.id)}
                    style={{ width: '100%', maxWidth: '400px', cursor: isNext ? 'pointer' : (isUnlocked ? 'default' : 'not-allowed'), zIndex: 1 }}
                  >
                    <Card sx={{ 
                      bgcolor: isUnlocked ? 'rgba(20,20,20,0.9)' : 'rgba(10,10,10,0.5)', 
                      border: `2px solid ${isUnlocked ? item.color : '#333'}`,
                      boxShadow: isUnlocked ? `0 0 20px ${item.color}55` : (isNext ? '0 0 15px rgba(255,255,255,0.2)' : 'none'),
                      borderRadius: 4,
                      overflow: 'visible',
                      filter: (!isUnlocked && !isNext) ? 'grayscale(100%) opacity(0.5)' : 'none',
                      transition: 'all 0.4s ease'
                    }}>
                      <CardContent sx={{ p: 4, position: 'relative', textAlign: 'center' }}>
                        <Box sx={{ mb: 2 }}>{isUnlocked || isNext ? item.icon : <Lock size={40} color="#555" />}</Box>
                        <Typography variant="h5" gutterBottom sx={{ color: isUnlocked ? item.color : '#fff', fontWeight: 700 }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {isUnlocked ? item.desc : (isNext ? 'Click to Learn' : 'Locked')}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
