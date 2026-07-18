import { motion, AnimatePresence } from 'motion/react';
import { X, Play, ShieldAlert, Cpu, ExternalLink, HelpCircle } from 'lucide-react';
import { Project } from '../types';
import { useState, FormEvent } from 'react';

interface PortfolioModalProps {
  project: Project | null;
  onClose: () => void;
  onUpdateVideoUrl?: (projectId: string, newUrl: string) => void;
}

export default function PortfolioModal({ project, onClose, onUpdateVideoUrl }: PortfolioModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUrl, setEditedUrl] = useState('');

  if (!project) return null;

  // Function to clean or extract correct embeddable YouTube/Vimeo/TikTok URLs
  const getEmbedUrl = (url: string) => {
    try {
      if (!url) return '';
      if (url.includes('youtube.com/embed/')) {
        return url;
      }
      if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1]?.split(/[?#]/)[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      if (url.includes('youtube.com/watch')) {
        const urlParams = new URLSearchParams(url.split('?')[1]);
        const id = urlParams.get('v');
        return `https://www.youtube.com/embed/${id}`;
      }
      if (url.includes('vimeo.com/')) {
        const id = url.split('vimeo.com/')[1]?.split(/[?#]/)[0];
        return `https://player.vimeo.com/video/${id}`;
      }
      if (url.includes('tiktok.com')) {
        if (url.includes('/video/')) {
          const id = url.split('/video/')[1]?.split(/[?#]/)[0];
          return `https://www.tiktok.com/embed/v2/${id}`;
        }
        if (url.includes('/v/')) {
          const id = url.split('/v/')[1]?.split(/[?#]/)[0];
          return `https://www.tiktok.com/embed/v2/${id}`;
        }
      }
      return url;
    } catch (e) {
      return url;
    }
  };

  const embedUrl = getEmbedUrl(project.videoUrl);

  const handleSaveUrl = (e: FormEvent) => {
    e.preventDefault();
    if (onUpdateVideoUrl && editedUrl.trim()) {
      onUpdateVideoUrl(project.id, editedUrl.trim());
      setIsEditing(false);
    }
  };

  const handleStartEditing = () => {
    setEditedUrl(project.videoUrl);
    setIsEditing(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#060608]/95 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#121217] shadow-2xl glow-border"
          style={{ boxShadow: '0 20px 50px rgba(0, 229, 255, 0.1)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 bg-[#16161f] p-4 sm:px-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-neon-blue">
                {project.category}
              </span>
              <h3 className="text-lg font-bold text-white sm:text-xl">
                {project.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="rounded-full bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-6 space-y-4">
            {/* Video Player Area */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black border border-white/5 shadow-inner">
              {embedUrl ? (
                <iframe
                  src={`${embedUrl}?autoplay=1`}
                  title={project.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              ) : (
                <div className="absolute inset-0 h-full w-full">
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="h-full w-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 p-6 text-center space-y-2">
                    <div className="w-16 h-16 rounded-full bg-neon-blue/20 border border-neon-blue/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                      <Play className="h-8 w-8 text-neon-blue fill-neon-blue/20" />
                    </div>
                    <p className="text-white text-base font-bold tracking-wide mt-2">Vídeo demonstrativo offline</p>
                    <p className="text-xs text-slate-300 max-w-md">Use o formulário abaixo para adicionar seu link do YouTube/Vimeo/TikTok e assistir!</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description & Softwares */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="md:col-span-2 space-y-3">
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider text-slate-400">
                  Sobre o Projeto
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Editable Link Section */}
                <div className="mt-4 p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 flex items-center gap-1.5">
                      <HelpCircle className="h-3.5 w-3.5 text-neon-blue" />
                      Quer testar com outro vídeo do YouTube/Vimeo/TikTok?
                    </span>
                    {!isEditing && onUpdateVideoUrl && (
                      <button
                        onClick={handleStartEditing}
                        className="text-xs text-neon-blue hover:underline cursor-pointer"
                      >
                        Alterar Link
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleSaveUrl} className="flex gap-2">
                      <input
                        type="text"
                        value={editedUrl}
                        onChange={(e) => setEditedUrl(e.target.value)}
                        placeholder="Insira link do YouTube, Vimeo ou TikTok"
                        className="flex-1 text-xs px-2.5 py-1.5 bg-[#0a0a0c] border border-white/10 rounded-md text-white focus:outline-none focus:border-neon-blue"
                      />
                      <button
                        type="submit"
                        className="text-xs px-3 py-1.5 bg-neon-blue text-black font-semibold rounded-md hover:bg-opacity-95 cursor-pointer"
                      >
                        Salvar
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="text-xs px-3 py-1.5 bg-white/5 text-slate-300 rounded-md hover:bg-white/10 cursor-pointer"
                      >
                        Cancelar
                      </button>
                    </form>
                  ) : (
                    <div className="flex items-center justify-between text-xs text-slate-500 font-mono truncate bg-[#0a0a0c] p-2 rounded border border-white/5">
                      <span className="truncate">{project.videoUrl}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar stats */}
              <div className="space-y-4 rounded-xl bg-white/[0.02] p-4 border border-white/5">
                <div>
                  <span className="text-xs text-slate-500 font-medium block">Duração</span>
                  <span className="text-sm text-white font-semibold">{project.duration}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium block mb-1.5">Softwares Utilizados</span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.softwareUsed.map((software, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium bg-[#1e1e24] text-slate-300 px-2 py-0.5 rounded"
                      >
                        {software}
                      </span>
                    ))}
                  </div>
                </div>
                {project.videoUrl && (
                  <div className="pt-2 border-t border-white/5 flex gap-2">
                    <a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-1.5 px-3 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-center text-xs font-medium text-white flex items-center justify-center gap-1.5 transition-all"
                    >
                      Abrir Externo
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
