import React, { useEffect } from 'react';
import AboutHero from '../components/AboutHero';
import AboutStory from '../components/AboutStory';
import Clients from '../components/Clients';
import AboutTeam from '../components/AboutTeam';
import AboutTestimonials from '../components/AboutTestimonials';

export default function AboutPage({ lenisRef }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(el, { offset: -60, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="about-page">
      <AboutHero onScrollTo={handleScrollTo} />
      <AboutStory />
      <Clients id="about-clients" />
      <AboutTeam />
      <AboutTestimonials />
    </div>
  );
}
