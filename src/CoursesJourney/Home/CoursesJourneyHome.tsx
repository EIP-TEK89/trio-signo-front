import { useState, useEffect } from 'react';
import NavBar from '../navBar/navBar';

import './CoursesJourneyHome.css';

import Flag from '../../Assets/coursesJourneyHome/flag.png';
import Streak from '../../Assets/coursesJourneyHome/streak.png';
import Point from '../../Assets/coursesJourneyHome/point.png';
import Life from '../../Assets/coursesJourneyHome/life.png';

const CoursesJourneyHome: React.FC = () => {
    const [flameCount, setFlameCount] = useState<number>(0);
    const [starCount, setStarCount] = useState<number>(0);
    const [heartCount, setHeartCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('https://api.example.com/data')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données.');
                }
                return response.json();
            })
            .then((data) => {
                const { language, flameCount, starCount, heartCount } = data;
                setFlameCount(flameCount);
                setStarCount(starCount);
                setHeartCount(heartCount);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Erreur lors de la récupération des données:', err);
                setError('Une erreur est survenue lors du chargement des données.');
                setLoading(false);
            });
    }, []);

    //   if (loading) {
    //     return <div>Chargement...</div>;
    //   }

    //   if (error) {
    //     return <div>{error}</div>;
    //   }

    return (
        <div className="">
            <head className="header">
                <div className="icon-container">
                    <img src={Flag} alt="French flag" className="icon"/>
                </div>
                <div className="icon-container">
                <img src={Streak} alt="French flag" className="icon"/>
                    <span className="text">{flameCount}</span>
                </div>
                <div className="icon-container">
                <img src={Point} alt="French flag" className="icon"/>
                    <span className="text">{starCount}</span>
                </div>
                <div className="icon-container">
                <img src={Life} alt="French flag" className="icon"/>
                    <span className="text">{heartCount}</span>
                </div>
            </head>
            <body className='body'>
                <div className='pub'></div>
                <div className='coursesJourney'>
                    {/* button with courses / unit name -> nav to training*/}
                    {/* button with the journey */}
                </div>
                <div className='pub'></div>
            </body>
            <NavBar />
        </div>
    );
};

export default CoursesJourneyHome;