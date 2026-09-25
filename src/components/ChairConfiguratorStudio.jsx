import React, { useState, useRef, useEffect, useCallback } from "react";

const WOOD_SPECIES = [
  { id: "teak", name: "Teak", defaultStainId: "natural" },
  { id: "mahogany", name: "Mahogany", defaultStainId: "ember" },
];

const WOOD_STAINS = [
  {
    id: "espresso",
    name: "Espresso",
    hex: "#281d16",
    colorFactor: [0.24, 0.16, 0.12, 1.0],
  },
  {
    id: "ember",
    name: "Ember",
    hex: "#522419",
    colorFactor: [0.52, 0.23, 0.15, 1.0],
  },
  {
    id: "natural",
    name: "Natural",
    hex: "#926038",
    colorFactor: [0.82, 0.55, 0.35, 1.0],
  },
  {
    id: "smoked",
    name: "Smoked Oak",
    hex: "#1a1918",
    colorFactor: [0.16, 0.15, 0.14, 1.0],
  },
];

const FABRICS = [
  {
    id: "himalaya-907",
    name: "Himalaya 907",
    subtitle: "Ivory Bouclé",
    hex: "#ece8de",
    colorFactor: [1.0, 0.98, 0.94, 1.0],
  },
  {
    id: "charcoal-912",
    name: "Charcoal 912",
    subtitle: "Espresso Tweed",
    hex: "#262220",
    colorFactor: [0.22, 0.2, 0.2, 1.0],
  },
  {
    id: "ochre-904",
    name: "Ochre 904",
    subtitle: "Caramel Velvet",
    hex: "#b88755",
    colorFactor: [0.82, 0.6, 0.38, 1.0],
  },
  {
    id: "rust-908",
    name: "Rust 908",
    subtitle: "Terracotta Cognac",
    hex: "#a84a1c",
    colorFactor: [0.84, 0.36, 0.14, 1.0],
  },
  {
    id: "forest-915",
    name: "Forest 915",
    subtitle: "Deep Moss Olive",
    hex: "#3d4c2c",
    colorFactor: [0.34, 0.44, 0.24, 1.0],
  },
];

export default function ChairConfiguratorStudio({
  item,
  onClose,
}) {
  const viewerRef = useRef(null);
  const [selectedWood, setSelectedWood] = useState(WOOD_SPECIES[1]); // Mahogany
  const [selectedStain, setSelectedStain] = useState(WOOD_STAINS[1]); // Ember
  const [selectedFabric, setSelectedFabric] = useState(FABRICS[0]); // Himalaya 907
  const autoRotate = true;
  const lighting = "neutral";
  const [isLoaded, setIsLoaded] = useState(false);

  // Apply PBR material colors to the model
  const applyColors = useCallback(() => {
    const viewer = viewerRef.current;
    if (!viewer || !viewer.model) return;

    try {
      const materials = viewer.model.materials || [];

      // Update Wood Frame
      const woodMat =
        materials.find((m) => m.name === "Wood_Frame") ||
        (viewer.model.getMaterialByName && viewer.model.getMaterialByName("Wood_Frame"));

      if (woodMat && woodMat.pbrMetallicRoughness) {
        woodMat.pbrMetallicRoughness.setBaseColorFactor(selectedStain.colorFactor);
      }

      // Update Fabric Upholstery
      const fabricMat =
        materials.find((m) => m.name === "Fabric_Upholstery") ||
        (viewer.model.getMaterialByName &&
          viewer.model.getMaterialByName("Fabric_Upholstery"));

      if (fabricMat && fabricMat.pbrMetallicRoughness) {
        fabricMat.pbrMetallicRoughness.setBaseColorFactor(selectedFabric.colorFactor);
      }
    } catch (err) {
      console.warn("Could not apply material colors:", err);
    }
  }, [selectedStain, selectedFabric]);

  // When model finishes loading or colors change
  useEffect(() => {
    applyColors();
  }, [applyColors, isLoaded]);

  const handleModelLoad = () => {
    setIsLoaded(true);
    applyColors();
  };

  const handleWoodChange = (species) => {
    setSelectedWood(species);
    const defaultStain = WOOD_STAINS.find((s) => s.id === species.defaultStainId);
    if (defaultStain) {
      setSelectedStain(defaultStain);
    }
  };

  const resetCamera = () => {
    const viewer = viewerRef.current;
    if (viewer) {
      viewer.cameraOrbit = "45deg 75deg 105%";
      viewer.cameraTarget = "auto auto auto";
      viewer.fieldOfView = "auto";
    }
  };

  return (
    <div className="chair-studio">
      <div className="chair-studio__dialog" onClick={(e) => e.stopPropagation()}>
        {/* Top Header */}
        <div className="chair-studio__header">
          <div className="chair-studio__header-left">
            <h2 className="chair-studio__title">{item.title}</h2>
            <span className="chair-studio__location">
              {item.client} — {item.location}
            </span>
          </div>

          <div className="chair-studio__header-actions">
            <button
              className="chair-studio__close-btn"
              onClick={onClose}
              aria-label="Close Configurator"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* 2-Column Body: 3D Stage + Editing Options Panel */}
        <div className="chair-studio__body">
          {/* Left: Interactive 3D Model Stage */}
          <div className="chair-studio__viewport-col">
            <div className="chair-studio__stage">
              <model-viewer
                ref={viewerRef}
                src={item.modelUrl}
                alt={item.title}
                camera-controls
                touch-action="pan-y"
                auto-rotate={autoRotate ? "" : undefined}
                rotation-per-second="18deg"
                shadow-intensity="1.5"
                shadow-softness="0.85"
                environment-image={lighting}
                exposure="1.08"
                className="chair-studio__model-viewer"
                onLoad={handleModelLoad}
              >
                <div slot="poster" className="chair-studio__loader">
                  <div className="card-3d-spinner" />
                  <span>Loading 3D Model Materials...</span>
                </div>
              </model-viewer>

              {/* Viewport Floating Controls */}
              <div className="chair-studio__stage-controls">
                <button
                  className="chair-stage-btn"
                  onClick={resetCamera}
                  title="Reset Camera View"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                  </svg>
                  <span>Reset View</span>
                </button>
                <span className="chair-stage-hint">Drag to 360° Orbit • Scroll to Zoom</span>
              </div>
            </div>
          </div>

          {/* Right: Customization & Editing Options Panel */}
          <div className="chair-studio__panel-col">
            <div className="chair-studio__panel">
              <p className="chair-panel__narrative">
                The Archer Vessel Lounge Chair is a luxury spatial statement piece. Designed to be a private sanctuary within the space, featuring a sculptural hand-finished hardwood outer shell that wraps around sumptuous tailored upholstery on elegant tapered legs.
              </p>

              {/* ── Option 1: WOOD Species ── */}
              <div className="chair-option-group">
                <div className="chair-option-group__label">
                  <span className="chair-option-title">WOOD :</span>
                  <span className="chair-option-value">{selectedWood.name}</span>
                </div>

                <div className="chair-radio-row">
                  {WOOD_SPECIES.map((species) => {
                    const isChecked = selectedWood.id === species.id;
                    return (
                      <label
                        key={species.id}
                        className={`chair-radio-item ${isChecked ? "is-selected" : ""}`}
                        onClick={() => handleWoodChange(species)}
                      >
                        <span className="chair-radio-indicator">
                          {isChecked && <span className="chair-radio-dot" />}
                        </span>
                        <span className="chair-radio-text">{species.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* ── Option 2: WOOD STAIN ── */}
              <div className="chair-option-group">
                <div className="chair-option-group__label">
                  <span className="chair-option-title">WOOD STAIN :</span>
                  <span className="chair-option-value">{selectedStain.name}</span>
                </div>

                <div className="chair-swatches-row">
                  {WOOD_STAINS.map((stain) => {
                    const isSelected = selectedStain.id === stain.id;
                    return (
                      <button
                        key={stain.id}
                        type="button"
                        className={`chair-swatch-box ${isSelected ? "is-active" : ""}`}
                        style={{ backgroundColor: stain.hex }}
                        onClick={() => setSelectedStain(stain)}
                        title={`Stain: ${stain.name}`}
                        aria-label={`Select ${stain.name} stain`}
                      >
                        {isSelected && (
                          <span className="chair-swatch-check">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Option 3: FABRIC ── */}
              <div className="chair-option-group">
                <div className="chair-option-group__label">
                  <span className="chair-option-title">FABRIC :</span>
                  <span className="chair-option-value">
                    {selectedFabric.name} <span className="chair-option-sub">({selectedFabric.subtitle})</span>
                  </span>
                </div>

                <div className="chair-swatches-row">
                  {FABRICS.map((fabric) => {
                    const isSelected = selectedFabric.id === fabric.id;
                    return (
                      <button
                        key={fabric.id}
                        type="button"
                        className={`chair-swatch-box chair-swatch-box--fabric ${isSelected ? "is-active" : ""}`}
                        style={{ backgroundColor: fabric.hex }}
                        onClick={() => setSelectedFabric(fabric)}
                        title={`Fabric: ${fabric.name} - ${fabric.subtitle}`}
                        aria-label={`Select ${fabric.name} fabric`}
                      >
                        {isSelected && (
                          <span className="chair-swatch-check">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke={fabric.id === "himalaya-907" ? "#111111" : "#ffffff"}
                              strokeWidth="3"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Real-time Material Spec pill */}
              {/* <div className="chair-active-spec">
                <span className="chair-spec-dot" />
                <span>
                  Live PBR Shading: <strong>{selectedWood.name} ({selectedStain.name})</strong> + <strong>{selectedFabric.name}</strong>
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
