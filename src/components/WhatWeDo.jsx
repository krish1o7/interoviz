import { useEffect, useRef, forwardRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollReveal } from '../hooks/useScrollReveal';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: 'architecture-real-estate',
    label: 'Architecture and Real Estate',
    image: 'https://interoviz.com/wp-content/uploads/2025/09/6.jpg',
  },
  {
    id: 'interior-renderings',
    label: 'Interior Renderings',
    image: 'https://interoviz.com/wp-content/uploads/2025/09/D3.jpg',
  },
  {
    id: '360-virtual-tours',
    label: '360° Virtual Tours',
    image: '/images/gallery/nippon-steel-360-vr.jpg',
  },
  {
    id: 'furniture',
    label: 'Furniture',
    image: 'https://interoviz.com/wp-content/uploads/2025/09/9939_Final.jpg',
  },
  {
    id: 'interactive-configurators',
    label: 'Interactive Configurators',
    image: 'https://interoviz.com/wp-content/uploads/2025/09/1.jpg',
  },
];

export default function WhatWeDo({ onNavigate }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate header row & narrative
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Animate service cards
    const cards = cardRefs.current.filter(Boolean);
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.08,
        }
      );
    });
  }, []);

  return (
    <section className="section bottom-line" ref={sectionRef}>
      <div className="padding-global">
        {/* Prominent Section Header & Balanced Narrative Grid */}
        <div className="wwd__header" ref={headerRef} style={{ opacity: 0 }}>
          {/* Top Row: Grand Heading + Studio Metrics */}
          <div className="wwd__heading-row">
            <div>
              <h2 className="wwd__heading">What We Do</h2>
            </div>

            <div className="wwd__stats">
              <div className="wwd__stat" style={{ textAlign: 'right' }}>
                <span className="wwd__stat-num">15+</span>
                <span className="wwd__stat-label">Years of Experience</span>
              </div>
            </div>
          </div>

          {/* Content Grid: Large Impact Statement + Narrative */}
          <div className="wwd__content-grid">
            <div className="wwd__lead-col">
              <p className="wwd__lead-text">
                Interoviz is a specialised International visualisation studio helping interior designers, architects, real estate developers and furniture brands turn their design ideas into compelling, photorealistic visuals and other related services.
              </p>
            </div>

            <div className="wwd__desc-col">
              <p className="wwd__desc-text">
                From interior and furniture renderings to animation, 360° experiences and technical visualisation, we combine design understanding with a refined production process to create imagery that helps our clients present, communicate and sell their work.
              </p>
            </div>
          </div>
        </div>

        {/* Services grid - 5 Categories */}
        <div className="services-grid">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.label}
              service={service}
              onClick={() => onNavigate?.('/works')}
              ref={el => cardRefs.current[i] = el}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const ServiceCard = forwardRef(({ service, onClick }, ref) => {
  return (
    <div
      className="service-card img-hover-reveal"
      ref={ref}
      onClick={onClick}
      role="button"
      tabIndex={0}
      style={{ cursor: 'pointer' }}
    >
      {/* Real photo */}
      <img
        src={service.image}
        alt={service.label}
        className="service-card__media"
        loading="lazy"
      />

      <div className="service-card__gradient" />

      {/* Label */}
      <div className="service-card__label">{service.label}</div>

      {/* Hover arrow */}
      <div
        style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.25rem',
          opacity: 0,
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          zIndex: 3,
        }}
        className="service-card__arrow"
      >
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="white" strokeWidth="1.5">
          <path d="M1 7H19M13 1L19 7L13 13" />
        </svg>
      </div>

      <style>{`
        .service-card:hover .service-card__arrow {
          opacity: 1 !important;
          transform: translate(2px, -2px);
        }
      `}</style>
    </div>
  );
});

ServiceCard.displayName = 'ServiceCard';
