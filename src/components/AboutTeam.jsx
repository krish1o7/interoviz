import React, { useRef } from 'react';
import kapilImg from '../images/team/kapil.png';
import akshayImg from '../images/team/akshay.png';
import avinashImg from '../images/team/avinash.png';
import shubhamImg from '../images/team/shubham.png';
import saurabhImg from '../images/team/saurabh.png';
import manishImg from '../images/team/manish.png';
import sudhanshuImg from '../images/team/sudhanshu.png';
import nikitaImg from '../images/team/nikita.png';
import anushaImg from '../images/team/anusha.png';

const TEAM_MEMBERS = [
  { name: 'Kapil Kapoor', role: 'Co-Founder', image: kapilImg },
  { name: 'Akshay Arora', role: 'Co-Founder', image: akshayImg },
  { name: 'Avinash Kumar', role: 'Senior 3D Designer', image: avinashImg },
  { name: 'Shubham Singh', role: 'Senior 3D Designer', image: shubhamImg },
  { name: 'Saurabh Kant', role: '3D Designer', image: saurabhImg },
  { name: 'Manish Pal', role: '3D Modeler', image: manishImg },
  { name: 'Sudhanshu Sharma', role: '3D Modeler', image: sudhanshuImg },
  { name: 'Nikhita Kapoor', role: 'Marketing Head', image: nikitaImg },
  { name: 'Anusha Gupta', role: 'Social Media Manager', image: anushaImg },
];

export default function AboutTeam() {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const distance = 360;
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  };

  return (
    <section id="about-team" className="section bottom-line about-team">
      <div className="padding-global">
        <div className="about-split-layout">
          {/* Left Column – Label */}
          <div className="about-split-layout__left">
            <span className="title-desc__label">Client Experience Team</span>
          </div>

          {/* Right Column – Headline & Slider Controls */}
          <div className="about-split-layout__right">
            <div className="about-team__header">
              <h2 className="about-story__statement" style={{ marginBottom: 0 }}>
                We maintain personal contact throughout our projects. Meet our colleagues who
                consistently work with our clients to unlock new and valuable opportunities.
              </h2>

              {/* Slider Navigation Arrows */}
              <div className="about-team__arrows">
                <button
                  className="about-team__arrow-btn"
                  onClick={() => scroll('left')}
                  aria-label="Previous team members"
                >
                  <svg viewBox="0 0 20 14" strokeWidth="1.5" stroke="currentColor" fill="none">
                    <path d="M19 7H1M7 1L1 7L7 13" />
                  </svg>
                </button>
                <button
                  className="about-team__arrow-btn"
                  onClick={() => scroll('right')}
                  aria-label="Next team members"
                >
                  <svg viewBox="0 0 20 14" strokeWidth="1.5" stroke="currentColor" fill="none">
                    <path d="M1 7H19M13 1L19 7L13 13" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Horizontal Team Carousel */}
            <div className="about-team__slider" ref={sliderRef}>
              {TEAM_MEMBERS.map((member, i) => (
                <div key={i} className="about-team__card">
                  <div className="about-team__card-img-wrap">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="about-team__card-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="about-team__card-info">
                    <div className="about-team__card-name">{member.name}</div>
                    <div className="about-team__card-role">{member.role}</div>
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
