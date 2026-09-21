import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ANCHORS = [
  { label: 'About us', id: 'about-story' },
  { label: 'Clients', id: 'about-clients' },
  { label: 'Team', id: 'about-team' },
  { label: 'Testimonials', id: 'about-testimonials' },
];

export default function AboutHero({ onScrollTo }) {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const anchorsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
    );

    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 0.75, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.4 }
    );

    gsap.fromTo(
      anchorsRef.current,
      { opacity: 0, x: -15 },
      { opacity: 0.6, x: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out', delay: 0.6 }
    );
  }, []);

  const handleAnchorClick = (e, id) => {
    e.preventDefault();
    if (onScrollTo) {
      onScrollTo(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="about-hero">
      {/* Background Image with dark gradient overlay */}
      <div className="about-hero__bg">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80&auto=format&fit=crop"
          alt="Interoviz Studio Workspace"
          className="about-hero__img"
        />
        <div className="about-hero__overlay" />
      </div>

      <div className="about-hero__content">
        <h1 ref={titleRef} className="about-hero__title">
          Translating great ideas into high-end visual solutions
        </h1>

        <p ref={subtitleRef} className="about-hero__subtitle">
          We are an international tight-knit community with a passion for creativity and technology.
        </p>

        {/* Vertical jump links matching BrickVisual style */}
        <nav className="about-hero__nav">
          {ANCHORS.map(({ label, id }, i) => (
            <a
              key={id}
              href={`#${id}`}
              ref={el => anchorsRef.current[i] = el}
              className="about-hero__nav-link"
              onClick={(e) => handleAnchorClick(e, id)}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
