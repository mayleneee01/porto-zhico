'use client';

import { useState, useEffect } from 'react';
import LoadingIntro from './LoadingIntro';
import { motion } from 'framer-motion';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  useEffect(() => {
    if (!introComplete) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [introComplete]);

  const handleComplete = () => {
    window.scrollTo(0, 0);
    setIntroComplete(true);
  };

  return (
    <>
      {!introComplete && (
        <LoadingIntro onComplete={handleComplete} />
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
