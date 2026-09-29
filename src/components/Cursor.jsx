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

    // Event delegation for interactive hover states
    const onMouseOver = (e) => {
      const isInteractive = Boolean(
        e.target &&
        e.target.closest &&
        e.target.closest(
          'a, button, [role="button"], .btn, .service-card, .project-card, .interoviz-gallery-card, .menu-link, .works-filter-btn, .about-hero__nav-link, .navbar__logo, input, textarea, select'
        )
      );
      if (isInteractive) {
        cursor.classList.add('cursor--large');
      } else {
        cursor.classList.remove('cursor--large');
      }
    };

    window.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return <div className="cursor" ref={cursorRef} aria-hidden="true" />;
}
