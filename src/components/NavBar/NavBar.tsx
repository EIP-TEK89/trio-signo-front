import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './NavBar.css';
import homeIcon from '$assets/components/Navbar/home.svg';
// import trainingIcon from '$assets/components/Navbar/training.svg';
// import ligueIcon from '$assets/components/Navbar/ligue.svg';
// import questsIcon from '$assets/components/Navbar/quests.svg';
// import shopIcon from '$assets/components/Navbar/shop.svg';
// import plusIcon from '$assets/components/Navbar/plus.svg';
import logoFull from '$assets/components/Navbar/logoFull.svg';
import logoSmall from '$assets/components/Navbar/logoSmall.svg';
import dictionaryIcon from '$assets/components/Navbar/find.svg';

const Navbar: React.FC = () => {
  const location = useLocation();
  const basePath = location.pathname.substring(0, location.pathname.lastIndexOf('/'));

  return (
    <nav className="sidebar">
      <div className="logo">
        <img src={logoFull} alt="Duolingo" className="logo-full" />
        <img src={logoSmall} alt="Duolingo" className="logo-small" />
      </div>
      <ul className="nav-items">
        <NavLink to={`${basePath}/home`} className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
          <img src={homeIcon} alt="Mon cours" className="nav-icon" />
          <span className="nav-label">MON COURS</span>
        </NavLink>
        <NavLink
          to={`${basePath}/dictionary`}
          className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
        >
          <img src={dictionaryIcon} alt="Dictionnaire" className="nav-icon" />
          <span className="nav-label">DICTIONNAIRE</span>
        </NavLink>
        {/* Uncomment the following lines if you want to include these sections in the future */}
        {/* <NavLink to={`${basePath}/training`} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <img src={trainingIcon} alt="Entraînement" className="nav-icon" />
          <span className="nav-label">ENTRAÎNEMENT</span>
        </NavLink> */}
        {/* <NavLink to={`${basePath}/league`} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <img src={ligueIcon} alt="Ligues" className="nav-icon" />
          <span className="nav-label">LIGUES</span>
        </NavLink> */}
        {/* <NavLink to={`${basePath}/quests`} className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
          <img src={questsIcon} alt="Quêtes" className="nav-icon" />
          <span className="nav-label">QUÊTES</span>
        </NavLink> */}
        {/* <NavLink to={`${basePath}/shop`} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <img src={shopIcon} alt="Boutique" className="nav-icon" />
          <span className="nav-label">BOUTIQUE</span>
        </NavLink> */}
        <NavLink to={`${basePath}/profile`} className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
          <div className="nav-icon profile-icon">D</div>
          <span className="nav-label">PROFIL</span>
        </NavLink>
        {/* <NavLink to={`${basePath}/plus`} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <img src={plusIcon} alt="Plus" className="nav-icon" />
          <span className="nav-label">PLUS</span>
        </NavLink> */}
      </ul>
    </nav>
  );
};

export default Navbar;
