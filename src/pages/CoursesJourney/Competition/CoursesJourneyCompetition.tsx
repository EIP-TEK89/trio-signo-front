import { useState, useEffect } from 'react';
import NavBar from '$components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';

import './CoursesJourneyCompetition.css';

import Carousel from '$components/Carousel/Carousel';

const CoursesJourneyCompetition: React.FC = () => {
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

export default CoursesJourneyCompetition;
