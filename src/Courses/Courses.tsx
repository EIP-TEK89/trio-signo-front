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
import VideoStreamUploader from '../VideoStream/VideoStream';

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
                    const response = await axios.post('http://localhost:5000/get-alphabet', formData, {
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
        <div className="coursesJourneyPage">
            <div className='pub'>
                <Carousel />
            </div>

            <div className='coursesJourney'>
                <header className="header">
                    <button onClick={BackToHome} className="cross-button">
                        <img src={Cross} alt="cross-img" className="icon" />
                    </button>
                    <ProgressBar currentStep={step} />
                    <div className="icon-container">
                        <img src={Life} alt="Life" className="icon" />
                        <span className="text">5</span>
                        {/* {heartCount} */}
                    </div>
                </header>


                <main className={`bodyCourses ${borderClass}`}>
                    {currentExo.exercise_type === "tutorial" && (
                        <div className='tuto'>
                            <h1>{currentExo.question}</h1>
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
                            <button className="pushable" onClick={handleNextExo}>
                                <span className="front">
                                    Validé
                                </span>
                            </button>
                        </div>
                    )}
                    {currentExo.exercise_type === "multiple_choice_image" && (
                        <div className='tuto'>
                            <h1>{currentExo.question}</h1>
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

                            <button className="pushable" onClick={() => handleMultipleImages(currentExo.expected_answer)}>
                                <span className="front">
                                    Validé
                                </span>
                            </button>
                        </div>
                    )}
                    {currentExo.exercise_type === "write_sign" && (
                        <div className='tuto'>
                            <h1>{currentExo.question}</h1>
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
                                />
                                <button className="pushable">
                                    <span className="front">
                                        Validé
                                    </span>
                                </button>
                            </form>
                        </div>
                    )}
                    {currentExo.exercise_type === "multiple_choice_meaning" && (
                        <div className='tuto'>
                            <h1>{currentExo.question}</h1>
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
                            <button className="pushable" onClick={() => handleMultipleSignification(currentExo.expected_answer)}>
                                <span className="front">
                                    Validé
                                </span>
                            </button>
                        </div>
                    )}
                    {currentExo.exercise_type === "camera" && (
                        <div className='tuto'>
                            <h1>{currentExo.question}</h1>
                            <VideoStreamUploader goodAnswer={GoodAnswer} badAnswer={BadAnswer} response={currentExo.expected_answer} />
                        </div>
                    )}
                </main>
            </div >

            <div className='pub'>
                <Carousel />
            </div>
        </div >
    );
};

export default Courses;