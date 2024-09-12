import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>A propos de nous</h3>
          <p>Information sur l'entreprise</p>
          <p>Notre équipe</p>
          <p>Carrières</p>
        </div>
        <div className="footer-section">
          <h3>Services</h3>
          <p>Nos produits</p>
          <p>Services clients</p>
          <p>Support technique</p>
        </div>
        <div className="footer-section">
          <h3>Contactez-nous</h3>
          <p>Adresse</p>
          <p>Numéro de téléphone</p>
          <p>Email</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Trio-Signo. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;