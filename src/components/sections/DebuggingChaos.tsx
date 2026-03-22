import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const fakeLogs = [
  "> compilling app...",
  "> Warning: React Hook useEffect has a missing dependency",
  "> ERROR: Uncaught TypeError: Cannot read properties of undefined (reading 'map')",
  "> ERROR: module not found: can't resolve 'fs'",
  "> Unhandled Rejection (TypeError): fetch failed",
  "> ERROR in ./src/App.tsx 45:10",
];

export default function DebuggingChaos() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [logs, setLogs] = useState<string[]>([]);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Glitch effect on scroll enter
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",
        onEnter: () => {
          gsap.to('.glitch-bg', { opacity: 0.1, duration: 0.1, repeat: 5, yoyo: true });
          gsap.to('.terminal-container', { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1 });
          
          // Populate logs
          let delay = 0;
          fakeLogs.forEach((log) => {
            setTimeout(() => {
              setLogs(prev => [...prev, log]);
            }, delay);
            delay += 400 + Math.random() * 800;
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box ref={sectionRef} component="section" sx={{ 
      minHeight: '100vh', 
      py: 10, 
      bgcolor: '#0f0202', // Subtle red tint
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      <Box className="glitch-bg" sx={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(45deg, rgba(255,0,0,0.1) 0%, transparent 100%)',
        opacity: 0,
        pointerEvents: 'none'
      }} />

      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, justifyContent: 'center', gap: 2 }}>
            <AlertCircle color="#ff3366" size={48} />
            <Typography variant="h2" sx={{ color: '#ff3366', fontFamily: '"Fira Code", monospace' }}>
              DEBUGGING CHAOS
            </Typography>
          </Box>
          <Typography variant="h6" align="center" sx={{ color: 'text.secondary', mb: 8 }}>
            Will it ever compile? The endless cycle of StackOverflow and tears.
          </Typography>

          <Paper
            className="terminal-container"
            elevation={24}
            sx={{
              bgcolor: '#000',
              border: '1px solid #330000',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 0 40px rgba(255, 51, 102, 0.2)'
            }}
          >
            <Box sx={{ bgcolor: '#1a1a1a', p: 1.5, display: 'flex', gap: 1 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5f56' }} />
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#27c93f' }} />
            </Box>
            
            <Box ref={terminalRef} sx={{ p: 4, height: 350, overflowY: 'auto', fontFamily: '"Fira Code", monospace' }}>
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{
                    color: log.includes('ERROR') ? '#ff3366' : log.includes('Warning') ? '#ffbd2e' : '#27c93f',
                    marginBottom: '16px',
                    fontSize: '1.1rem'
                  }}
                >
                  {log}
                </motion.div>
              ))}
              {logs.length > 0 && (
                <motion.span
                  animate={{ opacity: [0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.4 }}
                  style={{ display: 'inline-block', width: 10, height: 20, backgroundColor: '#fff', marginTop: 16 }}
                />
              )}
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
