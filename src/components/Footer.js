import React, { useState } from 'react';

const Footer = () => {
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

  return (
    <section 
      id="contact" 
      className="min-h-screen flex items-center px-8 md:px-16 lg:px-32 py-32"
    >
      <div className="max-w-4xl w-full mx-auto">
        <h2 className="text-5xl md:text-6xl font-light mb-8 slide-in">
          Get In Touch
        </h2>
        
        <p className="text-lg text-white/70 mb-12 leading-relaxed slide-in" style={{ animationDelay: '0.1s' }}>
          I'm always open to chat about new projects, collaborations, or ideas. Let's build something that stands out.
        </p>

        <div className="flex flex-wrap gap-4 mb-20 fade-slide-up" style={{ animationDelay: '0.2s' }}>
          {/* Email Button */}
          <button 
            onClick={() => setShowEmailModal(true)}
            className="px-10 py-4 bg-white text-black rounded-lg font-medium text-sm btn-linear tracking-wide"
          >
            Email Me
          </button>

          {/* Call/Text Button */}
          <button 
            onClick={() => setShowPhoneModal(true)}
            className="px-10 py-4 glass-morph text-white rounded-lg font-medium text-sm btn-linear tracking-wide"
          >
            Call/Text
          </button>

          {/* WhatsApp Button */}
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 glass-morph text-white rounded-lg font-medium text-sm btn-linear tracking-wide inline-flex items-center gap-2"
          >
            <span className="text-lg">💬</span>
            WhatsApp
          </a>

          {/* GitHub Button */}
          <a 
            href="https://github.com/Dylan-Gorrah" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 glass-morph text-white rounded-lg font-medium text-sm btn-linear tracking-wide"
          >
            GitHub
          </a>

          {/* LinkedIn Button */}
          <a 
            href="https://www.linkedin.com/in/dylan-gorrah-45aa07282" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 glass-morph text-white rounded-lg font-medium text-sm btn-linear tracking-wide"
          >
            LinkedIn
          </a>
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

        {/* Phone Modal */}
        {showPhoneModal && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center px-4"
            onClick={() => setShowPhoneModal(false)}
          >
            <div 
              className="glass-morph rounded-2xl p-8 max-w-md w-full scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Contact Options</h3>
              
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

              {/* Quick Actions */}
              <div className="space-y-3 mb-6">
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-white/80 hover:text-white text-sm font-medium transition-colors"
                >
                  <span className="text-lg">📞</span>
                  Call Now
                </a>
                
                <a
                  href={`sms:${phone.replace(/\s/g, '')}`}
                  className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-white/80 hover:text-white text-sm font-medium transition-colors"
                >
                  <span className="text-lg">💬</span>
                  Send SMS
                </a>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-white/80 hover:text-white text-sm font-medium transition-colors"
                >
                  <span className="text-lg">📱</span>
                  WhatsApp
                </a>
              </div>

              <button
                onClick={() => setShowPhoneModal(false)}
                className="w-full px-4 py-3 glass-morph text-white/80 rounded-lg text-sm font-medium hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div className="border-t border-white/10 pt-8 fade-slide-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-white/40 text-xs">© 2025 Dylan Gorrah. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;