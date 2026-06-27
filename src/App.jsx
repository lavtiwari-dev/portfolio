import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar/Navbar';
import LineGutter from './components/LineGutter/LineGutter';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Certifications from './components/Certifications/Certifications';
import Education from './components/Education/Education';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import BackToTop from './components/BackToTop/BackToTop';
import './styles/global.scss';

const SECTIONS = ['hero', 'about', 'skills', 'projects', 'certifications', 'education', 'contact'];

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [activeSection, setActiveSection] = useState('hero');
  const [transitionTheme, setTransitionTheme] = useState(null);

  const lockRef = useRef(false);
  const timeoutRef = useRef(null);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Handle active section change when tab is clicked
  const handleSectionChange = useCallback((id) => {
    setActiveSection(id);
    
    // Lock scrollspy for 800ms to allow smooth scroll to complete
    lockRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      lockRef.current = false;
    }, 800);
  }, []);

  // Scrollspy & Bottom-of-page detection
  useEffect(() => {
    if (!loaded) return;

    const handleScroll = () => {
      if (lockRef.current) return;
      
      // If we are at the very bottom of the page, force 'contact' active
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      // Check which section is in the active middle-top of the viewport
      const threshold = window.innerHeight / 3;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold && rect.bottom >= threshold) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Set initial active section
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [loaded]);

  const toggleTheme = useCallback((e) => {
    const x = e ? e.clientX : window.innerWidth / 2;
    const y = e ? e.clientY : window.innerHeight / 2;
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTransitionTheme({ x, y, theme: nextTheme });
  }, [theme]);

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      {loaded && (
        <>
          <Navbar
            activeSection={activeSection}
            theme={theme}
            onThemeToggle={toggleTheme}
            onSectionChange={handleSectionChange}
          />
          <LineGutter activeSection={activeSection} />

          {/* Main content — responsive class for padding */}
          <main className="main-content">
            <Hero onSectionChange={handleSectionChange} />
            <About />
            <Skills />
            <Projects />
            <Certifications />
            <Education />
            <Contact />
          </main>

          <Footer />
          <BackToTop />
          {transitionTheme && (
            <motion.div
              style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                zIndex: 99999,
                background: transitionTheme.theme === 'light' ? '#fafafa' : '#1e1e2e',
                pointerEvents: 'none',
              }}
              initial={{ clipPath: `circle(0px at ${transitionTheme.x}px ${transitionTheme.y}px)` }}
              animate={{ clipPath: `circle(150% at ${transitionTheme.x}px ${transitionTheme.y}px)` }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={() => {
                setTheme(transitionTheme.theme);
                setTransitionTheme(null);
              }}
            />
          )}
        </>
      )}
    </>
  );
}
