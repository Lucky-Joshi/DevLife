import { useState, useRef, useEffect } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, IconButton, Modal, Backdrop, Fade } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { X, ExternalLink, Github } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 'ai-assistant',
    title: 'AI Companion',
    desc: 'Cutting-edge AI integrated into a sleek web interface.',
    color: '#00f0ff',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'os-project',
    title: 'Open Source UI',
    desc: 'A robust component library used by thousands of developers.',
    color: '#bc13fe',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'bots',
    title: 'Automated Bots',
    desc: 'Complex data crawlers and trading algorithms written in Rust.',
    color: '#27c93f',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop'
  }
];

export default function ProjectsShowcase() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <Box ref={sectionRef} component="section" sx={{ minHeight: '100vh', py: 15, bgcolor: 'rgba(10, 10, 10, 0.5)' }}>
      <Container>
        <Typography variant="h2" align="center" gutterBottom sx={{ color: '#00f0ff', mb: 2, fontWeight: 800, fontSize: { xs: '2.5rem', md: '3.75rem' } }}>
          The Growth
        </Typography>

        <Box sx={{ minHeight: '60px', mb: 8, display: 'flex', justifyContent: 'center' }}>
          <Typography align="center" variant="h5" sx={{ color: '#bc13fe', fontFamily: '"Fira Code", monospace', fontSize: { xs: '1rem', md: '1.5rem' }, px: 2 }}>
            <TypeAnimation
              sequence={[
                'Somewhere between the bugs... you start understanding.', 1500,
                'You stop copying...', 1000,
                'You start creating.', 2000
              ]}
              wrapper="span"
              speed={50}
              cursor={false}
            />
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {projects.map((item) => (
            <Grid size={{ xs: 12, md: 4 }} key={item.id} className="project-card">
              <motion.div
                layoutId={`card-container-${item.id}`}
                onClick={() => setSelectedId(item.id)}
                whileHover={{ y: -10, scale: 1.02 }}
                style={{ cursor: 'pointer', height: '100%' }}
              >
                <Card sx={{ height: '100%', bgcolor: '#151515', border: `1px solid ${item.color}33`, p: 2 }}>
                  <motion.div layoutId={`card-image-container-${item.id}`}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.image}
                      alt={item.title}
                      sx={{ borderRadius: 2 }}
                    />
                  </motion.div>
                  <CardContent sx={{ px: 0, pb: 0 }}>
                    <motion.div layoutId={`card-title-${item.id}`}>
                      <Typography variant="h5" sx={{ color: item.color, fontWeight: 700, mt: 2 }}>
                        {item.title}
                      </Typography>
                    </motion.div>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                      {item.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <AnimatePresence>
          {selectedId && (
            <Modal
              open={!!selectedId}
              onClose={() => setSelectedId(null)}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  sx: { backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(10px)' }
                }
              }}
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Fade in={!!selectedId}>
                <Box>
                  {projects.filter(p => p.id === selectedId).map(item => (
                    <motion.div
                      key={item.id}
                      layoutId={`card-container-${item.id}`}
                      style={{
                        outline: 'none',
                        background: '#151515',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        maxWidth: '800px',
                        width: '90vw',
                        boxShadow: `0 0 50px ${item.color}33`
                      }}
                    >
                      <Box sx={{ position: 'relative' }}>
                        <motion.div layoutId={`card-image-container-${item.id}`}>
                          <CardMedia
                            component="img"
                            height="400"
                            image={item.image}
                            alt={item.title}
                          />
                        </motion.div>
                        <IconButton
                          onClick={() => setSelectedId(null)}
                          sx={{ position: 'absolute', top: 16, right: 16, bgcolor: 'rgba(0,0,0,0.5)', color: 'white' }}
                        >
                          <X />
                        </IconButton>
                      </Box>
                      <Box sx={{ p: { xs: 2, md: 4 } }}>
                        <motion.div layoutId={`card-title-${item.id}`}>
                          <Typography variant="h3" sx={{ color: item.color, fontWeight: 800, mb: 2, fontSize: { xs: '1.5rem', md: '3rem' } }}>
                            {item.title}
                          </Typography>
                        </motion.div>
                        <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', mb: 4, minHeight: '100px' }}>
                          <Typography variant="h6" sx={{ color: '#00f0ff', fontStyle: 'italic', fontFamily: '"Fira Code", monospace' }}>
                            <TypeAnimation
                              key={item.id}
                              sequence={[
                                'This isn\'t just code anymore...', 1000,
                                'This is something you built.', 1000,
                                'Something that works.', 2000
                              ]}
                              wrapper="span"
                              speed={50}
                              cursor={false}
                            />
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <IconButton sx={{ color: 'white', border: '1px solid #333' }}>
                            <Github />
                          </IconButton>
                          <IconButton sx={{ color: 'white', border: '1px solid #333' }}>
                            <ExternalLink />
                          </IconButton>
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </Fade>
            </Modal>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
}
