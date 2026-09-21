import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { forwardRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    label: 'Architecture',
    image: 'https://interoviz.com/wp-content/uploads/2025/09/6.jpg',
  },
  {
    label: 'Real Estate',
    image: 'https://interoviz.com/wp-content/uploads/2025/09/1.jpg',
  },
  {
    label: 'Photography',
    image: 'https://interoviz.com/wp-content/uploads/2025/09/9939_Final.jpg',
  },
  {
    label: 'Interior',
    image: 'https://interoviz.com/wp-content/uploads/2025/09/D3.jpg',
  },
];

export default function WhatWeDo() {
  const sectionRef = useRef(null);
  const descRef = useRef(null);
  const cardRefs = useRef([]);

  useScrollReveal(descRef);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
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
        {/* Title + description */}
        <div className="title-desc" ref={descRef}>
          <div className="title-desc__label">What We Do</div>
          <div className="title-desc__text">
            Introviz is an international creative production studio that translates
            great ideas into high-end visual solutions.
            <br /><br />
            Driven by a team of highly skilled artists and powered by cutting-edge
            technology, we deliver innovative and refined visual narratives, with
            the capacity and competence required for large-scale, prestige projects.
          </div>
        </div>

        {/* Services grid */}
        <div className="services-grid">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.label}
              service={service}
              ref={el => cardRefs.current[i] = el}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const ServiceCard = forwardRef(({ service }, ref) => {
  return (
    <div
      className="service-card img-hover-reveal"
      ref={ref}
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
          transition: 'opacity 0.3s ease',
          zIndex: 3,
        }}
        className="service-card__arrow"
      >
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="white" strokeWidth="1.5">
          <path d="M1 7H19M13 1L19 7L13 13" />
        </svg>
      </div>

      <style>{`
        .service-card:hover .service-card__arrow { opacity: 1 !important; }
      `}</style>
    </div>
  );
});

ServiceCard.displayName = 'ServiceCard';
