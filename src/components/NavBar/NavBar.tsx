import React, { useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';

import './NavBar.css';

import Home from '$assets/NavBar/home.png';
import Haltere from '$assets/NavBar/haltere.png';
import Trophy from '$assets/NavBar/trophy.png';
import Genie from '$assets/NavBar/genie.png';
import Chest from '$assets/NavBar/chest.png';

const NavBar: React.FC = () => {
  const location = useLocation();

  const basePath = location.pathname.substring(0, location.pathname.lastIndexOf('/'));

  return (
    <div className="">
      <nav className="nav-bar">
        <NavLink to={`${basePath}/home`} className={({ isActive }) => (isActive ? 'nav-button active' : 'nav-button')}>
          <img src={Home} alt="home nav-icon" className="nav-icon" />
        </NavLink>

        <NavLink
          to={`${basePath}/training`}
          className={({ isActive }) => (isActive ? 'nav-button active' : 'nav-button')}
        >
          <img src={Haltere} alt="haltere nav-icon" className="nav-icon" />
        </NavLink>

        <NavLink
          to={`${basePath}/competition`}
          className={({ isActive }) => (isActive ? 'nav-button active' : 'nav-button')}
        >
          <img src={Trophy} alt="trophy nav-icon" className="nav-icon" />
        </NavLink>

        <NavLink
          to={`${basePath}/profile`}
          className={({ isActive }) => (isActive ? 'nav-button active' : 'nav-button')}
        >
          <img src={Genie} alt="genie nav-icon" className="nav-icon" />
        </NavLink>

        <NavLink
          to={`${basePath}/quests`}
          className={({ isActive }) => (isActive ? 'nav-button active' : 'nav-button')}
        >
          <img src={Chest} alt="chest nav-icon" className="nav-icon" />
        </NavLink>
      </nav>
    </div>
  );
};

export default NavBar;
