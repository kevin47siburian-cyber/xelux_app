import React, { useEffect, useState } from 'react';

export default function DragonTransition() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleTransition = () => {
      setIsActive(true);
      setTimeout(() => {
        setIsActive(false);
      }, 1600);
    };

    window.addEventListener('trigger-transition', handleTransition);
    return () => window.removeEventListener('trigger-transition', handleTransition);
  }, []);

  return (
    <div 
      className={`fixed top-0 left-[-100vw] w-[100vw] h-[100vh] bg-zinc-950/98 backdrop-blur-md z-[99999] pointer-events-none flex items-center justify-center border-r-[3px] border-[#00f3ff] shadow-[20px_0_60px_rgba(0,243,255,0.4)] ${isActive ? 'animate-wipeAcross' : ''}`}
    >
      <svg viewBox="0 0 270 100" className="w-[320px] h-auto drop-shadow-[0_0_15px_rgba(0,243,255,0.8)] animate-swim" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 50 C 30 10, 50 90, 80 50 C 110 10, 140 90, 180 50 C 200 30, 215 35, 230 50" stroke="#00f3ff" strokeWidth="8" strokeLinecap="round" fill="none"/>
        <path d="M10 50 C 30 10, 50 90, 80 50 C 110 10, 140 90, 180 50 C 200 30, 215 35, 230 50" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M 25 35 L 30 25 L 35 35 M 45 65 L 50 75 L 55 65 M 65 35 L 70 25 L 75 35 M 125 35 L 130 25 L 135 35 M 165 35 L 170 25 L 175 35" stroke="#c084fc" strokeWidth="2" strokeLinejoin="round" fill="none" />
        <path d="M220 40 L 240 45 L 235 55 L 220 60 Z" fill="#00f3ff" />
        <path d="M225 42 Q 215 30 205 25" stroke="#c084fc" strokeWidth="2" fill="none"/>
        <path d="M220 58 Q 210 70 200 75" stroke="#c084fc" strokeWidth="2" fill="none"/>
        <path d="M235 50 Q 250 60 260 50" stroke="#fff" strokeWidth="1" fill="none"/>
      </svg>
    </div>
  );
}
