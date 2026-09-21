import React, { useState, useRef } from 'react';
import { THREE_D_MODELS } from '../data/modelsData';

export default function ThreeDObjectGallery() {
  const [models, setModels] = useState(THREE_D_MODELS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [modalModel, setModalModel] = useState(null);
  const [modalAutoRotate, setModalAutoRotate] = useState(true);
  const [modalLighting, setModalLighting] = useState('neutral');
  const [dragOverCardId, setDragOverCardId] = useState(null);

  const globalFileInputRef = useRef(null);
  const cardFileInputRef = useRef(null);
  const targetSlotIdRef = useRef(null);
  const modalViewerRef = useRef(null);

  const categories = ['All', 'Architecture', 'Interior', 'Furniture & Product', 'Real Estate'];

  // Handle uploading a .glb file into a specific slot or new card
  const handleFileLoad = (file, slotId = null) => {
    if (!file) return;
    const is3D = file.name.endsWith('.glb') || file.name.endsWith('.gltf');
    if (!is3D) {
      alert('Please select a 3D model in .glb or .gltf format.');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    const formattedTitle = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

    if (slotId) {
      // Update the specific slot
      setModels((prev) =>
        prev.map((item) =>
          item.id === slotId
            ? {
                ...item,
                title: formattedTitle,
                modelUrl: objectUrl,
                isLoaded: true,
              }
            : item
        )
      );
    } else {
      // Add as a new custom card
      const newCard = {
        id: `custom-${Date.now()}`,
        title: formattedTitle,
        category: 'Architecture',
        modelUrl: objectUrl,
        location: 'Custom Spatial Study',
        year: new Date().getFullYear().toString(),
        description: 'Bespoke 3D spatial exploration rendered in real-time with physically based shading and 360° orbit.',
        tags: ['Interactive', '3D Study'],
        isLoaded: true,
      };
      setModels((prev) => [newCard, ...prev]);
    }
  };

  const triggerSlotUpload = (slotId) => {
    targetSlotIdRef.current = slotId;
    cardFileInputRef.current?.click();
  };

  const onCardFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileLoad(e.target.files[0], targetSlotIdRef.current);
      e.target.value = '';
    }
  };

  const onGlobalFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileLoad(e.target.files[0]);
      e.target.value = '';
    }
  };

  // Card drop handler
  const handleCardDrop = (e, slotId) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverCardId(null);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileLoad(e.dataTransfer.files[0], slotId);
    }
  };

  const filteredModels =
    activeCategory === 'All'
      ? models
      : models.filter((m) => m.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="threed-obj-gallery">
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={globalFileInputRef}
        onChange={onGlobalFileInput}
        accept=".glb,.gltf"
        style={{ display: 'none' }}
      />
      <input
        type="file"
        ref={cardFileInputRef}
        onChange={onCardFileInput}
        accept=".glb,.gltf"
        style={{ display: 'none' }}
      />

      {/* ── Gallery Header & Filter ── */}
      <div className="threed-obj-header">
        <div>
          <div className="threed-obj-tag">
            <span className="threed-obj-dot" />
            <span>INTERACTIVE 3D SPATIAL STUDIES</span>
          </div>
          <h2 className="threed-obj-title">Sculptural Form & Spatial Exploration</h2>
          <p className="threed-obj-desc">
            Experience architectural geometry in real-time. Orbit 360°, examine materiality, and explore spatial
            compositions from any vantage point.
          </p>
        </div>

        <div className="threed-obj-header-actions">
          <button
            className="threed-obj-upload-btn"
            onClick={() => globalFileInputRef.current?.click()}
            title="Import a 3D model study"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Import 3D Study</span>
          </button>
        </div>
      </div>

      {/* ── Filter Pills ── */}
      <div className="threed-obj-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`threed-obj-filter-pill ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── 3D Cards Grid ── */}
      <div className="threed-obj-grid">
        {filteredModels.map((item) => {
          const hasModel = Boolean(item.modelUrl);
          const isDraggingThis = dragOverCardId === item.id;

          return (
            <div
              key={item.id}
              className={`threed-card ${!hasModel ? 'is-placeholder' : ''} ${isDraggingThis ? 'is-drag-target' : ''}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverCardId(item.id);
              }}
              onDragLeave={() => setDragOverCardId(null)}
              onDrop={(e) => handleCardDrop(e, item.id)}
            >
              {/* ── 3D Stage / Viewer ── */}
              <div className="threed-card__viewport">
                {hasModel ? (
                  <>
                    <model-viewer
                      src={item.modelUrl}
                      alt={item.title}
                      camera-controls
                      touch-action="pan-y"
                      auto-rotate
                      rotation-per-second="22deg"
                      shadow-intensity="1.3"
                      shadow-softness="0.8"
                      environment-image="neutral"
                      exposure="1.08"
                      className="threed-card__model"
                      interaction-prompt="none"
                    >
                      <div slot="poster" className="threed-card__loader">
                        <div className="threed-card__spinner" />
                        <span>Rendering 3D...</span>
                      </div>
                    </model-viewer>

                    {/* Overlay Badges */}
                    <div className="threed-card__viewport-top">
                      <span className="threed-card__type-badge">360° View</span>
                      <button
                        className="threed-card__expand-btn"
                        onClick={() => setModalModel(item)}
                        title="Fullscreen Inspector"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                        </svg>
                        <span>Inspect</span>
                      </button>
                    </div>

                    <div className="threed-card__viewport-bottom">
                      <span className="threed-card__orbit-hint">Drag to Orbit • Scroll to Zoom</span>
                    </div>
                  </>
                ) : (
                  /* ── Curated Study Placeholder Slot ── */
                  <div className="threed-card__curation-content">
                    <div className="threed-card__curation-graphic">
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <span className="threed-card__curation-badge">3D STUDY IN CURATION</span>
                    <h4 className="threed-card__curation-heading">{item.title}</h4>
                    <p className="threed-card__curation-sub">Interactive spatial study in preparation</p>

                    <button
                      className="threed-card__load-trigger"
                      onClick={() => triggerSlotUpload(item.id)}
                      title="Load or drop a 3D model into this study"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                      <span>Load 3D Model</span>
                    </button>
                  </div>
                )}
              </div>

              {/* ── Card Info Footer ── */}
              <div className="threed-card__info">
                <div className="threed-card__header-line">
                  <span className="threed-card__category">{item.category}</span>
                  <span className={`threed-card__status ${hasModel ? 'is-active' : ''}`}>
                    {hasModel ? 'Interactive' : 'In Curation'}
                  </span>
                </div>
                <h3 className="threed-card__title">{item.title}</h3>
                <p className="threed-card__desc">{item.description}</p>
                <div className="threed-card__specs-row">
                  <span className="threed-card__location-meta">
                    {item.location} • {item.year}
                  </span>
                  {hasModel && (
                    <button
                      className="threed-card__inspect-link"
                      onClick={() => setModalModel(item)}
                    >
                      Explore 3D →
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>


      {/* ── Fullscreen Cinematic 3D Inspector Modal ── */}
      {modalModel && (
        <div className="threed-modal">
          <div className="threed-modal__backdrop" onClick={() => setModalModel(null)} />
          <div className="threed-modal__box">
            {/* Modal Bar */}
            <div className="threed-modal__bar">
              <div className="threed-modal__bar-left">
                <span className="threed-obj-dot" />
                <span className="threed-modal__title">{modalModel.title}</span>
                <span className="threed-card__type-badge">{modalModel.category}</span>
                {modalModel.location && (
                  <span className="threed-modal__location-tag">
                    {modalModel.location} • {modalModel.year}
                  </span>
                )}
              </div>

              <div className="threed-modal__bar-actions">
                {/* Auto Rotate Toggle */}
                <button
                  className={`threed-modal__btn ${modalAutoRotate ? 'active' : ''}`}
                  onClick={() => setModalAutoRotate(!modalAutoRotate)}
                  title="Toggle Turntable Rotation"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                  </svg>
                  <span>{modalAutoRotate ? 'Turntable Active' : 'Turntable'}</span>
                </button>

                {/* Lighting Preset Toggle */}
                <button
                  className="threed-modal__btn"
                  onClick={() =>
                    setModalLighting((prev) => (prev === 'neutral' ? 'legacy' : 'neutral'))
                  }
                  title="Toggle Ambient Lighting"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                  <span>Lighting</span>
                </button>

                {/* Reset Camera */}
                <button
                  className="threed-modal__btn"
                  onClick={() => {
                    if (modalViewerRef.current) {
                      modalViewerRef.current.cameraOrbit = '0deg 75deg 105%';
                      modalViewerRef.current.resetTurntableRotation();
                    }
                  }}
                  title="Reset Camera View"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                  <span>Reset View</span>
                </button>

                {/* Close Modal */}
                <button
                  className="threed-modal__close-btn"
                  onClick={() => setModalModel(null)}
                  title="Close Inspector"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Canvas */}
            <div className="threed-modal__canvas">
              <model-viewer
                ref={modalViewerRef}
                src={modalModel.modelUrl}
                alt={modalModel.title}
                camera-controls
                touch-action="pan-y"
                auto-rotate={modalAutoRotate ? '' : undefined}
                rotation-per-second="25deg"
                shadow-intensity="1.5"
                shadow-softness="0.75"
                environment-image={modalLighting}
                exposure="1.1"
                ar
                ar-modes="webxr scene-viewer quick-look"
                className="threed-modal__viewer"
              >
                <div slot="poster" className="threed-card__loader">
                  <div className="threed-card__spinner" />
                  <span>Loading High-Resolution 3D Model...</span>
                </div>
              </model-viewer>
            </div>

            {/* Modal Info Footer */}
            <div className="threed-modal__footer">
              <div className="threed-modal__footer-desc">
                {modalModel.description}
              </div>
              <div className="threed-modal__footer-hints">
                <span>Left Click + Drag to Orbit • Scroll to Zoom</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
