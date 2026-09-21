import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { forwardRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: 'Wedyan – The Canal',
    client: 'Kengo Kuma & Associates',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80&auto=format&fit=crop',
  },
  {
    title: 'Dubai Museum of Art',
    client: 'Al Futtain Group | Tadao Ando',
    image: 'https://images.unsplash.com/photo-1545486332-9e0999c535b2?w=1200&q=80&auto=format&fit=crop',
  },
  {
    title: 'Lumena Office Tower',
    client: 'Omniyat',
    image: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=1200&q=80&auto=format&fit=crop',
  },
];

export default function CaseStudies() {
  const cardRefs = useRef([]);
  const titleRef = useRef(null);

  useEffect(() => {
    // Title reveal
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
        },
      }
    );

    // Card stagger
    cardRefs.current.filter(Boolean).forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
          },
          delay: i * 0.1,
        }
      );
    });
  }, []);

  return (
    <section className="section bottom-line">
      <div className="padding-global">
        {/* Header */}
        <div className="title-desc title-desc--vertical" ref={titleRef}>
          <div className="title-desc__label">Case Studies</div>
          <div className="title-desc__text">
            These selected projects showcase the ideas and artistic vision that define our work.
            They represent the ideas, artistic direction, and dedication that shape our work.{' '}
            <span style={{ opacity: 0.4 }}>Explore projects ↓</span>
          </div>
        </div>

        {/* Projects grid */}
        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              ref={el => cardRefs.current[i] = el}
            />
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3rem' }}>
          <ExploreButton label="Explore works" />
        </div>
      </div>
    </section>
  );
}

const ProjectCard = forwardRef(({ project }, ref) => {
  return (
    <div className="project-card" ref={ref}>
      {/* Real photo */}
      <img
        src={project.image}
        alt={project.title}
        className="project-card__img"
        loading="lazy"
      />

      {/* Gradient overlay */}
      <div className="project-card__gradient" />

      {/* Info */}
      <div className="project-card__info">
        <div className="project-card__title">
          <span className="project-card__title-inner">{project.title}</span>
        </div>
        <div className="project-card__sub">{project.client}</div>
      </div>

      {/* Corner arrow */}
      <div
        style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.25rem',
          zIndex: 3,
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
        className="project-card-arrow"
      >
        <svg width="18" height="13" viewBox="0 0 20 14" fill="none" stroke="white" strokeWidth="1.5">
          <path d="M1 7H19M13 1L19 7L13 13" />
        </svg>
      </div>

      <style>{`
        .project-card:hover .project-card-arrow { opacity: 1 !important; }
      `}</style>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

function ExploreButton({ label }) {
  return (
    <button className="btn">
      <span className="btn__text"><span>{label}</span></span>
      <span className="btn__arrow">
        <svg viewBox="0 0 20 14" strokeWidth="1.5" stroke="currentColor" fill="none">
          <path d="M1 7H19M13 1L19 7L13 13" />
        </svg>
      </span>
    </button>
  );
}
