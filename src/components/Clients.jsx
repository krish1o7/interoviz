import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ── IMPORT TRANSPARENT WHITE MONOCHROME LOGOS (BrickVisual style) ──
import sodexo from '../images/clients/white/sodexo_225.png';
import jwMarriott from '../images/clients/white/JWMarriott_512w_225.png';
import one8 from '../images/clients/white/one8-logo-png_seeklogo-547320_225.png';
import haldiram from '../images/clients/white/Haldiram-logo_225.png';
import byob from '../images/clients/white/byob_225.png';
import hyatt from '../images/clients/white/Hyatt-Regency-Logo-640x400_225.png';
import nbc from '../images/clients/white/nbc_225.png';
import studioPraxis from '../images/clients/white/studiopraxis_logo_225.png';
import pepperfry from '../images/clients/white/w38-pf-logo-desktop-512px_225.png';
import manupEstate from '../images/clients/white/manup-estate_225.png';
import reclinersIndia from '../images/clients/white/Recliners-India-Black_225.png';
import aceGolfing from '../images/clients/white/ace-golfing_225.png';
import auxHome from '../images/clients/white/Asset2_225.png';
import unBox from '../images/clients/white/UnBox_225.png';
import tisLiving from '../images/clients/white/TIS_225.png';
import unifiedWorkplace from '../images/clients/white/unified_225.png';
import asds from '../images/clients/white/asds_225.png';
import awe from '../images/clients/white/awe_225.png';
import kuvalyam from '../images/clients/white/KuvalyamLogo_225.png';
import queo from '../images/clients/white/queo-logo_225.png';

gsap.registerPlugin(ScrollTrigger);

// ── STATS AT THE TOP (matching BrickVisual about#clients) ───────
const CLIENT_STATS = [
  { value: 480, label: 'Different Client' },
  { value: 7732, label: 'Delivered Projects' },
  { value: 16500, label: 'Delivered Images and Movies' },
];

// ── CLIENT LOGOS LIST ───────────────────────────────────────────
// Transparent monochrome white logos on pure dark background
const CLIENT_LOGOS = [
  { id: 'sodexo', name: 'Sodexo', logo: sodexo },
  { id: 'jw-marriott', name: 'JW Marriott', logo: jwMarriott },
  { id: 'one8', name: 'one8', logo: one8 },
  { id: 'haldiram', name: "Haldiram's", logo: haldiram },
  { id: 'byob', name: 'BYOB', logo: byob },
  { id: 'hyatt', name: 'Hyatt Regency', logo: hyatt },
  { id: 'nbc', name: 'Nothing Before Coffee', logo: nbc },
  { id: 'studio-praxis', name: 'Studio Praxis', logo: studioPraxis },
  { id: 'pepperfry', name: 'Pepperfry', logo: pepperfry },
  { id: 'manup-estate', name: 'Manup Estate', logo: manupEstate },
  { id: 'recliners-india', name: 'Recliners India', logo: reclinersIndia },
  { id: 'ace-golfing', name: 'Ace Golfing', logo: aceGolfing },
  { id: 'aux-home', name: 'AUX Home', logo: auxHome },
  { id: 'unbox', name: 'UnBox! Architecture', logo: unBox },
  { id: 'tis-living', name: 'TIS Living', logo: tisLiving },
  { id: 'unified-workplace', name: 'Unified Workplace', logo: unifiedWorkplace },
  { id: 'asds', name: 'asds design studio', logo: asds },
  { id: 'awe', name: 'AWE Residences', logo: awe },
  { id: 'kuvalyam', name: 'Kuvalyam', logo: kuvalyam },
  { id: 'queo', name: 'Queo Bath Lounges', logo: queo },

  // ── RESERVED SPACES FOR MORE BRANDS (customizable!) ───────────
  // { id: 'custom-slot-1', name: 'Add Brand', isPlaceholder: true },
  // { id: 'custom-slot-2', name: 'Add Brand', isPlaceholder: true },
  // { id: 'custom-slot-3', name: 'Add Brand', isPlaceholder: true },
  // { id: 'custom-slot-4', name: 'Add Brand', isPlaceholder: true },
];

export default function Clients({ id = 'clients' }) {
  const sectionRef = useRef(null);
  const statsRefs = useRef([]);
  const gridRef = useRef(null);

  // Animated stat counters
  useEffect(() => {
    statsRefs.current.forEach((el, index) => {
      if (!el) return;
      const target = CLIENT_STATS[index].value;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          if (el) el.textContent = Math.floor(obj.val).toLocaleString();
        },
      });
    });

    // Animate logos appearing with stagger
    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll('.client-logo-item, .client-logo-placeholder');
      gsap.fromTo(
        items,
        { opacity: 0, y: 15 },
        {
          opacity: 0.85,
          y: 0,
          duration: 0.6,
          stagger: {
            amount: 0.8,
            from: 'start',
          },
          ease: 'power2.out',
          onComplete: () => {
            items.forEach((item) => {
              gsap.set(item, { clearProps: 'opacity' });
            });
          },
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  return (
    <section id={id} className="clients-section section bottom-line" ref={sectionRef}>
      <div className="padding-global">
        {/* Header subtitle */}
        <div className="clients-header">
          <div className="clients-subtitle">throughout the years.</div>

          {/* 3 Stats from BrickVisual reference */}
          <div className="clients-stats-grid">
            {CLIENT_STATS.map((stat, i) => (
              <div key={stat.label} className="clients-stat-col">
                <div
                  className="clients-stat-number"
                  ref={el => statsRefs.current[i] = el}
                >
                  0
                </div>
                <div className="clients-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 8-Column Pure Monochrome Brand Logos (no white cards) */}
        <div className="client-logos-grid" ref={gridRef}>
          {CLIENT_LOGOS.map((item) => {
            if (item.isPlaceholder) {
              return (
                <div
                  key={item.id}
                  className="client-logo-item client-logo-placeholder"
                  title="Reserved space for your brand"
                >
                  <span className="placeholder-plus">+</span>
                  <span className="placeholder-text">Add Brand</span>
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className="client-logo-item"
                title={item.name}
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className="client-logo-img"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>

        {/* Helpful note for adding more brands */}
  
      </div>
    </section>
  );
}
