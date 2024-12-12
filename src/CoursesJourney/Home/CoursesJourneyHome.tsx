import { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import { useNavigate } from 'react-router-dom';

import './CoursesJourneyHome.css';

import Carousel from '../../Carousel/Carousel';

import Flag from '../../assets/CoursesJourneyHome/flag.png';
import Streak from '../../assets/CoursesJourneyHome/streak.png';
import Point from '../../assets/CoursesJourneyHome/point.png';
import Life from '../../assets/CoursesJourneyHome/life.png';
import Star from '../../assets/CoursesJourneyHome/star.png';

const CoursesJourneyHome: React.FC = () => {
    const navigate = useNavigate();

    const [flameCount, setFlameCount] = useState<number>(0);
    const [starCount, setStarCount] = useState<number>(0);
    const [heartCount, setHeartCount] = useState<number>(0);
    const [currentUnit, setCurrentUnit] = useState<number>(0);
    const [currentChapter, setCurrentChapter] = useState<number>(0);
    const [currentChapterName, setCurrentChapterName] = useState<string>("Le bug réseau");
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
                const { flameCount, starCount, heartCount, currentUnit, currentChapter, currentChapterName } = data;
                setFlameCount(flameCount);
                setStarCount(starCount);
                setHeartCount(heartCount);
                setCurrentUnit(currentUnit);
                setCurrentChapter(currentChapter);
                setCurrentChapterName(currentChapterName);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Erreur lors de la récupération des données:', err);
                setError('Une erreur est survenue lors du chargement des données.');
                setLoading(false);
            });
    }, []);

    const Courses = async () => {
        navigate('/courses');
    };

    const Training = async () => {
        navigate('/coursesJourney/Training');
    };

    return (
        <div className="courses-journey-page">
            <div className='pub'>
                <Carousel />
            </div>

            <div className='courses-journey'>
                <head className="header">
                    <div className="icon-container">
                        <img src={Flag} alt="French flag" className="icon" />
                    </div>
                    <div className="icon-container">
                        <img src={Streak} alt="French flag" className="icon" />
                        <span className="text">{flameCount}</span>
                    </div>
                    <div className="icon-container">
                        <img src={Point} alt="French flag" className="icon" />
                        <span className="text">{starCount}</span>
                    </div>
                    <div className="icon-container">
                        <img src={Life} alt="French flag" className="icon" />
                        <span className="text">{heartCount}</span>
                    </div>
                </head>

                <body className='body-courses'>
                    <div className='unit-button'>
                        <button className="pushable " onClick={Training}>
                            <span className="front">
                                Chapitre {currentChapter}, Unité {currentUnit} <br />
                                <span>
                                    {currentChapterName}
                                </span>
                            </span>
                        </button>
                    </div>


                    <div className='journey'>
                        <button className="pushable courses-button" onClick={Courses}>
                            <img src={Star} alt="Star" className="front courses-button-front" />
                        </button>
                        <button className="pushable courses-button" onClick={Courses}>
                            <img src={Star} alt="Star" className="front courses-button-front" />
                        </button>
                        <button className="pushable courses-button" onClick={Courses}>
                            <img src={Star} alt="Star" className="front courses-button-front" />
                        </button>
                        <button className="pushable courses-button" onClick={Courses}>
                            <img src={Star} alt="Star" className="front courses-button-front" />
                        </button>
                        <button className="pushable courses-button" onClick={Courses}>
                            <img src={Star} alt="Star" className="front courses-button-front" />
                        </button>
                    </div>
                </body>

                <NavBar />
            </div>

            <div className='pub'>
                <Carousel />
            </div>
        </div>
    );
};

export default CoursesJourneyHome;
