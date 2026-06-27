import { useEffect, useRef, useState } from 'react';
import styles from './LineGutter.module.scss';

const LINE_H = 20;
const NAV_H  = 44; // navbar height

export default function LineGutter({ activeSection }) {
  const gutterRef   = useRef(null);
  const trackerRef  = useRef(null);
  const innerRef    = useRef(null);
  const scheduleRef = useRef(null);
  
  const [lineCount, setLineCount] = useState(100);
  const lineCountRef = useRef(lineCount);

  const stateRef = useRef({
    isHovering:     false,
    mouseY:         -1,
    activeSection:  'hero',
    prevActiveLine: -1,
  });

  // Sync activeSection with the reference and schedule a frame paint
  useEffect(() => {
    stateRef.current.activeSection = activeSection;
    if (scheduleRef.current) {
      scheduleRef.current();
    }
  }, [activeSection]);

  // Keep lineCountRef updated and paint when list changes
  useEffect(() => {
    lineCountRef.current = lineCount;
    stateRef.current.prevActiveLine = -1;
    if (scheduleRef.current) {
      scheduleRef.current();
    }
  }, [lineCount]);

  // Calculate lineCount dynamically based on document height
  useEffect(() => {
    const updateLines = () => {
      const docHeight = document.documentElement.scrollHeight;
      const count = Math.ceil(docHeight / LINE_H);
      setLineCount(count);
    };

    updateLines();
    window.addEventListener('resize', updateLines, { passive: true });

    const observer = new ResizeObserver(updateLines);
    observer.observe(document.body);

    return () => {
      window.removeEventListener('resize', updateLines);
      observer.disconnect();
    };
  }, []);

  // Set up event listeners and painting loop
  useEffect(() => {
    const gutter  = gutterRef.current;
    const tracker = trackerRef.current;
    const inner   = innerRef.current;
    if (!gutter || !tracker || !inner) return;

    const st = stateRef.current;
    let rafId = null;

    /** Write current numbers + highlight active line */
    const paint = () => {
      const { isHovering, mouseY, activeSection } = st;
      const totalLines = lineCountRef.current;

      let activeLine = -1;
      let trackerTop = -1;

      // Highlight according to mouse Y position anywhere, fallback to section
      if (isHovering && mouseY >= 0) {
        activeLine = Math.floor(mouseY / LINE_H) + 1;
      } else {
        const activeElement = document.getElementById(activeSection);
        if (activeElement) {
          const offsetTop = activeElement.offsetTop;
          activeLine = Math.floor(offsetTop / LINE_H) + 1;
        }
      }

      // Bound check
      if (activeLine < 1) activeLine = 1;
      if (activeLine > totalLines) activeLine = totalLines;

      const spans = inner.children;
      // Toggle active classes on DOM nodes in O(1) time
      if (st.prevActiveLine !== activeLine) {
        if (st.prevActiveLine >= 1 && st.prevActiveLine <= spans.length) {
          spans[st.prevActiveLine - 1].classList.remove(styles['gutter__line--active']);
        }
        if (activeLine >= 1 && activeLine <= spans.length) {
          spans[activeLine - 1].classList.add(styles['gutter__line--active']);
        }
        st.prevActiveLine = activeLine;
      }

      // Move tracker pill smoothly relative to the gutter top
      if (activeLine >= 1) {
        trackerTop = (activeLine - 1) * LINE_H;
        tracker.style.display = 'block';
        tracker.style.transform = `translate3d(0, ${trackerTop}px, 0)`;
      } else {
        tracker.style.display = 'none';
      }

      rafId = null;
    };

    const schedule = () => {
      if (!rafId) rafId = requestAnimationFrame(paint);
    };

    scheduleRef.current = schedule;

    const lastClientYRef = { current: -1 };

    const onMouseMove = (e) => {
      lastClientYRef.current = e.clientY;
      const relativeY = e.clientY + window.scrollY - NAV_H;
      st.isHovering = true;
      st.mouseY = relativeY;
      schedule();
    };

    const onMouseLeave = () => {
      lastClientYRef.current = -1;
      st.isHovering = false;
      st.mouseY = -1;
      schedule();
    };

    const onScroll = () => {
      if (st.isHovering && lastClientYRef.current !== -1) {
        const relativeY = lastClientYRef.current + window.scrollY - NAV_H;
        st.mouseY = relativeY;
      }
      schedule();
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial paint
    schedule();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      scheduleRef.current = null;
    };
  }, []);

  return (
    <aside ref={gutterRef} className={styles.gutter} aria-hidden="true">
      <div ref={trackerRef} className={styles.gutter__tracker} style={{ display: 'none' }} />
      <div ref={innerRef} className={styles.gutter__inner}>
        {Array.from({ length: lineCount }, (_, i) => (
          <span key={i + 1} className={styles.gutter__line}>
            {i + 1}
          </span>
        ))}
      </div>
    </aside>
  );
}
