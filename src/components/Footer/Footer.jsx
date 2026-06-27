import { useEffect, useState } from 'react';
import { FiGitBranch } from 'react-icons/fi';
import styles from './Footer.module.scss';

function LiveClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{time}</span>;
}

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footer__left}>
        <span className={styles.footer__item}>
          <FiGitBranch className={styles.icon} />
          main
        </span>
        <span className={styles.footer__sep}>·</span>
        <span className={styles.footer__copy}>
          © {new Date().getFullYear()} LAV KUMAR
        </span>
      </div>
      <div className={styles.footer__right}>
        <span className={styles.footer__item}>UTF-8</span>
        <span className={styles.footer__sep}>·</span>
        <span className={styles.footer__item}>LF</span>
        <span className={styles.footer__sep}>·</span>
        <span className={styles.footer__item}><LiveClock /></span>
      </div>
    </footer>
  );
}
