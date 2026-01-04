import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Github, Linkedin, Mail, Moon, Sun, Trophy, Star, 
  Code, Download, User, Briefcase, Image as ImageIcon, ArrowUpRight, Globe, Database 
} from 'lucide-react';

const Portfolio = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [magicVisible, setMagicVisible] = useState(true);

  // 🪄 THE MAGIC LOOP: Name disappears and reappears
  useEffect(() => {
    const interval = setInterval(() => {
      setMagicVisible(false);
      setTimeout(() => setMagicVisible(true), 2000);
    }, 6000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const navLinks = [
    { name: 'About', icon: <User size={18} />, href: '#about' },
    { name: 'Skills', icon: <Code size={18} />, href: '#skills' },
    { name: 'Wins', icon: <Trophy size={18} />, href: '#achievements' },
    { name: 'Gallery', icon: <ImageIcon size={18} />, href: '#gallery' },
    { name: 'Contact', icon: <Mail size={18} />, href: '#contact' },
  ];

  const nameLetters = "BHAVANA".split("");

  const skillSet = [
    { name: 'Frontend', tools: 'React, Tailwind, Framer', level: '95%', icon: <Code /> },
    { name: 'Backend', tools: 'Node.js, Express, SQL', level: '80%', icon: <Database /> },
    { name: 'UI/UX', tools: 'Figma', level: '85%', icon: <Globe /> },
    { name: 'ML', tools: 'pycharm, jupitor, colab', level: '70%', icon: <Star /> }
  ];

  const galleryItems = [
    { title: "Yoga & Mindfulness", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" },
    { title: "Vocal Arts / Singing", img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800" },
    { title: "Nature", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800" }, 
    { title: "Software Development", img: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&q=80&w=800" }
  ];

  return (
    <div className={`${isDarkMode ? 'bg-[#050505] text-white' : 'bg-slate-50 text-slate-900'} min-h-screen transition-colors duration-700 font-sans scroll-smooth selection:bg-blue-600`}>
      
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[100] origin-left" style={{ scaleX }} />

      {/* 1. NAVBAR WITH ICONS */}
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[95%] max-w-4xl rounded-full border border-white/10 ${scrolled ? 'backdrop-blur-xl bg-black/60 py-3 px-8 shadow-2xl' : 'bg-transparent py-5 px-6'}`}>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-black tracking-tighter uppercase">B<span className="text-blue-600">.</span></h1>
          <div className="flex items-center gap-6 md:gap-10">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="flex items-center gap-2 group transition-all">
                <span className="text-blue-500 group-hover:scale-125 transition-transform">{link.icon}</span>
                <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100">{link.name}</span>
              </a>
            ))}
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="cursor-pointer p-2 rounded-full hover:bg-white/10 transition-colors">
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION (MAGIC LETTERS) */}
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <div className="text-center z-10">
          <div className="h-[140px] md:h-[180px] flex justify-center items-center overflow-hidden">
            <AnimatePresence mode="wait">
              {magicVisible && (
                <motion.div className="flex gap-2">
                  {nameLetters.map((letter, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: 150, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -150, opacity: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.6, ease: "backOut" }}
                      className="text-7xl md:text-[150px] font-black leading-none tracking-tighter uppercase"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <motion.h2 className="text-2xl md:text-5xl font-black tracking-[0.3em] uppercase opacity-20 mt-4">KAMATAGI</motion.h2>
          <div className="mt-12">
            <a href="/resume.pdf" download className="group bg-blue-600 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all inline-flex items-center gap-2">
              <Download size={16} /> Download Resume
            </a>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      </section>

      {/* 3. ABOUT SECTION (Restored) */}
      <section id="about" className="py-32 container mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} className="md:col-span-5 relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[40px] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative aspect-square rounded-[40px] overflow-hidden border border-white/10">
            <img src="https://lh3.googleusercontent.com/d/1zXvcFVN7fDzU_vFaliaG6Mv6OzXX8K8f" className="relative rounded-2xl w-full grayscale hover:grayscale-0 transition-all duration-500" alt="About" />
           </div>
          </motion.div>
          <div className="md:col-span-7">
            <h3 className="text-5xl font-black uppercase tracking-tighter mb-6 italic text-blue-600">Creative Architect</h3>
            <p className="text-xl opacity-50 leading-relaxed mb-10 max-w-xl">
              I am a developer who bridges the gap between complex backend logic and pixel-perfect frontend design. Based in India, I focus on creating interfaces that tell a story and feel like magic.
            </p>
            <div className="flex flex-wrap gap-4">
               {["Yoga", "Singing", "AI Research"].map(item => (
                 <span key={item} className="px-6 py-2 bg-white/5 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest italic">{item}</span>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. SKILLS SECTION */}
      <section id="skills" className="py-24 container mx-auto px-6">
        <h3 className="text-4xl font-black mb-16 uppercase tracking-widest">Stack<span className="text-blue-600">.</span></h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {skillSet.map((skill, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="p-10 bg-white/5 rounded-[40px] border border-white/5 hover:bg-blue-600 transition-all group">
              <div className="mb-6 text-blue-500 group-hover:text-white transition-colors">{skill.icon}</div>
              <h4 className="text-xl font-bold uppercase mb-2 group-hover:text-white">{skill.name}</h4>
              <p className="text-[10px] uppercase font-bold opacity-30 group-hover:text-white/70">{skill.tools}</p>
              <div className="mt-4 text-2xl font-black group-hover:text-white">{skill.level}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. ACHIEVEMENTS SECTION */}
      <section id="achievements" className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 text-inherit">
          <h3 className="text-4xl font-black mb-16 uppercase tracking-widest">Milestones</h3>
          <div className="space-y-4">
            {[
              { t: "Ideathon 2025 Winner", d: "Awarded 1st Place", date: "2025" },
              { t: "Google WTM Lead", d: "Empowering women in tech", date: "2025" },
              { t: "Top University Ranker", d: "Academic Excellence", date: "2025" }
            ].map((a, i) => (
              <motion.div key={i} whileHover={{ x: 20 }} className="p-10 bg-white/5 rounded-[40px] flex justify-between items-center border border-white/5 transition-all">
                <div>
                  <h4 className="text-2xl font-bold uppercase">{a.t}</h4>
                  <p className="opacity-40">{a.d}</p>
                </div>
                <span className="text-blue-500 font-black">{a.date}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. GALLERY SECTION (Yoga, Singing, Laptop) */}
      <section id="gallery" className="py-32 container mx-auto px-6">
        <h3 className="text-4xl font-black mb-20 uppercase italic">Life & Code</h3>
        <div className="grid md:grid-cols-2 gap-10">
          {galleryItems.map((item, i) => (
            <motion.div key={i} whileHover={{ scale: 1.02 }} className="relative rounded-[50px] overflow-hidden aspect-video border border-white/10 group cursor-pointer">
              <a  target="_blank" rel="noreferrer">
                <img src={item.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" alt={item.title} />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="text-center">
                     <p className="text-white font-black uppercase text-xl">{item.title}</p>
                     <ArrowUpRight className="mx-auto mt-2 text-blue-400" />
                   </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. CONTACT SECTION */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-blue-600 rounded-[60px] p-20 text-center relative overflow-hidden shadow-2xl">
          <h3 className="text-5xl md:text-[90px] font-black uppercase tracking-tighter mb-10 text-white italic">Let's Connect.</h3>
          <div className="flex flex-wrap justify-center gap-6">
             <a href="mailto:bhavanask60@gmail.com" className="bg-white text-black px-12 py-5 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-110 transition-all">Email Me</a>
             <div className="flex gap-4">
                <a href="https://github.com/Bha-nu12" target="_blank" rel="noreferrer" className="p-5 bg-black text-white rounded-full hover:bg-zinc-900 transition-all shadow-xl"><Github /></a>
                <a href="https://www.linkedin.com/in/bhavana-kamatagi-bb633b281" target="_blank" rel="noreferrer" className="p-5 bg-black text-white rounded-full hover:bg-zinc-900 transition-all shadow-xl"><Linkedin /></a>
             </div>
          </div>
        </div>
      </section>

      <footer className="py-12 opacity-20 text-center text-[10px] font-bold tracking-[0.4em] uppercase">
        © 2026 BHAVANA KAMATAGI — ALL RIGHTS RESERVED
      </footer>
    </div>
  );
};

export default Portfolio;