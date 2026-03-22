import { useEffect, useRef } from 'react';

const AUDIO_SRC = '/Build%20The%20Web.m4a';

export default function MusicPlayer() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.4;

    const tryPlay = () => {
      audio.play().catch(() => {});
    };

    // Try immediately, then on first interaction
    tryPlay();
    window.addEventListener('click', tryPlay, { once: true });
    window.addEventListener('keydown', tryPlay, { once: true });
    window.addEventListener('touchstart', tryPlay, { once: true });

    return () => {
      window.removeEventListener('click', tryPlay);
      window.removeEventListener('keydown', tryPlay);
      window.removeEventListener('touchstart', tryPlay);
    };
  }, []);

  return <audio ref={audioRef} src={AUDIO_SRC} loop preload="auto" />;
}
