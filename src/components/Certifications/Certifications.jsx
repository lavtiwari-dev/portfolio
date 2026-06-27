import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCheckCircle, FiExternalLink, FiX } from 'react-icons/fi';
import styles from './Certifications.module.scss';

const certs = [
  {
    name: '300+ Data Structures & Algorithms Solved',
    issuer: 'LeetCode, CodeChef & HackerEarth',
    year: 'Active',
    link: 'https://leetcode.com',
    image: '/images/cert-badges.png',
    monogram: 'DSA',
    color: '#FFA116',
    iconBg: 'rgba(255,161,22,0.12)',
    iconBorder: 'rgba(255,161,22,0.4)',
  },
  {
    name: 'GitHub Foundations Certification',
    issuer: 'GitHub',
    year: '2026',
    link: 'https://verify.certport.com',
    image: '/images/cert-github.jpg',
    monogram: 'GH',
    color: 'var(--github-color)',
    iconBg: 'var(--github-bg)',
    iconBorder: 'var(--github-border)',
  },
  {
    name: 'Microsoft Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft',
    year: '2026',
    link: 'https://verify.certport.com',
    image: '/images/cert-azure.png',
    monogram: 'AZ',
    color: '#0078D4',
    iconBg: 'rgba(0,120,212,0.12)',
    iconBorder: 'rgba(0,120,212,0.4)',
  },
  {
    name: 'NPTEL Elite Certification in Cloud Computing',
    issuer: 'IIT / NPTEL',
    year: '2025',
    link: 'https://nptel.ac.in/noc/',
    image: '/images/cert-nptel.png',
    monogram: 'NPTEL',
    color: '#008080',
    iconBg: 'rgba(0,128,128,0.12)',
    iconBorder: 'rgba(0,128,128,0.4)',
  },
  {
    name: 'Google Cloud Career Launchpad: Cloud Engineer',
    issuer: 'Google Cloud',
    year: '2025',
    link: 'https://google.credential.net',
    image: '/images/cert-google.png',
    monogram: 'GCP',
    color: '#4285F4',
    iconBg: 'rgba(66,133,244,0.12)',
    iconBorder: 'rgba(66,133,244,0.4)',
  },
  {
    name: 'Cloud Computing Fundamentals',
    issuer: 'IBM SkillsBuild',
    year: '2026',
    link: 'https://www.credly.com/badges/89b622b8-9981-4585-b0fc-9510a831b1d4',
    image: '/images/cert-ibm.png',
    monogram: 'IBM',
    color: '#0F62FE',
    iconBg: 'rgba(15,98,254,0.12)',
    iconBorder: 'rgba(15,98,254,0.4)',
  },
  {
    name: 'SAP Certified - SAP Generative AI Developer',
    issuer: 'SAP',
    year: '2026',
    link: 'https://www.credly.com/badges/50f0c7c4-4821-4f65-8670-dfcc4a2aa49d',
    image: '/images/cert-sap.jpg',
    monogram: 'SAP',
    color: '#008FD3',
    iconBg: 'rgba(0,143,211,0.12)',
    iconBorder: 'rgba(0,143,211,0.4)',
  },
  {
    name: 'SAP Certified - Back-End Developer - ABAP Cloud',
    issuer: 'SAP',
    year: '2026',
    link: 'https://www.credly.com/badges/48347e2f-44b1-4425-8d35-37b4050994f6',
    image: '/images/cert-sap-abap.jpg',
    monogram: 'SAP',
    color: '#008FD3',
    iconBg: 'rgba(0,143,211,0.12)',
    iconBorder: 'rgba(0,143,211,0.4)',
  },
  {
    name: 'Certified Implementation Specialist - Data Foundations',
    issuer: 'ServiceNow',
    year: '2026',
    link: 'https://nowlearning.servicenow.com',
    image: '/images/cert-servicenow.jpg',
    monogram: 'SN',
    color: '#1F574D',
    iconBg: 'rgba(31,87,77,0.12)',
    iconBorder: 'rgba(31,87,77,0.4)',
  },
  {
    name: 'MongoDB Skill: Relational to Document Model',
    issuer: 'MongoDB',
    year: '2026',
    link: 'https://www.credly.com/badges/ef06b4a6-049b-40c4-a868-5e8021eba2b3',
    image: '/images/cert-mongodb.jpg',
    monogram: 'MDB',
    color: '#13AA52',
    iconBg: 'rgba(19,170,82,0.12)',
    iconBorder: 'rgba(19,170,82,0.4)',
  },
];

const fade = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0 },
};

export default function Certifications() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const [activeCert, setActiveCert] = useState(null);

  // Close lightbox on escape key
  useEffect(() => {
    if (!activeCert) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCert]);

  return (
    <section id="certifications" className={`section ${styles.certs}`} ref={ref}>
      <div className="container">
        <h2 className="section-title" data-prefix="05">certifications.md</h2>

        <motion.div
          className={styles.certs__grid}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {certs.map(c => (
            <motion.div
              key={c.name}
              className={styles.certs__card}
              variants={fade}
              style={{ '--cert-color': c.color }}
            >
              {/* Badge image (clickable) */}
              <div 
                className={styles.certs__image}
                onClick={() => setActiveCert(c)}
                title="Click to view large certificate"
              >
                <img src={c.image} alt={`${c.issuer} certification badge`} loading="lazy" />
              </div>

              {/* Top row */}
              <div className={styles['certs__card-top']}>
                <div
                  className={styles.certs__icon}
                  style={{
                    background:   c.iconBg,
                    color:        c.color,
                    borderColor:  c.iconBorder,
                  }}
                >
                  {c.monogram}
                </div>
                <span className={styles.certs__year}>{c.year}</span>
              </div>

              {/* Body */}
              <div className={styles['certs__card-body']}>
                <div className={styles.certs__name}>{c.name}</div>
                <div className={styles.certs__issuer}>{c.issuer}</div>
              </div>

              {/* Footer */}
              <div className={styles['certs__card-footer']}>
                <span className={styles.certs__passed}>
                  <FiCheckCircle /> passed
                </span>
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.certs__verify}
                >
                  verify credential <FiExternalLink />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            className={styles.certs__lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCert(null)}
          >
            <motion.div
              className={styles['certs__lightbox-content']}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles['certs__lightbox-close']} 
                onClick={() => setActiveCert(null)}
                aria-label="Close preview"
              >
                <FiX />
              </button>
              <img src={activeCert.image} alt={`${activeCert.name} full preview`} />
              <div className={styles['certs__lightbox-caption']}>
                {activeCert.name}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
