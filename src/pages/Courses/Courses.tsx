import React, { useState } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import { getBaseUrl, getBaseUrlWithPort } from '$utils/getBaseUrl';

import VideoStreamUploader from '$components/VideoStream/VideoStream';

import './Courses.css';
import coursesData from './Courses.json';

import Cross from '$assets/Courses/cross.svg';
import Life from '$assets/Courses/heart.svg';


const Courses: React.FC = () => {
    const navigate = useNavigate();
    const webcamRef = React.useRef<Webcam>(null);

    const BackToHome = async () => {
        navigate('/coursesJourney/home');
    };

    const [step, setStep] = useState(1);

    const [currentExoIndex, setCurrentExoIndex] = useState(0);
    const currentExo = coursesData.exercises[currentExoIndex];
    const [borderClass, setBorderClass] = useState<string>('');

    const handleNextExo = () => {
        if (currentExoIndex < coursesData.exercises.length - 1) {
            setCurrentExoIndex(currentExoIndex + 1);
            setStep(step + 1)
        } else {
            BackToHome()
        }
        //display publicity on phone
    };

    const GoodAnswer = async () => {
        setBorderClass('green-border');
        setTimeout(() => {
            setBorderClass('');
            handleNextExo();
        }, 300);
    };

    const BadAnswer = async () => {
        setBorderClass('red-border');
        setTimeout(() => {
            setBorderClass('');
            //call life -1
            handleNextExo();
        }, 300);
    };

    /*
    * Multiple Images answer
    * Status: OK
    *
    */
    const [activeButton, setActiveButton] = useState<number | null>(null);
    const [buttonAnswer, setButtonAnswer] = useState<string | null>(null);

    const handleButtonClick = (index: number | null, answer: string | null) => {
        setActiveButton(activeButton === index ? null : index);
        setButtonAnswer(answer)
    };

    const handleMultipleImages = (message: string) => {
        if (buttonAnswer !== null) {
            if (message === buttonAnswer)
                GoodAnswer()
            else
                BadAnswer()
        }
        setActiveButton(null)
        setButtonAnswer(null)
    };


    /*
    * Write the answer
    * Status: OK
    *
    */
    const [text, setText] = useState<string | undefined>(undefined);
    const handleSubmit = (message: string) => {
        if (text !== undefined) {
            if (message === text)
                GoodAnswer()
            else
                BadAnswer()
        }
        setText(undefined)
    };

    /*
    * Multiple Signification answer
    * Status: OK
    *
    */
    const handleMultipleSignification = (message: string) => {
        if (buttonAnswer !== null) {
            console.log(message)
            console.log(buttonAnswer)
            if (message === buttonAnswer)
                GoodAnswer()
            else
                BadAnswer()
        }
        setActiveButton(null)
        setButtonAnswer(null)
    };



    /*
    * Camera
    * Status: OK
    *
    */
    const capture = React.useCallback(async (answer: string) => {
        if (webcamRef.current !== null) {
            const imageSrc = webcamRef.current.getScreenshot();

            // Envoyer l'image au serveur
            if (imageSrc) {
                const blob = await fetch(imageSrc).then(res => res.blob());
                const formData = new FormData();
                formData.append('file', blob, 'image.jpg');

                try {
                    const response = await axios.post(getBaseUrl() + ':5000/get-alphabet', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    console.log(response.data.message);
                    console.log(answer)
                    if (response.data.message == answer.toUpperCase())
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
        <div className="courses-container">
            <header className="header">
                <button onClick={BackToHome} className="cross-button">
                    <img src={Cross} alt="cross-img" className="icon" />
                </button>
                <div className="progress-container">
                    <div 
                        className="progress-bar" 
                        style={{ 
                            width: `${(currentExoIndex / (coursesData.exercises.length - 1)) * 100}%` 
                        }} 
                    />
                </div>
                <div className="icon-container">
                    <img src={Life} alt="Life" className="icon" />
                    <span className="text">5</span>
                </div>
            </header>

            <main className={`bodyCourses ${borderClass}`}>
                <h2 className="exercise-title">{currentExo.question}</h2>
                
                <div className="exercise-content">
                    {currentExo.exercise_type === "tutorial" && (
                        <div className='tuto'>
                            <img
                                src={
                                    typeof currentExo.answers[0] === 'object' && 'name' in currentExo.answers[0]
                                        ? `/Assets/Hand/${currentExo.answers[0].name}.jpg`
                                        : ''
                                }
                                alt={'image'}
                                className="tuto-img"
                                onError={(e) => (e.currentTarget.src = `/Assets/Hand/default.jpg`)}
                            />
                        </div>
                    )}

                    {currentExo.exercise_type === "multiple_choice_image" && (
                        <div className='tuto'>
                            <div className='image-selection'>
                                {currentExo.answers.map((answers, index) => (
                                    <button
                                        key={index}
                                        className={`Img-Button ${activeButton === index ? 'active' : ''}`}
                                        onClick={() => handleButtonClick(index, typeof answers === 'object' && 'name' in answers ? answers.name : null)}
                                    >
                                        <img
                                            src={typeof answers === 'object' && 'name' in answers ?
                                                `/Assets/Hand/${answers.name}.jpg`
                                                : ''}
                                            alt="image"
                                            className='choice-img'
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {currentExo.exercise_type === "write_sign" && (
                        <div className='tuto'>
                            <img
                                src={`/Assets/Hand/${currentExo.expected_answer}.jpg`}
                                alt="image"
                                className='write-img'
                            />
                            <form className='form-answer' onSubmit={(e) => { e.preventDefault(); handleSubmit(currentExo.expected_answer); }}>
                                <input
                                    type="text"
                                    className='form-answer-input'
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Écrivez votre réponse..."
                                />
                            </form>
                        </div>
                    )}

                    {currentExo.exercise_type === "multiple_choice_meaning" && (
                        <div className='tuto'>
                            <img
                                src={`/Assets/Hand/${currentExo.expected_answer}.jpg`}
                                alt="image"
                                className='multiple-choice-img'
                            />
                            <div className='text-selection'>
                                {currentExo.answers.map((answers, index) => (
                                    <button
                                        key={index}
                                        className={`text-Button ${activeButton === index ? 'active' : ''}`}
                                        onClick={() => handleButtonClick(index, typeof answers === 'object' && 'name' in answers ? answers.name : null)}
                                    >
                                        {typeof answers === 'object' && 'name' in answers ? answers.name : ''}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {currentExo.exercise_type === "camera" && (
                        <div className='tuto'>
                            <VideoStreamUploader 
                                goodAnswer={GoodAnswer} 
                                badAnswer={BadAnswer} 
                                response={currentExo.expected_answer} 
                            />
                        </div>
                    )}
                </div>
            </main>

            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-buttons">
                        <button 
                            className="footer-button"
                            onClick={() => {
                                if (currentExoIndex > 0) {
                                    setCurrentExoIndex(currentExoIndex - 1);
                                    setStep(step - 1);
                                }
                            }}
                            disabled={currentExoIndex === 0}
                        >
                            Skip
                        </button>
                    </div>
                    <div className="footer-buttons">
                        {currentExo.exercise_type === "tutorial" && (
                            <button className="footer-button primary" onClick={handleNextExo}>
                                Check
                            </button>
                        )}
                        {currentExo.exercise_type === "multiple_choice_image" && (
                            <button className="footer-button primary" onClick={() => handleMultipleImages(currentExo.expected_answer)}>
                                Check
                            </button>
                        )}
                        {currentExo.exercise_type === "write_sign" && (
                            <button className="footer-button primary" onClick={() => handleSubmit(currentExo.expected_answer)}>
                                Check
                            </button>
                        )}
                        {currentExo.exercise_type === "multiple_choice_meaning" && (
                            <button className="footer-button primary" onClick={() => handleMultipleSignification(currentExo.expected_answer)}>
                                Check
                            </button>
                        )}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Courses;
