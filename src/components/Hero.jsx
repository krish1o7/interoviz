import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { AnimatedButton } from './Navbar';


export default function Hero({ onShowreel }) {
  const titleRef = useRef(null);
  const innerRefs = useRef([]);
  const ctaRef = useRef(null);

  // Intro typography animations
  useEffect(() => {
    const delay = 1.2;
    gsap.to(innerRefs.current, {
      y: '0%',
      duration: 1.1,
      stagger: 0.15,
      ease: 'power4.out',
      delay,
    });
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: delay + 0.5 }
    );
  }, []);

  return (
    <section className="hero">
      {/* ── Video background ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 0,
        }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark base behind video */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#0a0a0a',
          zIndex: -1,
        }}
      />

      {/* Gradient overlay for text readability */}
      <div className="hero__gradient" style={{ zIndex: 1 }} />

      {/* Subtle vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Content ── */}
      <div className="hero__content" style={{ zIndex: 2 }}>
        <div ref={titleRef}>
          <h1 className="hero__title">
            {['Elevating', 'great ideas'].map((line, i) => (
              <span key={i} className="hero__title-line">
                <span
                  className="hero__title-inner"
                  ref={el => innerRefs.current[i] = el}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>
        </div>

        <div ref={ctaRef} style={{ opacity: 0 }}>
          <AnimatedButton label="Watch showreel" onClick={onShowreel} />
        </div>
      </div>
    </section>
  );
}
