import React from 'react';
import { Home, User, GraduationCap, Code, Mail, Menu, X, Instagram } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeSection: string;
}

export default function Sidebar({ isOpen, setIsOpen, activeSection }: SidebarProps) {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    // Trigger the slide transition
    window.dispatchEvent(new CustomEvent('trigger-transition'));
    
    // Close sidebar on mobile
    if (window.innerWidth <= 900) {
      setIsOpen(false);
    }
    
    // Scroll handling
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'auto';
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView();
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 750);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'tentang', label: 'Tentang', icon: User },
    { id: 'pendidikan', label: 'Pendidikan', icon: GraduationCap },
    { id: 'stack', label: 'Tech Stack', icon: Code },
    { id: 'kontak', label: 'Kontak', icon: Mail }
  ];

  return (
    <>
      <button 
        className="md:hidden fixed top-5 right-5 w-11 h-11 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] z-[110] flex items-center justify-center cursor-pointer backdrop-blur-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`fixed top-0 left-0 bottom-0 w-[var(--sidebar-width)] bg-zinc-950/85 backdrop-blur-md border-r border-[var(--border)] py-10 flex flex-col z-[100] transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="text-center px-8 pb-8 border-b border-[var(--border)]">
          <div className="w-[120px] h-[120px] rounded-full mx-auto mb-5 p-1 border-2 border-[var(--accent)] relative">
            <div className="absolute -inset-[6px] rounded-full border border-[var(--accent-glow)] animate-pulse-ring"></div>
            <img src="https://res.cloudinary.com/dqo4rx5xx/image/upload/v1782056317/images_1_tzutko.jpg" alt="Kevin Creig N.S" className="w-full h-full rounded-full object-cover" />
          </div>
          <h1 className="text-xl font-semibold mb-2">Kevin Creig</h1>
          <p className="text-sm text-[var(--text-dim)]">Siswa RPL & Developer</p>
        </div>
        
        <nav className="flex-1 py-8 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a 
                key={item.id}
                href={`#${item.id}`} 
                onClick={(e) => handleNavClick(e, item.id)}
                className={`flex items-center gap-4 py-3 px-8 text-[var(--text-dim)] transition-all duration-300 cursor-pointer hover:text-[var(--accent)] hover:bg-[rgba(192,132,252,0.1)] hover:border-r-[3px] hover:border-[var(--accent)] ${activeSection === item.id ? 'text-[var(--accent)] bg-[rgba(192,132,252,0.1)] border-r-[3px] border-[var(--accent)]' : ''}`}
              >
                <Icon size={20} />
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="px-8 flex justify-center gap-4">
          <a href="https://www.tiktok.com/@xelux" target="_blank" rel="noreferrer" title="TikTok @xelux" className="w-9 h-9 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--text-dim)] transition-all duration-300 hover:text-[var(--text)] hover:border-[var(--accent)] hover:bg-[var(--accent)]">
            {/* Custom TikTok SVG since lucide doesn't have it natively sometimes */}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
          </a>
          <a href="https://www.instagram.com/xelux.dev" target="_blank" rel="noreferrer" title="Instagram" className="w-9 h-9 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--text-dim)] transition-all duration-300 hover:text-[var(--text)] hover:border-[var(--accent)] hover:bg-[var(--accent)]">
            <Instagram size={18} />
          </a>
          <a href="https://wa.me/6285857559022" target="_blank" rel="noreferrer" title="WhatsApp" className="w-9 h-9 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--text-dim)] transition-all duration-300 hover:text-[var(--text)] hover:border-[var(--accent)] hover:bg-[var(--accent)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </a>
        </div>
      </aside>
    </>
  );
}
