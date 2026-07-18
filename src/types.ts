export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'TikTok' | 'YouTube Shorts';
  description: string;
  duration: string;
  thumbnailUrl: string;
  videoUrl: string; // YouTube or Vimeo or direct video link
  softwareUsed: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatarUrl: string;
  text: string;
  rating: number;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  color: string;
  experienceYears: string;
}

export const SERVICES_DATA: Service[] = [
  {
    id: 'tiktok',
    title: 'Edição para TikTok',
    description: 'Cortes dinâmicos, ritmo acelerado, zoom inteligente e efeitos sonoros que garantem a retenção máxima do público nos primeiros 3 segundos.',
    iconName: 'Clapperboard'
  },
  {
    id: 'shorts',
    title: 'Shorts para YouTube',
    description: 'Edição otimizada para o algoritmo do YouTube Shorts, com ganchos fortes, roteiro dinâmico, sound design rico e transições limpas.',
    iconName: 'Youtube'
  }
];

export const SKILLS_DATA: Skill[] = [
  { name: 'CapCut', level: 95, color: '#00e5ff', experienceYears: '1 ano' }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 's23-ultra',
    title: 'Review - Galaxy S23 Ultra',
    category: 'TikTok',
    description: 'Edição ultra dinâmica detalhando as especificações do celular premium Galaxy S23 Ultra. Trabalho focado em alta retenção de público, com cortes dinâmicos no ritmo da trilha, zoom inteligente, design de som e inserções de anime.',
    duration: '1:07',
    thumbnailUrl: '/src/assets/images/s23_vs_s24_cover_1784250117851.jpg',
    videoUrl: 'https://www.tiktok.com/@hirozin.0/video/7618589929676836116?is_from_webapp=1&sender_device=pc&web_id=7663613967732295169',
    softwareUsed: ['CapCut']
  },
  {
    id: 'acer-nitro-v15',
    title: 'Review Gamer - Notebook Acer Nitro V15',
    category: 'TikTok',
    description: 'Vídeo focado no público gamer detalhando as especificações do notebook Acer Nitro V15. Edição com cortes extremamente rápidos, b-roll dinâmico de gameplays (CS/Valorant) e efeitos sonoros sincronizados.',
    duration: '0:56',
    thumbnailUrl: '/src/assets/images/nitro_v15_cover_1784250130559.jpg',
    videoUrl: 'https://www.tiktok.com/@hirozin.0/video/7618201066269723924?is_from_webapp=1&sender_device=pc&web_id=7663613967732295169',
    softwareUsed: ['CapCut']
  },
  {
    id: 'o-que-e-o-amor',
    title: 'Reflexão & Filosofia - O Que é o Amor?',
    category: 'TikTok',
    description: 'Vídeo conceitual e reflexivo de altíssimo impacto sobre o real significado de amar alguém. Edição cinematográfica com transições limpas, legendas animadas impecáveis, design de som imersivo e storytelling visual rico.',
    duration: '2:31',
    thumbnailUrl: '/src/assets/images/what_is_love_cover_1784250144465.jpg',
    videoUrl: 'https://www.tiktok.com/@hirozin.0/video/7662776933289168135?is_from_webapp=1&sender_device=pc&web_id=7663613967732295169',
    softwareUsed: ['CapCut']
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: '1',
    name: 'Felipe Vasconcellos',
    role: 'Criador de Conteúdo de Negócios',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    text: 'O Davi elevou demais o nível dos meus Reels. A retenção subiu em mais de 45% logo no primeiro mês devido às legendas dinâmicas e aos cortes cirúrgicos dele. Recomendo de olhos fechados!',
    rating: 5
  },
  {
    id: '2',
    name: 'Letícia Nogueira',
    role: 'CEO',
    company: 'SaberDigital Edtech',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    text: 'Trabalhamos com o Davi para editar nossos vídeos institucionais e anúncios patrocinados. Ele é extremamente profissional, entrega antes do prazo e tem uma sensibilidade incrível para escolher a trilha e o ritmo corretos.',
    rating: 5
  },
  {
    id: '3',
    name: 'Thiago Mota',
    role: 'Podcaster & YouTuber',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    text: 'Precisava de alguém para transformar episódios longos de 1h em pílulas virais de Shorts e TikToks. O Davi entendeu a proposta de cara. O design de som e as legendas dele são espetaculares.',
    rating: 5
  }
];
