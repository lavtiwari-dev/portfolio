import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function AnimatedCounter({ value, duration = 1.2 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Extract number and suffix (like "+" or "%" or "")
  const match = typeof value === 'string' ? value.match(/^(\d+)(.*)$/) : null;
  const target = match ? parseInt(match[1], 10) : parseInt(value, 10) || 0;
  const suffix = match ? match[2] : '';

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = target;
    if (start === end) {
      setCount(end);
      return;
    }

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing out quad
      const easeProgress = progress * (2 - progress);
      
      const current = Math.floor(easeProgress * (end - start) + start);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}
