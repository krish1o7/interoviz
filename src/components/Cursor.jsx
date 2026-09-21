import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    const lerp = (start, end, t) => start + (end - start) * t;

    const animate = () => {
      current.current.x = lerp(current.current.x, pos.current.x, 0.12);
      current.current.y = lerp(current.current.y, pos.current.y, 0.12);

      cursor.style.left = `${current.current.x}px`;
      cursor.style.top = `${current.current.y}px`;

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', onMove);

    // Large on hoverable elements
    const growTargets = document.querySelectorAll('a, button, .service-card, .project-card');

    const grow = () => cursor.classList.add('cursor--large');
    const shrink = () => cursor.classList.remove('cursor--large');

    const addListeners = () => {
      document.querySelectorAll('a, button, .service-card, .project-card').forEach(el => {
        el.addEventListener('mouseenter', grow);
        el.addEventListener('mouseleave', shrink);
      });
    };

    addListeners();

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', onMove);
      document.querySelectorAll('a, button, .service-card, .project-card').forEach(el => {
        el.removeEventListener('mouseenter', grow);
        el.removeEventListener('mouseleave', shrink);
      });
    };
  }, []);

  return <div className="cursor" ref={cursorRef} aria-hidden="true" />;
}
