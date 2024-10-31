import React, { useState } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';

import './Courses.css';

import coursesData from './courses.json';

import a from '../Assets/hand/a.jpg';
import b from '../Assets/hand/b.jpg';
import c from '../Assets/hand/c.jpg';
import d from '../Assets/hand/d.jpg';

import Life from '../Assets/coursesJourneyHome/life.png';

import Cross from '../Assets/cross-button.png';

import Pub1 from '../Assets/pub/pub1.png';
import Pub2 from '../Assets/pub/pub2.png';

const Courses: React.FC = () => {
    const navigate = useNavigate();
    const webcamRef = React.useRef<Webcam>(null);

    const BackToHome = async () => {
        navigate('/coursesJourney/home');
    };

    const GoodAnswer = async () => {

    };

    const BadAnswer = async () => {

    };

    const imageMap: { [key: string]: string } = {
        a,
        b,
        c,
        d,
    };

    const [currentExoIndex, setCurrentExoIndex] = useState(0);

    const handleNextExo = () => {
        if (currentExoIndex < coursesData.exercices.length - 1) {
            setCurrentExoIndex(currentExoIndex + 1);
        }
    };

    const currentExo = coursesData.exercices[currentExoIndex];


    const [texte, setTexte] = useState<string>('');
    const handleSubmit = (event: React.FormEvent, message: string) => {
        if (message === texte)
            handleNextExo()
    };

    const capture = React.useCallback(async () => {
        if (webcamRef.current !== null) {
            const imageSrc = webcamRef.current.getScreenshot();

            // Envoyer l'image au serveur
            if (imageSrc) {
                const blob = await fetch(imageSrc).then(res => res.blob());
                const formData = new FormData();
                formData.append('file', blob, 'image.jpg');

                try {
                    const response = await axios.post('http://localhost:5000/get-alphabet', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    console.log(response.data.message);
                    if (response.data.message == "A")
                        GoodAnswer()
                    else
                        BadAnswer()
                } catch (error) {
                    console.error('Error uploading image:', error);
                }
            }
        }
    }, [webcamRef]);

    return (
        <div className="coursesJourneyPage">
            <div className='pub'>
                <img src={Pub1} alt="Pub1" className='publicity' />
            </div>

            <div className='coursesJourney'>
                <head className="header">
                    <button onClick={BackToHome} className="cross-button">
                        <img src={Cross} alt="cross-img" className="icon" />
                    </button>
                    <span>progression bar</span>
                    <div className="icon-container">
                        <img src={Life} alt="Life" className="icon" />
                        <span className="text">5</span>
                        {/* {heartCount} */}
                    </div>
                </head>

                <body className='bodyCourses'>
                    {currentExo.type_exo === "tuto" && (
                        <div className='tuto'>
                            <h1>{currentExo.question}</h1>
                            <img
                                src={typeof currentExo.reponse[0] === 'object' && 'name' in currentExo.reponse[0] ? imageMap[currentExo.reponse[0].name] : ''}
                                alt="image"
                                className='tuto-img'
                            />
                            <button className="pushable" onClick={handleNextExo}>
                                <span className="front">
                                    Validé
                                </span>
                            </button>
                        </div>
                    )}
                    {currentExo.type_exo === "choix_multiple_image" && (
                        <div className='tuto'>
                            <h1>{currentExo.question}</h1>
                            <div className='image-selection'>
                                <button className="Img-Button">
                                    <img
                                        src={typeof currentExo.reponse[0] === 'object' && 'name' in currentExo.reponse[0] ? imageMap[currentExo.reponse[0].name] : ''}
                                        alt="image"
                                        className='choice-img'
                                    />
                                </button>
                                <button className="Img-Button">
                                    <img
                                        src={typeof currentExo.reponse[1] === 'object' && 'name' in currentExo.reponse[1] ? imageMap[currentExo.reponse[1].name] : ''}
                                        alt="image"
                                        className='choice-img'
                                    />
                                </button>
                                <button className="Img-Button">
                                    <img
                                        src={typeof currentExo.reponse[2] === 'object' && 'name' in currentExo.reponse[2] ? imageMap[currentExo.reponse[2].name] : ''}
                                        alt="image"
                                        className='choice-img'
                                    />
                                </button>
                                <button className="Img-Button">
                                    <img
                                        src={typeof currentExo.reponse[3] === 'object' && 'name' in currentExo.reponse[3] ? imageMap[currentExo.reponse[3].name] : ''}
                                        alt="image"
                                        className='choice-img'
                                    />
                                </button>
                            </div>
                            <button className="pushable" onClick={handleNextExo}>
                                <span className="front">
                                    Validé
                                </span>
                            </button>
                        </div>
                    )}
                    {currentExo.type_exo === "ecrire_signe" && (
                        <div className='tuto'>
                            <h1>{currentExo.question}</h1>
                            <img
                                src={imageMap[currentExo.reponse_attendue]}
                                alt="image"
                                className='write-img'
                            />
                            <form onSubmit={(e) => handleSubmit(e, currentExo.reponse_attendue)}>
                                <input
                                    type="text"
                                    value={texte}
                                    onChange={(e) => setTexte(e.target.value)}
                                />
                                <button className="pushable">
                                    <span className="front">
                                        Validé
                                    </span>
                                </button>
                            </form>

                        </div>
                    )}
                    {currentExo.type_exo === "choix_multiple_signification" && (
                        <div className='tuto'>
                            <h1>{currentExo.question}</h1>
                            <img
                                src={imageMap[currentExo.reponse_attendue]}
                                alt="image"
                                className='multiple-choice-img'
                            />
                            <div>
                                <button>{typeof currentExo.reponse[0] === 'object' && 'name' in currentExo.reponse[0] ? currentExo.reponse[0].name : ''}</button>
                                <button>{typeof currentExo.reponse[1] === 'object' && 'name' in currentExo.reponse[1] ? currentExo.reponse[1].name : ''}</button>
                                <button>{typeof currentExo.reponse[2] === 'object' && 'name' in currentExo.reponse[2] ? currentExo.reponse[2].name : ''}</button>
                                <button>{typeof currentExo.reponse[3] === 'object' && 'name' in currentExo.reponse[3] ? currentExo.reponse[3].name : ''}</button>
                            </div>
                            <button className="pushable" onClick={handleNextExo}>
                                <span className="front">
                                    Validé
                                </span>
                            </button>
                        </div>
                    )}
                    {currentExo.type_exo === "camera" && (
                        <div className='tuto'>
                            <h1>{currentExo.question}</h1>
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/png"
                                width={540}
                                height={480}
                            />
                            <button className="Next-Button" onClick={capture}>Capture photo</button>
                            {/* need the answer in the capture button */}
                        </div>
                    )}
                </body>
            </div>

            <div className='pub'>
                <img src={Pub2} alt="Pub2" className='publicity' />
            </div>
        </div >
    );
};

export default Courses;