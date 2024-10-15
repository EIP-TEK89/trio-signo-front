import React, { useState } from 'react';
import { FaHome, FaUsers, FaTrophy, FaBook, FaParachuteBox } from 'react-icons/fa';
import { useLocation, NavLink } from 'react-router-dom';

import './navBar.css';

const NavBar: React.FC = () => {
    const location = useLocation();

    const basePath = location.pathname.substring(0, location.pathname.lastIndexOf('/'));

    return (
        <div className="">
            <nav className="navBar">
                <NavLink
                    to={`${basePath}/home`}
                    className={({ isActive }) => isActive ? "navButton active" : "navButton"}
                >
                    <FaHome className='icon' />
                </NavLink>

                <NavLink
                    to={`${basePath}/training`}
                    className={({ isActive }) => isActive ? "navButton active" : "navButton"}
                >
                    <FaBook className='icon' />
                </NavLink>

                <NavLink
                    to={`${basePath}/competition`}
                    className={({ isActive }) => isActive ? "navButton active" : "navButton"}
                >
                    <FaTrophy className='icon' />
                </NavLink>

                <NavLink
                    to={`${basePath}/profile`}
                    className={({ isActive }) => isActive ? "navButton active" : "navButton"}
                >
                    <FaUsers className='icon' />
                </NavLink>

                <NavLink
                    to={`${basePath}/quests`}
                    className={({ isActive }) => isActive ? "navButton active" : "navButton"}
                >
                    <FaParachuteBox className='icon' />
                </NavLink>


                {/* <button className={`navButton ${activeItem === 'home' ? 'active' : ''}`} onClick={() => handleNavClick('home')}>
                    <FaHome className='icon' />
                </button>
                <button className={`navButton ${activeItem === 'training' ? 'active' : ''}`} onClick={() => handleNavClick('training')}>
                    <FaBook className='icon' />
                </button>
                <button className={`navButton ${activeItem === 'competition' ? 'active' : ''}`} onClick={() => handleNavClick('competition')}>
                    <FaTrophy className='icon' />
                </button>
                <button className={`navButton ${activeItem === 'profile' ? 'active' : ''}`} onClick={() => handleNavClick('profile')}>
                    <FaUsers className='icon' />
                </button>
                <button className={`navButton ${activeItem === 'quests' ? 'active' : ''}`} onClick={() => handleNavClick('quests')}>
                    <FaParachuteBox className='icon' />
                </button> */}
            </nav>
        </div>
    );
};

export default NavBar;