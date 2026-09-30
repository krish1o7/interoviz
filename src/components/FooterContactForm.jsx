import { useState } from 'react';
import './FooterContactForm.css';

export default function FooterContactForm({ titleVariant = 'accent', onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    reason: 'New Business',
    source: '',
    message: '',
    agreed: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreed) {
      alert('Please agree to the privacy policy to continue.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <section className="footer-form-section">
      {/* Header */}
        <div className="footer-form__header">
          <h2
            className="footer-form__title"
            style={{
              color: titleVariant === 'white' ? '#ffffff' : 'var(--color-accent, #b95746)',
            }}
          >
            Ready to start a project?
          </h2>
          <p className="footer-form__subtitle">
            Please fill in the form below and a member of our team will be in touch to discuss your project.
          </p>
        </div>

        {submitted ? (
          <div className="footer-form__success">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17L4 12" />
            </svg>
            <div>
              <strong>Thank you for reaching out!</strong>
              <p style={{ margin: '4px 0 0', opacity: 0.8, fontSize: '0.88rem' }}>
                Your message has been received. Our team will review your inquiry and get back to you shortly.
              </p>
            </div>
          </div>
        ) : (
          <form className="footer-form" onSubmit={handleSubmit}>
            <div className="footer-form__grid">
              {/* Left Column */}
              <div className="footer-form__col">
                {/* 1. Name */}
                <div className="footer-form__field">
                  <label htmlFor="form-name" className="footer-form__label">
                    Name
                  </label>
                  <input
                    id="form-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="footer-form__input"
                  />
                </div>

                {/* 2. Reason for getting in touch */}
                <div className="footer-form__field">
                  <label htmlFor="form-reason" className="footer-form__label">
                    Reason for getting in touch
                  </label>
                  <div className="footer-form__select-wrap">
                    <select
                      id="form-reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      className="footer-form__select"
                    >
                      <option value="New Business">New Business</option>
                      <option value="Architecture & Real Estate">Architecture & Real Estate</option>
                      <option value="Interior Visualization">Interior Visualization</option>
                      <option value="360° Virtual Tour">360° Virtual Tour</option>
                      <option value="Furniture CGI">Furniture CGI</option>
                      <option value="Configurator Development">Configurator Development</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                    <span className="footer-form__select-arrow">▼</span>
                  </div>
                </div>

                {/* 3. Where did you hear about us? */}
                <div className="footer-form__field">
                  <label htmlFor="form-source" className="footer-form__label">
                    Where did you hear about us?
                  </label>
                  <input
                    id="form-source"
                    name="source"
                    type="text"
                    placeholder="e.g. Social media, Referral, Google, Other"
                    value={formData.source}
                    onChange={handleChange}
                    className="footer-form__input"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="footer-form__col">
                {/* Company name & Email split */}
                <div className="footer-form__row-split">
                  <div className="footer-form__field">
                    <label htmlFor="form-company" className="footer-form__label">
                      Company name
                    </label>
                    <input
                      id="form-company"
                      name="company"
                      type="text"
                      placeholder="Company name"
                      value={formData.company}
                      onChange={handleChange}
                      className="footer-form__input"
                    />
                  </div>

                  <div className="footer-form__field">
                    <label htmlFor="form-email" className="footer-form__label">
                      Email
                    </label>
                    <input
                      id="form-email"
                      name="email"
                      type="email"
                      required
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="footer-form__input"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="footer-form__field">
                  <label htmlFor="form-message" className="footer-form__label">
                    Message
                  </label>
                  <textarea
                    id="form-message"
                    name="message"
                    rows="4"
                    placeholder="How can we help?"
                    value={formData.message}
                    onChange={handleChange}
                    className="footer-form__textarea"
                  />
                </div>
              </div>
            </div>

            {/* Privacy Agreement Checkbox */}
            <div className="footer-form__agreement">
              <input
                id="form-agreed"
                name="agreed"
                type="checkbox"
                required
                checked={formData.agreed}
                onChange={handleChange}
                className="footer-form__checkbox"
              />
              <label htmlFor="form-agreed" className="footer-form__agreement-label">
                *Agree to{' '}
                <span
                  className="footer-form__agreement-link"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate?.('/privacy');
                  }}
                >
                  privacy policy
                </span>
              </label>
            </div>

            {/* Submit Action */}
            <div className="footer-form__actions">
              <button type="submit" className="footer-form__submit">
                <span>Submit</span>
              </button>
            </div>
          </form>
        )}
    </section>
  );
}
