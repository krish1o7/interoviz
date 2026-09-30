import { useState, useEffect } from 'react';
import FooterContactForm from '../components/FooterContactForm';
import Footer from '../components/Footer';

export default function FormPreviewPage({ onNavigate }) {
  const [titleVariant, setTitleVariant] = useState('accent');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#ffffff', paddingTop: '100px' }}>
      {/* Top Bar */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto 30px',
          padding: '0 5vw',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <button
          onClick={() => onNavigate?.('/')}
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-body)',
          }}
        >
          ← Return to Main Website
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)' }}>
            Title Color Variant:
          </span>
          <button
            onClick={() => setTitleVariant('accent')}
            style={{
              background: titleVariant === 'accent' ? 'var(--color-accent, #b95746)' : 'rgba(255,255,255,0.06)',
              border: '1px solid',
              borderColor: titleVariant === 'accent' ? 'var(--color-accent, #b95746)' : 'rgba(255,255,255,0.12)',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.82rem',
            }}
          >
            Terracotta Accent Title
          </button>
          <button
            onClick={() => setTitleVariant('white')}
            style={{
              background: titleVariant === 'white' ? 'var(--color-accent, #b95746)' : 'rgba(255,255,255,0.06)',
              border: '1px solid',
              borderColor: titleVariant === 'white' ? 'var(--color-accent, #b95746)' : 'rgba(255,255,255,0.12)',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.82rem',
            }}
          >
            Crisp White Title
          </button>
        </div>
      </div>

      {/* Header Info */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 40px', padding: '0 5vw' }}>
        <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-accent, #b95746)', fontWeight: 600, marginBottom: 8 }}>
          Design Reference & Live Testing Sandbox
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 600, margin: '0 0 12px' }}>
          Footer Project Inquiry Form
        </h1>
        <p style={{ maxWidth: '780px', color: 'rgba(255,255,255,0.7)', fontSize: '0.98rem', lineHeight: 1.6, margin: 0 }}>
          Interactive reference implementation of the project inquiry form for the footer.
          Built using the website's dark architectural theme (<code style={{ color: '#b95746' }}>#0a0a0a</code>),
          the studio's signature typeface (<code style={{ color: '#b95746' }}>Syne</code> and <code style={{ color: '#b95746' }}>Work Sans</code>),
          and the secondary terracotta accent color (<code style={{ color: '#b95746' }}>#b95746</code>).
        </p>
      </div>

      {/* Form Component Under Review */}
      <div style={{ background: '#111111', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <FooterContactForm titleVariant={titleVariant} onNavigate={onNavigate} />
      </div>

      {/* In-Context Footer Preview */}
      <div style={{ maxWidth: '1200px', margin: '60px auto 20px', padding: '0 5vw' }}>
        <div style={{ fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-accent, #b95746)', fontWeight: 600, marginBottom: 8 }}>
          Full In-Context Preview
        </div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 600, margin: 0 }}>
          How it connects with the rest of the Footer below it:
        </h3>
      </div>

      {/* Current Footer Information */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
