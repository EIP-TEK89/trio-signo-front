import React from 'react';
import WhiteOkIcon from '$assets/CoursesJourney/Home/whiteOk.svg';
import WhiteStarIcon from '$assets/CoursesJourney/Home/whiteStar.svg';
import StarIcon from '$assets/CoursesJourney/Home/star.svg';
import ChestIcon from '$assets/CoursesJourney/Home/chest.svg';
import TrophyIcon from '$assets/CoursesJourney/Home/trophy.svg';
import DuoMascot from '$assets/CoursesJourney/Home/mascott.svg';
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
  onStartLesson: (lessonId: string) => void;
  color?: string;
  curveDirection?: 'left' | 'right';
  className?: string;
  title?: string;
  lessons: {
    id: string;
    title: string;
    progress: any;
  }[];
}

const LessonPath: React.FC<LessonPathProps> = ({
  onStartLesson,
  color = 'var(--color-primary)',
  curveDirection = 'left',
  className = '',
  title = '',
  lessons,
}) => {
  // Convert hex color to RGB for gradient
  const rgbColor = color.startsWith('#') ? hexToRgb(color) : '58, 148, 242'; // default blue RGB

  return (
    <div className={`lesson-path-container ${className}`}>
      <div className="separator" />
      <div className={`lesson-path ${curveDirection}-curve`} style={{ '--path-color': color } as React.CSSProperties}>
        {lessons.map((lesson, idx) => {
          // Find the first locked node
          const isFirstLocked = !lesson.progress && lessons.findIndex((l) => !l.progress) === idx;
          return (
            <button
              key={lesson.id}
              className={`lesson-node ${lesson.progress ? 'completed' : 'locked'}`}
              onClick={() => !lesson.progress && onStartLesson(lesson.id)}
              disabled={!!lesson.progress}
              style={{ position: 'absolute' }}
            >
              <div className="node-circle">
                <img src={lesson.progress ? WhiteOkIcon : StarIcon} alt={lesson.title} />
              </div>
              {isFirstLocked && (
                <div className="start-button">
                  COMMENCER
                  <div className="start-button-arrow"></div>
                </div>
              )}
              {/* <div className="lesson-label">{lesson.title}</div> */}
            </button>
          );
        })}
      </div>
      {/* <div className={`mascot mascot-${curveDirection}-curve`}>
        <img src={DuoMascot} alt="Duo" className="duo-image" />
      </div> */}
    </div>
  );
};

export default LessonPath;
