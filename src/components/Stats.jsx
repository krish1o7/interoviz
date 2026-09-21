import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { number: '500+', label: 'Projects completed' },
  { number: '15+', label: 'Years of experience' },
  { number: '80+', label: 'Team members' },
  { number: '30+', label: 'Countries served' },
];

export default function Stats() {
  const itemRefs = useRef([]);

  useEffect(() => {
    itemRefs.current.filter(Boolean).forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
        }
      );
    });
  }, []);

  return (
    <section className="section bottom-line">
      <div className="padding-global">
        <div className="stats-row">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-item"
              ref={el => itemRefs.current[i] = el}
            >
              <div className="stat-item__number">{stat.number}</div>
              <div className="stat-item__label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
