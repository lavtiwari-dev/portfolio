import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCode, FiUser, FiDatabase, FiFolder,
  FiAward, FiBook, FiTerminal, FiMenu, FiX,
  FiSun, FiMoon, FiMessageSquare, FiCommand
} from 'react-icons/fi';
import styles from './Navbar.module.scss';

const tabs = [
  { id: 'hero', label: 'Lav Kumar', icon: <FiCode /> },
  { id: 'about', label: 'about.js', icon: <FiUser /> },
  { id: 'projects', label: 'projects/', icon: <FiFolder /> },
  { id: 'skills', label: 'skills.json', icon: <FiDatabase /> },
  { id: 'certifications', label: 'certifications.md', icon: <FiAward /> },
  { id: 'education', label: 'education.md', icon: <FiBook /> },
  { id: 'testimonials', label: 'testimonials/', icon: <FiMessageSquare /> },
  { id: 'contact', label: 'contact.sh', icon: <FiTerminal /> },
];

export default function Navbar({ activeSection, onSectionChange, theme, onToggleTheme, onOpenPalette }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    if (!mobileOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileOpen]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    if (mobileOpen) {
      setMobileOpen(false);
      // Wait for layout/scroll-lock to release before scrolling
      setTimeout(() => {
        const isMobile = window.innerWidth <= 760;
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        // On mobile, offset is 8px (navbar 44px minus section padding 36px)
        const offset = isMobile ? 8 : 44;

        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        });

        if (onSectionChange) {
          onSectionChange(id);
        }
      }, 80);
    } else {
      const isMobile = window.innerWidth <= 760;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offset = isMobile ? 8 : 44;

      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });

      if (onSectionChange) {
        onSectionChange(id);
      }
    }
  };

  return (
    <nav className={styles.navbar} role="navigation" aria-label="Main navigation">
      {/* Mobile brand title (hidden on desktop) */}
      <button
        type="button"
        className={styles.navbar__mobile_title}
        onClick={() => scrollTo('hero')}
        aria-label="Scroll to Hero section"
      >
        Lav Kumar
      </button>

      {/* Desktop tabs */}
      <div className={styles.navbar__tabs}>
        {tabs.map(t => (
          <button
            key={t.id}
            type="button"
            className={`${styles.navbar__tab} ${activeSection === t.id ? styles['navbar__tab--active'] : ''}`}
            onClick={() => scrollTo(t.id)}
            aria-current={activeSection === t.id ? 'location' : undefined}
            aria-label={`Go to ${t.label}`}
            style={{ position: 'relative' }}
          >
            {activeSection === t.id && (
              <motion.div
                layoutId="activeTabIndicator"
                className={styles.navbar__active_indicator}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className={styles.navbar__tab_icon}>{t.icon}</span>
            <span className={styles.navbar__tab_label}>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className={styles.navbar__actions}>
        {/* Command Palette trigger */}
        <button
          type="button"
          className={styles.navbar__cmd_btn}
          onClick={onOpenPalette}
          aria-label="Open command palette (Cmd+K)"
          title="Open command palette"
          id="cmd-palette-trigger"
        >
          <FiCommand />
          <kbd className={styles.navbar__cmd_kbd}>⌘K</kbd>
        </button>

        <button
          type="button"
          className={styles.navbar__theme_btn}
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </button>

        {/* Mobile hamburger */}
        <button
          ref={menuButtonRef}
          type="button"
          className={styles.navbar__hamburger}
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className={styles.navbar__backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              id="mobile-navigation"
              className={styles.navbar__mobile_menu}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {tabs.map(t => (
                <button
                  key={t.id}
                  type="button"
                  className={`${styles.navbar__mobile_tab} ${activeSection === t.id ? styles['navbar__mobile_tab--active'] : ''}`}
                  onClick={() => scrollTo(t.id)}
                  aria-current={activeSection === t.id ? 'location' : undefined}
                >
                  {t.icon}
                  {t.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
