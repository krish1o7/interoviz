import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollReveal – fades and slides an element up when it enters the viewport.
 * @param {React.RefObject} ref – the element ref
 * @param {object} opts – optional overrides
 */
export function useScrollReveal(ref, opts = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = gsap.fromTo(
      el,
      {
        opacity: opts.opacity ?? 0,
        y: opts.y ?? 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: opts.duration ?? 0.9,
        ease: opts.ease ?? 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: opts.start ?? 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => tween.kill();
  }, [ref]);
}
