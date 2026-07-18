import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Play, Video, Send } from 'lucide-react';

interface NavbarProps {
  onContactClick: () => void;
}

export default function Navbar({ onContactClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  // Track scrolling to style navbar and detect active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['inicio', 'sobre', 'servicos', 'trabalho', 'habilidades', 'contato'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio', id: 'inicio' },
    { label: 'Sobre Mim', href: '#sobre', id: 'sobre' },
    { label: 'Serviços', href: '#servicos', id: 'servicos' },
    { label: 'Meu Trabalho', href: '#trabalho', id: 'trabalho' },
    { label: 'Habilidades', href: '#habilidades', id: 'habilidades' },
    { label: 'Contato', href: '#contato', id: 'contato' },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#inicio');
            }}
            className="group flex items-center gap-2 text-xl font-extrabold tracking-wider text-white"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-[#00e5ff] to-[#9d4edd] p-[1.5px] transition-transform duration-300 group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-[#0a0a0c]">
                <Video className="h-4 w-4 text-neon-blue transition-colors group-hover:text-white" />
              </div>
              <div className="absolute inset-0 -z-10 rounded-lg bg-[#00e5ff] opacity-40 blur-md transition-opacity group-hover:opacity-75" />
            </div>
            <span>
              DAVI<span className="text-neon-blue font-light">RUAN</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 rounded-full bg-white/[0.02] border border-white/5 p-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 -z-10 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      style={{
                        boxShadow: '0 0 10px rgba(0, 229, 255, 0.1)',
                      }}
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={onContactClick}
              className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#00e5ff] to-[#00b0ff] px-5 py-2 text-xs font-bold uppercase tracking-wider text-black shadow-lg transition-all glow-btn hover:glow-btn-hover cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Orçamento Grátis</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white focus:outline-none transition-colors cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slidedown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-b border-white/5 bg-[#0a0a0c]/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-6">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`block px-3 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider transition-colors ${
                    activeSection === link.id
                      ? 'text-neon-blue bg-[#00e5ff]/5'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-white/5">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onContactClick();
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-neon-blue py-3 text-xs font-bold uppercase tracking-widest text-black shadow-lg hover:bg-[#00b0ff] transition-all cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  Solicitar Orçamento
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
