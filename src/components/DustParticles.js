import React, { useEffect, useRef } from 'react';

// ========== DUST PARTICLE SETTINGS ==========
// Edit these values to customize the dust particles
const DUST_SETTINGS = {
  // Particle Count
  particleCount: 100,        // Number of particles (20-200)
  
  // Size Settings
  minSize: 0.8,              // Minimum particle size in pixels (0.3-3)
  sizeVariation: 2.5,        // Additional random size variation (0-4)
  
  // Movement Settings
  acceleration: 0.15,        // How quickly particles change direction (0-0.5)
  drag: 0.96,                // Air resistance - higher = slower (0.9-0.99)
  maxSpeed: 2,               // Maximum particle speed (0.5-5)
  initialVelocity: 0.5,      // Starting movement speed (0-2)
  
  // Visual Settings
  opacity: 0.7,              // Overall particle opacity (0.1-1)
  glow: 0,                   // Glow effect radius in pixels (0-20)
  trail: 0,                  // Motion trail effect (0-0.5, 0 = no trail)
  
  // Color Settings (RGB values 0-255)
  color: {
    r: 255,                  // Red channel
    g: 255,                  // Green channel
    b:  100,                  // Blue channel
  },
};

// ========== PRESET CONFIGURATIONS ==========
// Uncomment one of these to use a preset (comment out DUST_SETTINGS above)

// PRESET: Visible & Bold
// const DUST_SETTINGS = {
//   particleCount: 100,
//   minSize: 1.2,
//   sizeVariation: 2,
//   acceleration: 0.2,
//   drag: 0.96,
//   maxSpeed: 2,
//   initialVelocity: 0.5,
//   opacity: 0.9,
//   glow: 10,
//   trail: 0,
//   color: { r: 255, g: 255, b: 255 },
// };

// PRESET: Subtle & Minimal
// const DUST_SETTINGS = {
//   particleCount: 100,
//   minSize: 0.6,
//   sizeVariation: 1,
//   acceleration: 0.08,
//   drag: 0.96,
//   maxSpeed: 2,
//   initialVelocity: 0.5,
//   opacity: 0.4,
//   glow: 0,
//   trail: 0,
//   color: { r: 255, g: 255, b: 255 },
// };

// PRESET: Fast & Energetic
// const DUST_SETTINGS = {
//   particleCount: 100,
//   minSize: 0.8,
//   sizeVariation: 1.5,
//   acceleration: 0.3,
//   drag: 0.94,
//   maxSpeed: 4,
//   initialVelocity: 0.5,
//   opacity: 0.7,
//   glow: 0,
//   trail: 0,
//   color: { r: 255, g: 255, b: 255 },
// };

// PRESET: Dreamy & Smooth
// const DUST_SETTINGS = {
//   particleCount: 100,
//   minSize: 0.8,
//   sizeVariation: 1.5,
//   acceleration: 0.15,
//   drag: 0.96,
//   maxSpeed: 2,
//   initialVelocity: 0.5,
//   opacity: 0.8,
//   glow: 15,
//   trail: 0.3,
//   color: { r: 255, g: 255, b: 255 },
// };

// ========== PARTICLE CLASS ==========
class Particle {
  constructor(width, height, settings) {
    this.width = width;
    this.height = height;
    this.settings = settings;
    this.reset();
  }
  
  reset() {
    this.x = Math.random() * this.width;
    this.y = Math.random() * this.height;
    this.vx = (Math.random() - 0.5) * this.settings.initialVelocity;
    this.vy = (Math.random() - 0.5) * this.settings.initialVelocity;
    this.accelX = 0;
    this.accelY = 0;
    this.life = Math.random() * 1200 + 1200;
    this.maxLife = this.life;
    this.alpha = 0;
    this.size = Math.random() * this.settings.sizeVariation + this.settings.minSize;
  }
  
  update() {
    this.accelX = (Math.random() - 0.5) * this.settings.acceleration;
    this.accelY = (Math.random() - 0.5) * this.settings.acceleration;
    
    this.vx += this.accelX;
    this.vy += this.accelY;
    
    this.vx *= this.settings.drag;
    this.vy *= this.settings.drag;
    
    const maxSpeed = this.settings.maxSpeed;
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed > maxSpeed) {
      this.vx = (this.vx / speed) * maxSpeed;
      this.vy = (this.vy / speed) * maxSpeed;
    }
    
    this.x += this.vx;
    this.y += this.vy;
    
    if (this.x < 0) this.x = this.width;
    if (this.x > this.width) this.x = 0;
    if (this.y < 0) this.y = this.height;
    if (this.y > this.height) this.y = 0;
    
    this.life -= 16;
    
    if (this.life >= this.maxLife / 2) {
      this.alpha = 1 - (this.life / this.maxLife);
    } else {
      this.alpha = this.life / this.maxLife;
    }
  }
  
  draw(ctx) {
    const color = this.settings.color;
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${this.alpha * this.settings.opacity})`;
    
    if (this.settings.glow > 0) {
      ctx.shadowBlur = this.settings.glow;
      ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${this.alpha * 0.8})`;
    }
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    
    if (this.settings.glow > 0) {
      ctx.shadowBlur = 0;
    }
  }
  
  isAlive() {
    return this.life >= 0;
  }
}

// ========== COMPONENT ==========
const DustParticles = ({ plantOpacity }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const isMobile = window.innerWidth < 768;
    const canvasWidth = isMobile ? 400 : 800;
    const canvasHeight = isMobile ? 400 : 800;
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Create particles based on settings
    const targetCount = isMobile ? Math.floor(DUST_SETTINGS.particleCount / 2) : DUST_SETTINGS.particleCount;
    particlesRef.current = [];
    for (let i = 0; i < targetCount; i++) {
      particlesRef.current.push(new Particle(canvasWidth, canvasHeight, DUST_SETTINGS));
    }

    const animate = () => {
      if (DUST_SETTINGS.trail > 0) {
        ctx.fillStyle = `rgba(0, 0, 0, ${DUST_SETTINGS.trail})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx.globalCompositeOperation = 'lighter';
      
      particlesRef.current.forEach(particle => {
        if (!particle.isAlive()) {
          particle.reset();
        }
        particle.update();
        particle.draw(ctx);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      const newWidth = newIsMobile ? 400 : 800;
      const newHeight = newIsMobile ? 400 : 800;
      
      if (canvas.width !== newWidth || canvas.height !== newHeight) {
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        particlesRef.current.forEach(particle => {
          particle.width = newWidth;
          particle.height = newHeight;
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  return (
    <canvas
      ref={canvasRef}
      className="fixed pointer-events-none"
      style={{
        top: 0,
        right: 0,
        width: isMobile ? '400px' : '800px',
        height: isMobile ? '400px' : '800px',
        zIndex: 15,
        opacity: plantOpacity,
        transition: 'opacity 0.5s ease-out',
        maskImage: 'radial-gradient(circle at top right, black 30%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(circle at top right, black 30%, transparent 70%)',
      }}
    />
  );
};

export default DustParticles;