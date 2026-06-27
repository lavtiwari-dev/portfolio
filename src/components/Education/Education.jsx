import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Education.module.scss';

const education = [
  {
    degree: 'Bachelor of Technology in Computer Science & Engineering',
    institution: 'Technocrats Institute of Technology – Excellence, Bhopal',
    years: 'Expected 2027',
    gpa: 'CGPA: 7.7',
    notes: 'Pre-final year undergraduate student building a strong foundation in Data Structures & Algorithms, Object-Oriented Programming (OOP), Database Management Systems (DBMS), and Operating Systems.',
  },
  {
    degree: 'Senior Secondary School (BSEB)',
    institution: 'Gandak High School, Tarwara',
    years: '2023',
    gpa: '',
    notes: 'Completed senior secondary school with a focus on science stream.',
  },
  {
    degree: 'Secondary School (BSEB)',
    institution: 'Gandak High School, Tarwara',
    years: '2021',
    gpa: '',
    notes: 'Completed secondary school with a strong foundation in mathematics and science.',
  },
];

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Education() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="education" className={`section ${styles.education}`} ref={ref}>
      <div className="container">
        <h2 className="section-title" data-prefix="06">education.md</h2>
        <motion.div
          className={styles.education__timeline}
          variants={{ show: { transition: { staggerChildren: 0.15 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {education.map(e => (
            <motion.div key={e.degree} className={styles.education__item} variants={fade}>
              <div className={styles.education__degree}>{e.degree}</div>
              <div className={styles.education__meta}>
                <span className={styles.institution}>{e.institution}</span>
                <span className={styles.years}>{e.years}</span>
                {e.gpa && <span className={styles.gpa}>{e.gpa}</span>}
              </div>
              <p className={styles.education__notes}>{e.notes}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
