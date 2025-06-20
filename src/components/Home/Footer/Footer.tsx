import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const socialLinks = [
    {
      href: 'https://www.instagram.com/triosigno?igsh=aWt6b3N6cXM0Mmdj',
      icon: 'https://www.svgrepo.com/show/111199/instagram.svg',
      alt: 'Instagram',
    },
    {
      href: 'https://www.tiktok.com/@triosigno?lang=fr',
      icon: 'https://www.svgrepo.com/show/452114/tiktok.svg',
      alt: 'TikTok',
    },
    {
      href: 'https://www.facebook.com/profile.php?id=61566790463664',
      icon: 'https://www.svgrepo.com/show/475647/facebook-color.svg',
      alt: 'Facebook',
    },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Logo and socials */}
          <div className="footer-brand">
            <div className="brand-header">
              <div className="brand-logo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="logo-icon"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                </svg>
              </div>
              <span className="brand-title">Triosigno</span>
            </div>
            <p className="brand-text">L'apprentissage de la LSF rendu simple, efficace et agréable.</p>
            <div className="social-list">
              {socialLinks.map(({ href, icon, alt }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer">
                  <img src={icon} alt={alt} className="social-icon" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="footer-nav">
            <h3 className="nav-title">Apprendre</h3>
            <ul className="nav-list">
              <li>
                <a href="#" className="nav-link">
                  Cours
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Dictionnaire
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Ressources
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Pratique
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-nav">
            <h3 className="nav-title">À propos</h3>
            <ul className="nav-list">
              <li>
                <a href="#" className="nav-link">
                  Notre mission
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Équipe
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Carrières
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-nav">
            <h3 className="nav-title">Aide</h3>
            <ul className="nav-list">
              <li>
                <a href="#" className="nav-link">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Communauté
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">&copy; {new Date().getFullYear()} Linguo. Tous droits réservés.</p>
          <div className="legal-list">
            <a href="#" className="legal-link">
              Confidentialité
            </a>
            <a href="#" className="legal-link">
              Conditions
            </a>
            <a href="#" className="legal-link">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
