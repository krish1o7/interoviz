export default function InlineVideo({ onOffice }) {
  return (
    <section style={{ position: 'relative', padding: 0 }}>
      <div className="inline-video">
        {/* Background photo (works as poster / fallback) */}
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920&q=80&auto=format&fit=crop"
          alt="Modern office space"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />

        {/* Video overlay – plays on top if loaded */}
        <video
          className="inline-video__video"
          autoPlay
          loop
          muted
          playsInline
          style={{ position: 'relative', zIndex: 1 }}
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-interior-of-a-modern-open-space-office-building-8146/1080p.mp4"
            type="video/mp4"
          />
        </video>

        <div className="inline-video__gradient" style={{ zIndex: 2 }} />

        <div className="inline-video__btn" style={{ zIndex: 3 }}>
          <button className="btn" onClick={onOffice}>
            <span className="btn__text"><span>Office tour</span></span>
            <span className="btn__arrow">
              <svg viewBox="0 0 20 14" strokeWidth="1.5" stroke="currentColor" fill="none">
                <path d="M1 7H19M13 1L19 7L13 13" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
