import React, { useRef } from 'react';

const TESTIMONIALS = [
  {
    quote:
      'I have been working with this team for over 3-4 years, and they have consistently delivered exceptional quality. The renders are highly realistic and of excellent quality, making it effortless to visualise the final outcome. The entire process is always smooth, especially when all details are shared in advance. I am happy to recommend their services to fellow interior designers.',
    name: 'Aarti Dhariwal',
    role: 'Founder at Stories with AD',
  },
  {
    quote:
      'I had a 3D service done, and I must say it was really impressive! I appreciated the professionalism and the speed of delivery. The attention to detail was spot on, and the final result was definitely worth the money. It was also super convenient for me— I just shared my idea, and they brought it to life in 3D seamlessly.',
    name: 'Kshama Chaudhary Bhullar',
    role: 'Founder at Klearstory',
  },
  {
    quote:
      'Have been collaborating with Interoviz since over 5 years now for all our 3D visualisations and I think that says a lot about their quality of work. Their 3D visualisations capture each and every detail and makes it look like an actual photograph itself. Highly recommended to all Interior Designers.',
    name: 'Anusha Mittal',
    role: 'Senior Designer at Aditi Sharma Design Studio',
  },
  {
    quote:
      'Highly professional, very creative, detail-oriented, and prompt! It was a pleasure working with Interoviz Studio. Highly recommended for all design and branding needs.',
    name: 'Nehal',
    role: 'Founder at Vedanth Design Studio',
  },
  {
    quote:
      'Got some views made from Interoviz, they were very realistic and well made. Get most of my 3D work from them. Would recommend them to all the architects/designers.',
    name: 'Devika Gulati',
    role: 'Founder at Devika Designs',
  },
];

export default function AboutTestimonials() {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const distance = 420;
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  };

  return (
    <section id="about-testimonials" className="section bottom-line about-testimonials">
      <div className="padding-global">
        <div className="about-split-layout">
          {/* Left Column – Label */}
          <div className="about-split-layout__left">
            <span className="title-desc__label">Testimonials</span>
          </div>

          {/* Right Column – Content & Quotes */}
          <div className="about-split-layout__right">
            <div className="about-team__header">
              <h2 className="about-story__statement" style={{ marginBottom: 0 }}>
                Want to build your trust before working? Know what our existing clients are saying about us.
              </h2>

              {/* Slider Navigation Arrows */}
              <div className="about-team__arrows">
                <button
                  className="about-team__arrow-btn"
                  onClick={() => scroll('left')}
                  aria-label="Previous testimonial"
                >
                  <svg viewBox="0 0 20 14" strokeWidth="1.5" stroke="currentColor" fill="none">
                    <path d="M19 7H1M7 1L1 7L7 13" />
                  </svg>
                </button>
                <button
                  className="about-team__arrow-btn"
                  onClick={() => scroll('right')}
                  aria-label="Next testimonial"
                >
                  <svg viewBox="0 0 20 14" strokeWidth="1.5" stroke="currentColor" fill="none">
                    <path d="M1 7H19M13 1L19 7L13 13" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Testimonials Carousel */}
            <div className="about-testimonials__slider" ref={sliderRef}>
              {TESTIMONIALS.map((item, i) => (
                <div key={i} className="about-testimonial__card">
                  <div className="about-testimonial__quote-mark">“</div>
                  <p className="about-testimonial__text">{item.quote}</p>
                  <div className="about-testimonial__author">
                    <div className="about-testimonial__name">{item.name}</div>
                    <div className="about-testimonial__role">{item.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
