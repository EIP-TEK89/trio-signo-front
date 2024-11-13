import React, { useState } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';

import './Courses.css';

import ProgressBar from "../ProgressionBar/ProgressionBar";
import Carousel from '../Carousel/Carousel';

import coursesData from './Courses.json';

import Life from '../Assets/CoursesJourneyHome/life.png';

import Cross from '../Assets/cross-button.png';

const Courses: React.FC = () => {
    const navigate = useNavigate();
    const webcamRef = React.useRef<Webcam>(null);

    const BackToHome = async () => {
        navigate('/coursesJourney/home');
    };

    const [step, setStep] = useState(1);

    const [currentExoIndex, setCurrentExoIndex] = useState(0);

    const handleNextExo = () => {
        if (currentExoIndex < coursesData.exercices.length - 1) {
            setCurrentExoIndex(currentExoIndex + 1);
            setStep(step + 1)
        }
    };

    const currentExo = coursesData.exercices[currentExoIndex];


    const [texte, setTexte] = useState<string>('');
    const handleSubmit = (event: React.FormEvent, message: string) => {
        if (message === texte)
            handleNextExo()
    };

    const [activeButton, setActiveButton] = useState<number | null>(null);
    const [buttonAnswer, setButtonAnswer] = useState<string | null>(null);

    const handleButtonClick = (index: number | null, answer: string | null) => {
        setActiveButton(activeButton === index ? null : index);
        console.log(answer)
        setButtonAnswer(answer)
    };

    const BadAnswer = async () => {
        //call life -1
        handleNextExo()
    };

    const capture = React.useCallback(async (answer: string) => {
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
                    console.log(answer)
                    if (response.data.message == answer.toUpperCase())
                        handleNextExo()
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
                <Carousel />
            </div>

            <div className='coursesJourney'>
                <head className="header">
                    <button onClick={BackToHome} className="cross-button">
                        <img src={Cross} alt="cross-img" className="icon" />
                    </button>
                    <ProgressBar currentStep={step} />
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
                                src={
                                    typeof currentExo.reponse[0] === 'object' && 'name' in currentExo.reponse[0]
                                        ? `/Assets/Hand/${currentExo.reponse[0].name}.jpg`
                                        : ''
                                }
                                alt={'image'}
                                className="tuto-img"
                                onError={(e) => (e.currentTarget.src = `/Assets/Hand/default.jpg`)}
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
                                {currentExo.reponse.map((reponse, index) => (
                                    <button
                                        key={index}
                                        className={`Img-Button ${activeButton === index ? 'active' : ''}`}
                                        onClick={() => handleButtonClick(index, typeof reponse === 'object' && 'name' in reponse ? reponse.name : null)}
                                    >
                                        <img
                                            src={typeof reponse === 'object' && 'name' in reponse ? 
                                            `/Assets/Hand/${reponse.name}.jpg` 
                                            : ''}
                                            alt="image"
                                            className='choice-img'
                                        />
                                    </button>
                                ))}
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
                                src={`/Assets/Hand/${currentExo.reponse_attendue}.jpg`}
                                alt="image"
                                className='write-img'
                            />
                            <form className='form-answer' onSubmit={(e) => handleSubmit(e, currentExo.reponse_attendue)}>
                                <input
                                    type="text"
                                    className='form-answer-input'
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
                                src={`/Assets/Hand/${currentExo.reponse_attendue}.jpg`}
                                alt="image"
                                className='multiple-choice-img'
                            />
                            <div className='text-selection'>
                                {currentExo.reponse.map((reponse, index) => (
                                    <button
                                        key={index}
                                        className={`text-Button ${activeButton === index ? 'active' : ''}`}
                                        onClick={() => handleButtonClick(index, typeof reponse === 'object' && 'name' in reponse ? reponse.name : null)}
                                    >
                                        {typeof reponse === 'object' && 'name' in reponse ? reponse.name : ''}
                                    </button>
                                ))}
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
                            <button className="pushable" onClick={() => capture(currentExo.reponse_attendue)}>
                                <span className="front">
                                    Validé
                                </span>
                            </button>
                        </div>
                    )}
                </body>
            </div >

            <div className='pub'>
                <Carousel />
            </div>
        </div >
    );
};

export default Courses;