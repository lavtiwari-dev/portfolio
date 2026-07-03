import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiFile, FiX } from 'react-icons/fi';
import styles from './Projects.module.scss';

const projects = [
  {
    name: 'MovieLens',
    file: 'movie-lens/App.jsx',
    desc: 'A modern movie exploration platform powered by the OMDb API for searching, cataloging, and rating films.',
    status: 'live',
    stack: ['React', 'Vite', 'OMDb API', 'CSS/SCSS', 'Framer Motion'],
    demo: 'https://movie-lens-kappa.vercel.app/',
    repo: 'https://github.com/lavtiwari-dev/movie_lens',
    image: '/images/proj-movielens.png',
    longDesc: 'MovieLens is a premium movie discovery and rating web application integrating the OMDb API. It features detailed metadata cards, search autocompletion, popular tags filtering, and interactive watchlist controls with modern aesthetics.',
    metric: 'Live deployment · OMDb API integrations',
    features: [
      'Integrated OMDb API for real-time movie, actor, and director queries.',
      'Designed a glassmorphic dashboard with a dark-theme UI and custom rating metrics.',
      'Built a persistent watchlist enabling users to save and view favorites via local storage.',
      'Created interactive search filter tags for popular franchise shortcuts.'
    ]
  },
  {
    name: 'WasteChain',
    file: 'waste-chain/index.js',
    desc: 'Full-stack industrial waste exchange platform enabling organic byproduct reuse between organizations.',
    status: 'live',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    demo: '#',
    repo: '#',
    image: '/images/proj-wastechain.png',
    longDesc: 'WasteChain is an innovative industrial reuse platform created to facilitate structured recycling and waste redistribution between different business entities. It allows organizations to list surplus production materials and negotiate exchanges, lowering operational overhead and building environment-friendly supply chains.',
    metric: 'Full-stack prototype · role-based exchange workflow',
    features: [
      'Built a full-stack platform enabling industrial waste exchange between organizations.',
      'Developed secure RESTful APIs with JWT authentication and role-based access control.',
      'Designed efficient MongoDB data models and optimized query performance using indexing.',
      'Designed fully responsive UI templates using React and Tailwind CSS custom components.'
    ]
  },
  {
    name: 'Hiring Search Tool',
    file: 'hiring-search/main.js',
    desc: 'Boolean-based smart lookup search engine to find and identify target hiring managers.',
    status: 'live',
    stack: ['React.js', 'Node.js', 'Firebase'],
    demo: '#',
    repo: '#',
    image: '/images/proj-hiring-search.png',
    longDesc: 'Hiring Search Tool is a boolean-based lookup system customized for recruitment mapping. It queries datasets instantly to search for managers matching target skills, processes candidate attributes, and caches frequently accessed search indexes.',
    metric: 'Boolean search · Firebase-backed data retrieval',
    features: [
      'Developed a Boolean-based search tool to identify relevant hiring managers.',
      'Integrated Firebase real-time database for efficient data storage and retrieval.',
      'Improved UI responsiveness using React Hooks and optimized state management.',
      'Implemented clean query parsers that filter and evaluate search keywords instantly.'
    ]
  },
  {
    name: 'TaskSync Workspace',
    file: 'task-sync/index.ts',
    desc: 'Real-time task board for agile teams featuring drag-and-drop workflow automation.',
    status: 'progress',
    stack: ['React', 'TypeScript', 'Node.js', 'Firebase', 'Framer Motion'],
    demo: '#',
    repo: '#',
    image: '/images/proj-tasksync.png',
    longDesc: 'TaskSync workspace is a productivity platform with instant board synchronisation. It is built to optimize agile workflows by enabling smooth drag-and-drop board cards, real-time board sync, and micro-animations to improve team collaboration and engagement.',
    metric: 'In development · real-time collaboration prototype',
    features: [
      'Built board synchronization enabling multiple users to collaborate live.',
      'Implemented drag and drop handlers optimized for desktop and touch screen gestures.',
      'Designed status transition springs to trigger key action micro-animations.',
      'Constructed state reducers handling undo/redo user interface tasks.'
    ]
  },
  {
    name: 'DevNotes API',
    file: 'devnotes-api/server.go',
    desc: 'Blazing fast markdown note-taking API backend with built-in search and syntax analysis.',
    status: 'archived',
    stack: ['Go', 'Gin', 'PostgreSQL'],
    demo: '#',
    repo: '#',
    image: '/images/proj-devnotes.png',
    longDesc: 'DevNotes is a high-performance RESTful API backend structured in Go. It handles indexing markdown articles, parsing internal links, and exposing fast search and lookup endpoints.',
    metric: 'Archived backend concept · full-text search design',
    features: [
      'Engineered RESTful endpoints handling binary index notes.',
      'Integrated PostgreSQL indexing for blazingly fast full-text match queries.',
      'Optimized network overhead using compact JSON payloads.',
      'Written custom middleware logs managing API request latency metrics.'
    ]
  }
];

const statusLabel = { live: 'live', progress: 'in progress', archived: 'archived' };
const hasProjectLink = (link) => Boolean(link && link !== '#');

const fade = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const [activeProject, setActiveProject] = useState(null);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);
  const gridRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!gridRef.current) return;
    const { scrollLeft, clientWidth } = gridRef.current;
    const card = gridRef.current.querySelector(`.${styles.projects__card}`);
    const step = card ? card.getBoundingClientRect().width + 12 : clientWidth - 8;
    const index = Math.round(scrollLeft / step);
    setActiveIndex(Math.max(0, Math.min(index, projects.length - 1)));
  };

  const openProject = (project, trigger) => {
    triggerRef.current = trigger;
    setActiveProject(project);
  };

  // Lock body scroll when popup is active
  useEffect(() => {
    if (activeProject) {
      const scrollY = window.scrollY;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.documentElement.style.overflow = 'hidden';
      
      document.body.dataset.scrollY = scrollY.toString();
    } else {
      const scrollY = document.body.dataset.scrollY;
      
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.overflow = '';
      
      if (scrollY) {
        delete document.body.dataset.scrollY;
        // Temporarily disable smooth scrolling to scroll back instantly
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, parseInt(scrollY, 10));
        document.documentElement.style.scrollBehavior = '';
      }
    }
    return () => {
      const scrollY = document.body.dataset.scrollY;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.overflow = '';
      if (scrollY) {
        delete document.body.dataset.scrollY;
        window.scrollTo(0, parseInt(scrollY, 10));
      }
    };
  }, [activeProject]);

  // Close popup on escape key
  useEffect(() => {
    if (!activeProject) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProject]);

  useEffect(() => {
    if (activeProject) {
      closeButtonRef.current?.focus();
    } else {
      triggerRef.current?.focus();
    }
  }, [activeProject]);
  return (
    <section id="projects" className={`section ${styles.projects}`} ref={ref}>
      <div className="container">
        <h2 className="section-title" data-prefix="03">projects/</h2>

        <motion.div
          ref={gridRef}
          onScroll={handleScroll}
          className={styles.projects__grid}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {projects.map(p => (
            <motion.article
              key={p.name}
              className={styles.projects__card}
              variants={fade}
            >
              <div
                className={styles.projects__card_inner}
                onClick={(event) => openProject(p, event.currentTarget)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openProject(p, event.currentTarget);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${p.name}`}
                title="Click to view project details"
              >
                {/* Tab header */}
                <div className={styles['projects__card-header']}>
                  <span className={styles.projects__filename}>
                    <FiFile />
                    {p.file}
                  </span>
                  <span className={`${styles.projects__badge} ${styles[`projects__badge--${p.status}`]}`}>
                    {statusLabel[p.status]}
                  </span>
                </div>

                {/* Preview image */}
                <div className={styles.projects__preview}>
                  <img src={p.image} alt={`${p.name} screenshot`} loading="lazy" />
                  <div className={styles.projects__overlay} />
                </div>

                {/* Body */}
                <div className={styles['projects__card-body']}>
                  <h3 className={styles.projects__title}>{p.name}</h3>
                  <p className={styles.projects__desc}>{p.desc}</p>
                  {p.metric && (
                    <div className={styles.projects__metric}>{p.metric}</div>
                  )}
                  <div className={styles.projects__stack}>
                    {p.stack.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className={styles['projects__card-footer']}>
                {hasProjectLink(p.demo) ? (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer">
                    <FiExternalLink /> Live demo
                  </a>
                ) : (
                  <span className={styles.projects__link_unavailable}>
                    <FiExternalLink /> Demo soon
                  </span>
                )}
                {hasProjectLink(p.repo) ? (
                  <a href={p.repo} target="_blank" rel="noopener noreferrer">
                    <FiGithub /> Source
                  </a>
                ) : (
                  <span className={styles.projects__link_unavailable}>
                    <FiGithub /> Private repo
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Mobile Swipe Indicators */}
        <div className={styles.projects__indicators}>
          {projects.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`${styles.projects__indicator} ${activeIndex === idx ? styles['projects__indicator--active'] : ''}`}
              onClick={() => {
                if (gridRef.current) {
                  const card = gridRef.current.querySelector(`.${styles.projects__card}`);
                  const step = card ? card.getBoundingClientRect().width + 12 : gridRef.current.clientWidth - 8;
                  gridRef.current.scrollTo({
                    left: idx * step,
                    behavior: 'smooth'
                  });
                }
              }}
              aria-label={`Go to project ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Details Popup Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className={styles.projects__popup}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
            role="presentation"
          >
            <motion.div
              className={styles['projects__popup-content']}
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`${activeProject.name} details`}
            >
              {/* Header bar */}
              <div className={styles['projects__popup-header']}>
                <span className={styles.projects__filename}>
                  <FiFile /> {activeProject.file}
                </span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  className={styles['projects__popup-close']}
                  onClick={() => setActiveProject(null)}
                  aria-label="Close details"
                >
                  <FiX />
                </button>
              </div>

              {/* Scrollable details */}
              <div className={styles['projects__popup-scroll']}>
                <div className={styles['projects__popup-image']}>
                  <img src={activeProject.image} alt={activeProject.name} />
                </div>

                <div className={styles['projects__popup-meta']}>
                  <h3 className={styles['projects__popup-title']}>{activeProject.name}</h3>
                  <div className={styles.projects__stack} style={{ margin: '8px 0 12px' }}>
                    {activeProject.stack.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <p className={styles['projects__popup-longdesc']}>{activeProject.longDesc}</p>
                  {activeProject.metric && (
                    <div style={{ marginTop: 12 }}>
                      <strong>Project outcome:</strong>
                      <div style={{ marginTop: 6, color: 'var(--text)' }}>
                        {activeProject.metric}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className={styles['projects__popup-section-title']}>Technical Features</h4>
                  <ul className={styles['projects__popup-features']}>
                    {activeProject.features.map((feat, idx) => (
                      <li key={idx}>{feat}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action links */}
              <div className={styles['projects__popup-footer']}>
                {hasProjectLink(activeProject.repo) && (
                  <a
                    href={activeProject.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--outline"
                    style={{ padding: '8px 16px' }}
                  >
                    <FiGithub /> Source Code
                  </a>
                )}
                {hasProjectLink(activeProject.demo) && (
                  <a
                    href={activeProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary"
                    style={{ padding: '8px 16px' }}
                  >
                    <FiExternalLink /> Visit Project
                  </a>
                )}
                {!hasProjectLink(activeProject.repo) && !hasProjectLink(activeProject.demo) && (
                  <span className={styles.projects__popup_unavailable}>Links will be added soon.</span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
