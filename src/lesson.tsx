import React, { useState } from 'react';
import Webcam from 'react-webcam';
import './lesson.css';

import a from './hand/a.jpg';
import b from './hand/b.jpg';
import i from './hand/i.jpg';
import e from './hand/e.jpg';

import bravo from './hand/bravo.gif';

interface LessonProps {
    showHome: () => void;
}

const Lesson: React.FC<LessonProps> = ({ showHome }) => {
    const webcamRef = React.useRef<Webcam>(null);
    const [display, setDisplay] = useState(0);
    const [letter, setLetter] = useState('');

    const nextStep = () => {
        setDisplay(display + 1);
    };

    const nextStepSelection = () => {
        if (letter === 'a')
            setDisplay(display + 1);
    };

    const aLetter = () => {
        setLetter('a');
    };

    const bLetter = () => {
        setLetter('b');
    };

    const iLetter = () => {
        setLetter('i');
    };

    const eLetter = () => {
        setLetter('e');
    };

    const capture = React.useCallback(async () => {
        if (webcamRef.current !== null) {
            const imageSrc = webcamRef.current.getScreenshot();

            // Envoyer l'image au serveur
            if (imageSrc) {
                try {
                    const response = await fetch('http://localhost:5000/get-alphabet', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ image: imageSrc }),
                    });

                    const result = await response.json();
                    console.log(result);
                } catch (error) {
                    console.error('Erreur lors de l\'envoi de l\'image:', error);
                }
            }
        }
    }, [webcamRef]);

    return (
        <div >
            {display === 0 && <div className="lessonSection">
                <h1 className="Sign-Name">A</h1>
                <img className="Sign-Img" src={a} alt="A sign" />
                <button className="Next-Button" onClick={nextStep}>Continuer</button>
            </div>
            }
            {display === 1 && <div className="lessonSection">
                <h1 className="Sign-Name">A</h1>
                <div className="Sign-Selection">
                    <button className="Img-Button" onClick={aLetter}>
                        <img className="Sign-Img" src={a} alt="A sign" />
                    </button>
                    <button className="Img-Button" onClick={bLetter}>
                        <img className="Sign-Img" src={b} alt="B sign" />
                    </button>
                    <button className="Img-Button" onClick={iLetter}>
                        <img className="Sign-Img" src={i} alt="I sign" />
                    </button>
                    <button className="Img-Button" onClick={eLetter}>
                        <img className="Sign-Img" src={e} alt="E sign" />
                    </button>
                </div>
                <button className="Next-Button" onClick={nextStepSelection}>Continuer</button>
            </div>
            }
            {display === 2 && <div className="lessonSection">
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={640}
                    height={480}
                />
                <button onClick={capture}>Capture photo</button>
                <button className="Next-Button" onClick={nextStepSelection}>Continuer</button>
            </div>
            }
            {
                display === 3 && <div className="lessonSection">
                    <h1 className="Sign-Name">Bravo</h1>
                    <img className="Sign-Img" src={bravo} alt="Bravo sign" />
                    <button className="Next-Button" onClick={showHome}>Continuer</button>
                </div>
            }
        </div >
    );
};

export default Lesson;