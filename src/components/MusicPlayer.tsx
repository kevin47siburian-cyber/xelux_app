import React, { useState, useRef, useEffect } from 'react';
import { Disc3 } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="https://res.cloudinary.com/dqo4rx5xx/video/upload/v1740927768/Nadhif_Basalamah_-_bergema_sampai_selamanya_Official_Lyric_Video_jqmpb5.mp4" type="audio/mpeg" />
      </audio>

      <button 
        className={`fixed right-6 bottom-[90px] w-[50px] h-[50px] rounded-full bg-[var(--surface)] border text-2xl flex items-center justify-center cursor-pointer z-[90] backdrop-blur-md transition-all duration-300 md:bottom-[90px] md:right-6 md:w-[50px] md:h-[50px] bottom-[85px] right-4 w-11 h-11 ${
          isPlaying 
            ? 'border-[#2dd4bf] text-[#2dd4bf]' 
            : 'border-[var(--border)] text-[var(--text-dim)]'
        }`}
        onClick={toggleMusic}
        aria-label="Putar Musik"
      >
        <Disc3 className={isPlaying ? 'animate-spin' : ''} />
      </button>
    </>
  );
}
