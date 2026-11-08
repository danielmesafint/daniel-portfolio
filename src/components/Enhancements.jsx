import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Thin bar at the top of the page showing how far the visitor has scrolled. */
export const ProgressBar = () => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="progress" style={{ transform: `scaleX(${pct / 100})` }} aria-hidden="true" />;
};

/** Round button that appears after scrolling down. */
export const BackToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      className={`to-top ${show ? 'show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
    >
      <ArrowUp size={18} />
    </button>
  );
};

/** Fades cards and headings in as they scroll into view. */
export const useReveal = () => {
  useEffect(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return undefined;
    const els = document.querySelectorAll('main .section-head, main .card, main .reveal-item');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            observer.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    els.forEach((el) => {
      // Only animate things below the first screen, so the hero is instant.
      if (el.getBoundingClientRect().top > window.innerHeight * 0.9) {
        el.classList.add('reveal');
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, []);
};

/** Counts a number up from zero when it scrolls into view, keeping any suffix like "+". */
export const CountUp = ({ value }) => {
  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : '';
  const [n, setN] = useState(target === null || prefersReducedMotion() ? target : 0);
  const ref = useRef(null);

  useEffect(() => {
    if (target === null || prefersReducedMotion()) return undefined;
    let raf;
    const el = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const duration = 1100;
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setN(Math.round(target * eased));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    if (el) observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(raf); };
  }, [target]);

  if (target === null) return <span>{value}</span>;
  return <span ref={ref}>{n}{suffix}</span>;
};
