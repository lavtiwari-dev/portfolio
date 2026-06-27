import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCode, FiUser, FiDatabase, FiFolder,
  FiAward, FiBook, FiTerminal, FiSun, FiMoon, FiMenu, FiX
} from 'react-icons/fi';
import styles from './Navbar.module.scss';

const tabs = [
  { id: 'hero',           label: 'Lav Kumar',         icon: <FiCode /> },
  { id: 'about',          label: 'about.js',          icon: <FiUser /> },
  { id: 'skills',         label: 'skills.json',       icon: <FiDatabase /> },
  { id: 'projects',       label: 'projects/',         icon: <FiFolder /> },
  { id: 'certifications', label: 'certs.md',          icon: <FiAward /> },
  { id: 'education',      label: 'education.md',      icon: <FiBook /> },
  { id: 'contact',        label: 'contact.sh',        icon: <FiTerminal /> },
];

export default function Navbar({ activeSection, theme, onThemeToggle, onSectionChange }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
    if (onSectionChange) {
      onSectionChange(id);
    }
  };

  return (
    <nav className={styles.navbar} role="navigation" aria-label="Main navigation">
      {/* Mobile brand title (hidden on desktop) */}
      <div className={styles.navbar__mobile_title}>
        Lav Kumar
      </div>

      {/* Desktop tabs */}
      <div className={styles.navbar__tabs}>
        {tabs.map(t => (
          <button
            key={t.id}
            className={`${styles.navbar__tab} ${activeSection === t.id ? styles['navbar__tab--active'] : ''}`}
            onClick={() => scrollTo(t.id)}
            aria-current={activeSection === t.id ? 'page' : undefined}
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
        <button
          className={styles.navbar__theme_btn}
          onClick={onThemeToggle}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </button>

        {/* Mobile hamburger */}
        <button
          className={styles.navbar__hamburger}
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.navbar__mobile_menu}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {tabs.map(t => (
              <button
                key={t.id}
                className={`${styles.navbar__mobile_tab} ${activeSection === t.id ? styles['navbar__mobile_tab--active'] : ''}`}
                onClick={() => scrollTo(t.id)}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
