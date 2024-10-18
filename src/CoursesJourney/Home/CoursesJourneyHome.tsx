import { useState, useEffect } from 'react';
import NavBar from '../navBar/navBar';
import { useNavigate } from 'react-router-dom';

import './CoursesJourneyHome.css';

import Flag from '../../Assets/coursesJourneyHome/flag.png';
import Streak from '../../Assets/coursesJourneyHome/streak.png';
import Point from '../../Assets/coursesJourneyHome/point.png';
import Life from '../../Assets/coursesJourneyHome/life.png';
import Star from '../../Assets/coursesJourneyHome/star.png';

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

    const Training = async () => {
        navigate('/login');
    };

    //   if (loading) {
    //     return <div>Chargement...</div>;
    //   }

    //   if (error) {
    //     return <div>{error}</div>;
    //   }

    return (
        <div className="body">
            <div className='pub'></div>

            <div className='coursesJourney'>
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

                <body className='body'>
                    <button className="pushable unitButton" onClick={Training}>
                        <span className="front">
                            Chapitre {currentChapter}, Unité {currentUnit} <br />
                            <span>
                                {currentChapterName}
                            </span>
                        </span>
                    </button>

                    <div className='journey'>
                        <button className="pushable coursesButton" onClick={Training}>
                            <img src={Star} alt="Star" className="front coursesButtonFront">
                            </img>
                        </button>
                        <button className="pushable coursesButton" onClick={Training}>
                            <img src={Star} alt="Star" className="front coursesButtonFront">
                            </img>
                        </button>
                        <button className="pushable coursesButton" onClick={Training}>
                            <img src={Star} alt="Star" className="front coursesButtonFront">
                            </img>
                        </button>
                        <button className="pushable coursesButton" onClick={Training}>
                            <img src={Star} alt="Star" className="front coursesButtonFront">
                            </img>
                        </button>
                    </div>



                </body>

                <NavBar />
            </div>

            <div className='pub'></div>
        </div>
    );
};

export default CoursesJourneyHome;