import { useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function AboutSection({ onNavigate }) {
  const ref = useRef(null);
  useScrollReveal(ref);

  return (
    <section className="section" ref={ref}>
      <div className="padding-global">
        <div className="about-section">
          <div>
            <div className="title-desc__label" style={{ marginBottom: '1.5rem' }}>About us</div>
            <p
              className="heading-h2"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)',
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
                marginBottom: '2rem',
              }}
            >
              An international creative production studio
            </p>
            <p style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1rem)', lineHeight: 1.75, opacity: 0.65, marginBottom: '2.5rem', maxWidth: '500px' }}>
              Welcome to Interoviz, your trusted partner in transforming visions into stunning visual realities. With over 15 years of expertise, we specialize in delivering top-tier services, including Interior Rendering, Animations, Furniture Rendering, Photography, and immersive Virtual Tours. Our mission is to bring your ideas to life with unparalleled precision and creativity.
            </p>

            <button className="btn" onClick={() => onNavigate?.('/about')}>
              <span className="btn__text"><span>More about us</span></span>
              <span className="btn__arrow">
                <svg viewBox="0 0 20 14" strokeWidth="1.5" stroke="currentColor" fill="none">
                  <path d="M1 7H19M13 1L19 7L13 13" />
                </svg>
              </span>
            </button>
          </div>

          {/* Right side – real architectural photo */}
          <div style={{ position: 'relative' }}>
            <div
              className="img-hover-reveal"
              style={{
                width: '100%',
                aspectRatio: '4/5',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80&auto=format&fit=crop"
                alt="Modern architectural interior"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div className="img-hover-reveal__overlay" />

              {/* Text overlay at bottom */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '3rem 2rem 2rem',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: '0.65rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    opacity: 0.5,
                    marginBottom: '0.5rem',
                  }}
                >
                  Budapest · Dubai · Singapore
                </div>
                <div
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 'clamp(1rem, 2vw, 1.6rem)',
                    fontWeight: 400,
                    opacity: 0.9,
                  }}
                >
                  15+ years of excellence
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
