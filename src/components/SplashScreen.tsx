import React, { useEffect, useState } from 'react';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  
  const textToType = "Selamat datang di website saya... Website ini dibuat sepenuhnya dengan AI, jadi jangan berharap banyak.";

  useEffect(() => {
    let typeIndex = 0;
    
    function typeSplash() {
      if (typeIndex < textToType.length) {
        setText(prev => prev + textToType.charAt(typeIndex));
        let delay = 60;
        if (textToType.charAt(typeIndex) === '.') delay = 600;
        typeIndex++;
        setTimeout(typeSplash, delay);
      } else {
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 1000);
        }, 2000);
      }
    }
    
    const timeout = setTimeout(typeSplash, 500);
    return () => clearTimeout(timeout);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 bg-black z-[999999] flex items-center justify-center p-5 transition-all duration-1000 ease-in-out font-light"
      style={{ opacity: isVisible ? 1 : 0, visibility: isVisible ? 'visible' : 'hidden' }}
    >
      <div className="text-white text-base md:text-2xl text-center max-w-[800px] leading-relaxed relative">
        <span>{text}</span>
        <span className="inline-block w-[2px] h-[1.2em] bg-[var(--accent)] align-middle animate-blink ml-1"></span>
      </div>
    </div>
  );
}
