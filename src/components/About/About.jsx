import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FiArrowUpRight,
  FiBookOpen,
  FiBriefcase,
  FiCode,
  FiDownload,
  FiMapPin,
} from 'react-icons/fi';
import styles from './About.module.scss';

const stats = [
  { value: '300+', label: 'DSA problems', note: 'solved across coding platforms' },
  { value: '4', label: 'Certifications', note: 'across cloud and development' },
  { value: '5+', label: 'Projects', note: 'built from idea to interface' },
];

const facts = [
  {
    label: 'education',
    value: 'B.Tech in CSE (Expected 2027)',
    icon: <FiBookOpen />,
  },
  {
    label: 'location',
    value: 'Bhopal, India · Remote friendly',
    icon: <FiMapPin />,
  },
];

const tags = ['Java', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'REST APIs'];

const fade = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, delay } },
});

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', damping: 18, stiffness: 110, delay: 0.12 },
  },
};

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 });

  return (
    <section id="about" className={`section ${styles.about}`} ref={ref}>
      <div className="container">
        <h2 className="section-title" data-prefix="02">about.js</h2>

        <div className={styles.about__grid}>
          <motion.div
            className={styles.about__content}
            variants={fade()}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <div className={styles.about__eyebrow}>
              <span aria-hidden="true">//</span> beyond the résumé
            </div>

            <h3 className={styles.about__headline}>
              I build web products and solve algorithmic challenges.
            </h3>

            <div className={styles.about__copy}>
              <p>
                I’m a pre-final-year CSE student focused on React, Node.js, and Java.
                I write clean code for full-stack applications and enjoy engineering reliable backend APIs.
                Beyond coding, I actively solve algorithmic challenges to strengthen my problem-solving skills.
                I am always excited to learn new technology stacks and build projects that make an impact.
              </p>
            </div>

            <dl className={styles.about__facts}>
              {facts.map((fact) => (
                <div className={styles.about__fact} key={fact.label}>
                  <span className={styles.about__fact_icon} aria-hidden="true">{fact.icon}</span>
                  <div>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className={styles.about__tags} aria-label="Core technologies">
              {tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>

            <div className={styles.about__actions}>
              <a href="/resume.pdf" className="btn btn--outline" download>
                <FiDownload /> Download résumé
              </a>
              <a href="#contact" className={styles.about__contact_link}>
                Let’s work together <FiArrowUpRight />
              </a>
            </div>
          </motion.div>

          <motion.figure
            className={styles.about__portrait}
            variants={scaleIn}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <div className={styles.about__portrait_frame}>
              <img src="/images/profile.jpg" alt="Lav Kumar" loading="lazy" decoding="async" />
              <div className={styles.about__portrait_glow} aria-hidden="true" />
            </div>
            <figcaption className={styles.about__identity}>
              <span className={styles.about__availability}>
                <span aria-hidden="true" /> Available for opportunities
              </span>
              <strong>Lav Kumar</strong>
              <small>Full-stack developer · problem solver</small>
            </figcaption>
            <span className={styles.about__code_badge} aria-hidden="true">
              &lt;build /&gt;
            </span>
          </motion.figure>

          <motion.div
            className={styles.about__stats}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            {stats.map((stat) => (
              <motion.article
                key={stat.label}
                className={styles.about__stat_card}
                variants={fade(0.14)}
              >
                <strong>{stat.value}</strong>
                <div>
                  <span>{stat.label}</span>
                  <small>{stat.note}</small>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
