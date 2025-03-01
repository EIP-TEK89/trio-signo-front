import { useState, useEffect } from 'react';
import NavBar from '$components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';

import './CoursesJourneyQuests.css';

import Carousel from '$components/Carousel/Carousel';

const CoursesJourneyQuests: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="courses-journey-page">
            {/* <div className='pub'>
                <Carousel />
            </div> */}

            <div className='courses-journey'>
                <body className='body-courses'>

                </body>

                <NavBar />
            </div>

            {/* <div className='pub'>
                <Carousel />
            </div> */}
        </div>
    );
};

export default CoursesJourneyQuests;
