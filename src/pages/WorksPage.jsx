import React, { useState, useEffect, useMemo } from "react";
import { PRIMARY_CATEGORIES, SUB_CATEGORIES, WORKS_ITEMS } from "../data/worksData";
import Panorama360Viewer from "../components/Panorama360Viewer";
import ChairConfiguratorStudio from "../components/ChairConfiguratorStudio";

export default function WorksPage({ lenisRef }) {
  // Matching initial state to user screenshot: "Interior" + "Hospitality"
  const [selectedPrimary, setSelectedPrimary] = useState("Interior");
  const [selectedSub, setSelectedSub] = useState("Hospitality");
  const [activeItem, setActiveItem] = useState(null);
  const [modalAutoRotate, setModalAutoRotate] = useState(true);
  const [modalLighting, setModalLighting] = useState("neutral");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter items according to primary category, with subcategory ONLY applying to Interior
  const filteredWorks = useMemo(() => {
    return WORKS_ITEMS.filter((item) => {
      const matchPrimary =
        selectedPrimary === "All" ||
        item.category.toLowerCase() === selectedPrimary.toLowerCase();

      // Subcategory ONLY applies when "Interior" is selected
      if (selectedPrimary.toLowerCase() === "interior") {
        const matchSub =
          selectedSub === "All" ||
          (item.subCategory &&
            item.subCategory.toLowerCase() === selectedSub.toLowerCase());
        return matchPrimary && matchSub;
      }

      return matchPrimary;
    });
  }, [selectedPrimary, selectedSub]);

  // Fallback if combination is empty
  const displayWorks = useMemo(() => {
    if (filteredWorks.length > 0) return filteredWorks;
    if (selectedPrimary !== "All") {
      const fallback = WORKS_ITEMS.filter(
        (item) => item.category.toLowerCase() === selectedPrimary.toLowerCase()
      );
      if (fallback.length > 0) return fallback;
    }
    return WORKS_ITEMS;
  }, [filteredWorks, selectedPrimary]);

  // Lightbox keyboard navigation
  useEffect(() => {
    const onKeyDown = (e) => {
      if (!activeItem) return;
      if (e.key === "Escape") setActiveItem(null);
      if (e.key === "ArrowRight") {
        const idx = displayWorks.findIndex((w) => w.id === activeItem.id);
        if (idx !== -1 && idx < displayWorks.length - 1) {
          setActiveItem(displayWorks[idx + 1]);
        }
      }
      if (e.key === "ArrowLeft") {
        const idx = displayWorks.findIndex((w) => w.id === activeItem.id);
        if (idx > 0) {
          setActiveItem(displayWorks[idx - 1]);
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeItem, displayWorks]);

  const activeIndex = activeItem
    ? displayWorks.findIndex((w) => w.id === activeItem.id)
    : -1;

  const handlePrev = (e) => {
    e.stopPropagation();
    if (activeIndex > 0) {
      setActiveItem(displayWorks[activeIndex - 1]);
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (activeIndex < displayWorks.length - 1) {
      setActiveItem(displayWorks[activeIndex + 1]);
    }
  };

  return (
    <div className="interoviz-works">
      {/* ── Filter Bar Level 1 (Primary Category) ── */}
      <section className="works-filters-section">
        <div className="works-filters-container">
          <nav className="works-filter-row works-filter-row--primary">
            {PRIMARY_CATEGORIES.map((cat) => {
              const isActive = selectedPrimary.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  className={"works-filter-btn primary-btn" + (isActive ? " is-active" : "")}
                  onClick={() => {
                    setSelectedPrimary(cat);
                    if (cat.toLowerCase() === "interior") {
                      setSelectedSub("Hospitality");
                    }
                  }}
                >
                  <span>{cat}</span>
                </button>
              );
            })}
          </nav>

          {/* ── Filter Bar Level 2 (Sub Category / Typology) - ONLY shown for "Interior" ── */}
          {selectedPrimary.toLowerCase() === "interior" && (
            <nav className="works-filter-row works-filter-row--sub">
              {SUB_CATEGORIES.map((sub) => {
                const isActive = selectedSub.toLowerCase() === sub.toLowerCase();
                return (
                  <button
                    key={sub}
                    className={"works-filter-btn sub-btn" + (isActive ? " is-active" : "")}
                    onClick={() => setSelectedSub(sub)}
                  >
                    <span>{sub}</span>
                  </button>
                );
              })}
            </nav>
          )}
        </div>
      </section>

      {/* ── 3-Column Luxury Portfolio Grid ── */}
      <section className="works-grid-section">
        <div className="works-grid-container">
          <div className="interoviz-masonry-grid">
            {displayWorks.map((item, index) => {
              const isPanorama = Boolean(item.isPanorama && item.panoramaUrl);
              const is3DModel = Boolean(item.is3D && item.modelUrl && !isPanorama);
              const isInteractive = isPanorama || is3DModel;

              return (
                <article
                  key={item.id}
                  className={"interoviz-gallery-card" + (isInteractive ? " is-3d-card" : "")}
                  onClick={() => !isInteractive && setActiveItem(item)}
                >
                  <div className="interoviz-gallery-card__media">
                    {isPanorama ? (
                      <div className="interoviz-card-3d-stage">
                        <Panorama360Viewer
                          src={item.panoramaUrl}
                          alt={item.title}
                          autoRotate={true}
                          allowZoom={false}
                          showControls={true}
                          onExpand={() => setActiveItem(item)}
                        />
                        <div className="interoviz-card-3d-caption">
                          <h4 className="interoviz-card-3d-caption__title">{item.title}</h4>
                          <p className="interoviz-card-3d-caption__meta">{item.location}</p>
                        </div>
                      </div>
                    ) : is3DModel ? (
                      <div className="interoviz-card-3d-stage">
                        <model-viewer
                          src={item.modelUrl}
                          alt={item.title}
                          camera-controls
                          touch-action="pan-y"
                          auto-rotate
                          rotation-per-second="20deg"
                          shadow-intensity="1.5"
                          shadow-softness="0.8"
                          environment-image="neutral"
                          exposure="1.08"
                          className="interoviz-card-3d-viewer"
                          interaction-prompt="none"
                        >
                          <div slot="poster" className="interoviz-card-3d-loader">
                            <div className="card-3d-spinner" />
                            <span>Loading 3D Model...</span>
                          </div>
                        </model-viewer>

                        {/* Top-Right Expandable Button */}
                        <button
                          type="button"
                          className="interoviz-card-3d-expand-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveItem(item);
                          }}
                          title="Customize & Expand 3D View"
                          aria-label="Customize and Expand 3D View"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <polyline points="15 3 21 3 21 9" />
                            <polyline points="9 21 3 21 3 15" />
                            <line x1="21" y1="3" x2="14" y2="10" />
                            <line x1="3" y1="21" x2="10" y2="14" />
                          </svg>
                          <span>Customize & Expand</span>
                        </button>

                        <div className="interoviz-card-3d-caption">
                          <h4 className="interoviz-card-3d-caption__title">{item.title}</h4>
                          <p className="interoviz-card-3d-caption__meta">{item.location}</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="interoviz-gallery-card__img"
                          loading={index < 6 ? "eager" : "lazy"}
                        />

                        {/* Hover Overlay */}
                        <div className="interoviz-card-overlay">
                          <div className="interoviz-card-overlay__content">
                            <span className="interoviz-card-overlay__category">
                              {item.category} • {item.subCategory}
                            </span>
                            <h3 className="interoviz-card-overlay__title">{item.title}</h3>
                            <p className="interoviz-card-overlay__meta">
                              {item.client} — {item.location}
                            </p>
                            <div className="interoviz-card-overlay__prompt">
                              <span>View Fullscreen</span>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── High-End Lightbox Inspector Modal / 3D Chair Studio ── */}
      {activeItem &&
        (activeItem.modelUrl && activeItem.modelUrl.includes("ArcherArmChair") ? (
          <ChairConfiguratorStudio
            item={activeItem}
            onClose={() => setActiveItem(null)}
          />
        ) : (
          <div className="works-lightbox" onClick={() => setActiveItem(null)}>
            <div className="works-lightbox__backdrop" />

          <div
            className="works-lightbox__dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="works-lightbox__header">
              <div className="works-lightbox__header-left">
                <span className="works-lightbox__brand-tag">
                  {activeItem.category} • {activeItem.subCategory}
                </span>
                <h3 className="works-lightbox__title">{activeItem.title}</h3>
                <span className="works-lightbox__location">
                  {activeItem.location} ({activeItem.year})
                </span>
              </div>

              <div className="works-lightbox__header-right">
                {activeItem.is3D && !activeItem.isPanorama && (
                  <>
                    <button
                      className={"lightbox-btn" + (modalAutoRotate ? " is-active" : "")}
                      onClick={() => setModalAutoRotate(!modalAutoRotate)}
                      title="Toggle Turntable"
                    >
                      <span>{modalAutoRotate ? "Turntable Active" : "Turntable"}</span>
                    </button>
                    <button
                      className="lightbox-btn"
                      onClick={() =>
                        setModalLighting((prev) => (prev === "neutral" ? "legacy" : "neutral"))
                      }
                      title="Toggle Lighting"
                    >
                      <span>Lighting</span>
                    </button>
                  </>
                )}

                <button
                  className="works-lightbox__close"
                  onClick={() => setActiveItem(null)}
                  aria-label="Close modal"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Lightbox Content Stage */}
            <div className="works-lightbox__stage">
              {activeItem.isPanorama ? (
                <Panorama360Viewer
                  src={activeItem.panoramaUrl}
                  alt={activeItem.title}
                  autoRotate={modalAutoRotate}
                  allowZoom={true}
                  showControls={true}
                  className="works-lightbox__panorama-viewer"
                />
              ) : activeItem.is3D && activeItem.modelUrl ? (
                <model-viewer
                  src={activeItem.modelUrl}
                  alt={activeItem.title}
                  camera-controls
                  touch-action="pan-y"
                  auto-rotate={modalAutoRotate ? "" : undefined}
                  rotation-per-second="24deg"
                  shadow-intensity="1.4"
                  shadow-softness="0.8"
                  environment-image={modalLighting}
                  exposure="1.08"
                  className="works-lightbox__model-viewer"
                >
                  <div slot="poster" className="works-lightbox__loader">
                    <div className="lightbox-spinner" />
                    <span>Rendering 3D Virtual Reality View...</span>
                  </div>
                </model-viewer>
              ) : (
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="works-lightbox__image"
                />
              )}

              {/* Prev / Next Buttons */}
              {activeIndex > 0 && (
                <button
                  className="works-lightbox__nav works-lightbox__nav--prev"
                  onClick={handlePrev}
                  aria-label="Previous project"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
              )}
              {activeIndex < displayWorks.length - 1 && (
                <button
                  className="works-lightbox__nav works-lightbox__nav--next"
                  onClick={handleNext}
                  aria-label="Next project"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              )}
            </div>

            {/* Bottom Info Bar */}
            <div className="works-lightbox__footer">
              <p className="works-lightbox__desc">{activeItem.description}</p>
              <div className="works-lightbox__counter">
                <span>
                  {activeIndex + 1} / {displayWorks.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
