import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './About.module.scss';

const stats = [
  { key: 'dsa_solved',       value: '300+' },
  { key: 'certifications',   value: '10+' },
  { key: 'projects_built',   value: '4+' },
];

const tags = ['#dsa-solver', '#full-stack', '#java-dev', '#react-developer', '#curious-learner'];

const fade = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.88, y: 20 },
  show:   { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 16, stiffness: 100, delay } },
});

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className={`section ${styles.about}`} ref={ref}>
      <div className="container">
        <h2 className="section-title" data-prefix="02">about.js</h2>
        <div className={styles.about__grid}>
          {/* Left — bio */}
          <motion.div
            className={styles.about__bio}
            variants={fade(0)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <p>
              I am a Computer Science &amp; Engineering pre-final year undergraduate student at Technocrats Institute of Technology – Excellence, Bhopal.
              I have built a strong theoretical and practical foundation in Data Structures &amp; Algorithms, having solved over 300+ coding challenges across LeetCode, CodeChef, and HackerEarth.
            </p>
            <p>
              My hands-on experience spans building scalable full-stack web applications using modern web ecosystems like React, Node.js, Express, and MongoDB.
              I am passionate about implementing secure RESTful API integrations, designing clean indexing schemas, and learning about cloud technologies.
            </p>
            <div className={styles.about__tags}>
              {tags.map(t => <span key={t}>{t}</span>)}
            </div>
          </motion.div>

          {/* Avatar */}
          <motion.div
            className={styles.about__avatar_wrap}
            variants={scaleIn(0.12)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <img src="/images/profile.jpg" alt="LAV KUMAR — Profile Picture" />
          </motion.div>

          {/* Stats */}
          <motion.div
            className={styles.about__stats}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            {stats.map(s => (
              <motion.div key={s.key} className={styles['about__stat-card']} variants={fade(0.2)}>
                <div className={styles.key}>{s.key}</div>
                <div className={styles.value}>{s.value}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
