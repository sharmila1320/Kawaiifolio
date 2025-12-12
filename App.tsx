import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_PINS } from './constants';
import { PinData, StickerData, PinType } from './types';
import Pin from './components/Pin';
import ChatWidget from './components/ChatWidget';
import Sticker from './components/Sticker';
import Background from './components/Background';

const STICKERS: StickerData[] = [
  { id: '1', emoji: '🌸', top: '10%', left: '5%', rotation: -10 },
  { id: '2', emoji: '✨', top: '20%', left: '90%', rotation: 15 },
  { id: '3', emoji: '💻', top: '60%', left: '2%', rotation: -5 },
  { id: '4', emoji: '🤖', top: '80%', left: '92%', rotation: 10 },
  { id: '5', emoji: '☁️', top: '5%', left: '50%', rotation: 0 },
];

type Theme = 'light' | 'dark' | 'system';

const App: React.FC = () => {
  const [selectedPin, setSelectedPin] = useState<PinData | null>(null);
  const [filter, setFilter] = useState<string>('ALL');
  
  // Theme State
  const [themeMode, setThemeMode] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'system';
  });
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light');

  // Persistence for Saved Pins
  const [savedPinIds, setSavedPinIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kawaiifolio_saved_pins');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse saved pins from local storage", e);
      return [];
    }
  });

  // Email Copy State
  const [emailCopied, setEmailCopied] = useState(false);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Apply Theme Logic
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    let targetTheme: 'light' | 'dark' = 'light';

    if (themeMode === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      targetTheme = systemTheme;
    } else {
      targetTheme = themeMode;
    }

    setEffectiveTheme(targetTheme);
    root.classList.add(targetTheme);
    localStorage.setItem('theme', themeMode);
  }, [themeMode]);

  const filteredPins = filter === 'ALL' 
    ? PORTFOLIO_PINS 
    : PORTFOLIO_PINS.filter(pin => pin.type === filter);

  const handleToggleSave = (e: React.MouseEvent, pinId: string) => {
    e.stopPropagation();
    setSavedPinIds(prev => {
      const isSaved = prev.includes(pinId);
      const newSaved = isSaved 
        ? prev.filter(id => id !== pinId) 
        : [...prev, pinId];
      localStorage.setItem('kawaiifolio_saved_pins', JSON.stringify(newSaved));
      return newSaved;
    });
  };

  const handleDownloadResume = () => {
    const element = document.createElement("a");
    element.href = "/assets/resume.pdf";
    element.download = "Rapeti_Sharmila_Resume.pdf";
    document.body.appendChild(element);
    element.click();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("sharmilarapeti1451@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link with form data
    const subject = `Portfolio Contact from ${contactForm.name}`;
    const body = `Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}`;
    const mailtoLink = `mailto:sharmilarapeti1451@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Create WhatsApp link
    const whatsappMessage = `*Portfolio Contact*\n\n*Name:* ${contactForm.name}\n*Email:* ${contactForm.email}\n*Message:* ${contactForm.message}`;
    const whatsappLink = `https://wa.me/918341251461?text=${encodeURIComponent(whatsappMessage)}`;

    // Open email client
    window.open(mailtoLink, '_blank');

    // Open WhatsApp (with a small delay)
    setTimeout(() => {
      window.open(whatsappLink, '_blank');
    }, 1000);

    // Reset form
    setContactForm({ name: '', email: '', message: '' });
    setSubmitMessage('Email and WhatsApp opened! Please send your messages.');
    setIsSubmitting(false);

    setTimeout(() => setSubmitMessage(''), 5000);
  };

  const isTechStack = selectedPin?.title === 'Tech Stack' || selectedPin?.type === PinType.SKILL;

  return (
    <div className={`min-h-screen relative overflow-x-hidden pb-20 transition-colors duration-500 ${effectiveTheme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>
      
      <Background theme={effectiveTheme} />

      {/* Decorative Stickers */}
      {STICKERS.map((sticker, idx) => (
        <Sticker 
          key={sticker.id}
          emoji={sticker.emoji}
          top={sticker.top}
          left={sticker.left}
          rotation={sticker.rotation}
          delay={idx * 0.2}
        />
      ))}

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-stone-100 dark:border-slate-800 py-4 px-6 mb-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
           {/* Logo Area */}
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 flex items-center justify-center font-bold text-lg">
               R
             </div>
             <h1 className="font-display font-bold text-xl tracking-tight text-slate-800 dark:text-white">
               Sharmila Rapeti <span className="text-slate-400 dark:text-slate-500 font-normal text-sm ml-1 hidden sm:inline">| SDE & AI/ML</span>
             </h1>
           </div>

           {/* Theme Toggle */}
           <div className="flex items-center bg-stone-100 dark:bg-slate-800 rounded-full p-1">
             <button 
               onClick={() => setThemeMode('light')}
               className={`p-2 rounded-full transition-all ${themeMode === 'light' ? 'bg-white dark:bg-slate-600 shadow-sm text-yellow-500' : 'text-slate-400'}`}
               title="Light Mode"
             >
               ☀️
             </button>
             <button 
               onClick={() => setThemeMode('dark')}
               className={`p-2 rounded-full transition-all ${themeMode === 'dark' ? 'bg-white dark:bg-slate-600 shadow-sm text-blue-400' : 'text-slate-400'}`}
               title="Dark Mode"
             >
               🌙
             </button>
             <button 
               onClick={() => setThemeMode('system')}
               className={`p-2 rounded-full transition-all ${themeMode === 'system' ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-800 dark:text-slate-100' : 'text-slate-400'}`}
               title="System Default"
             >
               🖥️
             </button>
           </div>

           {/* Contact Button */}
           <button
             onClick={() => setSelectedPin(PORTFOLIO_PINS.find(pin => pin.id === '12'))}
             className="bg-slate-800 dark:bg-slate-700 text-white font-bold py-2 px-6 rounded-full hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200 flex items-center gap-2"
           >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
             </svg>
             Contact Me
           </button>

           {/* Search/Filter Bar */}
           <div className="flex items-center gap-2 overflow-hidden w-full md:w-auto">
             <button
                onClick={() => setFilter('ALL')}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap shadow-sm border border-transparent ${
                  filter === 'ALL'
                    ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-900 shadow-md transform scale-105'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-stone-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-500'
                }`}
             >
               View All
             </button>
             <div className="bg-stone-100 dark:bg-slate-800 rounded-full p-1 flex items-center gap-1 overflow-x-auto no-scrollbar flex-1 md:flex-none">
               {['PROJECT', 'EXPERIENCE', 'ACHIEVEMENT', 'SKILL', 'RESUME'].map((type) => (
                 <button
                   key={type}
                   onClick={() => setFilter(type)}
                   className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                     filter === type 
                       ? 'bg-white dark:bg-slate-600 shadow-md text-slate-800 dark:text-white' 
                       : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-stone-200/50 dark:hover:bg-slate-700'
                   }`}
                 >
                   {type.charAt(0) + type.slice(1).toLowerCase().replace('_', ' ') + 's'}
                 </button>
               ))}
             </div>
           </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-3xl mx-auto text-center mb-12 px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
          <div className="inline-block relative">
             <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-xl mx-auto mb-6 relative z-10 bg-cute-pink/20 dark:bg-purple-900/30">
               <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cute-pink to-cute-purple dark:from-indigo-900 dark:via-purple-900 dark:to-black text-4xl">
                 👩‍💻
               </div>
             </div>
             <motion.div 
               className="absolute -bottom-2 -right-2 z-20 bg-white dark:bg-slate-800 text-3xl p-2 rounded-full shadow-md"
               animate={{ rotate: [0, 10, -10, 0] }}
               transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
             >
               ✨
             </motion.div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-800 dark:text-white mb-4">
            Rapeti <span className="text-transparent bg-clip-text bg-gradient-to-r from-cute-blue to-cute-purple dark:from-indigo-300 dark:via-purple-200 dark:to-pink-300">Sharmila</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-300 max-w-xl mx-auto mb-6">
             Hybrid SDE & AI/ML Enthusiast | ECE'26 @ NIT Silchar<br />
             Building logic with a touch of imagination.
          </p>

          {/* Email Section */}
          <div className="flex items-center justify-center">
             <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-full shadow-sm border border-stone-100 dark:border-slate-700 hover:shadow-md transition-all duration-300 group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 group-hover:text-cute-blue transition-colors" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:sharmilarapeti1451@gmail.com" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                  sharmilarapeti1451@gmail.com
                </a>
                <div className="w-px h-4 bg-stone-200 dark:bg-slate-600"></div>
                <button 
                  onClick={handleCopyEmail}
                  className="relative p-1 text-slate-400 hover:text-cute-blue dark:hover:text-blue-400 transition-colors rounded-full hover:bg-stone-100 dark:hover:bg-slate-700"
                >
                  {emailCopied ? (
                    <motion.svg
                      animate={{ scale: 1 }} 
                      className="h-4 w-4 text-green-500" 
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </motion.svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
                
                <AnimatePresence>
                  {emailCopied && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, x: '-50%' }}
                      animate={{ opacity: 1, y: -30, x: '-50%' }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold py-1 px-2 rounded shadow-lg whitespace-nowrap pointer-events-none"
                    >
                      Copied!
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </div>
        </motion.div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {filteredPins.map((pin) => (
            <Pin 
              key={pin.id} 
              data={pin} 
              onClick={setSelectedPin} 
              isSaved={savedPinIds.includes(pin.id)}
              onToggleSave={(e) => handleToggleSave(e, pin.id)}
            />
          ))}
        </div>
        
        {filteredPins.length === 0 && (
          <div className="text-center py-20 text-slate-400 dark:text-slate-500">
            <div className="text-6xl mb-4">🕸️</div>
            <p>No pins found for this category yet!</p>
          </div>
        )}
      </main>

      {/* Modal Detail View */}
      <AnimatePresence>
        {selectedPin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm ${(isTechStack || selectedPin?.id === '12') ? 'p-0' : 'p-4'}`}
            onClick={() => setSelectedPin(null)}
          >
            <motion.div
              initial={(isTechStack || selectedPin?.id === '12') ? { opacity: 0, scale: 0.8 } : { scale: 0.9, y: 50 }}
              animate={(isTechStack || selectedPin?.id === '12') ? { opacity: 1, scale: 1 } : { scale: 1, y: 0 }}
              exit={(isTechStack || selectedPin?.id === '12') ? { opacity: 0, scale: 0.8 } : { scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className={`${
                (isTechStack || selectedPin?.id === '12')
                  ? 'w-full h-full rounded-none md:rounded-3xl max-w-6xl max-h-[95vh] m-4' 
                  : 'rounded-[40px] max-w-4xl max-h-[90vh]'
              } w-full bg-white dark:bg-slate-900 overflow-y-auto flex flex-col ${!(isTechStack || selectedPin?.id === '12') && 'md:flex-row'} shadow-2xl overflow-hidden relative`}
            >
              
              {/* Close Button */}
               <button 
                onClick={() => setSelectedPin(null)} 
                className="absolute top-4 right-4 z-20 p-2 bg-white/50 dark:bg-black/50 hover:bg-white dark:hover:bg-black rounded-full transition-colors backdrop-blur-md"
               >
                  <svg className="w-6 h-6 text-slate-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
               </button>

              {/* Special Layout for Contact Form */}
              {selectedPin?.id === '12' ? (
                <div className="p-8 md:p-12 h-full flex flex-col bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-display font-bold text-center mb-8 text-slate-800 dark:text-white"
                  >
                    Contact <span className="text-cute-blue dark:text-blue-400">Me</span>
                  </motion.h2>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-2xl mx-auto w-full"
                  >
                    <form onSubmit={handleContactSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-cute-blue focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Your Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-cute-blue focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                          placeholder="Enter your email address"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={5}
                          value={contactForm.message}
                          onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-cute-blue focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
                          placeholder="Tell me about your project, collaboration ideas, or just say hello!"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-slate-800 dark:bg-slate-700 text-white font-bold py-4 rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Opening Email & WhatsApp...
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            Send Message
                          </>
                        )}
                      </button>
                      
                      {submitMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center text-green-600 dark:text-green-400 font-medium"
                        >
                          {submitMessage}
                        </motion.div>
                      )}
                    </form>
                  </motion.div>
                </div>
              ) : isTechStack ? (
                 <div className="p-8 md:p-12 h-full flex flex-col bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-5xl font-display font-bold text-center mb-12 text-slate-800 dark:text-white"
                    >
                      Technical <span className="text-cute-blue dark:text-blue-400">Arsenal</span>
                    </motion.h2>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto pb-10"
                    >
                       <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700">
                          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-slate-700 dark:text-slate-200">
                            <span>💻</span> Languages
                          </h3>
                          <div className="flex flex-wrap gap-2">
                             {['C++', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'HTML5', 'CSS3'].map(skill => (
                               <span key={skill} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-lg font-medium">{skill}</span>
                             ))}
                          </div>
                       </div>

                       <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700">
                          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-slate-700 dark:text-slate-200">
                            <span>🌐</span> Web & Backend
                          </h3>
                          <div className="flex flex-wrap gap-2">
                             {['React.js', 'Next.js', 'Node.js', 'Express.js', 'Tailwind', 'FastAPI', 'MongoDB', 'PostgreSQL'].map(skill => (
                               <span key={skill} className="px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-lg font-medium">{skill}</span>
                             ))}
                          </div>
                       </div>

                       <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700">
                          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-slate-700 dark:text-slate-200">
                            <span>🧠</span> AI & Machine Learning
                          </h3>
                          <div className="flex flex-wrap gap-2">
                             {['TensorFlow', 'Keras', 'PyTorch', 'Scikit-Learn', 'OpenCV', 'Transformers', 'CNNs', 'RNNs', 'NLP'].map(skill => (
                               <span key={skill} className="px-3 py-1 bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 rounded-lg font-medium">{skill}</span>
                             ))}
                          </div>
                       </div>
                       
                       <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700">
                          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-slate-700 dark:text-slate-200">
                            <span>🛠️</span> Tools & Platforms
                          </h3>
                          <div className="flex flex-wrap gap-2">
                             {['Git', 'GitHub', 'Docker', 'Linux', 'Postman', 'VS Code', 'Google Colab'].map(skill => (
                               <span key={skill} className="px-3 py-1 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 rounded-lg font-medium">{skill}</span>
                             ))}
                          </div>
                       </div>
                    </motion.div>
                 </div>
              ) : (
                /* Standard Layout */
                <>
                  {/* Image Side */}
                  {selectedPin.imageUrl ? (
                    <div className="w-full md:w-1/2 bg-stone-100 dark:bg-slate-800 min-h-[300px]">
                      <img src={selectedPin.imageUrl} alt={selectedPin.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className={`w-full md:w-1/3 ${selectedPin.color} min-h-[200px] flex items-center justify-center`}>
                       <span className="text-6xl">
                         {selectedPin.type === PinType.PROJECT ? '🚀' : 
                          selectedPin.type === PinType.ACHIEVEMENT ? '🏆' : 
                          selectedPin.type === PinType.RESUME ? '📄' : '📝'}
                       </span>
                    </div>
                  )}

                  {/* Content Side */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="p-6 md:p-12 flex-1 flex flex-col"
                  >
                     <div className="flex justify-between items-center mb-6">
                        <div className="flex gap-2">
                           <span className="w-3 h-3 rounded-full bg-red-400"></span>
                           <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                           <span className="w-3 h-3 rounded-full bg-green-400"></span>
                        </div>
                     </div>

                     <motion.h2 
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.2 }}
                       className="text-4xl font-display font-bold text-slate-800 dark:text-white mb-4"
                     >
                       {selectedPin.title}
                     </motion.h2>
                     
                     <motion.p 
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.3 }}
                       className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8 flex-1 whitespace-pre-wrap"
                     >
                       {selectedPin.description}
                     </motion.p>

                     <motion.div 
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.4 }}
                       className="mt-auto"
                     >
                        {selectedPin.tags && (
                          <>
                            <h4 className="font-bold text-sm text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Tags</h4>
                            <div className="flex flex-wrap gap-2 mb-8">
                              {selectedPin.tags.map(tag => (
                                <span key={tag} className="bg-stone-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-lg text-sm font-medium">#{tag}</span>
                              ))}
                            </div>
                          </>
                        )}
                        
                        {/* Dynamic Action Buttons */}
                        {selectedPin.type === PinType.RESUME ? (
                          <button 
                            onClick={handleDownloadResume}
                            className="w-full bg-slate-800 dark:bg-slate-700 text-white font-bold py-4 rounded-full text-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200 flex items-center justify-center gap-2"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download Resume
                          </button>
                        ) : selectedPin.type === PinType.PROJECT ? (
                          <div className="flex flex-col gap-3">
                             {selectedPin.githubUrl && (
                               <a href={selectedPin.githubUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl text-center hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                  View on GitHub
                               </a>
                             )}
                             <div className="flex flex-col sm:flex-row gap-3">
                               {selectedPin.liveUrl && (
                                 <a href={selectedPin.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-500 text-white font-bold py-3 rounded-xl text-center hover:bg-green-600 transition-colors">
                                   Live Demo
                                 </a>
                               )}
                               {selectedPin.demoUrl && (
                                 <a href={selectedPin.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 bg-red-500 text-white font-bold py-3 rounded-xl text-center hover:bg-red-600 transition-colors">
                                   Watch Demo
                                 </a>
                               )}
                             </div>
                             {!selectedPin.githubUrl && !selectedPin.liveUrl && !selectedPin.demoUrl && (
                               <div className="w-full bg-stone-100 dark:bg-slate-800 text-slate-500 text-center py-3 rounded-xl">
                                 No external links available
                               </div>
                             )}
                          </div>
                        ) : (
                          <div className="w-full bg-stone-100 dark:bg-slate-800 text-slate-500 text-center py-4 rounded-xl">
                             End of Details
                          </div>
                        )}
                     </motion.div>
                  </motion.div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ChatWidget />
    </div>
  );
};

export default App;