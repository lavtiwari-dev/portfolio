import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaJava, FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt, FaGithub, FaDatabase 
} from 'react-icons/fa';
import { 
  SiJavascript, SiTailwindcss, SiExpress, SiMongodb, SiPostman 
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';
import { DiMysql } from 'react-icons/di';
import { FiMonitor, FiServer, FiTool, FiDatabase } from 'react-icons/fi';
import { TbBinaryTree, TbSettingsCog, TbDatabase, TbTerminal } from 'react-icons/tb';
import styles from './Skills.module.scss';

const groups = [
  {
    label: 'Programming Languages',
    file: 'languages.java',
    icon: <FiMonitor />,
    skills: [
      {
        name: 'Java',
        icon: <FaJava />,
        color: '#E76F51',
        bgHover: 'rgba(231, 111, 81, 0.08)',
        shadow: 'rgba(231, 111, 81, 0.15)'
      },
      {
        name: 'JavaScript',
        icon: <SiJavascript />,
        color: '#F7DF1E',
        bgHover: 'rgba(247, 223, 30, 0.08)',
        shadow: 'rgba(247, 223, 30, 0.15)'
      }
    ],
  },
  {
    label: 'Frontend & UI',
    file: 'frontend.tsx',
    icon: <FiMonitor />,
    skills: [
      {
        name: 'React.js',
        icon: <FaReact />,
        color: '#61DAFB',
        bgHover: 'rgba(97, 218, 251, 0.08)',
        shadow: 'rgba(97, 218, 251, 0.15)'
      },
      {
        name: 'Tailwind CSS',
        icon: <SiTailwindcss />,
        color: '#38B2AC',
        bgHover: 'rgba(56, 178, 172, 0.08)',
        shadow: 'rgba(56, 178, 172, 0.15)'
      },
      {
        name: 'HTML5',
        icon: <FaHtml5 />,
        color: '#E34F26',
        bgHover: 'rgba(227, 79, 38, 0.08)',
        shadow: 'rgba(227, 79, 38, 0.15)'
      },
      {
        name: 'CSS3',
        icon: <FaCss3Alt />,
        color: '#1572B6',
        bgHover: 'rgba(21, 114, 182, 0.08)',
        shadow: 'rgba(21, 114, 182, 0.15)'
      }
    ],
  },
  {
    label: 'Backend & Databases',
    file: 'backend.js',
    icon: <FiServer />,
    skills: [
      {
        name: 'Node.js',
        icon: <FaNodeJs />,
        color: '#339933',
        bgHover: 'rgba(51, 153, 51, 0.08)',
        shadow: 'rgba(51, 153, 51, 0.15)'
      },
      {
        name: 'Express.js',
        icon: <SiExpress />,
        color: '#828282',
        bgHover: 'rgba(130, 130, 130, 0.08)',
        shadow: 'rgba(130, 130, 130, 0.15)'
      },
      {
        name: 'RESTful APIs',
        icon: <TbTerminal />,
        color: '#FF6C37',
        bgHover: 'rgba(255, 108, 55, 0.08)',
        shadow: 'rgba(255, 108, 55, 0.15)'
      },
      {
        name: 'MongoDB',
        icon: <SiMongodb />,
        color: '#47A248',
        bgHover: 'rgba(71, 162, 72, 0.08)',
        shadow: 'rgba(71, 162, 72, 0.15)'
      },
      {
        name: 'MySQL',
        icon: <DiMysql />,
        color: '#4479A1',
        bgHover: 'rgba(68, 121, 161, 0.08)',
        shadow: 'rgba(68, 121, 161, 0.15)'
      }
    ],
  },
  {
    label: 'Tools & Platforms',
    file: 'tools.config',
    icon: <FiTool />,
    skills: [
      {
        name: 'Git',
        icon: <FaGitAlt />,
        color: '#F05032',
        bgHover: 'rgba(240, 80, 50, 0.08)',
        shadow: 'rgba(240, 80, 50, 0.15)'
      },
      {
        name: 'GitHub',
        icon: <FaGithub />,
        color: '#FFFFFF',
        bgHover: 'rgba(255, 255, 255, 0.08)',
        shadow: 'rgba(255, 255, 255, 0.15)'
      },
      {
        name: 'Postman',
        icon: <SiPostman />,
        color: '#FF6C37',
        bgHover: 'rgba(255, 108, 55, 0.08)',
        shadow: 'rgba(255, 108, 55, 0.15)'
      },
      {
        name: 'VS Code',
        icon: <VscCode />,
        color: '#007ACC',
        bgHover: 'rgba(0, 122, 204, 0.08)',
        shadow: 'rgba(0, 122, 204, 0.15)'
      }
    ],
  },
  {
    label: 'Core Computer Science',
    file: 'core_cs.py',
    icon: <FiDatabase />,
    skills: [
      {
        name: 'Data Structures & Algorithms',
        icon: <TbBinaryTree />,
        color: '#FFA116',
        bgHover: 'rgba(255, 161, 22, 0.08)',
        shadow: 'rgba(255, 161, 22, 0.15)'
      },
      {
        name: 'OOP',
        icon: <TbSettingsCog />,
        color: '#9B59B6',
        bgHover: 'rgba(155, 89, 182, 0.08)',
        shadow: 'rgba(155, 89, 182, 0.15)'
      },
      {
        name: 'DBMS',
        icon: <TbDatabase />,
        color: '#3498DB',
        bgHover: 'rgba(52, 152, 219, 0.08)',
        shadow: 'rgba(52, 152, 219, 0.15)'
      },
      {
        name: 'Operating Systems',
        icon: <FaDatabase />,
        color: '#E74C3C',
        bgHover: 'rgba(231, 76, 60, 0.08)',
        shadow: 'rgba(231, 76, 60, 0.15)'
      }
    ],
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 }
};

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="skills" className={`section ${styles.skills}`} ref={ref}>
      <div className="container">
        <h2 className="section-title" data-prefix="03">skills.json</h2>
        <motion.div
          className={styles.skills__groups}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {groups.map(g => (
            <motion.div key={g.label} className={styles.skills__group} variants={cardVariants}>
              <div className={styles['skills__group-header']}>
                <span className={styles.icon}>{g.icon}</span>
                <span className={styles.file}>{g.file}</span>
                <span className={styles.count}>
                  {g.skills.length} items
                </span>
              </div>
              <div className={styles.skills__pills}>
                {g.skills.map(s => (
                  <motion.span 
                    key={s.name} 
                    className={styles.skills__pill}
                    variants={pillVariants}
                    style={{
                      '--skill-color': s.color,
                      '--skill-bg-hover': s.bgHover,
                      '--skill-shadow': s.shadow
                    }}
                    whileHover={{ 
                      y: -3,
                      scale: 1.03,
                      transition: { duration: 0.2, ease: 'easeOut' }
                    }}
                  >
                    <span className={styles.skills__pill_icon}>{s.icon}</span>
                    <span className={styles.skills__pill_name}>{s.name}</span>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
