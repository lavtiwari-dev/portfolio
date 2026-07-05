import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMessageSquare, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from './Testimonials.module.scss';

const testimonials = [
  {
    quote: "Lav consistently demonstrated strong problem-solving ability and a passion for building well-structured systems. His approach to breaking down complex algorithmic problems is methodical and impressive for his level.",
    name: "Prof. [Name]",
    role: "Faculty Mentor",
    institution: "CSE Department",
    avatar: "PM",
    color: "var(--blue)"
  },
  {
    quote: "Working with Lav on WasteChain was a great experience. He took ownership of the entire backend architecture, implemented JWT authentication smoothly, and was always focused on clean, maintainable code.",
    name: "[Teammate Name]",
    role: "Project Collaborator",
    institution: "Team Member · WasteChain",
    avatar: "TC",
    color: "var(--green)"
  },
  {
    quote: "Lav is one of those developers who doesn't just make things work — he thinks about why things work. His curiosity for system internals and data structures goes well beyond what's expected at the undergraduate level.",
    name: "[Mentor Name]",
    role: "Technical Mentor",
    institution: "Industry Mentor",
    avatar: "MM",
    color: "var(--mauve)"
  }
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 160 : -160,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring', stiffness: 350, damping: 30 },
      opacity: { duration: 0.2 }
    }
  },
  exit: (direction) => ({
    x: direction < 0 ? 160 : -160,
    opacity: 0,
    transition: {
      x: { type: 'spring', stiffness: 350, damping: 30 },
      opacity: { duration: 0.15 }
    }
  })
};

export default function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const [[page, direction], setPage] = useState([0, 0]);

  const activeIndex = ((page % testimonials.length) + testimonials.length) % testimonials.length;
  const currentTestimonial = testimonials[activeIndex];

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <section id="testimonials" className={`section ${styles.testimonials}`} ref={ref}>
      <div className="container">
        <h2 className="section-title" data-prefix="07">testimonials/</h2>

        {/* 1. Desktop Static Grid (Hidden on Mobile) */}
        <div className={styles.testimonials__grid}>
          {testimonials.map((t, i) => (
            <article
              key={i}
              className={styles.testimonials__card_static}
              style={{ '--card-accent': t.color }}
            >
              <div className={styles.testimonials__quote_icon}>
                <FiMessageSquare />
              </div>
              <blockquote className={styles.testimonials__quote}>
                <span className={styles.testimonials__quote_mark}>"</span>
                {t.quote}
                <span className={styles.testimonials__quote_mark}>"</span>
              </blockquote>
              <div className={styles.testimonials__author}>
                <div
                  className={styles.testimonials__avatar}
                  style={{
                    background: `color-mix(in srgb, ${t.color} 15%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${t.color} 35%, transparent)`,
                    color: t.color
                  }}
                >
                  {t.avatar}
                </div>
                <div className={styles.testimonials__author_info}>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                  <small>{t.institution}</small>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* 2. Mobile Interactive Slider (Hidden on Desktop) */}
        <div className={styles.testimonials__mobile_slider}>
          <div className={styles.testimonials__wrapper}>
            {/* Left Navigation Arrow */}
            <button
              type="button"
              className={`${styles.testimonials__arrow} ${styles['testimonials__arrow--left']}`}
              onClick={() => paginate(-1)}
              aria-label="Previous testimonial"
            >
              <FiChevronLeft />
            </button>

            {/* Slider Content Frame */}
            <div className={styles.testimonials__frame}>
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.article
                  key={page}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className={styles.testimonials__card}
                  style={{ '--card-accent': currentTestimonial.color }}
                >
                  {/* Terminal comment icon */}
                  <div className={styles.testimonials__quote_icon}>
                    <FiMessageSquare />
                  </div>

                  <blockquote className={styles.testimonials__quote}>
                    <span className={styles.testimonials__quote_mark}>"</span>
                    {currentTestimonial.quote}
                    <span className={styles.testimonials__quote_mark}>"</span>
                  </blockquote>

                  <div className={styles.testimonials__author}>
                    <div
                      className={styles.testimonials__avatar}
                      style={{
                        background: `color-mix(in srgb, ${currentTestimonial.color} 15%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${currentTestimonial.color} 35%, transparent)`,
                        color: currentTestimonial.color
                      }}
                    >
                      {currentTestimonial.avatar}
                    </div>
                    <div className={styles.testimonials__author_info}>
                      <strong>{currentTestimonial.name}</strong>
                      <span>{currentTestimonial.role}</span>
                      <small>{currentTestimonial.institution}</small>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            {/* Right Navigation Arrow */}
            <button
              type="button"
              className={`${styles.testimonials__arrow} ${styles['testimonials__arrow--right']}`}
              onClick={() => paginate(1)}
              aria-label="Next testimonial"
            >
              <FiChevronRight />
            </button>
          </div>

          {/* Carousel Dot Indicators */}
          <div className={styles.testimonials__dots}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.testimonials__dot} ${activeIndex === i ? styles['testimonials__dot--active'] : ''}`}
                onClick={() => {
                  const diff = i - activeIndex;
                  if (diff !== 0) {
                    setPage([page + diff, diff > 0 ? 1 : -1]);
                  }
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
