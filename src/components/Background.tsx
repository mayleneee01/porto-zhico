'use client';
import { useEffect, useState } from 'react';

export default function Background() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Floating shape 1 - Top Left */}
      <div className="absolute top-[5%] left-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-white/10 blur-3xl animate-float"></div>
      
      {/* Floating shape 2 - Bottom Right */}
      <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-white/[0.12] blur-3xl animate-float-delayed"></div>
      
      {/* Floating shape 3 - Center Right Diagonal */}
      <div className="absolute top-[40%] right-[20%] w-[20vw] h-[60vw] max-w-[300px] bg-white/5 blur-3xl rotate-45 animate-float-slow"></div>
      
      {/* Floating shape 4 - Bottom Left Square */}
      <div className="absolute bottom-[20%] left-[5%] w-[30vw] h-[30vw] max-w-[400px] bg-white/10 blur-3xl animate-float-delayed-2"></div>
    </div>
  );
}
