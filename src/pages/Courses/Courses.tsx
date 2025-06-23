import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { useNavigate, useParams } from 'react-router-dom';
import { useExercisesByLesson } from '$hooks/useExercices';
import { fetchExerciseById } from '$services/exercicesServices';
import { API_URL } from '$constants/routes';

import VideoStreamUploader from '$components/VideoStream/VideoStream';
import ProgressBar from '$components/Progressionbar/Progressionbar';
import Loader from '$components/Loader';

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

  // Utility function to format media URLs
  const getMediaUrl = (url: string | undefined) => {
    if (!url) return '';

    // If the URL is already absolute (starts with http or https), return it as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }

    // If the URL is relative, attach it to the API base URL
    // Remove the /api prefix if present in the URL
    const cleanUrl = url.startsWith('/api/') ? url.substring(4) : url;

    // Ensure the URL starts with a slash
    const formattedUrl = cleanUrl.startsWith('/') ? cleanUrl : `/${cleanUrl}`;

    return `${API_URL}${formattedUrl}`;
  };

  useEffect(() => {
    if (!exercises || exercises.length === 0) return;
    setDetailsLoading(true);
    Promise.all(exercises.map((exo) => fetchExerciseById(exo.id)))
      .then((results) => {
        setLessonExercises(results);
        // Log media URLs for debugging
        results.forEach((exo, idx) => {
          if (exo.sign?.mediaUrl) {
            console.log(`Exercise ${idx} - Original URL: ${exo.sign.mediaUrl}`);
            console.log(`Exercise ${idx} - Formatted URL: ${getMediaUrl(exo.sign.mediaUrl)}`);
          }
        });
        setDetailsLoading(false);
      })
      .catch((error) => {
        console.error('Error loading exercise details:', error);
        setDetailsLoading(false);
      });
  }, [exercises]);

  // Now do conditional returns
  if (loading || detailsLoading) return <Loader message="Loading exercises" />;
  if (error) return <div>Error loading exercises.</div>;
  if (!lessonExercises.length) return <div>No exercises found for this lesson.</div>;

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
    // display advertisement on phone
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
          <img
            src={Cross}
            alt="cross-img"
            className="icon"
            onError={(e) => console.error('Error loading Cross icon')}
          />
        </button>
        <ProgressBar currentStep={step} />
        <div className="icon-container">
          <img src={Life} alt="Life" className="icon" onError={(e) => console.error('Error loading Life icon')} />
          <span className="text">5</span>
        </div>
      </header>

      <main className={`bodyCourses ${borderClass}`}>
        <h2 className="exercise-title">{currentExo.prompt}</h2>

        <div className="exercise-content">
          {/* WORD_TO_IMAGE: show prompt, sign video, options as text */}
          {currentExo.type === 'WORD_TO_IMAGE' && (
            <div className="tuto">
              <img
                src={getMediaUrl(currentExo.sign?.mediaUrl)}
                className="tuto-img"
                alt={currentExo.sign?.word || 'Signe'}
                onError={(e) => {
                  console.error('Error loading image:', currentExo.sign?.mediaUrl);
                  e.currentTarget.src = '/placeholder-image.png'; // Default image on error
                }}
              />
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
              <img
                src={getMediaUrl(currentExo.sign?.mediaUrl)}
                className="tuto-img"
                alt={currentExo.sign?.word || 'Signe'}
                onError={(e) => {
                  console.error('Error loading image:', currentExo.sign?.mediaUrl);
                  e.currentTarget.src = '/placeholder-image.png'; // Default image on error
                }}
              />
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
                {currentExo.options?.map((option: string, index: number) => (
                  <button
                    key={index}
                    className={`Img-Button ${activeButton === index ? 'active' : ''}`}
                    onClick={() => handleButtonClick(index, option)}
                  >
                    {/* If option contains an image URL */}
                    {option.includes('/') || option.includes('.') ? (
                      <img
                        src={getMediaUrl(option)}
                        alt="option"
                        className="choice-img"
                        onError={(e) => {
                          console.error('Error loading image:', option);
                          e.currentTarget.src = '/placeholder-image.png';
                        }}
                      />
                    ) : (
                      option
                    )}
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
                  placeholder="Write your answer..."
                />
              </form>
            </div>
          )}

          {currentExo.type === 'multiple_choice_meaning' && (
            <div className="tuto">
              {currentExo.sign?.mediaUrl && (
                <img
                  src={getMediaUrl(currentExo.sign?.mediaUrl)}
                  alt="signe"
                  className="multiple-choice-img"
                  onError={(e) => {
                    console.error('Error loading image:', currentExo.sign?.mediaUrl);
                    e.currentTarget.src = '/placeholder-image.png';
                  }}
                />
              )}
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
                  <img
                    src={Good}
                    alt="success"
                    className="success-icon"
                    onError={(e) => console.error('Error loading Good icon')}
                  />
                </div>
                <div>
                  <div className="success-title">Well done!</div>
                  <div className="success-message">Correct answer: {getCorrectAnswer(currentExo)}</div>
                </div>
              </div>
              <button className="footer-button primary" onClick={handleNextExo}>
                CONTINUE
              </button>
            </>
          ) : showError ? (
            <>
              <div className="error-message-container">
                <div className="error-icon-wrapper">
                  <img
                    src={Error}
                    alt="error"
                    className="error-icon"
                    onError={(e) => console.error('Error loading Error icon')}
                  />
                </div>
                <div>
                  <div className="error-title">The correct answer is:</div>
                  <div className="error-message">{getCorrectAnswer(currentExo)}</div>
                </div>
              </div>
              <button className="footer-button error" onClick={handleNextExo}>
                CONTINUE
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
