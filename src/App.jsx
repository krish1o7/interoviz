import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatSetsUsApart from './components/WhatSetsUsApart';
import WhatWeDo from './components/WhatWeDo';
import CaseStudies from './components/CaseStudies';
import AboutSection from './components/AboutSection';
import InlineVideo from './components/InlineVideo';
import CareerAcademy from './components/CareerAcademy';
import Clients from './components/Clients';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import VideoPopup from './components/VideoPopup';
import AboutPage from './pages/AboutPage';
import WorksPage from './pages/WorksPage';

gsap.registerPlugin(ScrollTrigger);

const normalizePath = (path) => {
  const p = path.toLowerCase().replace(/\/$/, '');
  if (p === '/about') return '/about';
  if (p === '/works') return '/works';
  return '/';
};

export default function App() {
  const lenisRef = useRef(null);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [videoPopup, setVideoPopup] = useState({ open: false, src: '' });
  const [currentPath, setCurrentPath] = useState(
    normalizePath(window.location.pathname)
  );

  // Sync browser back / forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = normalizePath(window.location.pathname);
      setCurrentPath(path);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
      setTimeout(() => ScrollTrigger.refresh(), 100);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    const normalized = normalizePath(path);
    if (window.location.pathname !== normalized) {
      window.history.pushState({}, '', normalized);
    }
    setCurrentPath(normalized);

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    setTimeout(() => ScrollTrigger.refresh(), 150);
  };

  // Smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP ScrollTrigger Integration
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0, 0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // On preloader done, refresh triggers
  useEffect(() => {
    if (preloaderDone) {
      setTimeout(() => ScrollTrigger.refresh(), 200);
    }
  }, [preloaderDone]);

  return (
    <>
      {/* Noise grain overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Custom cursor */}
      <Cursor />

      {/* Preloader */}
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

      {/* Navbar */}
      <Navbar onNavigate={navigate} currentPath={currentPath} />

      {/* Main content based on route */}
      <main>
        {currentPath === '/about' ? (
          <AboutPage lenisRef={lenisRef} />
        ) : currentPath === '/works' ? (
          <WorksPage lenisRef={lenisRef} />
        ) : (
          <>
            <Hero onShowreel={() => setVideoPopup({ open: true, src: 'https://player.vimeo.com/video/1070264577?autoplay=1&muted=1' })} />
            <WhatSetsUsApart />
            <WhatWeDo />
            <CaseStudies />
            <AboutSection onNavigate={navigate} />
            <InlineVideo onOffice={() => setVideoPopup({ open: true, src: 'https://player.vimeo.com/video/761022704?autoplay=1&muted=1' })} />
            <CareerAcademy />
            <Clients />
          </>
        )}
      </main>

      <Footer onNavigate={navigate} />

      {/* Video popup */}
      <VideoPopup
        open={videoPopup.open}
        src={videoPopup.src}
        onClose={() => setVideoPopup({ open: false, src: '' })}
      />
    </>
  );
}
