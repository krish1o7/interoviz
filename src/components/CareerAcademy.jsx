import { useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const CAREER_IMAGES = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80&auto=format&fit=crop',
];

export default function CareerAcademy() {
  const ref = useRef(null);
  useScrollReveal(ref);

  return (
    <section className="section bottom-line" ref={ref}>
      <div className="padding-global">
        <div className="two-col-text">
          <div className="two-col-text__item" >
            <div className="title-desc__label" style={{ marginBottom: '2rem' }}>Career</div>
            <h3>We're looking for exceptional talent</h3>
            <p>
              We offer an inspiring, well-equipped work environment and competitive salary.
              You'll join a dedicated team where artists take projects from first drafts to
              final touches, supported by peer-to-peer coaching, feedback, and knowledge sharing.
            </p>
            <button className="btn">
              <span className="btn__text"><span>Go to Career page</span></span>
              <span className="btn__arrow">
                <svg viewBox="0 0 20 14" strokeWidth="1.5" stroke="currentColor" fill="none">
                  <path d="M1 7H19M13 1L19 7L13 13" />
                </svg>
              </span>
            </button>
          </div>

          {/* <div className="two-col-text__item">
            <div className="title-desc__label" style={{ marginBottom: '2rem' }}>Brick Academy</div>
            <h3>Fast-track your archviz skills</h3>
            <p>
              Mastering archviz, from fundamentals to advanced expertise, often takes 7–10 years.
              Brick Academy accelerates this journey with tailored courses that fast-track your
              growth and bridge the gap to industry expectations.
            </p>
            <button className="btn">
              <span className="btn__text"><span>Go to Academy</span></span>
              <span className="btn__arrow">
                <svg viewBox="0 0 20 14" strokeWidth="1.5" stroke="currentColor" fill="none">
                  <path d="M1 7H19M13 1L19 7L13 13" />
                </svg>
              </span>
            </button>
          </div> */}
        </div>

        {/* Image grid with real photos */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr',
            gap: '1rem',
            marginTop: '4rem',
          }}
        >
          {CAREER_IMAGES.map((src, i) => (
            <div
              key={i}
              className="img-hover-reveal"
              style={{
                height: '280px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <img
                src={src}
                alt="Studio workspace"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div className="img-hover-reveal__overlay" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
