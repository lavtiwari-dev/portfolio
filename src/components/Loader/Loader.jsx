import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Loader.module.scss';

const lines = [
  { delay: 0,   type: 'cmd',     text: '$ node portfolio.js --env=production' },
  { delay: 200, type: 'output',  text: '▶  Initializing modules...' },
  { delay: 450, type: 'output',  text: '▶  Loading components... done' },
  { delay: 650, type: 'warn',    text: '⚡  Coffee level: ∞ — optimal' },
  { delay: 850, type: 'success', text: '✓  Compilation successful. Enjoy!' },
];

export default function Loader({ onComplete }) {
  const [visible, setVisible] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return undefined;
    }

    let completeTimer;
    const timers = lines.map((l, i) =>
      setTimeout(() => setVisible(v => [...v, i]), l.delay)
    );
    const finish = setTimeout(() => {
      setDone(true);
      completeTimer = setTimeout(onComplete, 400);
    }, 1350);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finish);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className={styles.loader}
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
        >
          <div className={styles.loader__terminal}>
            <div className={styles.loader__titlebar}>
              <span className={`${styles.dot} ${styles.red}`} />
              <span className={`${styles.dot} ${styles.yellow}`} />
              <span className={`${styles.dot} ${styles.green}`} />
              <span>portfolio.js — zsh</span>
            </div>
            <div className={styles.loader__body}>
              {lines.map((l, i) =>
                visible.includes(i) ? (
                  <span
                    key={i}
                    className={styles.loader__line}
                    style={{ animationDelay: '0ms' }}
                  >
                    <span className={styles[l.type]}>{l.text}</span>
                  </span>
                ) : null
              )}
              {visible.length < lines.length && (
                <span className={styles.loader__cursor} />
              )}
            </div>
          </div>
          <div className={styles.loader__progress}>
            <div className={styles['loader__progress-bar']} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
