import React, { useEffect, useRef, useCallback, useMemo } from 'react';

const ParticleSystem = () => {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);
  const particlesRef = useRef([]);
  const lastTimeRef = useRef(0);

  // Performance: Throttled resize handler
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
  }, []);

  // Performance: Optimized particle count based on device capabilities
  const particleCount = useMemo(() => {
    const isMobile = window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency < 4;
    
    if (isMobile || isLowEnd) return 20;
    return window.innerWidth > 1920 ? 40 : 30;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Performance: Enable hardware acceleration
    ctx.imageSmoothingEnabled = false;
    
    resizeCanvas();

    // Optimized Particle class
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3; // Reduced velocity for better performance
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 1.5 + 0.5; // Smaller particles
        this.opacity = Math.random() * 0.4 + 0.1;
        this.life = 1;
      }

      update(deltaTime) {
        // Performance: Use deltaTime for consistent animation
        const factor = deltaTime / 16.67; // Normalize to 60fps
        
        this.x += this.vx * factor;
        this.y += this.vy * factor;

        // Wrap around edges with bounds checking
        const margin = 50;
        if (this.x < -margin) this.x = canvas.width + margin;
        if (this.x > canvas.width + margin) this.x = -margin;
        if (this.y < -margin) this.y = canvas.height + margin;
        if (this.y > canvas.height + margin) this.y = -margin;
      }

      draw(ctx) {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle());
    }

    // Performance: Optimized animation loop with RAF throttling
    const animate = (currentTime) => {
      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      // Performance: Skip frame if delta is too high (tab was inactive)
      if (deltaTime > 100) {
        animationIdRef.current = requestAnimationFrame(animate);
        return;
      }

      // Clear canvas efficiently
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;

      const particles = particlesRef.current;
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(deltaTime);
        particles[i].draw(ctx);
      }

      // Performance: Optimized connection drawing with distance culling
      const maxDistance = 80; // Reduced connection distance
      const maxConnections = 3; // Limit connections per particle
      
      for (let i = 0; i < particles.length; i++) {
        let connections = 0;
        const particle = particles[i];
        
        for (let j = i + 1; j < particles.length && connections < maxConnections; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = 0.05 * (1 - distance / maxDistance);
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
            connections++;
          }
        }
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    // Performance: Throttled resize listener
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    // Start animation
    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      clearTimeout(resizeTimeout);
    };
  }, [resizeCanvas, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        opacity: 0.4,
        willChange: 'auto' // Performance hint
      }}
      aria-hidden="true"
      role="presentation"
    />
  );
};

export default ParticleSystem;