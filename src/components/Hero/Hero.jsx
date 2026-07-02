import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiGithub, FiMail, FiLinkedin,
  FiArrowDown, FiDownload, FiMessageCircle
} from 'react-icons/fi';
import styles from './Hero.module.scss';

const TERMINAL_LINES = [
  {
    type: 'comment',
    indent: 0,
    segments: [
      { text: '// Output:', type: 'comment' }
    ]
  },
  {
    type: 'bracket',
    indent: 0,
    segments: [
      { text: '{', type: 'bracket' }
    ]
  },
  {
    type: 'property',
    indent: 2,
    segments: [
      { text: 'name', type: 'key' },
      { text: ': ', type: 'plain' },
      { text: '"LAV KUMAR"', type: 'val' },
      { text: ',', type: 'plain' }
    ]
  },
  {
    type: 'property',
    indent: 2,
    segments: [
      { text: 'role', type: 'key' },
      { text: ': ', type: 'plain' },
      { text: '"CSE Undergraduate"', type: 'val' },
      { text: ',', type: 'plain' }
    ]
  },
  {
    type: 'property',
    indent: 2,
    segments: [
      { text: 'stack', type: 'key' },
      { text: ': ', type: 'plain' },
      { text: '["Java", "JavaScript", "React", "Node.js"]', type: 'val' },
      { text: ',', type: 'plain' }
    ]
  },
  {
    type: 'property',
    indent: 2,
    segments: [
      { text: 'dsa_solved', type: 'key' },
      { text: ': ', type: 'plain' },
      { text: '"300+ problems solved 🎯"', type: 'val' },
      { text: ',', type: 'plain' }
    ]
  },
  {
    type: 'property',
    indent: 2,
    segments: [
      { text: 'status', type: 'key' },
      { text: ': ', type: 'plain' },
      { text: '"actively seeking SDE roles 🚀"', type: 'val' }
    ]
  },
  {
    type: 'bracket',
    indent: 0,
    segments: [
      { text: '}', type: 'bracket' }
    ]
  }
];

// Precompute offsets and flatText once at the module scope
const linesWithOffsets = [];
let globalOffset = 0;
let flatText = '';

TERMINAL_LINES.forEach((line, lineIdx) => {
  const lineSegments = [];
  const lineStart = globalOffset;

  line.segments.forEach((seg) => {
    const start = globalOffset;
    const end = globalOffset + seg.text.length;
    lineSegments.push({
      ...seg,
      start,
      end
    });
    flatText += seg.text;
    globalOffset += seg.text.length;
  });

  const hasNewline = lineIdx < TERMINAL_LINES.length - 1;
  if (hasNewline) {
    flatText += '\n';
    globalOffset += 1;
  }

  linesWithOffsets.push({
    ...line,
    segments: lineSegments,
    start: lineStart,
    end: globalOffset,
    hasNewline
  });
});

const totalChars = globalOffset;

function TypingCommand({ command, onComplete }) {
  const [text, setText] = useState('');

  useEffect(() => {
    let intervalId = null;

    const startTimeout = setTimeout(() => {
      let i = 0;
      intervalId = setInterval(() => {
        setText(command.slice(0, i + 1));
        i++;
        if (i >= command.length) {
          clearInterval(intervalId);
          if (onComplete) setTimeout(onComplete, 300);
        }
      }, 100); // 100ms per character
    }, 1000); // 1s start delay to let the terminal container finish fading/sliding in

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [command, onComplete]);

  return <span className={styles.cmd}>{text}</span>;
}

function TypingTerminal() {
  const [commandComplete, setCommandComplete] = useState(false);
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    if (!commandComplete) return;
    if (visibleChars >= totalChars) return;

    const nextCharIndex = visibleChars;
    let delay = 25; // default character typing speed (25ms)

    const char = flatText[nextCharIndex];

    if (char === '\n') {
      delay = 200; // pause longer at the end of each line
    } else if (char === ',' || char === ':') {
      delay = 100; // brief pause at colons/commas
    } else if (char === ' ') {
      delay = 10; // type spacing instantly
    }

    const timer = setTimeout(() => {
      setVisibleChars((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [commandComplete, visibleChars]);

  // Find the active segment to show the blinking cursor at the typing position
  let activeLineIdx = -1;
  let activeSegIdx = -1;
  let cursorFound = false;

  for (let l = 0; l < linesWithOffsets.length; l++) {
    const line = linesWithOffsets[l];
    for (let s = 0; s < line.segments.length; s++) {
      const seg = line.segments[s];
      if (visibleChars >= seg.start && visibleChars < seg.end) {
        activeLineIdx = l;
        activeSegIdx = s;
        cursorFound = true;
        break;
      }
    }
    if (cursorFound) break;
  }

  if (!cursorFound && visibleChars === totalChars) {
    activeLineIdx = linesWithOffsets.length - 1;
    activeSegIdx = linesWithOffsets[activeLineIdx].segments.length - 1;
    cursorFound = true;
  }

  if (!cursorFound && visibleChars > 0) {
    for (let l = 0; l < linesWithOffsets.length; l++) {
      const line = linesWithOffsets[l];
      for (let s = 0; s < line.segments.length; s++) {
        const seg = line.segments[s];
        if (visibleChars === seg.end) {
          activeLineIdx = l;
          activeSegIdx = s;
        }
      }
    }
  }

  return (
    <div className={styles.hero__terminal}>
      <div className={styles['hero__term-bar']}>
        <span className={`${styles.dot} ${styles.red}`} />
        <span className={`${styles.dot} ${styles.yellow}`} />
        <span className={`${styles.dot} ${styles.green}`} />
        <span className={styles.title}>~ whoami</span>
      </div>
      <div className={styles['hero__term-body']}>
        <div>
          <span className={styles.prompt}>❯ </span>
          <TypingCommand command="whoami" onComplete={() => setCommandComplete(true)} />
          {!commandComplete && <span className={styles['cursor-blink']} />}
        </div>

        {commandComplete && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {linesWithOffsets.map((line, lineIdx) => {
              if (visibleChars < line.start) return null;

              return (
                <div
                  key={lineIdx}
                  style={{
                    paddingLeft: line.indent ? line.indent * 13 : 0,
                    lineHeight: 1.8
                  }}
                >
                  {line.segments.map((seg, segIdx) => {
                    if (visibleChars < seg.start) return null;

                    const visibleLength = Math.min(seg.text.length, visibleChars - seg.start);
                    const typedText = seg.text.slice(0, visibleLength);
                    const showCursor = (lineIdx === activeLineIdx && segIdx === activeSegIdx);

                    return (
                      <span key={segIdx} className={styles[seg.type]}>
                        {typedText}
                        {showCursor && <span className={styles['cursor-blink']} />}
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

const fade = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

export default function Hero({ onSectionChange }) {
  return (
    <section id="hero" className={styles.hero}>
      <div className="container">
        <div className={styles.hero__grid}>
          {/* Left — text */}
          <motion.div
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            initial="hidden"
            animate="show"
          >
            <motion.div className={styles.hero__eyebrow} variants={fade}>
              <span className={styles.dot} />
              seeking SDE &amp; pre-final year roles
            </motion.div>

            <motion.h1 className={styles.hero__headline} variants={fade}>
              Building full-stack apps &amp; solving{' '}
              <span>algorithmic challenges.</span>
            </motion.h1>

            <motion.p className={styles.hero__subtext} variants={fade}>
              Computer Science &amp; Engineering student focused on Java, JavaScript, and React —
              passionate about clean code, scalable APIs, and system optimization.
            </motion.p>

            <motion.div className={styles.hero__ctas} variants={fade}>
              <div className={styles['hero__cta-group']}>
                <a href="#projects" className="btn btn--primary" onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); onSectionChange?.('projects'); }}>
                  <FiArrowDown /> View projects
                </a>
                <a href="/resume.pdf" className="btn btn--outline" download>
                  <FiDownload /> Download résumé
                </a>
              </div>
              <a href="#contact" className="btn btn--ghost" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); onSectionChange?.('contact'); }}>
                <FiMessageCircle /> Get in touch
              </a>
            </motion.div>

            <motion.div className={styles.hero__socials} variants={fade}>
              <a href="https://github.com/lavtiwari-dev" target="_blank" rel="noopener noreferrer" aria-label="Lav Kumar on GitHub" className={styles.github}><FiGithub /></a>
              <a href="https://www.linkedin.com/in/lavtiwaridev/" target="_blank" rel="noopener noreferrer" aria-label="Lav Kumar on LinkedIn" className={styles.linkedin}><FiLinkedin /></a>
              <a href="mailto:lavtiwari.dev@gmail.com" aria-label="Email" className={styles.mail}><FiMail /></a>
            </motion.div>
          </motion.div>

          {/* Right — terminal */}
          <motion.div
            className={styles.hero__right}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <TypingTerminal />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
