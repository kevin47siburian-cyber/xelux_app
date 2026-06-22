import React, { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'E-Commerce Dashboard',
    description: 'Dashboard rekayasa sistem untuk manajemen penjualan dengan analisis data realtime.',
    tags: ['React', 'Tailwind', 'Node.js'],
    color: '#E34F26'
  },
  {
    title: 'AI Assistant Bot',
    description: 'Asisten virtual cerdas yang bisa membantu tugas pemrograman dan tanya jawab, menggunakan Gemini API.',
    tags: ['Next.js', 'LLM', 'AI'],
    color: '#8B5CF6'
  },
  {
    title: 'Portofolio Interaktif',
    description: 'Website portofolio dengan synthwave vibes, animasi transisi keren, dan AI chat.',
    tags: ['React', 'Vite', 'CSS Animation'],
    color: '#EC4899'
  }
];

export default function ProjectSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5000); // Ganti slide setiap 5 detik
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-10">
      <div 
        className="flex transition-transform duration-700 ease-in-out" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {projects.map((project, index) => (
          <div key={index} className="w-full shrink-0 px-4 md:px-10">
            <div 
              className="glass-card relative overflow-hidden rounded-2xl p-8 h-full flex flex-col justify-between hover:border-[var(--accent)] transition-all duration-300"
              style={{ '--accent': project.color } as React.CSSProperties}
            >
              {/* Animated glow background */}
              <div 
                className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-[80px] opacity-20 pointer-events-none"
                style={{ backgroundColor: project.color }}
              ></div>

              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  {project.title}
                </h3>
                <p className="text-[var(--text-dim)] leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 text-xs font-semibold rounded-full bg-white/5 border border-white/10 text-[var(--text-dim)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--accent)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                  <ExternalLink size={18} /> Demo
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors">
                  <Github size={18} /> Kode
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Indicators */}
      <div className="flex justify-center gap-3 mt-8">
        {projects.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-[var(--accent)]' : 'w-2 bg-white/20'}`}
          />
        ))}
      </div>
    </div>
  );
}
