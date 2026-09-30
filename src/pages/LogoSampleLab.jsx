import React, { useState, useEffect } from 'react';
import './LogoSampleLab.css';
import logoExpanded from '../images/Group 128-1 (2).svg';

// ── Exact SVG Monogram "IV" (Group 129-1) ──────────────────────
export function IvMonogram({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 506 288"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block', height: '100%', width: 'auto', ...style }}
      aria-label="Interoviz IV monogram"
    >
      {/* V glyph paths */}
      <path d="M353.588 288H246.07L97.0815 0H204.599L353.588 288Z" fill="currentColor" />
      <path d="M332.469 288H353.586L505.299 0H484.181L332.469 288Z" fill="currentColor" />
      {/* I glyph path */}
      <path d="M93.7148 101.06V287.969H0V0H93.3475L0 101.06H93.7148Z" fill="currentColor" />
    </svg>
  );
}

// ── Interactive Logo Sample Lab Page ──────────────────────────
export default function LogoSampleLab({ onNavigate }) {
  const [theme, setTheme] = useState('dark');
  const [slowMo, setSlowMo] = useState(false);
  const [pinned, setPinned] = useState({ 1: false, 2: false, 3: false, 4: false });
  const [hovered, setHovered] = useState({ 1: false, 2: false, 3: false, 4: false });
  const [simSample, setSimSample] = useState(1);
  const [simHover, setSimHover] = useState(false);
  const [selectedSample, setSelectedSample] = useState(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const togglePin = (num) => {
    setPinned((prev) => ({ ...prev, [num]: !prev[num] }));
  };

  const isSampleActive = (num) => pinned[num] || hovered[num];

  const handleCopyPreference = () => {
    const text = `I prefer Sample ${selectedSample} for the Interoviz logo transition.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const speedStyle = {
    '--trans-speed': slowMo ? '1.4s' : '0.55s',
  };

  return (
    <div className={`logo-lab logo-lab--${theme}`} style={speedStyle}>
      {/* ── TOP NAV / RETURN BAR ──────────────────────────────── */}
      <div style={{ maxWidth: 1100, margin: '0 auto 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          className="logo-lab__btn"
          onClick={() => onNavigate?.('/')}
          style={{ textDecoration: 'none' }}
        >
          ← Return to Main Website
        </button>
        <span style={{ fontSize: '0.78rem', color: '#c85a32', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>
          Interactive Review Sandbox
        </span>
      </div>

      {/* ── HEADER ───────────────────────────────────────────── */}
      <header className="logo-lab__header">
        <div className="logo-lab__tag">
          <span className="logo-lab__tag-dot" />
          <span>Motion Choreography Laboratory</span>
        </div>
        <h1 className="logo-lab__title">Logo Transition Samples</h1>
        <p className="logo-lab__desc">
          Exploration of the <strong>stationary IV monogram</strong> transition.
          In all variations below, the IV monogram mark <strong>never moves, shifts, or splits</strong>.
          Instead, the full studio brand name and descriptor smoothly glide out directly from the stationary IV mark.
        </p>

        {/* ── TOOLBAR ──────────────────────────────────────────── */}
        <div className="logo-lab__toolbar">
          {/* Background Theme Switcher */}
          <div className="logo-lab__toolbar-group">
            <span className="logo-lab__label">Background:</span>
            <button
              className={`logo-lab__btn ${theme === 'dark' ? 'logo-lab__btn--active' : ''}`}
              onClick={() => setTheme('dark')}
            >
              Dark Pitch
            </button>
            <button
              className={`logo-lab__btn ${theme === 'concrete' ? 'logo-lab__btn--active' : ''}`}
              onClick={() => setTheme('concrete')}
            >
              Architectural Charcoal
            </button>
            <button
              className={`logo-lab__btn ${theme === 'glass' ? 'logo-lab__btn--active' : ''}`}
              onClick={() => setTheme('glass')}
            >
              Navbar Glass
            </button>
            <button
              className={`logo-lab__btn ${theme === 'light' ? 'logo-lab__btn--active' : ''}`}
              onClick={() => setTheme('light')}
            >
              Light Paper
            </button>
          </div>

          {/* Speed Toggle */}
          <div className="logo-lab__toolbar-group">
            <span className="logo-lab__label">Speed:</span>
            <button
              className={`logo-lab__btn ${!slowMo ? 'logo-lab__btn--active' : ''}`}
              onClick={() => setSlowMo(false)}
            >
              1.0x (0.55s Real)
            </button>
            <button
              className={`logo-lab__btn ${slowMo ? 'logo-lab__btn--active' : ''}`}
              onClick={() => setSlowMo(true)}
            >
              0.4x Slow Motion
            </button>
          </div>
        </div>
      </header>

      {/* ── SAMPLES GRID ──────────────────────────────────────── */}
      <section className="logo-lab__grid">
        {/* ── SAMPLE 1 ────────────────────────────────────────── */}
        <div className="logo-card">
          <div className="logo-card__head">
            <div>
              <div className="logo-card__number">Sample 01 • Recommended</div>
              <h2 className="logo-card__title">Telescopic Architectural Drawer</h2>
            </div>
            <span className="logo-card__badge">Pure & Clean</span>
          </div>

          <div
            className="logo-card__stage"
            onMouseEnter={() => setHovered((h) => ({ ...h, 1: true }))}
            onMouseLeave={() => setHovered((h) => ({ ...h, 1: false }))}
          >
            <div className={`sample-1 ${isSampleActive(1) ? 'is-active' : ''}`}>
              {/* Stationary IV */}
              <div className="sample-1__iv">
                <IvMonogram />
              </div>
              {/* Drawer that slides out from behind the IV */}
              <div className="sample-1__drawer">
                <div className="sample-1__inner">
                  <img
                    src={logoExpanded}
                    alt="Interoviz Defining Tomorrow"
                    className="sample-1__brand-svg"
                  />
                </div>
              </div>
            </div>
            <span className="logo-card__stage-hint">
              {isSampleActive(1) ? 'Hovering (Active)' : 'Hover or Pin to Preview'}
            </span>
          </div>

          <div className="logo-card__body">
            <p className="logo-card__desc">
              The <strong>IV monogram is 100% anchored</strong> at the origin.
              On hover, an overflow-hidden clipping container opens to the right, and the full brand lockup
              (<code>INTEROVIZ • DEFINING TOMORROW</code>) glides smoothly out from behind the IV monogram.
            </p>

            <div className="logo-card__specs">
              <div className="logo-card__spec-item">
                <span>Curve:</span>
                <strong>Quintic Ease-Out</strong>
              </div>
              <div className="logo-card__spec-item">
                <span>Duration:</span>
                <strong>{slowMo ? '1.40s' : '0.55s'}</strong>
              </div>
              <div className="logo-card__spec-item">
                <span>Monogram:</span>
                <strong>Zero drift / Fixed</strong>
              </div>
              <div className="logo-card__spec-item">
                <span>Feel:</span>
                <strong>Architectural, Disciplined</strong>
              </div>
            </div>

            <div className="logo-card__footer">
              <button
                className={`logo-lab__btn ${pinned[1] ? 'logo-lab__btn--active' : ''}`}
                onClick={() => togglePin(1)}
              >
                {pinned[1] ? '📌 Unpin State' : '📌 Pin Open'}
              </button>
              <button
                className={`logo-lab__btn ${selectedSample === 1 ? 'logo-lab__btn--active' : ''}`}
                onClick={() => setSelectedSample(1)}
              >
                {selectedSample === 1 ? '✓ Selected as Favorite' : 'Choose Sample 1'}
              </button>
            </div>
          </div>
        </div>

        {/* ── SAMPLE 2 ────────────────────────────────────────── */}
        <div className="logo-card">
          <div className="logo-card__head">
            <div>
              <div className="logo-card__number">Sample 02</div>
              <h2 className="logo-card__title">Editorial Divider & Staggered Reveal</h2>
            </div>
            <span className="logo-card__badge">High-End Studio</span>
          </div>

          <div
            className="logo-card__stage"
            onMouseEnter={() => setHovered((h) => ({ ...h, 2: true }))}
            onMouseLeave={() => setHovered((h) => ({ ...h, 2: false }))}
          >
            <div className={`sample-2 ${isSampleActive(2) ? 'is-active' : ''}`}>
              {/* Stationary IV */}
              <div className="sample-2__iv">
                <IvMonogram />
              </div>

              {/* Vertical Architectural Divider Line */}
              <div className="sample-2__line" />

              {/* Text drawer with staggered title + subtitle */}
              <div className="sample-2__text-wrap">
                <div className="sample-2__title">Interoviz</div>
                <div className="sample-2__subtitle">Defining Tomorrow</div>
              </div>
            </div>
            <span className="logo-card__stage-hint">
              {isSampleActive(2) ? 'Hovering (Active)' : 'Hover or Pin to Preview'}
            </span>
          </div>

          <div className="logo-card__body">
            <p className="logo-card__desc">
              Inspired by luxury architectural monographs. A delicate terracotta hairline divider draws in,
              followed by <code>INTEROVIZ</code> sliding out horizontally and <code>DEFINING TOMORROW</code> fading up with a micro-stagger.
            </p>

            <div className="logo-card__specs">
              <div className="logo-card__spec-item">
                <span>Divider:</span>
                <strong>Terracotta Hairline</strong>
              </div>
              <div className="logo-card__spec-item">
                <span>Stagger:</span>
                <strong>+0.08s Subtitle</strong>
              </div>
              <div className="logo-card__spec-item">
                <span>Typography:</span>
                <strong>Wide Architectural Tracking</strong>
              </div>
              <div className="logo-card__spec-item">
                <span>Feel:</span>
                <strong>Bespoke Studio Monograph</strong>
              </div>
            </div>

            <div className="logo-card__footer">
              <button
                className={`logo-lab__btn ${pinned[2] ? 'logo-lab__btn--active' : ''}`}
                onClick={() => togglePin(2)}
              >
                {pinned[2] ? '📌 Unpin State' : '📌 Pin Open'}
              </button>
              <button
                className={`logo-lab__btn ${selectedSample === 2 ? 'logo-lab__btn--active' : ''}`}
                onClick={() => setSelectedSample(2)}
              >
                {selectedSample === 2 ? '✓ Selected as Favorite' : 'Choose Sample 2'}
              </button>
            </div>
          </div>
        </div>

        {/* ── SAMPLE 3 ────────────────────────────────────────── */}
        <div className="logo-card">
          <div className="logo-card__head">
            <div>
              <div className="logo-card__number">Sample 03</div>
              <h2 className="logo-card__title">Cinematic Depth-of-Field & Focus</h2>
            </div>
            <span className="logo-card__badge">3D Visualization</span>
          </div>

          <div
            className="logo-card__stage"
            onMouseEnter={() => setHovered((h) => ({ ...h, 3: true }))}
            onMouseLeave={() => setHovered((h) => ({ ...h, 3: false }))}
          >
            <div className={`sample-3 ${isSampleActive(3) ? 'is-active' : ''}`}>
              {/* Stationary IV */}
              <div className="sample-3__iv">
                <IvMonogram />
              </div>
              {/* Optical Blur Drawer */}
              <div className="sample-3__drawer">
                <img
                  src={logoExpanded}
                  alt="Interoviz Defining Tomorrow"
                  className="sample-3__brand-svg"
                />
              </div>
            </div>
            <span className="logo-card__stage-hint">
              {isSampleActive(3) ? 'Hovering (Active)' : 'Hover or Pin to Preview'}
            </span>
          </div>

          <div className="logo-card__body">
            <p className="logo-card__desc">
              Emphasizes INTEROVIZ's expertise in CGI rendering and cinematic camera optics.
              As the name emerges from behind the IV monogram, it passes from a soft lens blur (<code>filter: blur(8px)</code>) into tack-sharp focus.
            </p>

            <div className="logo-card__specs">
              <div className="logo-card__spec-item">
                <span>Optics:</span>
                <strong>Optical Lens Depth (Blur → Focus)</strong>
              </div>
              <div className="logo-card__spec-item">
                <span>Monogram Glow:</span>
                <strong>Subtle Terracotta Ambient</strong>
              </div>
              <div className="logo-card__spec-item">
                <span>Duration:</span>
                <strong>{slowMo ? '1.50s' : '0.60s'}</strong>
              </div>
              <div className="logo-card__spec-item">
                <span>Feel:</span>
                <strong>Atmospheric, Cinematic</strong>
              </div>
            </div>

            <div className="logo-card__footer">
              <button
                className={`logo-lab__btn ${pinned[3] ? 'logo-lab__btn--active' : ''}`}
                onClick={() => togglePin(3)}
              >
                {pinned[3] ? '📌 Unpin State' : '📌 Pin Open'}
              </button>
              <button
                className={`logo-lab__btn ${selectedSample === 3 ? 'logo-lab__btn--active' : ''}`}
                onClick={() => setSelectedSample(3)}
              >
                {selectedSample === 3 ? '✓ Selected as Favorite' : 'Choose Sample 3'}
              </button>
            </div>
          </div>
        </div>

        {/* ── SAMPLE 4 ────────────────────────────────────────── */}
        <div className="logo-card">
          <div className="logo-card__head">
            <div>
              <div className="logo-card__number">Sample 04</div>
              <h2 className="logo-card__title">Kinetic Horizon Baseline Slide</h2>
            </div>
            <span className="logo-card__badge">Modern Minimal</span>
          </div>

          <div
            className="logo-card__stage"
            onMouseEnter={() => setHovered((h) => ({ ...h, 4: true }))}
            onMouseLeave={() => setHovered((h) => ({ ...h, 4: false }))}
          >
            <div className={`sample-4 ${isSampleActive(4) ? 'is-active' : ''}`}>
              {/* Stationary IV */}
              <div className="sample-4__iv">
                <IvMonogram />
              </div>
              {/* Drawer */}
              <div className="sample-4__drawer">
                <div className="sample-4__content">
                  <img
                    src={logoExpanded}
                    alt="Interoviz Defining Tomorrow"
                    style={{ height: 24, width: 'auto', display: 'block', color: 'currentColor' }}
                  />
                </div>
                {/* Terracotta Horizon line */}
                <div className="sample-4__line" />
              </div>
            </div>
            <span className="logo-card__stage-hint">
              {isSampleActive(4) ? 'Hovering (Active)' : 'Hover or Pin to Preview'}
            </span>
          </div>

          <div className="logo-card__body">
            <p className="logo-card__desc">
              Adds an architectural horizon guideline along the baseline.
              As the name slides from the IV mark, a subtle terracotta line draws across beneath it to ground the composition.
            </p>

            <div className="logo-card__specs">
              <div className="logo-card__spec-item">
                <span>Baseline:</span>
                <strong>Expanding Horizon Rule</strong>
              </div>
              <div className="logo-card__spec-item">
                <span>Physics:</span>
                <strong>Snappy Spring Decel</strong>
              </div>
              <div className="logo-card__spec-item">
                <span>Accent:</span>
                <strong>#c85a32 Terracotta</strong>
              </div>
              <div className="logo-card__spec-item">
                <span>Feel:</span>
                <strong>Contemporary, Structural</strong>
              </div>
            </div>

            <div className="logo-card__footer">
              <button
                className={`logo-lab__btn ${pinned[4] ? 'logo-lab__btn--active' : ''}`}
                onClick={() => togglePin(4)}
              >
                {pinned[4] ? '📌 Unpin State' : '📌 Pin Open'}
              </button>
              <button
                className={`logo-lab__btn ${selectedSample === 4 ? 'logo-lab__btn--active' : ''}`}
                onClick={() => setSelectedSample(4)}
              >
                {selectedSample === 4 ? '✓ Selected as Favorite' : 'Choose Sample 4'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE NAVBAR SIMULATOR ─────────────────────────────── */}
      <section className="logo-lab__sim-section">
        <div className="logo-lab__sim-header">
          <h3 className="logo-lab__sim-title">Live Navbar Context Simulator</h3>
          <p className="logo-lab__sim-desc">
            Test how each variation looks and behaves directly inside the actual navigation header bar:
          </p>
          <div className="logo-lab__toolbar-group">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                className={`logo-lab__btn ${simSample === num ? 'logo-lab__btn--active' : ''}`}
                onClick={() => setSimSample(num)}
              >
                Simulate Sample {num}
              </button>
            ))}
          </div>
        </div>

        {/* Real Navbar Bar Simulator */}
        <div className="logo-lab__sim-bar">
          {/* Logo Area */}
          <div
            onMouseEnter={() => setSimHover(true)}
            onMouseLeave={() => setSimHover(false)}
            style={{ cursor: 'pointer', padding: '6px 0' }}
          >
            {simSample === 1 && (
              <div className={`sample-1 ${simHover ? 'is-active' : ''}`}>
                <div className="sample-1__iv">
                  <IvMonogram />
                </div>
                <div className="sample-1__drawer">
                  <div className="sample-1__inner">
                    <img src={logoExpanded} alt="Interoviz" className="sample-1__brand-svg" />
                  </div>
                </div>
              </div>
            )}

            {simSample === 2 && (
              <div className={`sample-2 ${simHover ? 'is-active' : ''}`}>
                <div className="sample-2__iv">
                  <IvMonogram />
                </div>
                <div className="sample-2__line" />
                <div className="sample-2__text-wrap">
                  <div className="sample-2__title">Interoviz</div>
                  <div className="sample-2__subtitle">Defining Tomorrow</div>
                </div>
              </div>
            )}

            {simSample === 3 && (
              <div className={`sample-3 ${simHover ? 'is-active' : ''}`}>
                <div className="sample-3__iv">
                  <IvMonogram />
                </div>
                <div className="sample-3__drawer">
                  <img src={logoExpanded} alt="Interoviz" className="sample-3__brand-svg" />
                </div>
              </div>
            )}

            {simSample === 4 && (
              <div className={`sample-4 ${simHover ? 'is-active' : ''}`}>
                <div className="sample-4__iv">
                  <IvMonogram />
                </div>
                <div className="sample-4__drawer">
                  <div className="sample-4__content">
                    <img src={logoExpanded} alt="Interoviz" style={{ height: 24, width: 'auto' }} />
                  </div>
                  <div className="sample-4__line" />
                </div>
              </div>
            )}
          </div>

          {/* Dummy Nav Links */}
          <div className="logo-lab__sim-navlinks">
            <span>Home</span>
            <span>Works</span>
            <span>Services</span>
            <span>About Us</span>
            <span>Contact</span>
          </div>

          {/* Dummy Hamburger */}
          <div className="logo-lab__sim-burger">
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>

      {/* ── DESIGN INPUT & RECOMMENDATIONS ────────────────────── */}
      <section className="logo-lab__advice">
        <div className="logo-lab__advice-title">
          <span>💡</span>
          <span>Motion Design Input & Recommendations From Our Side</span>
        </div>
        <div className="logo-lab__advice-list">
          <div className="logo-lab__advice-card">
            <h4>1. Stationary Anchor Principle</h4>
            <p>
              Your feedback is 100% spot-on: keeping the IV monogram locked firmly at x=0 prevents visual disorientation.
              The viewer's eye rests on the recognizable emblem while the secondary brand information effortlessly expands.
            </p>
          </div>
          <div className="logo-lab__advice-card">
            <h4>2. Sample 1 vs. Sample 2</h4>
            <p>
              <strong>Sample 1</strong> is the cleanest and most faithful to the brand vector files.
              <strong>Sample 2</strong> adds an architectural divider line that gives a crisp editorial distinction between the monogram and the wordmark.
            </p>
          </div>
          <div className="logo-lab__advice-card">
            <h4>3. Mobile Screen Gracefulness</h4>
            <p>
              On mobile viewports (&lt; 600px), we can configure the logo to either remain in the compact IV state to save crucial navbar real estate,
              or smoothly expand to a 140px maximum width on touch.
            </p>
          </div>
        </div>

        {/* Action Bar */}
        <div style={{ marginTop: 24, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            className="logo-lab__btn logo-lab__btn--active"
            onClick={handleCopyPreference}
          >
            {copied ? '✓ Copied to Clipboard!' : `I prefer Sample ${selectedSample} (Click to copy feedback)`}
          </button>
          <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)' }}>
            Tell us which sample you like best, or any tweaks you want!
          </span>
        </div>
      </section>
    </div>
  );
}
