import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiFile, FiX } from 'react-icons/fi';
import styles from './Projects.module.scss';

const projects = [
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
    features: [
      'Built a full-stack platform enabling industrial waste exchange between organizations.',
      'Developed secure RESTful APIs with JWT authentication and role-based access control.',
      'Designed efficient MongoDB data models and optimized query performance using indexing.',
      'Designed fully responsive UI templates using React and Tailwind CSS custom components.'
    ],
    codeSnippet: `// waste-chain/index.js
const express = require('express');
const mongoose = require('mongoose');
const { WasteListing } = require('./models/Listing');

const app = express();

// Match byproducts by chemical makeup & location
app.post('/api/exchange/match', async (req, res) => {
  const { category, maxDistance } = req.body;
  try {
    const matches = await WasteListing.find({
      category,
      status: 'available',
      location: { $near: { $maxDistance: maxDistance } }
    }).limit(10);
    res.json({ success: true, matches });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});`
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
    features: [
      'Developed a Boolean-based search tool to identify relevant hiring managers.',
      'Integrated Firebase real-time database for efficient data storage and retrieval.',
      'Improved UI responsiveness using React Hooks and optimized state management.',
      'Implemented clean query parsers that filter and evaluate search keywords instantly.'
    ],
    codeSnippet: `// hiring-search/main.js
import { db } from './firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';

// Process recruiters' Boolean query
export async function queryManagers(booleanString) {
  const keywords = parseBooleanExpression(booleanString);
  const q = query(
    collection(db, "managers"), 
    where("skills", "array-contains-any", keywords)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}`
  },
  {
    name: 'TaskSync Workspace',
    file: 'task-sync/index.ts',
    desc: 'Real-time task board for agile teams featuring drag-and-drop workflow automation.',
    status: 'progress',
    stack: ['React', 'TypeScript', 'Node.js', 'Firebase', 'Framer Motion'],
    demo: '#',
    repo: '#',
    image: '/images/proj-wastechain.png', // Fallback for testing
    longDesc: 'TaskSync workspace is a productivity platform with instant board synchronisation. It is built to optimize agile workflows by enabling smooth drag-and-drop board cards, real-time board sync, and micro-animations to improve team collaboration and engagement.',
    features: [
      'Built board synchronization enabling multiple users to collaborate live.',
      'Implemented drag and drop handlers optimized for desktop and touch screen gestures.',
      'Designed status transition springs to trigger key action micro-animations.',
      'Constructed state reducers handling undo/redo user interface tasks.'
    ],
    codeSnippet: `// task-sync/index.ts
import { BoardState, Task } from './types';

// Handle column transitions with custom spring animations
export function moveTask(board: BoardState, taskId: string, toColumn: string): BoardState {
  const task = board.tasks.find(t => t.id === taskId);
  if (!task) return board;
  
  return {
    ...board,
    tasks: board.tasks.map(t => 
      t.id === taskId ? { ...t, status: toColumn, updatedAt: new Date() } : t
    )
  };
}`
  },
  {
    name: 'DevNotes API',
    file: 'devnotes-api/server.go',
    desc: 'Blazing fast markdown note-taking API backend with built-in search and syntax analysis.',
    status: 'archived',
    stack: ['Go', 'Gin', 'PostgreSQL'],
    demo: '#',
    repo: '#',
    image: '/images/proj-hiring-search.png', // Fallback for testing
    longDesc: 'DevNotes is a high-performance RESTful API backend structured in Go. It handles indexing markdown articles, parsing internal links, and exposing fast search and lookup endpoints.',
    features: [
      'Engineered RESTful endpoints handling binary index notes.',
      'Integrated PostgreSQL indexing for blazingly fast full-text match queries.',
      'Optimized network overhead using compact JSON payloads.',
      'Written custom middleware logs managing API request latency metrics.'
    ],
    codeSnippet: `// devnotes-api/server.go
package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func main() {
    r := gin.Default()
    
    // Search notes by content tags using full-text indexing
    r.GET("/api/notes/search", func(c *gin.Context) {
        tag := c.Query("tag")
        notes, err := SearchNotesByTag(tag)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }
        c.JSON(http.StatusOK, notes)
    })
    
    r.Run(":8080")
}`
  }
];

const statusLabel = { live: 'live', progress: 'in progress', archived: 'archived' };

const fade = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const [activeProject, setActiveProject] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'code'

  // Lock body scroll when popup is active
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '8px'; // Prevent layout shift due to scrollbar removal
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
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

  // Reset tab to overview when active project changes
  useEffect(() => {
    setActiveTab('overview');
  }, [activeProject]);

  // Highlight syntax tags simply using single-pass regex
  const renderHighlightedCode = (code) => {
    if (!code) return null;
    const tokenRegex = /(\/\/.*)|('[^']*'|"[^"]*")|\b(const|let|var|function|return|import|export|from|async|await|try|catch|require|package|func|struct|interface|type)\b|\b(\d+)\b/g;

    return code.split('\n').map((line, idx) => {
      let escapedLine = line
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      let highlighted = escapedLine.replace(tokenRegex, (match, comment, string, keyword, number) => {
        if (comment) return `<span class="comment">${comment}</span>`;
        if (string) return `<span class="string">${string}</span>`;
        if (keyword) return `<span class="keyword">${keyword}</span>`;
        if (number) return `<span class="number">${number}</span>`;
        return match;
      });

      return (
        <div key={idx} className={styles.projects__code_line}>
          <span className={styles.projects__line_num}>{idx + 1}</span>
          <span className={styles.projects__line_text} dangerouslySetInnerHTML={{ __html: highlighted || '&nbsp;' }} />
        </div>
      );
    });
  };

  return (
    <section id="projects" className={`section ${styles.projects}`} ref={ref}>
      <div className="container">
        <h2 className="section-title" data-prefix="04">projects/</h2>

        <motion.div
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
                  onClick={() => setActiveProject(p)}
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
                    <div className={styles.projects__stack}>
                      {p.stack.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className={styles['projects__card-footer']}>
                  <a href={p.demo} target="_blank" rel="noopener noreferrer">
                    <FiExternalLink /> Live demo
                  </a>
                  <a href={p.repo} target="_blank" rel="noopener noreferrer">
                    <FiGithub /> Source
                  </a>
                </div>
              </motion.article>
            ))}
        </motion.div>
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
          >
            <motion.div
              className={styles['projects__popup-content']}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header bar */}
              <div className={styles['projects__popup-header']}>
                <span className={styles.projects__filename}>
                  <FiFile /> {activeProject.file}
                </span>
                <button
                  className={styles['projects__popup-close']}
                  onClick={() => setActiveProject(null)}
                  aria-label="Close details"
                >
                  <FiX />
                </button>
              </div>

              {/* Dynamic Popup Tabs */}
              <div className={styles['projects__popup-tabs']}>
                <button 
                  className={`${styles['projects__popup-tab']} ${activeTab === 'overview' ? styles['projects__popup-tab--active'] : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  📄 Overview
                </button>
                <button 
                  className={`${styles['projects__popup-tab']} ${activeTab === 'code' ? styles['projects__popup-tab--active'] : ''}`}
                  onClick={() => setActiveTab('code')}
                >
                  💻 Preview Code
                </button>
              </div>

              {/* Scrollable details */}
              <div className={styles['projects__popup-scroll']}>
                {activeTab === 'overview' ? (
                  <>
                    <div className={styles['projects__popup-image']}>
                      <img src={activeProject.image} alt={activeProject.name} />
                    </div>

                    <div className={styles['projects__popup-meta']}>
                      <h3 className={styles['projects__popup-title']}>{activeProject.name}</h3>
                      <div className={styles.projects__stack} style={{ margin: '8px 0 12px' }}>
                        {activeProject.stack.map(t => <span key={t} className="tag">{t}</span>)}
                      </div>
                      <p className={styles['projects__popup-longdesc']}>{activeProject.longDesc}</p>
                    </div>

                    <div>
                      <h4 className={styles['projects__popup-section-title']}>Technical Features</h4>
                      <ul className={styles['projects__popup-features']}>
                        {activeProject.features.map((feat, idx) => (
                          <li key={idx}>{feat}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <div className={styles['projects__code-editor']}>
                    <div className={styles['projects__code-editor-header']}>
                      <div className={styles['projects__code-editor-dots']}>
                        <span className={styles['projects__code-editor-dot']} style={{ background: '#ff5f56' }} />
                        <span className={styles['projects__code-editor-dot']} style={{ background: '#ffbd2e' }} />
                        <span className={styles['projects__code-editor-dot']} style={{ background: '#27c93f' }} />
                      </div>
                      <span className={styles['projects__code-editor-title']}>{activeProject.file}</span>
                    </div>
                    <pre className={styles['projects__code-editor-body']}>
                      <code>{renderHighlightedCode(activeProject.codeSnippet)}</code>
                    </pre>
                  </div>
                )}
              </div>

              {/* Action links */}
              <div className={styles['projects__popup-footer']}>
                <a 
                  href={activeProject.repo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn--outline"
                  style={{ padding: '8px 16px' }}
                >
                  <FiGithub /> Source Code
                </a>
                <a 
                  href={activeProject.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                  style={{ padding: '8px 16px' }}
                >
                  <FiExternalLink /> Visit Project
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
