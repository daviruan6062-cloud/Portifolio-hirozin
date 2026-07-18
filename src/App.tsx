import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clapperboard,
  Youtube,
  Instagram,
  Layers,
  Type,
  Sparkles,
  Image,
  TrendingUp,
  Play,
  Send,
  MessageSquare,
  Phone,
  Mail,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Star,
  Users,
  Award,
  Video,
  Plus,
  RotateCcw,
  Check,
  Smartphone,
  Tv,
  MessageCircle,
  Code
} from 'lucide-react';

import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import PortfolioModal from './components/PortfolioModal';
import {
  SERVICES_DATA,
  SKILLS_DATA,
  PROJECTS_DATA,
  Project
} from './types';

// Use direct path string for the generated avatar image to prevent typescript module loading errors
const avatarImg = "/src/assets/images/capcut_avatar_anime_1784341543807.jpg";

export default function App() {
  // Projects & Filter State
  const [projects, setProjects] = useState<Project[]>(PROJECTS_DATA);
  const [activeFilter, setActiveFilter] = useState<string>('Todos');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Custom project creation state
  const [showAddProject, setShowAddProject] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<Project['category']>('TikTok');
  const [newDescription, setNewDescription] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newDuration, setNewDuration] = useState('0:30');
  const [newSoftware, setNewSoftware] = useState('');

  // Contact Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Auto-updating stats (simulated real-time view counts, projects, etc.)
  const [stats, setStats] = useState({
    projectsCount: 142,
    viewsGenerated: '10000k+'
  });

  // Services icons mapping
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Clapperboard':
        return <Clapperboard className="h-6 w-6 text-neon-blue" />;
      case 'Youtube':
        return <Youtube className="h-6 w-6 text-neon-blue" />;
      case 'Instagram':
        return <Instagram className="h-6 w-6 text-neon-blue" />;
      case 'Layers':
        return <Layers className="h-6 w-6 text-neon-blue" />;
      case 'Type':
        return <Type className="h-6 w-6 text-neon-blue" />;
      case 'Sparkles':
        return <Sparkles className="h-6 w-6 text-neon-blue" />;
      case 'Image':
        return <Image className="h-6 w-6 text-neon-blue" />;
      case 'TrendingUp':
        return <TrendingUp className="h-6 w-6 text-neon-blue" />;
      default:
        return <Clapperboard className="h-6 w-6 text-neon-blue" />;
    }
  };

  const filteredProjects = projects;

  // Handle saving customized project link (YouTube/Vimeo)
  const handleUpdateVideoUrl = (projectId: string, updatedUrl: string) => {
    setProjects(prev =>
      prev.map(p => (p.id === projectId ? { ...p, videoUrl: updatedUrl } : p))
    );
    showToast('Link do vídeo atualizado com sucesso!');
  };

  // Add custom test project
  const handleAddProject = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUrl) {
      showToast('Por favor, preencha o título e o link do vídeo.');
      return;
    }

    const newProj: Project = {
      id: Date.now().toString(),
      title: newTitle,
      category: newCategory,
      description: newDescription || 'Projeto de edição personalizado e integrado ao portfólio.',
      duration: newDuration || '1:00',
      thumbnailUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600&auto=format&fit=crop',
      videoUrl: newUrl,
      softwareUsed: newSoftware ? newSoftware.split(',').map(s => s.trim()) : ['Premiere Pro']
    };

    setProjects([newProj, ...projects]);
    setShowAddProject(false);
    setNewTitle('');
    setNewDescription('');
    setNewUrl('');
    setNewSoftware('');
    showToast('Projeto adicionado ao seu portfólio!');
  };

  // Reset to default projects
  const handleResetProjects = () => {
    setProjects(PROJECTS_DATA);
    showToast('Portfólio restaurado para os projetos originais!');
  };

  // Helper to trigger custom toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Handle Contact Form Submission
  const handleSubmitContact = (e: FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMsg) {
      showToast('Por favor, preencha todos os campos do formulário.');
      return;
    }

    showToast('Redirecionando para o WhatsApp...');

    const whatsappMsg = encodeURIComponent(
      `Olá Davi! Meu nome é ${formName} (${formEmail}). Gostaria de fazer um orçamento de edição de vídeo: \n\n"${formMsg}"`
    );
    
    const waUrl = `https://wa.me/5562985162029?text=${whatsappMsg}`;
    
    // Redirect directly to WhatsApp
    window.location.href = waUrl;
  };

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen text-slate-100 relative">
      {/* Dynamic star particle background */}
      <ParticleBackground />

      {/* Modern Top Header Navigation */}
      <Navbar onContactClick={() => handleScrollToSection('contato')} />

      {/* Custom Global Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-neon-blue/30 bg-[#121217] px-5 py-3 text-sm font-semibold text-white shadow-xl glow-border"
          >
            <CheckCircle2 className="h-5 w-5 text-neon-blue animate-bounce" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section
        id="inicio"
        className="relative flex min-h-screen items-center justify-center pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full mt-8 lg:mt-0">
          
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-xs font-semibold text-neon-blue tracking-widest uppercase">
              <span className="flex h-2 w-2 rounded-full bg-neon-blue animate-ping" />
              Editor de Vídeo Freelancer
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Olá, eu sou <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-neon-blue">Davi Ruan</span>
            </h1>

            {/* Requested Hero Text */}
            <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed max-w-xl border-l-2 border-neon-blue/40 pl-4">
              "Transformo ideias em vídeos profissionais que prendem a atenção do público."
            </p>

            <p className="text-sm text-slate-400 max-w-lg leading-relaxed">
              Criação de narrativas dinâmicas para infoprodutores, marcas corporativas e criadores de conteúdo viral. Alto índice de retenção, edição de som imersiva e paleta cinematográfica.
            </p>

            {/* Action Buttons with requested glow effect */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => handleScrollToSection('trabalho')}
                className="group relative inline-flex items-center gap-2 rounded-xl bg-neon-blue px-8 py-4 text-sm font-bold uppercase tracking-wider text-black transition-all glow-btn hover:glow-btn-hover cursor-pointer"
              >
                <span>Ver Portfólio</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => handleScrollToSection('contato')}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/5 hover:border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all cursor-pointer"
              >
                <span>Entrar em Contato</span>
              </button>
            </div>

            {/* Micro Stats Banner */}
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/5 max-w-md">
              <div>
                <span className="block text-2xl font-extrabold text-white">{stats.projectsCount}+</span>
                <span className="text-[11px] text-slate-500 uppercase font-semibold">Vídeos Editados</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-[#9d4edd]">{stats.viewsGenerated}</span>
                <span className="text-[11px] text-slate-500 uppercase font-semibold">Visualizações</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual Image space */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-square rounded-2xl p-[1px] bg-gradient-to-tr from-neon-blue via-transparent to-[#9d4edd] shadow-2xl">
              {/* Inner container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0a0a0c]">
                
                {/* Real generated Avatar image */}
                <img
                  src={avatarImg}
                  alt="Davi Ruan"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Cyber overlays & subtle decorative tags */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Tech elements overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#121216]/90 border border-white/5 backdrop-blur-sm p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white">Davi Ruan</h4>
                      <p className="text-[10px] text-slate-400">Disponível para Projetos</p>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-neon-blue font-semibold">
                    LUT #0992
                  </div>
                </div>
              </div>

              {/* Glowing decorative lights behind the card */}
              <div className="absolute -inset-1.5 -z-10 rounded-2xl bg-gradient-to-tr from-neon-blue to-[#9d4edd] opacity-20 blur-xl animate-pulse" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SOBRE MIM SECTION */}
      <section id="sobre" className="py-24 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Video Timeline visual layout */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-4"
            >
              <div className="glow-card p-6 rounded-2xl relative overflow-hidden group">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                  <span className="text-xs font-mono text-slate-400">Timeline.prproj</span>
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                    <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                    <span className="h-2 w-2 rounded-full bg-[#27c93f]" />
                  </div>
                </div>

                <div className="space-y-3.5 font-mono text-xs text-slate-400">
                  <div className="flex justify-between items-center bg-[#0a0a0c] p-2.5 rounded border border-white/5">
                    <span className="text-white flex items-center gap-2">
                      <Smartphone className="h-3.5 w-3.5 text-neon-blue" />
                      Cortes para TikTok
                    </span>
                    <span className="text-neon-blue">9:16 Vert.</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#0a0a0c] p-2.5 rounded border border-white/5">
                    <span className="text-white flex items-center gap-2">
                      <Tv className="h-3.5 w-3.5 text-[#9d4edd]" />
                      YouTube Shorts
                    </span>
                    <span className="text-[#9d4edd]">Dynamic</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#0a0a0c] p-2.5 rounded border border-white/5">
                    <span className="text-white flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-[#ff9100]" />
                      Color Grading
                    </span>
                    <span className="text-[#ff9100]">Resolve</span>
                  </div>
                </div>

                {/* Soft decorative visual showing waves */}
                <div className="mt-4 pt-4 border-t border-white/5">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-2 font-mono">Audio Track Master (dB)</span>
                  <div className="flex gap-0.5 items-end h-8">
                    <div className="bg-[#00e5ff] w-full h-4 rounded-t-sm" />
                    <div className="bg-[#00e5ff] w-full h-7 rounded-t-sm" />
                    <div className="bg-[#00e5ff] w-full h-5 rounded-t-sm animate-pulse" />
                    <div className="bg-[#00e5ff] w-full h-2 rounded-t-sm" />
                    <div className="bg-[#00e5ff] w-full h-6 rounded-t-sm" />
                    <div className="bg-[#00e5ff] w-full h-8 rounded-t-sm" />
                    <div className="bg-[#00e5ff] w-full h-4 rounded-t-sm" />
                    <div className="bg-[#00e5ff] w-full h-5 rounded-t-sm" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* About Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#9d4edd]">Quem Sou</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                  Especialista em Edição de Alto Impacto
                </h2>
              </div>

              {/* Requested Text about me */}
              <p className="text-slate-300 leading-relaxed">
                Sou editor de vídeo profissional especializado em criar conteúdos magnéticos de altíssimo impacto para <span className="text-white font-semibold">TikTok e YouTube Shorts</span>, ajudando marcas pessoais, criadores de conteúdo e infoprodutores a dominarem as redes sociais com vídeos verticais virais.
              </p>

              <p className="text-slate-300 leading-relaxed">
                Ofereço uma esteira completa de pós-produção focada em resultados reais. Trabalho com <span className="text-neon-blue font-semibold">edições modernas e dinâmicas</span>, cortes precisos e extremamente rápidos para manter o fluxo, inserção de legendas animadas de alta retenção, efeitos visuais refinados, transições orgânicas e correção de cor (color grading) impecável para que seus vídeos curtos se destaquem em qualquer feed.
              </p>

              {/* Core Values / Benefits list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-2.5">
                  <Check className="h-5 w-5 text-neon-blue mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Retenção Extrema</h4>
                    <p className="text-xs text-slate-400">Garantia de retenção nos segundos iniciais.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="h-5 w-5 text-neon-blue mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Sound Design Imersivo</h4>
                    <p className="text-xs text-slate-400">Sonorização que conecta o público emocionalmente.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="h-5 w-5 text-neon-blue mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Fluxo Profissional</h4>
                    <p className="text-xs text-slate-400">Sincronia milimétrica entre vídeo e áudio.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="h-5 w-5 text-neon-blue mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Prazos Rigorosos</h4>
                    <p className="text-xs text-slate-400">Comprometimento total com a data de entrega.</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SERVIÇOS SECTION */}
      <section id="servicos" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-neon-blue">O Que Eu Faço</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Serviços Especializados
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Soluções completas de edição audiovisual para maximizar o alcance, engajamento e a conversão do seu conteúdo nas redes sociais e mídias pagas.
          </p>
        </div>

        {/* Services Grid with hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {SERVICES_DATA.map((service, index) => {
            const subFeatures = service.id === 'tiktok' 
              ? [
                  'Cortes Dinâmicos de Alta Retenção',
                  'Legendas Animadas Estilo Alex Hormozi',
                  'Ganchos (Hooks) Poderosos de Entrada',
                  'Sonorização (Sound FX) que Prende a Atenção',
                  'Zoom Inteligente e Enquadramento Otimizado'
                ]
              : [
                  'Edição Focada no Algoritmo de Shorts',
                  'Efeitos Visuais e Transições Cinematográficas',
                  'Color Grading Profissional (Tratamento de Cores)',
                  'Sincronização Perfeita com Trilhas Sonoras',
                  'Roteirização Visual e Criação de Storytelling'
                ];

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glow-card p-8 rounded-2xl flex flex-col justify-between hover:glow-card-hover group relative overflow-hidden border border-white/5 bg-[#121217]/50 backdrop-blur-sm"
              >
                {/* Soft neon blue/purple gradient visual line */}
                <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${service.id === 'tiktok' ? 'from-neon-blue to-[#9d4edd]' : 'from-[#9d4edd] to-neon-blue'} opacity-40 transition-opacity duration-300 group-hover:opacity-100`} />

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neon-blue/10 border border-neon-blue/20 transition-all duration-300 group-hover:bg-neon-blue group-hover:text-black">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#9d4edd]">Dispositivos Móveis</span>
                      <h3 className="text-xl font-extrabold text-white transition-colors group-hover:text-neon-blue">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Dynamic checklist */}
                  <div className="pt-4 border-t border-white/5 space-y-2.5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">O que está incluso:</span>
                    <ul className="space-y-2">
                      {subFeatures.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-400">
                          <Check className="h-4 w-4 text-neon-blue flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-neon-blue transition-colors">
                  <span>Saber Mais & Iniciar</span>
                  <div className="flex items-center gap-1 text-neon-blue">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[11px] font-bold">Quero este</span>
                    <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* MEU TRABALHO SECTION (PORTFOLIO GALLERY) */}
      <section id="trabalho" className="py-24 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#9d4edd]">Portfólio</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
                Meu Trabalho
              </h2>
              <p className="text-slate-400 text-sm max-w-lg">
                Explore a galeria com alguns dos meus projetos editados recentemente. Clique para assistir ao vídeo integrado.
              </p>
            </div>

            {/* Config & Add tools */}
            <div className="flex flex-wrap gap-2.5 items-center">
              <button
                onClick={() => setShowAddProject(!showAddProject)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neon-blue/30 bg-neon-blue/5 hover:bg-neon-blue/15 text-xs text-neon-blue font-semibold transition-all cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Testar Outro Vídeo</span>
              </button>

              <button
                onClick={handleResetProjects}
                className="flex items-center justify-center p-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white transition-all cursor-pointer"
                title="Restaurar projetos padrão"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Collapsible custom project adding form */}
          <AnimatePresence>
            {showAddProject && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-12 overflow-hidden"
              >
                <form
                  onSubmit={handleAddProject}
                  className="p-6 rounded-2xl bg-[#121217] border border-white/10 space-y-4 max-w-2xl mx-auto glow-border"
                >
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Incorporar Novo Projeto de Teste
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] text-slate-400 font-medium uppercase">Título do Vídeo</label>
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Ex: Trailer de Aventura"
                        className="w-full text-xs px-3 py-2 bg-[#0a0a0c] border border-white/5 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] text-slate-400 font-medium uppercase">Categoria</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as Project['category'])}
                        className="w-full text-xs px-3 py-2 bg-[#0a0a0c] border border-white/5 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                      >
                        <option value="TikTok">TikTok</option>
                        <option value="YouTube Shorts">YouTube Shorts</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] text-slate-400 font-medium uppercase">Link do Vídeo (YouTube ou Vimeo)</label>
                      <input
                        type="text"
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                        placeholder="Ex: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        className="w-full text-xs px-3 py-2 bg-[#0a0a0c] border border-white/5 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] text-slate-400 font-medium uppercase">Softwares (separados por vírgula)</label>
                      <input
                        type="text"
                        value={newSoftware}
                        onChange={(e) => setNewSoftware(e.target.value)}
                        placeholder="Premiere Pro, DaVinci Resolve"
                        className="w-full text-xs px-3 py-2 bg-[#0a0a0c] border border-white/5 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] text-slate-400 font-medium uppercase">Descrição Curta</label>
                    <textarea
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      placeholder="Fale brevemente sobre o estilo de edição..."
                      rows={2}
                      className="w-full text-xs px-3 py-2 bg-[#0a0a0c] border border-white/5 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                    />
                  </div>

                  <div className="flex gap-2.5 justify-end">
                    <button
                      type="button"
                      onClick={() => setShowAddProject(false)}
                      className="text-xs px-4 py-2 rounded bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="text-xs px-4 py-2 rounded bg-neon-blue text-black font-bold hover:opacity-95 cursor-pointer"
                    >
                      Inserir no Grid
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>



          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="glow-card rounded-2xl overflow-hidden hover:glow-card-hover group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Thumbnail container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-900 border-b border-white/5">
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Dark gradient shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />

                    {/* Glowing play icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="h-14 w-14 flex items-center justify-center rounded-full bg-neon-blue text-black glow-btn">
                        <Play className="h-6 w-6 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Metadata tags */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-white px-2.5 py-1 rounded bg-[#0a0a0c]/80 border border-white/10 backdrop-blur-sm">
                        {project.category}
                      </span>
                      <span className="text-[10px] font-mono font-medium text-slate-300 px-2.5 py-1 rounded bg-[#0a0a0c]/80 border border-white/10 backdrop-blur-sm">
                        {project.duration}
                      </span>
                    </div>
                  </div>

                  {/* Details Card */}
                  <div className="p-5 space-y-3.5">
                    <h3 className="text-base font-bold text-white leading-tight group-hover:text-neon-blue transition-colors truncate">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.softwareUsed.map((sw, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-medium bg-[#1e1e24] text-slate-300 px-2 py-0.5 rounded"
                        >
                          {sw}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* No projects empty state */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16 space-y-4">
              <Clapperboard className="h-12 w-12 text-slate-600 mx-auto animate-bounce" />
              <p className="text-sm text-slate-400">Nenhum projeto encontrado nesta categoria.</p>
              <button
                onClick={handleResetProjects}
                className="text-xs text-neon-blue hover:underline font-semibold cursor-pointer"
              >
                Voltar aos projetos padrão
              </button>
            </div>
          )}
        </div>
      </section>

      {/* HABILIDADES SECTION */}
      <section id="habilidades" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Tech Pitch */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-neon-blue">Habilidades</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Software e Domínio Técnico
              </h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Utilizo as melhores e mais modernas ferramentas de edição e de alta retenção para entregar o melhor resultado com máxima agilidade e dinamismo.
            </p>
          </motion.div>

          {/* Progress Bars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            {SKILLS_DATA.map((skill, index) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-sm font-bold text-white">{skill.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono ml-2">({skill.experienceYears})</span>
                  </div>
                  <span className="text-xs font-bold font-mono text-neon-blue">{skill.level}%</span>
                </div>
                
                {/* Progress track */}
                <div className="h-2.5 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${skill.color}, #00e5ff)`,
                      boxShadow: `0 0 10px ${skill.color}50`
                    }}
                  />
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* CONTATO SECTION */}
      <section id="contato" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glow-card p-8 sm:p-12 rounded-3xl relative overflow-hidden text-center flex flex-col items-center space-y-8">
          <div className="absolute top-0 right-0 h-32 w-32 bg-neon-blue/5 rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 h-32 w-32 bg-emerald-500/5 rounded-tr-full pointer-events-none" />

          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-neon-blue block">Contato</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Vamos Criar Juntos?
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Está precisando de edições magnéticas e modernas para impulsionar suas redes sociais ou um vídeo impecável para a sua empresa? Entre em contato agora!
            </p>
          </div>

          {/* Direct Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
            <a 
              href="https://wa.me/5562985162029" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-neon-blue/30 transition-all hover:bg-white/[0.03] group text-left"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neon-blue/10 text-neon-blue shrink-0 group-hover:scale-110 transition-transform">
                <Send className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Enviar Mensagem</span>
                <span className="text-sm font-bold text-white group-hover:text-neon-blue transition-colors">
                  Chamar no WhatsApp
                </span>
              </div>
            </a>

            <a 
              href="https://wa.me/5562985162029" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-emerald-500/30 transition-all hover:bg-white/[0.03] group text-left"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Contato Direto</span>
                <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                  +55 (62) 98516-2029
                </span>
              </div>
            </a>
          </div>

          {/* Requested Social Buttons with glow effect */}
          <div className="space-y-4 w-full flex flex-col items-center">
            <h4 className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">Redes Sociais & Contatos Rápidos</h4>
            <div className="flex flex-wrap justify-center gap-3">
              
              {/* WhatsApp */}
              <a
                href="https://wa.me/5562985162029"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25d366]/10 border border-[#25d366]/20 text-xs font-bold text-[#25d366] transition-all hover:bg-[#25d366]/20 hover:shadow-[0_0_15px_rgba(37,211,102,0.3)] cursor-pointer"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@hirozin.0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white transition-all hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] cursor-pointer"
              >
                <Clapperboard className="h-4 w-4 text-neon-blue" />
                <span>TikTok</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* RODAPÉ SECTION */}
      <footer className="py-12 bg-[#060608] border-t border-white/5 text-center text-slate-500 space-y-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-bold tracking-wider">
            <Video className="h-4 w-4 text-neon-blue" />
            <span>DAVI<span className="text-neon-blue font-light">RUAN</span></span>
          </div>

          <p className="text-xs">
            © 2026 Davi Ruan - Todos os direitos reservados.
          </p>

          <div className="flex gap-4 text-xs">
            <a href="#inicio" className="hover:text-white transition-colors">Início</a>
            <a href="#sobre" className="hover:text-white transition-colors">Sobre</a>
            <a href="#trabalho" className="hover:text-white transition-colors">Portfólio</a>
          </div>
        </div>
      </footer>

      {/* Video Modal component */}
      <PortfolioModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onUpdateVideoUrl={handleUpdateVideoUrl}
      />
    </div>
  );
}
