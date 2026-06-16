import React from 'react';
import { FadeIn } from './components/FadeIn';
import { AnimatedHeading } from './components/AnimatedHeading';
import { ScrollReveal } from './components/ScrollReveal';
import { Menu, X, ArrowUpRight, Target, Sparkles, Zap, Shield, ChevronRight } from 'lucide-react';

export default function App() {
  const [chatOpen, setChatOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [emailText, setEmailText] = React.useState('');
  const [messageSubmitted, setMessageSubmitted] = React.useState(false);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailText.trim()) {
      setMessageSubmitted(true);
      setTimeout(() => {
        setChatOpen(false);
        setMessageSubmitted(false);
        setEmailText('');
      }, 2500);
    }
  };

  // Cross-browser cubic ease-in-out identical smooth scroll implementation
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    // Calculate position with header offset
    const headerHeight = 110;
    const targetY = element.getBoundingClientRect().top + window.scrollY - headerHeight;

    const startY = window.scrollY;
    const difference = targetY - startY;
    const duration = 900; // Smooth 0.9s duration
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const t = Math.min(progress / duration, 1);
      
      // easeInOutCubic curve
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      
      window.scrollTo(0, startY + difference * ease);
      
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white select-none overflow-x-hidden">
      
      {/* 1. Header (Sticky/Fixed Navbar Row) */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-12 lg:px-16 pt-6">
        <nav className="liquid-glass rounded-xl px-4 py-2.5 md:px-6 md:py-3 flex items-center justify-between w-full shadow-2xl border border-white/5">
          {/* Left Brand */}
          <div 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-2.5 h-2.5 bg-white rounded-full group-hover:scale-125 transition-transform duration-300"></div>
            <span className="text-2xl font-semibold tracking-tight text-white">VEX</span>
          </div>

          {/* Center Navigation Links (Hidden on mobile, visible md+) */}
          <div className="hidden md:flex items-center gap-8">
            {['Story', 'Investing', 'Building', 'Advisory'].map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link.toLowerCase())}
                className="text-sm text-gray-300 hover:text-white transition-colors duration-250 font-medium cursor-pointer bg-transparent border-none outline-none"
              >
                {link}
              </button>
            ))}
          </div>

          {/* Right Action Button & Hamburger Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setChatOpen(true)}
              className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Start a Chat
            </button>

            {/* Interactive Hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* Mobile Navigation Dropdown Menu (Liquid Glass design) */}
          {mobileMenuOpen && (
            <div className="absolute top-[calc(100%+8px)] left-0 right-0 liquid-glass rounded-xl p-4 flex flex-col gap-2.5 shadow-2xl md:hidden border border-white/10 transition-all duration-300">
              {['Story', 'Investing', 'Building', 'Advisory'].map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    // Slight delay for premium interaction feel
                    setTimeout(() => scrollToSection(link.toLowerCase()), 100);
                  }}
                  className="text-left w-full px-4 py-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-all text-sm font-medium bg-transparent border-none"
                >
                  {link}
                </button>
              ))}
              <div className="h-[1px] bg-white/10 my-1"></div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setChatOpen(true);
                }}
                className="w-full text-center bg-white text-black py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 active:scale-95 transition-all cursor-pointer"
              >
                Start a Chat
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* 2. HERO FOLD SECTION */}
      <section id="hero" className="relative w-full h-screen overflow-hidden flex flex-col justify-between z-10">
        {/* Background radial glow */}
        <div className="absolute inset-0 z-0 bg-black overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-blue-900/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-zinc-800/10 rounded-full blur-[100px]"></div>
        </div>

        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Spacer top for navbar row height */}
        <div className="h-28"></div>

        {/* Hero Content (Bottom of viewport) */}
        <main className="w-full px-6 md:px-12 lg:px-16 pb-12 lg:pb-16 flex-1 flex flex-col justify-end relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:items-end w-full gap-8">
            
            {/* Left Column - Main Content */}
            <div className="flex flex-col items-start max-w-2xl">
              {/* Heading */}
              <AnimatedHeading
                text="Shaping tomorrow&#10;with vision and action."
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4 text-white uppercase tracking-tight"
                charDelay={30}
                initialDelay={200}
                transitionDuration={500}
              />

              {/* Subheading */}
              <FadeIn delay={800} duration={1000} className="w-full">
                <p className="text-base md:text-lg text-gray-300 mb-6 font-light leading-relaxed max-w-lg">
                  We back visionaries and craft ventures that define what comes next.
                </p>
              </FadeIn>

              {/* Buttons row */}
              <FadeIn delay={1200} duration={1000} className="w-full">
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setChatOpen(true)}
                    className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 active:scale-95 transition-all duration-200 cursor-pointer"
                  >
                    Start a Chat
                  </button>
                  <button
                    onClick={() => scrollToSection('story')}
                    className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black hover:border-transparent active:scale-95 transition-all duration-300 cursor-pointer"
                  >
                    Explore Now
                  </button>
                </div>
              </FadeIn>
            </div>

            {/* Right Column - Tag */}
            <div className="mt-8 lg:mt-0 flex items-end justify-start lg:justify-end">
              <FadeIn delay={1400} duration={1000}>
                <div className="liquid-glass border border-white/20 px-6 py-4 rounded-xl shadow-2xl">
                  <span className="text-lg md:text-xl lg:text-2xl font-light text-white tracking-wide">
                    Investing. Building. Advisory.
                  </span>
                </div>
              </FadeIn>
            </div>

          </div>
        </main>
      </section>

      {/* 3. STORY SECTION */}
      <section id="story" className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-[#030303] border-t border-white/10">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-zinc-900/40 rounded-full blur-[150px] -z-10"></div>
        <ScrollReveal className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-400 tracking-wider uppercase">
              <Sparkles size={12} className="text-white" />
              Our Core Heritage
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight">
              A story built on absolute conviction.
            </h2>
            <p className="text-gray-400 font-light leading-relaxed">
              We started VEX because standard venture acceleration was broken. We don't believe in incremental improvements or safety buffers. We partner with visionaries eager to fundamentally alter industries.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="liquid-glass p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <Target size={18} />
              </div>
              <h3 className="text-lg font-medium text-white">Ventral Alignment</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                We put skin in the game. Every build and strategy is tightly bound to mutual venture outcome rather than administrative fees.
              </p>
            </div>

            <div className="liquid-glass p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <Zap size={18} />
              </div>
              <h3 className="text-lg font-medium text-white">Decisive Execution</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                We value swift feedback and uncompromising code output. Our teams turn abstract, bold designs into production-ready ventures in weeks.
              </p>
            </div>
          </div>

        </ScrollReveal>
      </section>

      {/* 4. INVESTING SECTION */}
      <section id="investing" className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-black border-t border-white/10">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-zinc-900/35 rounded-full blur-[140px] -z-10"></div>
        <ScrollReveal className="max-w-6xl mx-auto space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-400 tracking-wider uppercase">
                <Shield size={12} className="text-white" />
                Capital Deployment
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white">
                Where we back momentum.
              </h2>
            </div>
            <p className="text-gray-400 font-light leading-relaxed max-w-md">
              We provide conviction capital, deep operational involvement, and architectural support to early stack startups globally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Venture Synthesis",
                description: "We co-build ideas from early code drafts, integrating our specialized team straight into your foundation layer.",
                stage: "Co-Creation Stage"
              },
              {
                title: "Conviction Capital",
                description: "Pre-seed and seed support that provides maximum trajectory acceleration without micro-management.",
                stage: "Capital First"
              },
              {
                title: "Ecosystem Leverage",
                description: "Unmatched network integration with tier-1 enterprise stakeholders, technical advisors, and strategic allies.",
                stage: "Global Advisory"
              }
            ].map((card, idx) => (
              <div 
                key={idx}
                className="liquid-glass group p-8 rounded-2xl border border-white/10 hover:border-white/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[280px]"
              >
                <div className="space-y-4">
                  <span className="text-xs font-mono text-white/40 tracking-widest uppercase block">
                    {card.stage}
                  </span>
                  <h3 className="text-xl font-medium text-white">{card.title}</h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    {card.description}
                  </p>
                </div>
                
                <div className="pt-6 flex items-center justify-between text-white border-t border-white/5 mt-4 group-hover:border-white/15">
                  <span className="text-xs font-medium">Learn Architecture</span>
                  <ArrowUpRight size={14} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 duration-200" />
                </div>
              </div>
            ))}
          </div>

        </ScrollReveal>
      </section>

      {/* 5. BUILDING SECTION */}
      <section id="building" className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-[#030303] border-t border-white/10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-950/5 rounded-full blur-[180px] -z-10"></div>
        <ScrollReveal className="max-w-6xl mx-auto space-y-16">
          
          <div className="space-y-4 max-w-xl">
            <span className="text-xs font-mono text-white/40 uppercase tracking-widest block">VENTURE BUILD ENGINE</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white leading-tight">
              We construct. We do not just invest.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 p-8 md:p-10 rounded-3xl flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-light text-white">Full Stack Venture Studio</h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed">
                  We supply world-class programmers, interactive designers, and growth practitioners to quickly structure high-conviction product designs. We get hands-on with the terminal, crafting beautiful codebases.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Pristine layouts modeled using Inter and JetBrains typography",
                  "Cubic bezier motion transitions paired with responsive glass containers",
                  "Direct native engine integrations avoiding boilerplate framework noise",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mt-0.5">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                    <span className="text-xs text-gray-300 font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 liquid-glass border border-white/10 p-8 md:p-10 rounded-3xl flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">INCUBATION SPEED</span>
                <h3 className="text-2xl font-light text-white">From Idea to Orbit</h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed">
                  Our builds ignore trivial iterations. We push direct to live environments, monitoring user loops from the absolute first hour.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between gap-4 mt-6">
                <div>
                  <span className="text-xs font-mono text-white/40 block">TYPICAL CYCLE TIME</span>
                  <span className="text-xl font-medium text-white">24 Days</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm">
                  →
                </div>
              </div>
            </div>

          </div>

        </ScrollReveal>
      </section>

      {/* 6. ADVISORY SECTION */}
      <section id="advisory" className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-black border-t border-white/10">
        <ScrollReveal className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono text-white/40 uppercase tracking-widest block">TACTICAL BOARDROOMS</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white leading-none">
              Advising for exponential outcomes.
            </h2>
            <p className="text-gray-400 font-light leading-relaxed">
              We guide executive boards, structure strategic mergers, handle institutional token modeling, and engineer growth loops that sustain long term value.
            </p>

            <button 
              onClick={() => setChatOpen(true)}
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
            >
              Start Strategic Advisory Setup
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="lg:col-span-6 space-y-4">
            {[
              {
                title: "Corporate Restructuring",
                desc: "Aligning mature conglomerates with rapid modern technology shifts."
              },
              {
                title: "Scale Modeling",
                desc: "Structuring programmatic expansion models into international spaces."
              },
              {
                title: "Protocol Security Architecture",
                desc: "Deep smart contract audit, key security guidelines, and cryptoeconomic layouts."
              }
            ].map((adv, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/10 transition-all duration-300 flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 text-sm font-mono mt-0.5">
                  0{index + 1}
                </div>
                <div>
                  <h4 className="text-md font-medium text-white mb-1">{adv.title}</h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">{adv.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </ScrollReveal>
      </section>

      {/* 7. REFINED FOOTER */}
      <footer className="w-full bg-[#030303] border-t border-white/10 py-12 px-6 md:px-12 lg:px-16 relative z-10 text-white/60">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="text-lg font-semibold tracking-tight text-white">VEX</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono">
            <span>© 2026 VEX INC. ALL RIGHTS RESERVED.</span>
            <button 
              onClick={() => scrollToSection('hero')} 
              className="text-white hover:underline bg-transparent border-none cursor-pointer"
            >
              BACK TO COVER
            </button>
          </div>
        </div>
      </footer>

      {/* 8. Start a Chat Dialog */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div 
            className="liquid-glass border border-white/20 p-8 rounded-2xl max-w-md w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setChatOpen(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors duration-200 text-lg cursor-pointer"
              title="Close"
            >
              &times;
            </button>
            
            {!messageSubmitted ? (
              <form onSubmit={handleChatSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-1 text-white">Let's shape what's next</h3>
                  <p className="text-sm text-gray-300 font-light">
                    Submit your details and someone from the VEX team will connect shortly.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={emailText}
                      onChange={(e) => setEmailText(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-1">
                      Message
                    </label>
                    <textarea
                      placeholder="How can we help you build or invest?"
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors text-sm resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-black py-3 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                >
                  Send Inquiry
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-white/10 border border-white/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white">Inquiry Received</h3>
                <p className="text-sm text-gray-300 font-light">
                  Thank you. We'll reach out to <span className="font-semibold">{emailText}</span>.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

