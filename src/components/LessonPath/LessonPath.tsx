import React from 'react';
import WhiteOkIcon from '../../Assets/CoursesJourney/Home/whiteOk.svg';
import WhiteStarIcon from '../../Assets/CoursesJourney/Home/whiteStar.svg';
import StarIcon from '../../Assets/CoursesJourney/Home/star.svg';
import ChestIcon from '../../Assets/CoursesJourney/Home/chest.svg';
import TrophyIcon from '../../Assets/CoursesJourney/Home/trophy.svg';
import DuoMascot from '../../Assets/CoursesJourney/Home/mascott.svg';
import './LessonPath.css';

const hexToRgb = (hex: string): string => {
  // Remove the hash if present
  hex = hex.replace(/^#/, '');

  // Parse the hex values
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r}, ${g}, ${b}`;
};

interface LessonPathProps {
  onStartLesson: () => void;
  color?: string;
  curveDirection?: 'left' | 'right';
  className?: string;
  title?: string;
}

const LessonPath: React.FC<LessonPathProps> = ({ 
  onStartLesson, 
  color = 'var(--color-primary)',
  curveDirection = 'left',
  className = '',
  title = 'Describe people'
}) => {
  // Convert hex color to RGB for gradient
  const rgbColor = color.startsWith('#') ? hexToRgb(color) : '58, 148, 242'; // default blue RGB

  return (
    <div className={`lesson-path-container ${className}`}>
      {/* <div className="lesson-path-title-container">
        <hr className="lesson-path-divider" />
        <h2 className="lesson-path-title">{title}</h2>
        <hr className="lesson-path-divider" />
      </div> */}
      <div className={`lesson-path ${curveDirection}-curve`} style={{ '--path-color': color } as React.CSSProperties}>
        <button className="lesson-node completed">
          <div className="node-circle">
            <img src={WhiteOkIcon} alt="Completed" />
          </div>
        </button>
        <button onClick={onStartLesson} className="lesson-node active">
          <div className="node-circle">
            <img src={WhiteStarIcon} alt="Star" />
          </div>
          <div className="start-button">
            COMMENCER
            <div className="start-button-arrow"></div>
          </div>
        </button>
        <button className="lesson-node locked">
          <div className="node-circle">
            <img src={StarIcon} alt="Locked Star" />
          </div>
        </button>
        <button className="lesson-node locked">
          <div className="node-circle">
            <img src={ChestIcon} alt="Chest" />
          </div>
        </button>
        <button className="lesson-node locked">
          <div className="node-circle">
            <img src={TrophyIcon} alt="Trophy" />
          </div>
        </button>
      </div>
      {/* <div className={`mascot mascot-${curveDirection}-curve`}>
        <img src={DuoMascot} alt="Duo" className="duo-image" />
      </div> */}
    </div>
  );
};

export default LessonPath; 