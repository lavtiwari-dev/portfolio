import { useState, useEffect, useCallback, useRef } from 'react';
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

const SECTIONS = ['hero', 'about', 'projects', 'skills', 'certifications', 'education', 'contact'];

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const lockRef = useRef(false);
  const timeoutRef = useRef(null);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

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



  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      {loaded && (
        <>
          <a className="skip-link" href="#main-content">Skip to content</a>
          <Navbar
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
          <LineGutter activeSection={activeSection} />

          {/* Main content — responsive class for padding */}
          <main id="main-content" className="main-content" tabIndex="-1">
            <Hero onSectionChange={handleSectionChange} />
            <About />
            <Projects />
            <Skills />
            <Certifications />
            <Education />
            <Contact />
          </main>

          <Footer />
          <BackToTop />

        </>
      )}
    </>
  );
}
