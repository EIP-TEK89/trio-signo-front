import React, { useState } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';

import './Courses.css';

import ProgressBar from '../../components/ProgressionBar/ProgressionBar';
import Carousel from '../../components/Carousel/Carousel';

import coursesData from './Courses.json';

import Life from '../../assets/CoursesJourneyHome/life.png';

import Cross from '../../assets/cross-button.png';

const Courses: React.FC = () => {
  const navigate = useNavigate();
  const webcamRef = React.useRef<Webcam>(null);

  const BackToHome = async () => {
    navigate('/coursesJourney/home');
  };

  const [step, setStep] = useState(1);

  const [currentExoIndex, setCurrentExoIndex] = useState(0);
  const currentExo = coursesData.exercices[currentExoIndex];

  const handleNextExo = () => {
    if (currentExoIndex < coursesData.exercices.length - 1) {
      setCurrentExoIndex(currentExoIndex + 1);
      setStep(step + 1);
    }
    //display publicity on phone
  };

  const BadAnswer = async () => {
    //call life -1
    handleNextExo();
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
    setButtonAnswer(answer);
  };

  const handleMultipleImages = (message: string) => {
    if (buttonAnswer !== null) {
      if (message === buttonAnswer) handleNextExo();
      else BadAnswer();
    }
    setActiveButton(null);
    setButtonAnswer(null);
  };

  /*
   * Write the answer
   * Status: OK
   *
   */
  const [text, setText] = useState<string | undefined>(undefined);
  const handleSubmit = (message: string) => {
    if (text !== undefined) {
      if (message === text) handleNextExo();
      else BadAnswer();
    }
    setText(undefined);
  };

  /*
   * Multiple Signification answer
   * Status: OK
   *
   */
  const handleMultipleSignification = (message: string) => {
    if (buttonAnswer !== null) {
      console.log(message);
      console.log(buttonAnswer);
      if (message === buttonAnswer) handleNextExo();
      else BadAnswer();
    }
    setActiveButton(null);
    setButtonAnswer(null);
  };

  /*
   * Camera
   * Status: OK
   *
   */
  const capture = React.useCallback(
    async (answer: string) => {
      if (webcamRef.current !== null) {
        const imageSrc = webcamRef.current.getScreenshot();

        // Envoyer l'image au serveur
        if (imageSrc) {
          const blob = await fetch(imageSrc).then((res) => res.blob());
          const formData = new FormData();
          formData.append('file', blob, 'image.jpg');

          try {
            const response = await axios.post('http://localhost:5000/get-alphabet', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            console.log(response.data.message);
            console.log(answer);
            if (response.data.message == answer.toUpperCase()) handleNextExo();
            else BadAnswer();
          } catch (error) {
            console.error('Error uploading image:', error);
          }
        }
      }
    },
    [webcamRef],
  );

  return (
    <div className="coursesJourneyPage">
      <div className="pub">
        <Carousel />
      </div>

      <div className="coursesJourney">
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

        <main className="bodyCourses">
          {currentExo.type_exo === 'tuto' && (
            <div className="tuto">
              <h1>{currentExo.question}</h1>
              <img
                src={
                  typeof currentExo.reponse[0] === 'object' && 'name' in currentExo.reponse[0]
                    ? `/assets/Hand/${currentExo.reponse[0].name}.jpg`
                    : ''
                }
                alt={'image'}
                className="tuto-img"
                onError={(e) => (e.currentTarget.src = `/assets/Hand/default.jpg`)}
              />
              <button className="pushable" onClick={handleNextExo}>
                <span className="front">Validé</span>
              </button>
            </div>
          )}
          {currentExo.type_exo === 'choix_multiple_image' && (
            <div className="tuto">
              <h1>{currentExo.question}</h1>
              <div className="image-selection">
                {currentExo.reponse.map((reponse, index) => (
                  <button
                    key={index}
                    className={`Img-Button ${activeButton === index ? 'active' : ''}`}
                    onClick={() =>
                      handleButtonClick(index, typeof reponse === 'object' && 'name' in reponse ? reponse.name : null)
                    }
                  >
                    <img
                      src={typeof reponse === 'object' && 'name' in reponse ? `/assets/Hand/${reponse.name}.jpg` : ''}
                      alt="image"
                      className="choice-img"
                    />
                  </button>
                ))}
              </div>

              <button className="pushable" onClick={() => handleMultipleImages(currentExo.reponse_attendue)}>
                <span className="front">Validé</span>
              </button>
            </div>
          )}
          {currentExo.type_exo === 'ecrire_signe' && (
            <div className="tuto">
              <h1>{currentExo.question}</h1>
              <img src={`/assets/Hand/${currentExo.reponse_attendue}.jpg`} alt="image" className="write-img" />
              <form
                className="form-answer"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(currentExo.reponse_attendue);
                }}
              >
                <input
                  type="text"
                  className="form-answer-input"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <button className="pushable">
                  <span className="front">Validé</span>
                </button>
              </form>
            </div>
          )}
          {currentExo.type_exo === 'choix_multiple_signification' && (
            <div className="tuto">
              <h1>{currentExo.question}</h1>
              <img
                src={`/assets/Hand/${currentExo.reponse_attendue}.jpg`}
                alt="image"
                className="multiple-choice-img"
              />
              <div className="text-selection">
                {currentExo.reponse.map((reponse, index) => (
                  <button
                    key={index}
                    className={`text-Button ${activeButton === index ? 'active' : ''}`}
                    onClick={() =>
                      handleButtonClick(index, typeof reponse === 'object' && 'name' in reponse ? reponse.name : null)
                    }
                  >
                    {typeof reponse === 'object' && 'name' in reponse ? reponse.name : ''}
                  </button>
                ))}
              </div>
              <button className="pushable" onClick={() => handleMultipleSignification(currentExo.reponse_attendue)}>
                <span className="front">Validé</span>
              </button>
            </div>
          )}
          {currentExo.type_exo === 'camera' && (
            <div className="tuto">
              <h1>{currentExo.question}</h1>
              <Webcam audio={false} ref={webcamRef} screenshotFormat="image/png" width={540} height={480} />
              <button className="pushable" onClick={() => capture(currentExo.reponse_attendue)}>
                <span className="front">Validé</span>
              </button>
            </div>
          )}
        </main>
      </div>

      <div className="pub">
        <Carousel />
      </div>
    </div>
  );
};

export default Courses;
