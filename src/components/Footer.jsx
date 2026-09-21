const FOOTER_LINKS = {
  Services: ['Architecture', 'Real Estate', 'Product & Brand', 'Media & Entertainment', 'Software Solution'],
  Company: ['About Us', 'Our Team', 'Awards', 'Newsroom', 'Art of Brick'],
  Connect: ['Career', 'Academy', 'Contact', 'Request a Proposal'],
};

export default function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="footer__top">
        {/* Services */}
        <div className="footer__col">
          <div className="footer__col-title">Services:</div>
          <ul className="footer__links">
            <li><span className="footer__link" onClick={() => onNavigate?.('/works')} style={{ cursor: 'pointer' }}>CGI</span></li>
            <li><span className="footer__link" onClick={() => onNavigate?.('/works')} style={{ cursor: 'pointer' }}>Interactive</span></li>
            <li><span className="footer__link">Photography</span></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer__col">
          <div className="footer__col-title">Contact Information:</div>
          <div className="footer__text-block">
            Kapil Kapoor<br/>
            +91 9999774619<br/>
            <a href="mailto:kapil@interoviz.com">kapil@interoviz.com</a>
          </div>
          <div className="footer__text-block">
            Akshay Arora<br/>
            +91 9910903393<br/>
            <a href="mailto:akshay@interoviz.com">akshay@interoviz.com</a>
          </div>
        </div>

        {/* Address */}
        <div className="footer__col">
          <div className="footer__col-title">Address:</div>
          <div className="footer__text-block">
            AAC-2C, Shipra Krishna Azure,<br/>
            Kaushambi - 201010
          </div>
          <div className="footer__text-block">
            Plot No.24, Raj Block, Naveen Shahdara,<br/>
            East Delhi - 110032
          </div>
          <div className="footer__text-block">
            Email: <a href="mailto:studio@interoviz.com">studio@interoviz.com</a>
          </div>
          <div className="footer__text-block">
            <strong>GST:</strong> 07AAIFI8172M1ZS
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer__bottom">
        <div className="footer__copy">
          Copyright © 2025 Interoviz. All Rights Reserved.
        </div>

        <div className="footer__socials">
          {['facebook', 'linkedin', 'youtube', 'instagram', 'behance'].map(s => (
            <a key={s} className="footer__social-icon" href={`#${s}`}>
              <img src={`https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${s}.svg`} alt={s} style={{ filter: 'invert(1)' }} width="20" height="20" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
