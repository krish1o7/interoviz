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
      {/* ── Video background (Full height 100vh, zero gaps) ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="hero__video"
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

      {/* Scrim overlay for text readability without washing out video */}
      <div className="hero__gradient" style={{ zIndex: 1 }} />

      {/* ── Content ── */}
      <div className="hero__content" style={{ zIndex: 2 }}>
        <div ref={titleRef}>
          <h1 className="hero__title">
            {['Defining Tomorrow', ''].map((line, i) => (
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
