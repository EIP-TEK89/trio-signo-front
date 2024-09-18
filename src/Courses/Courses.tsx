import React, { useState } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';

import './Courses.css';
import a from '../Assets/hand/a.jpg';
import b from '../Assets/hand/b.jpg';
import i from '../Assets/hand/i.jpg';
import e from '../Assets/hand/e.jpg';

import bravo from '../Assets/hand/bravo.gif';

const Courses: React.FC = () => {
    const navigate = useNavigate();
    const webcamRef = React.useRef<Webcam>(null);
    const [display, setDisplay] = useState(0);
    const [letter, setLetter] = useState('');

    const BackToHome = async () => {
        navigate('/');
      };

    const nextStep = () => {
        setDisplay(display + 1);
    };

    const end = () => {
        setDisplay(3);
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
            console.log('capture');
            const imageSrc = webcamRef.current.getScreenshot();
            console.log('captured');


            // Envoyer l'image au serveur
            if (imageSrc) {
                console.log('img ok');
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
                        end()
                } catch (error) {
                    console.error('Error uploading image:', error);
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
                    screenshotFormat="image/png"
                    width={640}
                    height={480}
                />
                <button onClick={capture}>Capture photo</button>
            </div>
            }
            {display === 3 && <div className="lessonSection">
                <h1 className="Sign-Name">Bravo</h1>
                <img className="Sign-Img" src={bravo} alt="Bravo sign" />
                <button className="Next-Button" onClick={BackToHome}>Continuer</button>
            </div>
            }
        </div >
    );
};

export default Courses;