import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

import logoExpanded from '../images/Group 128-1 (2).svg';

const NAV_LINKS = ['Home', 'Works', 'Services', 'About Us', 'Contact'];

const MENU_INFO = [
  {
    title: 'General Questions and Enquiries',
    emails: ['Akshay@Interoviz.com', 'Kapil@Interoviz.com'],
  },
  {
    title: 'Become Part of the Studio',
    emails: ['Studio@Interoviz.com'],
  },
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
            {MENU_INFO.map(({ title, emails }) => (
              <div key={title} className="menu-info-block">
                <div className="menu-info-block__title">{title}</div>
                <div className="menu-info-block__emails">
                  {emails.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="menu-info-block__email"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </div>
            ))}

            <div className="menu-cta">
              <h3 className="menu-cta__title">READY TO DISCUSS YOUR NEXT PROJECT?</h3>
              <p className="menu-cta__desc">
                Fill out the brief form below and we will get back to you shortly to discuss how we can best support your vision.
              </p>
              <AnimatedButton
                label="Fill Form"
                size="large"
                onClick={() => {
                  setMenuOpen(false);
                  onNavigate?.('/contact');
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navbar bar */}
      <header className={`navbar${filled ? ' filled' : ''}${menuOpen ? ' menu-open' : ''}`}>
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
          <div className={`navbar__logo-lockup${logoHover ? ' is-unfolded' : ''}`}>
            {/* Stationary Anchored "IV" Monogram (Group 129-1) */}
            <div className="navbar__logo-iv" aria-hidden="true">
              <svg viewBox="0 0 506 288" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M353.588 288H246.07L97.0815 0H204.599L353.588 288Z" fill="white" />
                <path d="M332.469 288H353.586L505.299 0H484.181L332.469 288Z" fill="white" />
                <path d="M93.7148 101.06V287.969H0V0H93.3475L0 101.06H93.7148Z" fill="white" />
              </svg>
            </div>

            {/* Telescopic Architectural Drawer (Slides out smoothly from behind IV) */}
            <div className="navbar__logo-drawer">
              <div className="navbar__logo-drawer-inner">
                <img
                  src={logoExpanded}
                  alt="Interoviz - Defining Tomorrow"
                  className="navbar__logo-brand-img"
                />
              </div>
            </div>
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
export function AnimatedButton({ label, onClick, variant = 'primary', size = 'normal', className = '' }) {
  const isLarge = size === 'large' || variant === 'large';
  return (
    <button className={`btn${isLarge ? ' btn--large' : ''} ${className}`.trim()} onClick={onClick}>
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

