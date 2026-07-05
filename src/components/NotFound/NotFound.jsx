import { useState, useEffect } from 'react';
import styles from './NotFound.module.scss';

const ERROR_LINES = [
  { text: '❯ cd /page-you-were-looking-for', type: 'cmd', delay: 0 },
  { text: 'bash: cd: /page-you-were-looking-for: No such file or directory', type: 'error', delay: 900 },
  { text: '❯ ls -la /', type: 'cmd', delay: 1600 },
  { text: '// Searching filesystem...', type: 'comment', delay: 2100 },
  { text: 'total 0 — page not mounted', type: 'muted', delay: 2600 },
  { text: '❯ exit code: 404', type: 'exit', delay: 3200 },
];

export default function NotFound({ onGoHome }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    const timers = ERROR_LINES.map((line, i) =>
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
      }, line.delay)
    );

    const ctaTimer = setTimeout(() => setShowCta(true), 3800);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(ctaTimer);
    };
  }, []);

  return (
    <div className={styles.notfound}>
      {/* Terminal window */}
      <div className={styles.notfound__terminal}>
        {/* Bar */}
        <div className={styles.notfound__bar}>
          <span className={`${styles.dot} ${styles.red}`} />
          <span className={`${styles.dot} ${styles.yellow}`} />
          <span className={`${styles.dot} ${styles.green}`} />
          <span className={styles.notfound__bar_title}>bash — 80×24</span>
        </div>

        {/* Body */}
        <div className={styles.notfound__body}>
          {/* Status line */}
          <div className={styles.notfound__status}>
            <span className={styles.notfound__code}>404</span>
            <span className={styles.notfound__slash}>/</span>
            <span className={styles.notfound__label}>page_not_found</span>
          </div>

          {/* Error output */}
          <div className={styles.notfound__lines}>
            {ERROR_LINES.map((line, i) => (
              <div
                key={i}
                className={`${styles.notfound__line} ${styles[`notfound__line--${line.type}`]} ${visibleLines.includes(i) ? styles['notfound__line--visible'] : ''}`}
              >
                {line.text}
              </div>
            ))}
          </div>

          {/* CTA */}
          {showCta && (
            <div className={styles.notfound__cta}>
              <div className={styles.notfound__cta_prompt}>
                <span className={styles.notfound__prompt}>❯</span>
                <button
                  className={styles.notfound__home_btn}
                  onClick={onGoHome}
                >
                  cd ~
                  <span className={styles.notfound__cursor} aria-hidden="true" />
                </button>
              </div>
              <p className={styles.notfound__hint}>
                {'// '} press <kbd>cd ~</kbd> to return home
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
