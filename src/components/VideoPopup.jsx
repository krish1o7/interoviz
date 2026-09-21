export default function VideoPopup({ open, src, onClose }) {
  return (
    <div
      className={`video-popup-overlay${open ? ' open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <button className="video-popup__close" onClick={onClose} aria-label="Close video">
        <svg viewBox="0 0 16 16" strokeWidth="1.5">
          <path d="M1 1L15 15M15 1L1 15" />
        </svg>
      </button>

      <div className="video-popup__inner">
        {open && src && (
          <iframe
            src={src}
            allow="autoplay; fullscreen"
            allowFullScreen
            title="Video"
          />
        )}
      </div>
    </div>
  );
}
