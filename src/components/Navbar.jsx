import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

import logoCompact from '../images/Group 129-1.svg';
import logoExpanded from '../images/Group 128-1 (2).svg';

const NAV_LINKS = ['Home', 'Works', 'Services', 'About Us', 'Academy', 'Contact'];

const MENU_INFO = [
  { title: 'General questions', email: 'info@interoviz.com' },
  { title: 'Join the team', email: 'jobs@interoviz.com' },
  { title: 'Press inquiries', email: 'press@interoviz.com' },
];

export default function Navbar({ onNavigate, currentPath = '/' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filled, setFilled] = useState(false);
  const [logoHover, setLogoHover] = useState(false);
  const menuRef = useRef(null);
  const linkRefs = useRef([]);

  // Fill navbar on scroll
  useEffect(() => {
    const onScroll = () => setFilled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  // Animate menu links
  useEffect(() => {
    if (!menuRef.current) return;
    const spans = linkRefs.current.map(el => el?.querySelector('span')).filter(Boolean);

    if (menuOpen) {
      gsap.to(spans, {
        y: '0%',
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.1,
      });
    } else {
      gsap.to(spans, {
        y: '110%',
        opacity: 0,
        duration: 0.4,
        stagger: 0.04,
        ease: 'power2.in',
      });
    }
  }, [menuOpen]);

  return (
    <>
      {/* Menu overlay */}
      <div className={`fullscreen-menu${menuOpen ? ' open' : ''}`} ref={menuRef}>
        <div className="fullscreen-menu__inner">
          <nav className="fullscreen-menu__links">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link}
                className={`menu-link${(link === 'Home' && currentPath === '/') || (link === 'About Us' && currentPath === '/about') || (link === 'Works' && currentPath === '/works') ? ' active' : ''}`}
                ref={el => linkRefs.current[i] = el}
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  if (link === 'About Us' || link === 'About') {
                    onNavigate?.('/about');
                  } else if (link === 'Works') {
                    onNavigate?.('/works');
                  } else if (link === 'Home') {
                    onNavigate?.('/');
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                <span>{link}</span>
              </a>
            ))}
          </nav>

          <div className="fullscreen-menu__info">
            {MENU_INFO.map(({ title, email }) => (
              <div key={title} className="menu-info-block">
                <div className="menu-info-block__title">{title}</div>
                <a href={`mailto:${email}`} className="menu-info-block__email">{email}</a>
              </div>
            ))}

            <div className="menu-info-block" style={{ marginTop: '1rem' }}>
              <div className="menu-info-block__title">Ready to discuss your next project?</div>
              <p style={{ fontSize: '0.9rem', opacity: 0.65, marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Fill out the brief form below and we will get back to you shortly to discuss how we can best support your vision.
              </p>
              <AnimatedButton label="Fill Form" />
            </div>
          </div>
        </div>
      </div>

      {/* Navbar bar */}
      <header className={`navbar${filled ? ' filled' : ''}`}>
        <a
          className="navbar__logo"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate?.('/');
          }}
          onMouseEnter={() => setLogoHover(true)}
          onMouseLeave={() => setLogoHover(false)}
          onFocus={() => setLogoHover(true)}
          onBlur={() => setLogoHover(false)}
          aria-label="Interoviz - Defining Tomorrow"
          style={{ cursor: 'pointer', textDecoration: 'none' }}
        >
          <div className={`navbar__logo-wrap${logoHover ? ' is-hovered' : ''}`}>
            {/* Compact IV Monogram (Default State) */}
            <img
              src={logoCompact}
              alt="Interoviz IV"
              className="navbar__logo-iv"
            />
            {/* Full Expanded Logo Name (Revealed on Hover) */}
            <img
              src={logoExpanded}
              alt="Interoviz - Defining Tomorrow"
              className="navbar__logo-full"
            />
          </div>
        </a>

        <button
          className={`navbar__hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </header>
    </>
  );
}

// ── Reusable animated button ────────────────────────────────
export function AnimatedButton({ label, onClick, variant = 'primary' }) {
  return (
    <button className="btn" onClick={onClick}>
      <span className="btn__text">
        <span>{label}</span>
      </span>
      <span className="btn__arrow">
        <svg viewBox="0 0 20 14" strokeWidth="1.5">
          <path d="M1 7H19M13 1L19 7L13 13" />
        </svg>
      </span>
    </button>
  );
}
