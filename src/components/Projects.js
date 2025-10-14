import React from 'react';

const Projects = ({ mounted }) => {
  const projects = [
    {
      title: "WhatsApp Business Automation",
      status: "Live & Running",
      year: "2024",
      tagline: "From chaos to clarity — automated orders made simple",
      problem: "A family business was overwhelmed with back-and-forth messages trying to confirm every order",
      solution: "Built a one-click WhatsApp order system with automated workflows and instant confirmations",
      impact: "Order time dropped dramatically, monthly orders went up, and manual errors disappeared",
      note: "Go take a look — She's family, so no worries. 😄",
      link: "https://github.com/Dylan-Gorrah/Ecom-Whatsap-buissnes-Floral-themed-",
      tech: [
        { name: "React", color: "from-cyan-400 to-blue-500" },
        { name: "TypeScript", color: "from-blue-500 to-blue-700" },
        { name: "Tailwind", color: "from-cyan-400 to-blue-600" },
        { name: "Vite", color: "from-purple-500 to-pink-500" },
        { name: "shadcn/ui", color: "from-gray-400 to-gray-600" },
        { name: "WhatsApp API", color: "from-green-400 to-green-600" }
      ]
    },
    {
      title: "Echo-AI",
      status: "In Development",
      year: "2025",
      tagline: "Your daily AI research automation assistant",
      problem: "Manual daily research consuming 30+ minutes of valuable time",
      solution: "Automates daily searches, gathers info, and summarizes results at set times — all through natural language",
      impact: "Expected to save up to 90% of daily research time for professionals and students",
      tech: [
        { name: "TypeScript", color: "from-blue-500 to-blue-700" },
        { name: "JavaScript", color: "from-yellow-400 to-yellow-600" },
        { name: "Perplexity API", color: "from-cyan-400 to-blue-500" },
        { name: "Supabase", color: "from-green-400 to-emerald-500" },
        { name: "NLP", color: "from-indigo-400 to-purple-500" },
        { name: "Android Studio", color: "from-green-500 to-green-700" }
      ]
    },
    {
      title: "CodeBlooded",
      status: "Seeking Sponsorship",
      year: "2024",
      tagline: "Build reputation, not just code",
      problem: "Talented developers lacking portfolio visibility and community engagement",
      solution: "A gamified platform where developers post project ideas, build them, and earn clout from community engagement",
      impact: "Designed to boost creativity, teamwork, and visibility in the dev world",
      note: "This stuff is expensive to host 😅 — currently seeking sponsorship to launch it publicly",
      link: "https://github.com/Dylan-Gorrah/Code-Blooded",
      linkNote: "(There are GIFs, have a look 👀)",
      tech: [
        { name: "HTML5", color: "from-orange-500 to-red-600" },
        { name: "CSS3", color: "from-blue-400 to-blue-600" },
        { name: "JavaScript", color: "from-yellow-400 to-yellow-600" },
        { name: "Supabase", color: "from-green-400 to-emerald-500" }
      ]
    }
  ];

  return (
    <section 
      id="projects" 
      className="min-h-screen flex items-center px-8 md:px-16 lg:px-32 py-32"
    >
      <div className="max-w-7xl w-full mx-auto">
        <div className="mb-20">
          <h2 className="text-5xl md:text-6xl font-light mb-4 slide-in">
            Featured Projects
          </h2>
          <p className="text-sm text-white/50 slide-in" style={{ animationDelay: '0.1s' }}>
            Real solutions for real problems
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="card-linear glass-morph p-10 rounded-2xl fade-slide-up"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-2xl font-medium">{project.title}</h3>
                    <span className="text-xs font-medium text-cyan-400 uppercase tracking-widest px-3 py-1 glass-morph rounded-lg">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-white/50 italic mb-2">{project.tagline}</p>
                  {project.note && (
                    <p className="text-xs text-white/40 italic">{project.note}</p>
                  )}
                </div>
                <span className="text-white/40 mt-2 md:mt-0 font-medium text-sm">{project.year}</span>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                  <p className="text-xs font-medium text-white/40 uppercase mb-2 tracking-widest">Problem</p>
                  <p className="text-white/70 text-sm leading-relaxed">{project.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-white/40 uppercase mb-2 tracking-widest">Solution</p>
                  <p className="text-white/70 text-sm leading-relaxed">{project.solution}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-white/40 uppercase mb-2 tracking-widest">Impact</p>
                  <p className="text-white/90 text-sm font-medium leading-relaxed">{project.impact}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <span 
                    key={tech.name} 
                    className="px-3 py-1.5 glass-morph text-xs rounded-lg font-medium transition-all duration-300 hover:scale-105"
                  >
                    <span className={`bg-gradient-to-r ${tech.color} bg-clip-text text-transparent`}>
                      {tech.name}
                    </span>
                  </span>
                ))}
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white/90 rounded-lg text-xs font-medium transition-all duration-300 hover:scale-105"
                >
                  <span>View on GitHub</span>
                  <span>→</span>
                  {project.linkNote && (
                    <span className="text-white/50 ml-1">{project.linkNote}</span>
                  )}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;