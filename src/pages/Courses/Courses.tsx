import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { useNavigate, useParams } from 'react-router-dom';
import { getBaseUrl, getBaseUrlWithPort } from '$utils/getBaseUrl';
import { useExercisesByLesson } from '$hooks/useExercices';
import { fetchExerciseById } from '$services/exercicesServices';

import VideoStreamUploader from '$components/VideoStream/VideoStream';
import ProgressBar from '$components/Progressionbar/Progressionbar';

import './Courses.css';

import Cross from '$assets/Courses/cross.svg';
import Life from '$assets/Courses/heart.svg';
import Good from '$assets/Courses/good.svg';
import Error from '$assets/Courses/error.svg';

const Courses: React.FC = () => {
  // All hooks at the top
  const navigate = useNavigate();
  const { lessonId } = useParams<{ lessonId: string }>();
  const { exercises, loading, error } = useExercisesByLesson(lessonId || '');
  const [lessonExercises, setLessonExercises] = useState<any[]>([]);
  const [detailsLoading, setDetailsLoading] = useState(true);
  const webcamRef = React.useRef<Webcam>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [step, setStep] = useState(1);
  const [currentExoIndex, setCurrentExoIndex] = useState(0);
  const [borderClass, setBorderClass] = useState<string>('');
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [buttonAnswer, setButtonAnswer] = useState<string | null>(null);
  const [text, setText] = useState<string | undefined>(undefined);

  // Move capture useCallback to top level
  const capture = React.useCallback(
    async (answer: string) => {
      if (webcamRef.current !== null) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          const blob = await fetch(imageSrc).then((res) => res.blob());
          const formData = new FormData();
          formData.append('file', blob, 'image.jpg');
          try {
            const response = await axios.post(getBaseUrl() + ':5000/get-alphabet', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            console.log(response.data.message);
            console.log(answer);
            if (response.data.message == answer.toUpperCase()) GoodAnswer();
            else BadAnswer();
          } catch (error) {
            console.error('Error uploading image:', error);
          }
        }
      }
    },
    [webcamRef],
  );

  useEffect(() => {
    if (!exercises || exercises.length === 0) return;
    setDetailsLoading(true);
    Promise.all(exercises.map((exo) => fetchExerciseById(exo.id)))
      .then((results) => {
        setLessonExercises(results);
        setDetailsLoading(false);
      })
      .catch(() => setDetailsLoading(false));
  }, [exercises]);

  // Now do conditional returns
  if (loading || detailsLoading) return <div>Loading exercises...</div>;
  if (error) return <div>Error loading exercises</div>;
  if (!lessonExercises.length) return <div>No exercises found for this lesson.</div>;

  console.log(lessonExercises);

  const BackToHome = async () => {
    navigate('/coursesJourney/home');
  };

  const currentExo = lessonExercises[currentExoIndex];

  const handleNextExo = () => {
    setShowSuccess(false);
    setShowError(false);
    if (currentExoIndex < lessonExercises.length - 1) {
      setCurrentExoIndex(currentExoIndex + 1);
      setStep(step + 1);
    } else {
      BackToHome();
    }
    //display publicity on phone
  };

  const GoodAnswer = async () => {
    setShowSuccess(true);
    setShowError(false);
    setTimeout(() => {
      setBorderClass('');
    }, 300);
  };

  const BadAnswer = async () => {
    setShowError(true);
    setShowSuccess(false);
    setTimeout(() => {
      setBorderClass('');
    }, 300);
  };

  // Move handleButtonClick above render
  const handleButtonClick = (index: number | null, answer: string | null) => {
    setActiveButton(activeButton === index ? null : index);
    setButtonAnswer(answer);
  };

  /*
   * Multiple Images answer
   * Status: OK
   *
   */
  const handleMultipleImages = (message: string) => {
    if (buttonAnswer !== null) {
      if (message === buttonAnswer) GoodAnswer();
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
  const handleSubmit = (message: string) => {
    if (text !== undefined) {
      if (message === text) GoodAnswer();
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
      if (message === buttonAnswer) GoodAnswer();
      else BadAnswer();
    }
    setActiveButton(null);
    setButtonAnswer(null);
  };

  // Helper to check answer for each type
  const getCorrectAnswer = (exo: any) => {
    // For WORD_TO_IMAGE, the correct answer is exo.sign.word
    // For IMAGE_TO_WORD, the correct answer is exo.sign.word
    return exo.sign?.word;
  };

  return (
    <div className="courses-container">
      <header className="header">
        <button onClick={BackToHome} className="cross-button">
          <img src={Cross} alt="cross-img" className="icon" />
        </button>
        <ProgressBar currentStep={step} />
        <div className="icon-container">
          <img src={Life} alt="Life" className="icon" />
          <span className="text">5</span>
        </div>
      </header>

      <main className={`bodyCourses ${borderClass}`}>
        <h2 className="exercise-title">{currentExo.prompt}</h2>

        <div className="exercise-content">
          {/* WORD_TO_IMAGE: show prompt, sign video, options as text */}
          {currentExo.type === 'WORD_TO_IMAGE' && (
            <div className="tuto">
              <img src={currentExo.sign?.mediaUrl} className="tuto-img" />
              <div className="image-selection">
                {currentExo.options?.map((option: string, index: number) => (
                  <button
                    key={index}
                    className={`Img-Button ${activeButton === index ? 'active' : ''}`}
                    onClick={() => handleButtonClick(index, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* IMAGE_TO_WORD: show prompt, sign video, options as text */}
          {currentExo.type === 'IMAGE_TO_WORD' && (
            <div className="tuto">
              <img src={currentExo.sign?.mediaUrl} className="tuto-img" />
              <div className="text-selection">
                {currentExo.options?.map((option: string, index: number) => (
                  <button
                    key={index}
                    className={`text-Button ${activeButton === index ? 'active' : ''}`}
                    onClick={() => handleButtonClick(index, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentExo.type === 'tutorial' && (
            <div className="tuto">
              {/* You may need to adjust this for your API structure */}
              {/* <img src={...} alt={'image'} className="tuto-img" /> */}
            </div>
          )}

          {currentExo.type === 'multiple_choice_image' && (
            <div className="tuto">
              <div className="image-selection">
                {currentExo.options?.map((option, index) => (
                  <button
                    key={index}
                    className={`Img-Button ${activeButton === index ? 'active' : ''}`}
                    onClick={() => handleButtonClick(index, option)}
                  >
                    {/* You may need to adjust the image source for your API */}
                    {/* <img src={...} alt="image" className="choice-img" /> */}
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentExo.type === 'write_sign' && (
            <div className="tuto">
              {/* <img src={...} alt="image" className="write-img" /> */}
              <form
                className="form-answer"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(currentExo.expected_answer); // You may need to update this
                }}
              >
                <input
                  type="text"
                  className="form-answer-input"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Écrivez votre réponse..."
                />
              </form>
            </div>
          )}

          {currentExo.type === 'multiple_choice_meaning' && (
            <div className="tuto">
              {/* <img src={...} alt="image" className="multiple-choice-img" /> */}
              <div className="text-selection">
                {currentExo.options?.map((option, index) => (
                  <button
                    key={index}
                    className={`text-Button ${activeButton === index ? 'active' : ''}`}
                    onClick={() => handleButtonClick(index, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentExo.type === 'camera' && (
            <div className="tuto">
              <VideoStreamUploader
                goodAnswer={GoodAnswer}
                badAnswer={BadAnswer}
                response={currentExo.expected_answer} // You may need to update this
              />
            </div>
          )}
        </div>
      </main>

      <footer className={`footer ${showSuccess ? 'success-state' : ''} ${showError ? 'error-state' : ''}`}>
        <div className="footer-content">
          {showSuccess ? (
            <>
              <div className="success-message-container">
                <div className="success-icon-wrapper">
                  <img src={Good} alt="success" className="success-icon" />
                </div>
                <div>
                  <div className="success-title">C'est bien !</div>
                  <div className="success-message">Bonne réponse : {getCorrectAnswer(currentExo)}</div>
                </div>
              </div>
              <button className="footer-button primary" onClick={handleNextExo}>
                CONTINUER
              </button>
            </>
          ) : showError ? (
            <>
              <div className="error-message-container">
                <div className="error-icon-wrapper">
                  <img src={Error} alt="error" className="error-icon" />
                </div>
                <div>
                  <div className="error-title">La bonne réponse est :</div>
                  <div className="error-message">{getCorrectAnswer(currentExo)}</div>
                </div>
              </div>
              <button className="footer-button error" onClick={handleNextExo}>
                CONTINUER
              </button>
            </>
          ) : (
            <>
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
                  SKIP
                </button>
              </div>
              <div className="footer-buttons">
                {(currentExo.type === 'WORD_TO_IMAGE' || currentExo.type === 'IMAGE_TO_WORD') && (
                  <button
                    className="footer-button primary"
                    onClick={() => handleMultipleImages(getCorrectAnswer(currentExo))}
                    disabled={activeButton === null}
                  >
                    CHECK
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Courses;
