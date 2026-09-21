import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const POINTS = [
  {
    title: 'Reliable Source',
    text: 'We take the projects extremely seriously and understand the entire project chain, including how our rendering helps our clients reach their final clientele.',
  },
  {
    title: 'Years of Expertise',
    text: 'Our founders are the foundation of every project at Interoviz, having worked with interior designers, architects, and real estate developers for more than 15 years.',
  },
  {
    title: 'Design Partners, Not 3D Artists',
    text: 'Having worked in the sector for many years, we assist in packaging the product for sale or design meetings. We also provide our own design contributions that we believe can help make the product better.',
  },
  {
    title: 'Smart AI Teams & High End Infra',
    text: 'Our founders, who have been in production since the beginning of their careers, have developed a core team that constantly aims to improve with each new project.',
  }
];

export default function WhatSetsUsApart() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate label
    gsap.fromTo(labelRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    );

    // Animate grid items with stagger
    gsap.fromTo(itemsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      }
    );
  }, []);

  return (
    <section className="section bottom-line" ref={sectionRef}>
      <div className="padding-global">
        <div ref={labelRef} style={{ marginBottom: '3rem', opacity: 0 }}>
          <div className="title-desc__label">What Sets Us Apart</div>
        </div>

        <div className="wsa__grid">
          {POINTS.map((point, idx) => (
            <div
              key={idx}
              className="wsa__item"
              ref={el => itemsRef.current[idx] = el}
              style={{ opacity: 0 }}
            >
              <h3 className="wsa__item-title">{point.title}</h3>
              <p className="wsa__item-text">{point.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
