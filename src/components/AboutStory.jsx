import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import officeArchImg from '../images/team/office-arch.png';

gsap.registerPlugin(ScrollTrigger);

export default function AboutStory() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const textColsRef = useRef(null);
  const calloutRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      headlineRef.current,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 85%',
        },
      }
    );

    gsap.fromTo(
      textColsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textColsRef.current,
          start: 'top 85%',
        },
      }
    );

    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
          },
        }
      );
    }
  }, []);

  return (
    <section id="about-story" className="section bottom-line about-story" ref={sectionRef}>
      <div className="padding-global">
        <div className="about-split-layout">
          {/* Left Column – Label */}
          <div className="about-split-layout__left">
            <span className="title-desc__label">About us</span>
          </div>

          {/* Right Column – Content */}
          <div className="about-split-layout__right">
            {/* Major Statement Headline */}
            <h2 ref={headlineRef} className="about-story__statement">
              Driven by a team of highly skilled artists and powered by cutting-edge technology,
              we deliver innovative visual narratives, with the capacity and competence required
              for large-scale, prestige projects.
            </h2>

            {/* 2-column detailed body text */}
            <div ref={textColsRef} className="about-story__cols">
              <p className="about-story__para">
                Welcome to Interoviz, your trusted partner in transforming visions into stunning visual
                realities. With over 15 years of expertise, we specialize in delivering top-tier services,
                including Interior Rendering, Animations, Furniture Rendering, Photography, and immersive
                Virtual Tours. Our mission is to bring your ideas to life with unparalleled precision and
                creativity.
              </p>
              <p className="about-story__para">
                At Interoviz, we pride ourselves on being reliable partners, consistently delivering high-quality
                results that exceed expectations. Our team leverages state-of-the-art, high-end machines and an
                innovative AI-enabled workflow to ensure efficiency, accuracy, and breathtaking visuals. This
                cutting-edge technology allows us to streamline processes while maintaining the highest standards
                of detail and realism in every project.
              </p>
            </div>

            {/* Architectural office image with refined arch framing */}
            <div ref={imageRef} className="about-story__media-wrap">
              <img
                src={officeArchImg}
                alt="Interoviz studio conference room"
                className="about-story__media"
              />
            </div>

            {/* Callout quote / closing note */}
            <div ref={calloutRef} className="about-story__callout">
              <blockquote>
                "Whether you're an architect, designer, or business seeking captivating visuals, we tailor our
                services to meet your unique needs. Choose Interoviz for a seamless blend of experience,
                innovation, and dedication to excellence. Let's create something extraordinary together."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
