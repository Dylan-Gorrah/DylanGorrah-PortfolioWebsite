import React, { useEffect, useState, useRef, useMemo } from 'react';
const profilePic = process.env.PUBLIC_URL + '/Images/Profile Picture.jpeg';

const OrbitalProfile = ({ scrollY }) => {
  const [time, setTime] = useState(0);
  const sectionRef = useRef(null);
  const [sectionOffset, setSectionOffset] = useState(0);
  const [shimmerActive, setShimmerActive] = useState({});

  // Memoize techStack to prevent recreation on every render
  const techStack = useMemo(() => [
    // Inner orbit - Core Expertise (METALLIC)
    { name: 'React', color: 'from-cyan-400 to-blue-500', orbit: 1, angle: 0, speed: 0.4, hasMetallic: true },
    { name: 'JavaScript', color: 'from-yellow-400 to-yellow-600', orbit: 1, angle: 51.4, speed: 0.4, hasMetallic: true },
    { name: 'TypeScript', color: 'from-blue-500 to-blue-700', orbit: 1, angle: 102.8, speed: 0.4, hasMetallic: false },
    { name: 'Tailwind', color: 'from-cyan-400 to-blue-600', orbit: 1, angle: 154.2, speed: 0.4, hasMetallic: true },
    { name: 'HTML5', color: 'from-orange-500 to-red-600', orbit: 1, angle: 205.6, speed: 0.4, hasMetallic: true },
    { name: 'CSS3', color: 'from-blue-400 to-blue-600', orbit: 1, angle: 257, speed: 0.4, hasMetallic: true },
    { name: 'Supabase', color: 'from-green-400 to-emerald-500', orbit: 1, angle: 308.4, speed: 0.4, hasMetallic: true },
    
    // Middle orbit - Proficient (MIXED)
    { name: 'Node.js', color: 'from-green-500 to-green-700', orbit: 2, angle: 0, speed: -0.3, hasMetallic: false },
    { name: 'Java', color: 'from-red-500 to-orange-600', orbit: 2, angle: 60, speed: -0.3, hasMetallic: true },
    { name: 'API', color: 'from-purple-400 to-purple-600', orbit: 2, angle: 120, speed: -0.3, hasMetallic: false },
    { name: 'Git', color: 'from-orange-600 to-red-700', orbit: 2, angle: 180, speed: -0.3, hasMetallic: false },
    { name: 'Cursor-AI', color: 'from-indigo-400 to-blue-500', orbit: 2, angle: 240, speed: -0.3, hasMetallic: true },
    { name: '.NET', color: 'from-purple-600 to-indigo-700', orbit: 2, angle: 300, speed: -0.3, hasMetallic: true },
    
    // Outer orbit - Familiar (SOME METALLIC)
    { name: 'Kotlin', color: 'from-purple-500 to-pink-500', orbit: 3, angle: 0, speed: 0.25, hasMetallic: false },
    { name: 'Python', color: 'from-blue-500 to-yellow-500', orbit: 3, angle: 60, speed: 0.25, hasMetallic: false },
    { name: 'ASP.NET', color: 'from-blue-600 to-purple-700', orbit: 3, angle: 120, speed: 0.25, hasMetallic: true },
    { name: 'Flutter', color: 'from-cyan-300 to-blue-400', orbit: 3, angle: 180, speed: 0.25, hasMetallic: false },
    { name: 'Android Studio', color: 'from-green-400 to-green-600', orbit: 3, angle: 240, speed: 0.25, hasMetallic: false },
    { name: 'Firebase', color: 'from-yellow-500 to-orange-500', orbit: 3, angle: 300, speed: 0.25, hasMetallic: false },
  ], []);

  // === ULTIMATE RANDOM SHIMMER - Complete independence for each metallic bubble ===
  useEffect(() => {
    const metallicTechs = techStack.filter(t => t.hasMetallic);
    const timeouts = [];

    // Create completely independent random shimmer patterns for each metallic tech
    metallicTechs.forEach(tech => {
      const startRandomShimmer = () => {
        // Random delay between shimmers (0.5s to 4s)
        const nextShimmerDelay = Math.random() * 3500 + 500;
        
        const shimmerTimeout = setTimeout(() => {
          // Activate shimmer
          setShimmerActive(prev => ({
            ...prev,
            [tech.name]: true,
          }));

          // Random shimmer duration (400ms to 1200ms)
          const shimmerDuration = Math.random() * 800 + 400;
          
          // Deactivate shimmer after random duration
          const deactivateTimeout = setTimeout(() => {
            setShimmerActive(prev => ({
              ...prev,
              [tech.name]: false,
            }));
            
            // Immediately schedule next shimmer for this bubble
            startRandomShimmer();
          }, shimmerDuration);

          timeouts.push(deactivateTimeout);
        }, nextShimmerDelay);

        timeouts.push(shimmerTimeout);
      };

      // Start the shimmer cycle for this bubble
      startRandomShimmer();
    });

    // Clean up all timeouts
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [techStack]);

  useEffect(() => {
    // Get section offset for scroll calculations
    if (sectionRef.current) {
      const updateOffset = () => {
        setSectionOffset(sectionRef.current.offsetTop);
      };
      updateOffset();
      window.addEventListener('resize', updateOffset);
      return () => window.removeEventListener('resize', updateOffset);
    }
  }, []);

  // Smooth animation loop for orbital motion
  useEffect(() => {
    let animationFrame;
    const animate = () => {
      setTime(prev => prev + 0.008);
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // IMPROVED: Slower scroll-based fade with extended visibility range
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const sectionHeight = 900;
  
  const sectionTop = sectionOffset - scrollY;
  const sectionCenter = sectionTop + (sectionHeight / 2);
  const viewportCenter = viewportHeight / 2;
  
  const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
  
  // INCREASED fade range for slower disappearing (was 400, now 800)
  const fadeRange = 800;
  let sectionOpacity = 1;
  
  if (distanceFromCenter < fadeRange) {
    // More gradual fade curve
    const fadeProgress = distanceFromCenter / fadeRange;
    sectionOpacity = 1 - Math.pow(fadeProgress, 1.5); // Power curve for smoother fade
  } else {
    sectionOpacity = 0;
  }
  
  sectionOpacity = Math.max(0, Math.min(1, sectionOpacity));

  // Calculate orbital position
  const calculatePosition = (tech) => {
    const orbitRadii = {
      1: 300,
      2: 420,
      3: 540,
    };

    const radius = orbitRadii[tech.orbit];
    const currentAngle = (tech.angle + time * tech.speed * 10) * (Math.PI / 180);
    
    const x = Math.cos(currentAngle) * radius;
    const y = Math.sin(currentAngle) * radius * 0.7;
    
    return { x, y };
  };

  // Get size classes
  const getSizeClass = (orbit) => {
    const sizes = {
      1: 'w-28 h-28 text-sm',
      2: 'w-24 h-24 text-xs',
      3: 'w-20 h-20 text-[10px]',
    };
    return sizes[orbit];
  };

  // Get opacity based on orbit
  const getOrbitOpacity = (orbit) => {
    const opacities = { 1: 1, 2: 0.9, 3: 0.8 };
    return opacities[orbit] * sectionOpacity;
  };

  return (
    <div 
      ref={sectionRef}
      className="relative w-full flex justify-center items-center my-32 cursor-none"
      style={{
        opacity: sectionOpacity,
        transition: 'opacity 0.3s ease-out',
      }}
    >
      <div 
        className="relative w-full max-w-7xl h-[900px] flex items-center justify-center cursor-none"
        style={{ 
          perspective: '1200px',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Orbital path rings */}
        {[300, 420, 540].map((radius, idx) => (
          <div
            key={`orbit-${radius}`}
            className="absolute pointer-events-none cursor-none"
            style={{
              left: '50%',
              top: '50%',
              width: `${radius * 2}px`,
              height: `${radius * 2 * 0.7}px`,
              transform: 'translate(-50%, -50%)',
              border: '1px solid rgba(255, 255, 255, 0.04)',
              borderRadius: '50%',
              opacity: sectionOpacity * 0.5,
            }}
          />
        ))}

        {/* Profile Picture */}
        <div
          className="absolute z-30 cursor-none"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: sectionOpacity,
          }}
        >
          <div className="relative">
            {/* Pulsing glow */}
            <div 
              className="absolute inset-0 rounded-full pointer-events-none cursor-none"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                transform: `scale(${1.8 + Math.sin(time * 2) * 0.15})`,
                transition: 'transform 0.3s ease-out',
              }}
            />
            
            {/* Profile circle */}
            <div className="w-60 h-60 rounded-full glass-morph overflow-hidden border-2 border-white/20 relative shadow-2xl cursor-none">
              <img 
                src={profilePic}
                alt="Dylan Gorrah" 
                className="w-full h-full object-cover cursor-none"
                onError={(e) => {
                  console.error('Profile picture failed to load');
                  e.target.outerHTML = '<div class="w-full h-full bg-gradient-to-br from-cyan-400/20 to-blue-600/20 flex items-center justify-center cursor-none"><span class="text-7xl">👨‍💻</span></div>';
                }}
              />
            </div>
          </div>
        </div>

        {/* Tech Bubbles - WITH COMPLETELY INDEPENDENT METALLIC SHINE */}
        {techStack.map((tech, index) => {
          const { x, y } = calculatePosition(tech);
          const bubbleOpacity = getOrbitOpacity(tech.orbit);
          const sizeClass = getSizeClass(tech.orbit);
          
          return (
            <div
              key={`${tech.orbit}-${tech.name}`}
              className="orbital-bubble absolute cursor-none"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                opacity: bubbleOpacity,
                zIndex: 20,
              }}
            >
              <div
                className={`${sizeClass} glass-morph rounded-full flex items-center justify-center font-medium relative overflow-hidden transition-transform duration-300 hover:scale-110 cursor-none ${
                  tech.hasMetallic
                    ? `metallic-shine-bubble ${shimmerActive[tech.name] ? 'shine-active' : ''}`
                    : ''
                }`}
                style={{
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  animationDelay: `${index * 0.3}s`,
                  border: '1px solid rgba(255, 192, 203, 0.4)',
                }}
              >
                {tech.hasMetallic && <div className="metallic-shine-effect"></div>}
                <span className={`bg-gradient-to-r ${tech.color} bg-clip-text text-transparent relative z-10 font-semibold`}>
                  {tech.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrbitalProfile;