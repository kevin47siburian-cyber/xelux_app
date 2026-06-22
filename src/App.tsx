import React, { useEffect, useState } from 'react';
import SynthwaveBackground from './components/SynthwaveBackground';
import DragonTransition from './components/DragonTransition';
import SplashScreen from './components/SplashScreen';
import Sidebar from './components/Sidebar';
import AIChat from './components/AIChat';
import MusicPlayer from './components/MusicPlayer';
import { User, Building, Trophy, Code, Mail, AppWindow, FileCode, FileCode2, Brain, GraduationCap } from 'lucide-react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Intersection observer for reveals and active section
  useEffect(() => {
    if (showSplash) return;

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting && entry.intersectionRatio > 0.5) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('section').forEach(el => sectionObserver.observe(el));

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, [showSplash]);

  // Hero Typing Effect
  const [heroTyping, setHeroTyping] = useState('');
  useEffect(() => {
    if (showSplash) return;

    const roles = ["Siswa RPL.", "Web Developer.", "UI/UX Enthusiast."];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    function type() {
      const currentRole = roles[roleIdx];
      
      if (isDeleting) {
        setHeroTyping(currentRole.substring(0, charIdx - 1));
        charIdx--;
      } else {
        setHeroTyping(currentRole.substring(0, charIdx + 1));
        charIdx++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIdx === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeSpeed = 500;
      }

      timeoutId = setTimeout(type, typeSpeed);
    }

    timeoutId = setTimeout(type, 1000);
    return () => clearTimeout(timeoutId);
  }, [showSplash]);

  return (
    <>
      <SynthwaveBackground />
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <DragonTransition />
      <MusicPlayer />
      <AIChat />
      
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} activeSection={activeSection} />

      <main className="md:ml-[var(--sidebar-width)] ml-0 py-15 px-[5%] md:px-[8%] min-h-screen">
        <section id="home" className="reveal min-h-[80vh] flex flex-col justify-center border-b-0 pb-20">
          <span className="text-[16px] text-[var(--accent)] tracking-[2px] uppercase mb-4 block">Portofolio Pribadi</span>
          <h2 className="text-[clamp(40px,5vw,64px)] font-bold leading-[1.1] mb-6">Hi, Saya <span className="text-[var(--accent)] text-shadow-glow">Kevin Creig N.S</span></h2>
          <p className="text-[var(--text-dim)] text-[clamp(18px,2vw,24px)]">Seorang <span className="text-white">{heroTyping}</span><span className="inline-block w-[2px] h-[1.2em] bg-[var(--accent)] align-middle animate-blink ml-1"></span></p>
          <br /><br />
          <p className="text-[var(--text-dim)] max-w-[600px] italic">
            "Kamu berhak mencintai seseorang, tetapi kamu berhak juga untuk memprioritaskan kebahagiaan dirimu sendiri."
          </p>
        </section>

        <section id="tentang" className="reveal py-20 border-b border-[var(--border)]">
          <h2 className="section-title"><User className="text-[var(--accent)]" size={32} /> Tentang Saya</h2>
          <p className="text-[var(--text-dim)] max-w-[700px] text-base leading-relaxed">
            Saya Kevin Creig, siswa SMK dengan ketertarikan besar pada teknologi, pemrograman, dan pengembangan proyek digital. 
            Halaman ini menjadi tempat saya mendokumentasikan perjalanan belajar, pendidikan, dan hal-hal yang sedang saya kerjakan.
          </p>
        </section>

        <section id="pendidikan" className="reveal py-20 border-b border-[var(--border)]">
          <h2 className="section-title"><GraduationCap className="text-[var(--accent)]" size={32} /> Pendidikan & Prestasi</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
            <div className="glass-card p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-[rgba(192,132,252,0.1)] text-[var(--accent)] flex items-center justify-center mb-5">
                <Building size={24} />
              </div>
              <h3 className="mb-2 font-semibold text-lg">SMK Bhakti Mulia Pare</h3>
              <p className="text-[var(--text-dim)] text-sm">Jurusan RPL — Rekayasa Perangkat Lunak</p>
            </div>
            <div className="glass-card p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl text-[var(--text-dim)] bg-white/5 flex items-center justify-center mb-5">
                <Trophy size={24} />
              </div>
              <h3 className="mb-2 font-semibold text-lg text-[var(--text-dim)]">Prestasi</h3>
              <p className="text-[var(--text-dim)] text-sm">Sedang disiapkan...</p>
            </div>
          </div>
        </section>

        <section id="stack" className="reveal py-20 border-b border-[var(--border)]">
          <h2 className="section-title"><Code className="text-[var(--accent)]" size={32} /> Tech Stack</h2>
          <div className="flex flex-wrap gap-4">
            <div className="stack-pill px-6 py-3 rounded-full flex items-center gap-2 text-sm">
              <AppWindow size={20} color="#E34F26" /> HTML5
            </div>
            <div className="stack-pill px-6 py-3 rounded-full flex items-center gap-2 text-sm">
              <AppWindow size={20} color="#1572B6" /> CSS3
            </div>
            <div className="stack-pill px-6 py-3 rounded-full flex items-center gap-2 text-sm">
              <Code size={20} color="#F7DF1E" /> JavaScript
            </div>
            <div className="stack-pill px-6 py-3 rounded-full flex items-center gap-2 text-sm">
              <Brain size={20} className="text-[var(--accent)]" /> AI Integration
            </div>
          </div>
        </section>

        <section id="kontak" className="reveal pt-20 pb-28">
          <h2 className="section-title"><Mail className="text-[var(--accent)]" size={32} /> Kontak</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
            <a href="https://www.tiktok.com/@xelux" target="_blank" rel="noreferrer" className="glass-card flex items-center gap-4 p-5 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff0050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              <div>
                <h4 className="m-0 font-semibold text-base">TikTok</h4>
                <span className="text-[var(--text-dim)] text-sm">@xelux</span>
              </div>
            </a>
            
            <a href="https://www.instagram.com/xelux.dev" target="_blank" rel="noreferrer" className="glass-card flex items-center gap-4 p-5 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              <div>
                <h4 className="m-0 font-semibold text-base">Instagram</h4>
                <span className="text-[var(--text-dim)] text-sm">@xelux.dev</span>
              </div>
            </a>

            <a href="https://wa.me/6285857559022" target="_blank" rel="noreferrer" className="glass-card flex items-center gap-4 p-5 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <div>
                <h4 className="m-0 font-semibold text-base">WhatsApp</h4>
                <span className="text-[var(--text-dim)] text-sm">+62 858-5755-9022</span>
              </div>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
