import React, { useState, useRef } from 'react';

const INITIAL_MODELS = [
  {
    id: 'simplio-configurator',
    title: 'Architectural Modular Configurator',
    category: 'Interactive 3D Configurator',
    type: 'embed',
    src: 'https://app.simplio3d.ai/share/f300e6fb-d81b-4c9f-9e9c-c00f5c644322/38e6223db7486339042fa30bef81d8304e65eb3e06f45c64f4bdc88b09f8e64b',
    format: 'Simplio3D Interactive',
    specs: 'Real-time 360° • Variant Selectors • Dynamic Materials',
    description:
      'Complete interactive 3D configurator with modular options, dynamic lighting, and instant material switching.',
  },
  {
    id: 'sample-glb',
    title: 'Geometric Spatial Structure',
    category: 'Native .GLB 3D Model',
    type: 'glb',
    src: '/models/sample-model.glb',
    format: 'GLB / GLTF',
    specs: 'PBR Shading • Ambient Occlusion • Native Orbit',
    description:
      'Direct .GLB mesh rendered natively with Physically Based Rendering (PBR), dynamic shadows, and 360° orbit.',
  },
];

export default function ThreeDGallery() {
  const [models, setModels] = useState(INITIAL_MODELS);
  const [activeModelId, setActiveModelId] = useState(INITIAL_MODELS[0].id);
  const [autoRotate, setAutoRotate] = useState(true);
  const [environment, setEnvironment] = useState('neutral');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const stageRef = useRef(null);
  const fileInputRef = useRef(null);
  const modelViewerRef = useRef(null);

  const activeModel = models.find((m) => m.id === activeModelId) || models[0];

  // Handle local user file upload (.glb / .gltf)
  const handleFileUpload = (file) => {
    if (!file) return;
    const isGlb = file.name.endsWith('.glb') || file.name.endsWith('.gltf');
    if (!isGlb) {
      alert('Please upload a 3D file in .glb or .gltf format.');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    const newModel = {
      id: `custom-${Date.now()}`,
      title: file.name.replace(/\.[^/.]+$/, ''),
      category: 'Your Custom 3D File',
      type: 'glb',
      src: objectUrl,
      format: file.name.endsWith('.glb') ? 'Binary GLTF (.GLB)' : 'GLTF',
      specs: `${(file.size / (1024 * 1024)).toFixed(2)} MB • Custom User Model`,
      description: 'Your custom 3D model loaded and rendered with PBR textures, environment lighting, and orbit controls.',
      isUserUploaded: true,
    };

    setModels((prev) => [newModel, ...prev]);
    setActiveModelId(newModel.id);
  };

  const onFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const toggleFullscreen = () => {
    if (!stageRef.current) return;
    if (!document.fullscreenElement) {
      stageRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const resetCamera = () => {
    if (activeModel.type === 'glb' && modelViewerRef.current) {
      modelViewerRef.current.cameraOrbit = '0deg 75deg 105%';
      modelViewerRef.current.resetTurntableRotation();
    } else if (stageRef.current) {
      const iframe = stageRef.current.querySelector('iframe');
      if (iframe) {
        setIsIframeLoaded(false);
        iframe.src = activeModel.src;
      }
    }
  };

  return (
    <div
      className={`threed-gallery ${isFullscreen ? 'is-fullscreen' : ''} ${dragActive ? 'is-drag-active' : ''}`}
      ref={stageRef}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {/* ── Top Control & Status Bar ── */}
      <div className="threed-gallery__bar">
        <div className="threed-gallery__bar-left">
          <span className="threed-gallery__status-dot" />
          <div className="threed-gallery__model-meta">
            <span className="threed-gallery__title">{activeModel.title}</span>
            <span className="threed-gallery__badge">{activeModel.category}</span>
          </div>
        </div>

        <div className="threed-gallery__hints">
          <span>Rotate: Left Click + Drag</span>
          <span>•</span>
          <span>Zoom: Scroll</span>
          <span>•</span>
          <span>Pan: Right Click / 2 Fingers</span>
        </div>

        <div className="threed-gallery__actions">
          {/* Native GLB lighting toggle */}
          {activeModel.type === 'glb' && (
            <button
              className="threed-gallery__btn"
              onClick={() =>
                setEnvironment((prev) =>
                  prev === 'neutral' ? 'legacy' : prev === 'legacy' ? 'neutral' : 'neutral'
                )
              }
              title="Toggle Lighting Environment"
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
          )}

          {/* Auto-rotate toggle */}
          {activeModel.type === 'glb' && (
            <button
              className={`threed-gallery__btn ${autoRotate ? 'active' : ''}`}
              onClick={() => setAutoRotate(!autoRotate)}
              title="Auto Rotate 360"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              <span>{autoRotate ? 'Spinning' : 'Spin'}</span>
            </button>
          )}

          {/* Reset Camera */}
          <button className="threed-gallery__btn" onClick={resetCamera} title="Reset View">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            <span>Reset</span>
          </button>

          {/* Upload Button */}
          <button
            className="threed-gallery__btn threed-gallery__btn--highlight"
            onClick={() => fileInputRef.current?.click()}
            title="Upload your own .GLB or .GLTF file"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span>+ Load 3D File</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileInputChange}
            accept=".glb,.gltf"
            style={{ display: 'none' }}
          />

          {/* Fullscreen Button */}
          <button className="threed-gallery__btn" onClick={toggleFullscreen} title="Toggle Fullscreen">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
            <span>{isFullscreen ? 'Exit' : 'Full Screen'}</span>
          </button>
        </div>
      </div>

      {/* ── Main Interactive 3D Canvas Stage ── */}
      <div className="threed-gallery__stage">
        {dragActive && (
          <div className="threed-gallery__dropzone-overlay">
            <div className="threed-gallery__dropzone-card">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00e5a3" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <h3>Drop your 3D file (.glb / .gltf) here</h3>
              <p>It will load immediately into the 3D viewer</p>
            </div>
          </div>
        )}

        {activeModel.type === 'embed' ? (
          <div className="threed-gallery__iframe-wrap">
            {!isIframeLoaded && (
              <div className="threed-gallery__loader">
                <div className="threed-gallery__spinner" />
                <p>Loading 3D Configurator...</p>
              </div>
            )}
            <iframe
              src={activeModel.src}
              title={activeModel.title}
              className="threed-gallery__iframe"
              allow="fullscreen; accelerometer; gyroscope; xr-spatial-tracking"
              loading="lazy"
              onLoad={() => setIsIframeLoaded(true)}
            />
          </div>
        ) : (
          <div className="threed-gallery__modelviewer-wrap">
            {/* Native Google Model-Viewer for .glb / .gltf */}
            <model-viewer
              ref={modelViewerRef}
              src={activeModel.src}
              alt={activeModel.title}
              camera-controls
              touch-action="pan-y"
              auto-rotate={autoRotate ? '' : undefined}
              rotation-per-second="25deg"
              shadow-intensity="1.5"
              shadow-softness="0.8"
              environment-image={environment}
              exposure="1.1"
              ar
              ar-modes="webxr scene-viewer quick-look"
              className="threed-gallery__modelviewer"
            >
              <div slot="poster" className="threed-gallery__loader">
                <div className="threed-gallery__spinner" />
                <p>Rendering 3D Mesh...</p>
              </div>
            </model-viewer>
          </div>
        )}
      </div>

      {/* ── Thumbnails Strip / Gallery Selector ── */}
      <div className="threed-gallery__strip-container">
        <div className="threed-gallery__strip-header">
          <span className="threed-gallery__strip-label">SELECT 3D VIEW / MODEL ({models.length})</span>
          <span className="threed-gallery__drag-hint">Tip: Drag & drop your own .glb file anywhere on the stage</span>
        </div>

        <div className="threed-gallery__strip">
          {models.map((model) => {
            const isActive = model.id === activeModelId;
            return (
              <button
                key={model.id}
                className={`threed-gallery__card ${isActive ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveModelId(model.id);
                  if (model.type === 'embed') setIsIframeLoaded(false);
                }}
              >
                <div className="threed-gallery__card-preview">
                  <div className="threed-gallery__card-icon">
                    {model.type === 'embed' ? (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 2 7 12 12 22 7 12 2" />
                        <polyline points="2 17 12 22 22 17" />
                        <polyline points="2 12 12 17 22 12" />
                      </svg>
                    ) : (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                        <line x1="12" y1="22.08" x2="12" y2="12" />
                      </svg>
                    )}
                  </div>
                  {isActive && <span className="threed-gallery__active-glow" />}
                </div>

                <div className="threed-gallery__card-body">
                  <div className="threed-gallery__card-format">{model.format}</div>
                  <div className="threed-gallery__card-title">{model.title}</div>
                  <div className="threed-gallery__card-specs">{model.specs}</div>
                </div>
              </button>
            );
          })}

          {/* Quick Upload Add Card */}
          <button
            className="threed-gallery__card threed-gallery__card--add"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="threed-gallery__add-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <span className="threed-gallery__add-title">Add 3D View File</span>
            <span className="threed-gallery__add-sub">.glb or .gltf format</span>
          </button>
        </div>
      </div>

      {/* ── Active Model Detail Footnote ── */}
      <div className="threed-gallery__info-bar">
        <div className="threed-gallery__info-desc">
          <strong>About this view:</strong> {activeModel.description}
        </div>
        <div className="threed-gallery__info-format">
          <span>Engine:</span> {activeModel.type === 'embed' ? 'Simplio3D WebGL Engine' : 'Google WebGL PBR Engine'}
        </div>
      </div>
    </div>
  );
}
