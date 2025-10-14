import React, { useState, useEffect, useRef } from 'react';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Footer from './components/Footer';
import DustParticles from './components/DustParticles';
const plantBg = process.env.PUBLIC_URL + '/Images/plant.jpg';


const App = () => {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [contactExpanded, setContactExpanded] = useState(false);
  const [referencesExpanded, setReferencesExpanded] = useState(false);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [filesExpanded, setFilesExpanded] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [cursorVelocity, setCursorVelocity] = useState(120);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cursorRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0, velocity: 0 });
  const spotlightRef = useRef({ x: 0, y: 0 });

  const [cursorVisible, setCursorVisible] = useState(true);

  // Contact modals state
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const email = "dylangorrah3@gmail.com";
  const phone = "+27 067 702 0221";
  const whatsappLink = "https://wa.me/27677020221?text=Hi%2C%20I%20saw%20your%20Website%2C%20and%20I%20think%20it's%20Awesome%2C";

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Detect if device has touch capability OR if mouse leaves screen
  useEffect(() => {
    const checkTouchDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const hasHover = window.matchMedia('(hover: hover)').matches;
      setIsTouchDevice(hasTouch && !hasHover);
    };
    
    checkTouchDevice();

    const handleMouseLeave = () => {
      setCursorVisible(false);
      setIsTouchDevice(true);
    };

    const handleMouseEnter = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const hasHover = window.matchMedia('(hover: hover)').matches;
      if (!hasTouch || hasHover) {
        setCursorVisible(true);
        setIsTouchDevice(false);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Premium Cursor (Mouse + Touch)
  useEffect(() => {
    let animationFrame;
    let targetCursorSize = 120;
    let currentCursorSize = 120;

    const handleMouseMove = (e) => {
      cursorRef.current.prevX = cursorRef.current.x;
      cursorRef.current.prevY = cursorRef.current.y;
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;

      const dx = cursorRef.current.x - cursorRef.current.prevX;
      const dy = cursorRef.current.y - cursorRef.current.prevY;
      const velocity = Math.sqrt(dx * dx + dy * dy);
      
      cursorRef.current.velocity = velocity;
      targetCursorSize = Math.min(120 + velocity * 3, 180);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        cursorRef.current.x = touch.clientX;
        cursorRef.current.y = touch.clientY;
      }
    };

    const animateCursor = () => {
      setCursorPos({
        x: cursorRef.current.x,
        y: cursorRef.current.y
      });

      const lagFactor = 0.15;
      spotlightRef.current.x += (cursorRef.current.x - spotlightRef.current.x) * lagFactor;
      spotlightRef.current.y += (cursorRef.current.y - spotlightRef.current.y) * lagFactor;
      
      setSpotlightPos({
        x: spotlightRef.current.x,
        y: spotlightRef.current.y
      });

      const sizeLerp = 0.12;
      currentCursorSize += (targetCursorSize - currentCursorSize) * sizeLerp;
      setCursorVelocity(currentCursorSize);

      targetCursorSize += (120 - targetCursorSize) * 0.08;

      animationFrame = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    animationFrame = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: [0.2, 0.5, 0.8],
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [mounted]);

 // ========== ENHANCED PSYCHOLOGY BUTTON GLOW PULSE ANIMATION ==========
  useEffect(() => {
    const schedulePulse = () => {
      setTimeout(() => {
        const psychButton = document.querySelector('.psychology-btn');
        
        if (psychButton) {
          // First pulse
          psychButton.classList.add('glow-pulse-active');
          
          setTimeout(() => {
            psychButton.classList.remove('glow-pulse-active');
            
            // Second pulse after 400ms
            setTimeout(() => {
              psychButton.classList.add('glow-pulse-active');
              
              setTimeout(() => {
                psychButton.classList.remove('glow-pulse-active');
              }, 600);
            }, 400);
          }, 600);
        }
        
        // Schedule next double pulse after 7 seconds
        schedulePulse();
      }, 7000);
    };

    // Start the pulse cycle
    schedulePulse();
  }, []);
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const orbitalSection = typeof document !== 'undefined' 
    ? document.querySelector('#hero') 
    : null;
  
  let plantOpacity = 0.3;
  let profileOpacity = 1;
  
  if (orbitalSection) {
    const rect = orbitalSection.getBoundingClientRect();
    const isVisible = rect.bottom > 0;
    
    if (isVisible) {
      profileOpacity = Math.max(0, Math.min(1, rect.bottom / window.innerHeight));
      
      if (profileOpacity <= 0.5) {
        plantOpacity = (profileOpacity / 0.5) * 0.3;
      } else {
        plantOpacity = 0.3;
      }
    } else {
      plantOpacity = 0;
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden" style={{ cursor: isTouchDevice ? 'auto' : 'none' }}>
      {!isTouchDevice && cursorVisible && (
        <div className="custom-cursor-wrapper">
          <div
            className="fixed pointer-events-none z-0"
            style={{
              left: `${spotlightPos.x}px`,
              top: `${spotlightPos.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              style={{
                width: '180px',
                height: '180px',
                background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(25px)',
                transition: 'opacity 0.3s ease-out',
              }}
            />
          </div>

          <div
            className="fixed pointer-events-none z-0"
            style={{
              left: `${cursorPos.x}px`,
              top: `${cursorPos.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              style={{
                width: `${cursorVelocity}px`,
                height: `${cursorVelocity}px`,
                background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                transition: 'width 0.3s ease-out, height 0.3s ease-out',
                filter: 'blur(20px)'
              }}
            />
            
            <div
              style={{
                width: '24px',
                height: '24px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
                borderRadius: '50%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: `
                  0 2px 8px rgba(0,0,0,0.3),
                  0 8px 24px rgba(0,0,0,0.2),
                  inset 0 -2px 4px rgba(0,0,0,0.1),
                  inset 0 2px 4px rgba(255,255,255,0.3)
                `,
                transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
            
            <div
              style={{
                width: '20px',
                height: '20px',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '50%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </div>
        </div>
      )}

      {/* Plant Background Image with Dust Particles */}
      <div 
        className="fixed top-0 right-0 z-10 pointer-events-none transition-opacity duration-500"
        style={{
          width: isMobile ? '400px' : '800px',
          height: isMobile ? '400px' : '800px',
          opacity: plantOpacity,
          maskImage: 'radial-gradient(circle at top right, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at top right, black 30%, transparent 70%)',
        }}
      >
        <img 
          src={plantBg}
          alt="" 
          className="w-full h-full object-cover"
          style={{
            filter: 'grayscale(100%) contrast(1.2)',
          }}
          onError={(e) => {
            console.error('Background image failed to load');
            e.target.style.display = 'none';
          }}
        />
      </div>

      {/* Dust Particles - Above plant image */}
      <DustParticles plantOpacity={plantOpacity} />

      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50">
        <button
          onClick={() => setAboutExpanded(!aboutExpanded)}
          className="psychology-btn px-4 md:px-6 py-2.5 glass-morph text-white/90 rounded-b-xl text-[10px] md:text-xs font-semibold btn-linear tracking-widest hover:text-white hover:bg-white/5 shadow-lg"
        >
          <span className="btn-text relative z-10">WEBSITE PSYCHOLOGY</span>
          <div className="btn-glow"></div>
        </button>
        
        {aboutExpanded && (
          <div className="scale-in mt-2 w-[90vw] md:w-[500px] glass-morph rounded-xl p-4 md:p-6 shadow-2xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-sm md:text-base font-semibold text-white mb-4 md:mb-6">Design Philosophy</h3>
            
            <div className="space-y-4 md:space-y-5 text-[11px] md:text-xs text-white/70 leading-relaxed">
              <div>
                <p className="font-semibold text-white/90 mb-1.5">Technologies Used</p>
                <p className="text-white/60">
                  <span className="text-cyan-400 font-medium">React</span>, <span className="text-cyan-400 font-medium">Tailwind CSS</span>, <span className="text-cyan-400 font-medium">JavaScript</span>, and modern web design practices
                </p>
              </div>

              <div>
                <p className="font-semibold text-white/90 mb-1.5">Psychology in Design</p>
                <p className="text-white/60">
                  I blend <span className="font-bold text-white/90">psychology</span> and <span className="font-bold text-white/90">minimalism</span> to guide users' eyes exactly where they need to be. Every visual and animation has a purpose — to make the experience flow naturally and feel effortless. This site employs the <span className="text-white/90">"F-Pattern"</span> — a proven <span className="font-bold text-white/90">psychology</span> principle on how people scan new websites. <span className="font-bold text-white/90">[psychology of eye attention is the reason why you're reading here]</span>
                </p>
              </div>

              <div>
                <p className="font-semibold text-white/90 mb-1.5">Strategic Animations</p>
                <p className="text-white/60">
                  <span className="font-bold text-white/90">A sleek orbital animation where my tech stack circles around me. The technologies I’m sharpest in flash with a cutting blade glint as it passes</span> a clean, high-value visual that radiates precision and skill.
                </p>
              </div>

              <div>
                <p className="font-semibold text-white/90 mb-1.5">Minimalism</p>
                <p className="text-white/60">
                  Saying just what needs to be said — no clutter, maximum impact.
                </p>
              </div>

              <div>
                <p className="font-semibold text-white/90 mb-1.5">Linear-Inspired Design</p>
                <p className="text-white/60">
                  Premium animations, orbital mechanics, and glass morphism create a billion-dollar startup aesthetic.
                </p>
              </div>
            </div>

            <button
              onClick={() => setAboutExpanded(false)}
              className="mt-4 md:mt-5 w-full px-4 py-2 glass-morph text-white/80 rounded-lg text-xs font-medium hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>

      <div className="hidden md:flex fixed right-8 top-8 z-50 flex-col gap-3">
        <button
          onClick={() => {
            setContactExpanded(!contactExpanded);
            setReferencesExpanded(false);
            setFilesExpanded(false);
          }}
          className="px-6 py-2.5 glass-morph text-white/90 rounded-lg font-medium text-xs btn-linear tracking-wider hover:text-white hover:bg-white/10"
        >
          {contactExpanded ? 'CLOSE' : 'CONTACT'}
        </button>

        {contactExpanded && (
          <div className="scale-in absolute right-0 top-full mt-2 w-56 glass-morph rounded-xl p-5 shadow-2xl">
            <div className="space-y-3">
              <button 
                onClick={() => {
                  setShowEmailModal(true);
                  setContactExpanded(false);
                }}
                className="flex items-center gap-3 text-xs text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5 w-full text-left"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Email</span>
              </button>

              <button 
                onClick={() => {
                  setShowPhoneModal(true);
                  setContactExpanded(false);
                }}
                className="flex items-center gap-3 text-xs text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5 w-full text-left"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call/Text</span>
              </button>

              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-xs text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>WhatsApp</span>
              </a>

              <a 
                href="https://github.com/Dylan-Gorrah"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-xs text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span>GitHub</span>
              </a>

              <a 
                href="https://www.linkedin.com/in/dylan-gorrah-45aa07282"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-xs text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        )}

        <button
          onClick={() => {
            setReferencesExpanded(!referencesExpanded);
            setContactExpanded(false);
            setFilesExpanded(false);
          }}
          className="px-6 py-2.5 glass-morph text-white/90 rounded-lg font-medium text-xs btn-linear tracking-wider hover:text-white hover:bg-white/10"
        >
          References(COMING SOON)
        </button>

        <button
          onClick={() => {
            setFilesExpanded(!filesExpanded);
            setContactExpanded(false);
            setReferencesExpanded(false);
          }}
          className="px-6 py-2.5 glass-morph text-white/90 rounded-lg font-medium text-xs btn-linear tracking-wider hover:text-white hover:bg-white/10"
        >
          {filesExpanded ? 'CLOSE' : 'FILES'}
        </button>

        {filesExpanded && (
          <div className="scale-in absolute right-0 top-full mt-2 w-56 glass-morph rounded-xl p-5 shadow-2xl">
            <div className="space-y-3">
              <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = process.env.PUBLIC_URL + '/files/Best-TutorAward.jpeg';
                  link.download = 'Dylan_Gorrah_Best_Tutor_Award.jpeg';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="flex items-center gap-3 text-xs text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5 w-full text-left"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span>Best Tutor Award</span>
              </button>

              <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = process.env.PUBLIC_URL + '/files/DylanGorrah_CV_SoftwereDev.pdf';
                  link.download = 'Dylan_Gorrah_CV_SoftwereDev.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="flex items-center gap-3 text-xs text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5 w-full text-left"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>CV</span>
              </button>

              <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = process.env.PUBLIC_URL + '/files/Certificate_DylanGorrah_IT_2023.pdf';
                  link.download = 'Dylan_Gorrah_IT_Certificate_2023.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="flex items-center gap-3 text-xs text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5 w-full text-left"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>IT Services Certificate</span>
              </button>
            </div>
          </div>
  )}
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center px-4"
          onClick={() => setShowEmailModal(false)}
        >
          <div 
            className="glass-morph rounded-2xl p-8 max-w-md w-full scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Email Address</h3>
            <div className="flex items-center gap-3 mb-6">
              <input 
                type="text" 
                value={email}
                readOnly
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white/90 text-sm"
              />
              <button
                onClick={() => copyToClipboard(email, 'email')}
                className="px-6 py-3 bg-white text-black rounded-lg font-medium text-sm btn-linear"
              >
                {copiedEmail ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
            <button
              onClick={() => setShowEmailModal(false)}
              className="w-full px-4 py-3 glass-morph text-white/80 rounded-lg text-sm font-medium hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Phone Modal - Different for Desktop vs Mobile */}
      {showPhoneModal && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center px-4"
          onClick={() => setShowPhoneModal(false)}
        >
          <div 
            className="glass-morph rounded-2xl p-8 max-w-md w-full scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              {isMobile ? 'Contact Options' : 'Phone Number'}
            </h3>
            
            {/* Phone Number with Copy */}
            <div className="mb-6">
              <p className="text-white/70 text-sm mb-2">Phone Number</p>
              <div className="flex items-center gap-3">
                <input 
                  type="text" 
                  value={phone}
                  readOnly
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white/90 text-sm"
                />
                <button
                  onClick={() => copyToClipboard(phone, 'phone')}
                  className="px-6 py-3 bg-white text-black rounded-lg font-medium text-sm btn-linear"
                >
                  {copiedPhone ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Quick Actions - Only on Mobile */}
            {isMobile && (
              <div className="space-y-3 mb-6">
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-white/80 hover:text-white text-sm font-medium transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
                
                <a
                  href={`sms:${phone.replace(/\s/g, '')}`}
                  className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-white/80 hover:text-white text-sm font-medium transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Send SMS
                </a>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-white/80 hover:text-white text-sm font-medium transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            )}

            <button
              onClick={() => setShowPhoneModal(false)}
              className="w-full px-4 py-3 glass-morph text-white/80 rounded-lg text-sm font-medium hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="fixed right-4 md:right-12 top-1/2 transform -translate-y-1/2 z-40 flex flex-col items-end gap-6">
        {['hero', 'work', 'projects', 'contact'].map((section) => (
          <div key={section} className="flex items-center gap-3 group">
            <span className={`section-label text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
              activeSection === section 
                ? 'opacity-100 text-white translate-x-0' 
                : 'opacity-0 text-white/50 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
            }`}>
              {section}
            </span>
            <button
              onClick={() => scrollToSection(section)}
              className={`progress-dot w-2 h-2 rounded-full border border-white/30 transition-all duration-500 ${
                activeSection === section ? 'active' : 'bg-transparent hover:bg-white/20 hover:scale-125'
              }`}
              aria-label={`Go to ${section}`}
            />
          </div>
        ))}
      </div>

      <Hero mounted={mounted} scrollY={scrollY} scrollToSection={scrollToSection} />
      <Experience mounted={mounted} />
      <Projects mounted={mounted} />
      <Footer />
    </div>
  );
};

export default App;