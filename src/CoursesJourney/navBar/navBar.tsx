import React, { useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';

import './navBar.css';

import Home from '../../Assets/navBar/home.png';
import Haltere from '../../Assets/navBar/haltere.png';
import Trophy from '../../Assets/navBar/trophy.png';
import Genie from '../../Assets/navBar/genie.png';
import Chest from '../../Assets/navBar/chest.png';

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
                    <img src={Home} alt="home icon" className="icon" />
                </NavLink>

                <NavLink
                    to={`${basePath}/training`}
                    className={({ isActive }) => isActive ? "navButton active" : "navButton"}
                >
                    <img src={Haltere} alt="haltere icon" className="icon" />
                </NavLink>

                <NavLink
                    to={`${basePath}/competition`}
                    className={({ isActive }) => isActive ? "navButton active" : "navButton"}
                >
                    <img src={Trophy} alt="trophy icon" className="icon" />
                </NavLink>

                <NavLink
                    to={`${basePath}/profile`}
                    className={({ isActive }) => isActive ? "navButton active" : "navButton"}
                >
                    <img src={Genie} alt="genie icon" className="icon" />
                </NavLink>

                <NavLink
                    to={`${basePath}/quests`}
                    className={({ isActive }) => isActive ? "navButton active" : "navButton"}
                >
                    <img src={Chest} alt="chest icon" className="icon" />
                </NavLink>
            </nav>
        </div>
    );
};

export default NavBar;