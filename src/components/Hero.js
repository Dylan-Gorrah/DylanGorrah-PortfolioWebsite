import React from 'react';
import OrbitalProfile from './OrbitalProfile';

const Hero = ({ mounted, scrollY, scrollToSection }) => {
  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-start px-8 md:px-16 lg:px-32 py-32 relative overflow-hidden"
    >
      <div className="max-w-7xl w-full">
        {/* F-Pattern: Top-left content first */}
        <div className="mb-16">
          <h1 
            className={`text-7xl md:text-8xl lg:text-9xl font-light tracking-tight mb-8 ${mounted ? 'blur-slide-reveal' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s' }}
          >
            Dylan Gorrah
          </h1>

          {/* Professional Tags */}
          <div 
            className={`flex flex-wrap gap-2 mb-8 ${mounted ? 'fade-slide-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.6s' }}
          >
            {['MVP Specialist', 'Rapid Deployment', 'Full-Stack', 'Mentor', 'UX/UI Specialist'].map((tag, index) => (
              <span 
                key={tag}
                className="px-4 py-2 glass-morph rounded-lg text-xs font-medium text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300"
                style={{ animationDelay: `${0.6 + index * 0.05}s` }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div 
            className={`space-y-3 mb-12 ${mounted ? 'fade-slide-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.8s' }}
          >
            <p className="text-2xl md:text-3xl font-medium text-white/90">
             Front-end heavy, comfortable with full stack
            </p>
            <p className="text-sm text-white/50">
               Full-Stack Developer
            </p>
            <p className="text-xs text-white/40">
             South Africa • Tutor/Teacher at Rosebank College
            </p>
          </div>

          <div 
            className={`flex flex-wrap gap-8 mb-12 ${mounted ? 'fade-slide-up' : 'opacity-0'}`}
            style={{ animationDelay: '1.0s' }}
          >
            <div className="px-8 py-5 glass-morph rounded-xl">
              <div className="text-4xl font-light mb-1">2+</div>
              <div className="text-xs text-white/50 uppercase tracking-widest">Years</div>
            </div>
            <div className="px-8 py-5 glass-morph rounded-xl">
              <div className="text-4xl font-light mb-1">1000+</div>
              <div className="text-xs text-white/50 uppercase tracking-widest">Hours</div>
            </div>
          </div>
        </div>

        {/* ISOLATED ORBITAL PROFILE SECTION */}
        <OrbitalProfile scrollY={scrollY} />

        {/* Bottom CTA Section */}
        <div 
          className={`mt-16 ${mounted ? 'fade-slide-up' : 'opacity-0'}`}
          style={{ animationDelay: '1.6s' }}
        >
          <p className="text-lg text-white/70 mb-10 leading-relaxed max-w-2xl">
            Focused, creative, Best student on campus and proud holder of the Best Tutor/Teacher Award. I take pride in my work ethic, love learning new tech, and always keep things friendly and open, feel free to reach out.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => scrollToSection('work')}
              className="px-8 py-3.5 bg-white text-black rounded-lg font-medium text-sm btn-linear tracking-wide"
            >
              View Work
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3.5 glass-morph text-white rounded-lg font-medium text-sm btn-linear tracking-wide"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;