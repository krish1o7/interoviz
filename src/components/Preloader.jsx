import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Preloader({ onComplete }) {
  const overlayRef = useRef(null);
  const logoRef = useRef(null);
  const barRef = useRef(null);
  const edgeRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.();
      },
    });

    // Animate logo in
    tl.to(logoRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    });

    // Progress bar fill
    tl.to(barRef.current, {
      width: '100%',
      duration: 1.4,
      ease: 'power1.inOut',
    }, 0.3);

    // Logo fades out, edge wipes down
    tl.to(logoRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: 'power2.in',
    }, 1.8);

    tl.to(edgeRef.current, {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: 0.9,
      ease: 'power3.inOut',
    }, 1.9);

    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.15,
      ease: 'none',
    }, 2.75);

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div className="preloader" ref={overlayRef}>
      <div ref={logoRef} className="preloader__logo">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Brick Visual logo mark – stylized B */}
          <rect x="10" y="10" width="20" height="17" fill="white"/>
          <rect x="10" y="30" width="22" height="17" fill="white"/>
          <rect x="30" y="10" width="17" height="14" rx="7" fill="white"/>
          <rect x="32" y="30" width="17" height="14" rx="7" fill="white"/>
        </svg>
        <p style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: '0.7rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginTop: '1rem',
          opacity: 0.5,
        }}>Loading</p>
      </div>

      <div className="preloader__bar-wrapper">
        <div className="preloader__bar" ref={barRef} />
      </div>

      <div className="preloader__edge" ref={edgeRef} />
    </div>
  );
}
