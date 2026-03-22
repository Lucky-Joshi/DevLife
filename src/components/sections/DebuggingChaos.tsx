import { useState, useRef, useEffect } from 'react';
import { Box, Typography, Container, Paper, TextField } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { AlertCircle, TerminalSquare } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStory } from '../../context/StoryContext';

gsap.registerPlugin(ScrollTrigger);

export default function DebuggingChaos() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { fixedBug, setFixedBug } = useStory();
  
  // Terminal State
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<{text: string, type: 'in' | 'out'}[]>([
    { text: 'DevOS Terminal v1.0.0', type: 'out' },
    { text: 'Type a command to interact...', type: 'out' }
  ]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.bug-container', {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        y: 50, opacity: 0, duration: 0.8
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleTerminalSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && terminalInput.trim()) {
      const input = terminalInput.trim().toLowerCase();
      let response = '';

      if (input === 'npm install success') {
        response = 'Error: success is deprecated. Please install hard_work@latest instead.';
      } else if (input === 'run life.exe') {
        response = 'life.exe is not responding. Have you tried turning it off and on?';
      } else if (input === 'fix bugs') {
        response = 'Nice try. Bugs fix YOU.';
      } else if (input === 'clear') {
        setTerminalLogs([]);
        setTerminalInput('');
        return;
      } else {
        response = `Command not found: ${input}`;
      }

      setTerminalLogs(prev => [...prev, { text: `> ${input}`, type: 'in' }, { text: response, type: 'out' }]);
      setTerminalInput('');
    }
  };

  const handleFixBug = () => {
    if (!fixedBug) {
      setFixedBug(true);
    }
  };

  return (
    <Box ref={sectionRef} component="section" sx={{ 
      minHeight: '100vh', 
      py: 10, 
      bgcolor: fixedBug ? 'rgba(39, 201, 63, 0.1)' : 'rgba(15, 2, 2, 0.7)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      transition: 'background-color 1s ease'
    }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom sx={{ color: fixedBug ? '#27c93f' : '#ff3366', mb: 2, fontWeight: 800, fontSize: { xs: '2.5rem', md: '3.75rem' } }}>
          The Reality Hit
        </Typography>

        <Box sx={{ minHeight: '120px', mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={fixedBug ? 'fixed' : 'broken'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{ textAlign: 'center' }}
            >
              <Typography align="center" variant="h5" sx={{ color: '#bc13fe', fontFamily: '"Fira Code", monospace', minHeight: '60px', fontSize: { xs: '1rem', md: '1.5rem' }, px: 2 }}>
                <TypeAnimation
                  key={fixedBug ? 'fixed' : 'broken'}
                  sequence={
                    fixedBug 
                    ? ['Fixed it.', 1000, 'Fixed it... Or... maybe not.', 1000]
                    : ['Then... reality hits.', 1000, 'Why isn\'t this working?', 1000, 'It worked yesterday...', 1000, 'Just one more bug...', 1000]
                  }
                  wrapper="span"
                  speed={50}
                  cursor={false}
                />
              </Typography>
              {fixedBug && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3, duration: 1 }}
                >
                  <Typography align="center" variant="h6" sx={{ color: 'text.secondary', fontStyle: 'italic', mt: 2 }}>
                    "You learn the truth... Coding isn't just building... It's debugging your own mistakes."
                  </Typography>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, justifyContent: 'center', gap: 2 }}>
          <AlertCircle color={fixedBug ? "#27c93f" : "#ff3366"} size={48} />
          <Typography variant="h3" sx={{ color: fixedBug ? '#27c93f' : '#ff3366', fontFamily: '"Fira Code", monospace', fontWeight: 800 }}>
            {fixedBug ? 'ANOTHER ERROR' : 'SYSTEM FAILURE'}
          </Typography>
        </Box>

        <Box className="bug-container" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* Fix The Bug Minigame */}
          <Box sx={{ flex: 1 }}>
            <Paper elevation={24} sx={{ bgcolor: '#000', border: `1px solid ${fixedBug ? '#27c93f' : '#ff3366'}`, borderRadius: 2, overflow: 'hidden', p: 3, position: 'relative' }}>
              <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>The Logic Error</Typography>
              <Typography sx={{ color: 'text.secondary', fontFamily: '"Fira Code", monospace', mb: 3 }}>
                The authentication failed in production. Find the logic error. (Click the bug to fix)
              </Typography>
              
              <Box sx={{ fontFamily: '"Fira Code", monospace', fontSize: '1.2rem', lineHeight: 1.8, bgcolor: '#1a1a1a', p: 3, borderRadius: 2 }}>
                <Box sx={{ color: '#bc13fe' }}>function <span style={{color: '#00f0ff'}}>login</span>(user) {'{'}</Box>
                  <Box sx={{ pl: 4, my: 1, display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#ffbd2e', marginRight: '8px' }}>if (user </span> 
                    
                    {!fixedBug ? (
                      <motion.div 
                        whileHover={{ scale: 1.2, color: '#ff3366' }} 
                        onClick={handleFixBug}
                        style={{ display: 'inline-block', cursor: 'pointer', backgroundColor: 'rgba(255,51,102,0.2)', padding: '0 4px', borderRadius: '4px' }}
                      >
                        =
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ scale: 2, color: '#ff3366' }}
                        animate={{ scale: 1, color: '#27c93f' }}
                        style={{ display: 'inline-block', backgroundColor: 'rgba(39,201,63,0.2)', padding: '0 4px', borderRadius: '4px' }}
                      >
                        ===
                      </motion.div>
                    )}
                    
                    <span style={{ color: '#ffbd2e', marginLeft: '8px' }}> "admin") {'{'}</span>
                    
                    {!fixedBug && (
                      <Typography variant="caption" sx={{ ml: 2, color: '#ff3366', animation: 'pulse 1s infinite' }}>
                        &lt;-- Click to Fix!
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ pl: 8, my: 1, color: '#a0a0a0' }}>return <span style={{color: '#27c93f'}}>"Access Granted"</span>;</Box>
                  <Box sx={{ pl: 4, color: '#ffbd2e' }}>{'}'}</Box>
                <Box sx={{ color: '#bc13fe' }}>{'}'}</Box>
              </Box>

              {fixedBug && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '20px', textAlign: 'center' }}>
                  <Typography sx={{ color: '#27c93f', fontWeight: 'bold', fontSize: '1.2rem' }}>System Restored.</Typography>
                </motion.div>
              )}
            </Paper>
          </Box>

          {/* Interactive Terminal */}
          <Box sx={{ flex: 1, minHeight: '300px' }}>
            <Paper elevation={24} sx={{ bgcolor: '#000', border: '1px solid #333', borderRadius: 2, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Box sx={{ bgcolor: '#1a1a1a', p: 1.5, display: 'flex', gap: 1, alignItems: 'center' }}>
                <TerminalSquare size={18} color="#00f0ff" />
                <Typography sx={{ color: '#fff', fontSize: '0.9rem', ml: 1 }}>System Terminal</Typography>
              </Box>
              
              <Box sx={{ p: 3, flex: 1, overflowY: 'auto', fontFamily: '"Fira Code", monospace', minHeight: '250px' }}>
                {terminalLogs.map((log, i) => (
                  <Box key={i} sx={{ color: log.type === 'in' ? '#00f0ff' : '#a0a0a0', mb: 1, fontSize: '1rem' }}>
                    {log.text}
                  </Box>
                ))}
                
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Typography sx={{ color: '#27c93f', mr: 2 }}>$&gt;</Typography>
                  <TextField 
                    variant="standard"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    onKeyDown={handleTerminalSubmit}
                    InputProps={{ disableUnderline: true, sx: { color: '#fff', fontFamily: '"Fira Code", monospace' } }}
                    sx={{ flex: 1 }}
                    placeholder="try: npm install success"
                  />
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
