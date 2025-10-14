import React from 'react';

const Experience = ({ mounted }) => {
  return (
    <section 
      id="work" 
      className="min-h-screen flex items-center px-8 md:px-16 lg:px-32 py-32"
    >
      <div className="max-w-7xl w-full mx-auto">
        {/* Philosophy Quote - MOVED HERE BEFORE WORK */}
        <div className="mb-20 fade-slide-up" style={{ animationDelay: '0.1s' }}>
          <blockquote className="border-l-4 border-pink-500/40 pl-6 py-4">
            <p className="text-white/80 text-lg italic leading-relaxed mb-3">
              "Users shouldn't be bothered by bugs or confused by technology. They should simply enjoy the reason they came — whether it's to buy, learn, or get a service."
            </p>
            <cite className="text-white/50 text-sm not-italic">— Dylan Gorrah</cite>
          </blockquote>
        </div>

        <div className="mb-20">
          <h2 className="text-5xl md:text-6xl font-light mb-4 slide-in">
            Work & Experience
          </h2>
          <p className="text-sm text-white/50 slide-in" style={{ animationDelay: '0.1s' }}>
            Teaching, building, and solving real-world problems
          </p>
        </div>

        <div className="mb-8">
          <div className="card-linear glass-morph p-10 rounded-2xl fade-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-medium">Tutor/Teacher</h3>
                  <span className="text-xs font-medium text-emerald-400 uppercase tracking-widest px-3 py-1 glass-morph rounded-lg">
                    Teaching
                  </span>
                </div>
                <p className="text-sm text-white/50">Rosebank College</p>
              </div>
              <span className="text-white/40 mt-2 md:mt-0 font-medium text-sm">2025</span>
            </div>
            
            <p className="text-white/70 leading-relaxed">
              Mentoring the next generation of developers in software fundamentals
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;