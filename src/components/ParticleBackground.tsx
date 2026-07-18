import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      pulseDirection: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const density = Math.min(60, Math.floor((canvas.width * canvas.height) / 25000));
      for (let i = 0; i < density; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.15,
          speedY: (Math.random() - 0.5) * 0.15,
          opacity: Math.random() * 0.5 + 0.1,
          pulseDirection: Math.random() > 0.5 ? 0.01 : -0.01,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render ambient gradient lights under the canvas to create depth
      ctx.fillStyle = 'rgba(10, 10, 12, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Let's draw some faint cosmic neon-blue background glows
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.8,
        canvas.height * 0.2,
        10,
        canvas.width * 0.8,
        canvas.height * 0.2,
        Math.min(canvas.width, canvas.height) * 0.5
      );
      gradient.addColorStop(0, 'rgba(0, 229, 255, 0.04)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gradientLeft = ctx.createRadialGradient(
        canvas.width * 0.1,
        canvas.height * 0.8,
        10,
        canvas.width * 0.1,
        canvas.height * 0.8,
        Math.min(canvas.width, canvas.height) * 0.6
      );
      gradientLeft.addColorStop(0, 'rgba(157, 78, 221, 0.03)');
      gradientLeft.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradientLeft;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render the particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce/Wrap boundaries
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Opacity pulsing
        p.opacity += p.pulseDirection;
        if (p.opacity > 0.7 || p.opacity < 0.1) {
          p.pulseDirection = -p.pulseDirection;
        }

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${p.opacity})`;
        ctx.shadowBlur = p.size > 1.5 ? 4 : 0;
        ctx.shadowColor = '#00e5ff';
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for performance
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particle-background"
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-[#0a0a0c]"
    />
  );
}
