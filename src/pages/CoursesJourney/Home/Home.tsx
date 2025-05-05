import React from 'react';
import Navbar from '$components/NavBar/NavBar';
import RightSidebar from '$components/RightSidebar/RightSidebar';
import LessonPath from '$components/LessonPath/LessonPath';
import GuideIcon from '$assets/CoursesJourney/Home/guide.svg';
import BackArrowIcon from '$assets/CoursesJourney/Home/backArrow.svg';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const GoToCourses = async () => {
    navigate('/courses');
  };

  return (
    <div className="duolingo-container">
      {/* Left Sidebar */}
      <Navbar />

      {/* Main Content */}
      <main className="main-content">
        <header className="lesson-header">
          <div className="lesson-block">
            <div className="lesson-title">
              <button className="back-button">
                <img src={BackArrowIcon} alt="Back" className="back-arrow" />
                CHAPITRE 1, UNITÉ 1
              </button>
              <h1>Utilise des mots de base</h1>
            </div>
            <button className="guide-button">
              <img src={GuideIcon} alt="Guide" />
              <span>GUIDE</span>
            </button>
          </div>
        </header>

        {/* Lesson Paths */}
        <div className="lesson-paths-container">
          <LessonPath
            onStartLesson={GoToCourses}
            color="var(--color-green-primary)"
            curveDirection="left"
            title="Describe people"
          />
          <LessonPath onStartLesson={GoToCourses} color="#9B6DFF" curveDirection="right" title="Family members" />
          <LessonPath onStartLesson={GoToCourses} color="#FFD700" curveDirection="left" title="Basic phrases" />
          <LessonPath onStartLesson={GoToCourses} color="#FF6B6B" curveDirection="right" title="Common verbs" />
        </div>
      </main>

      {/* Right Sidebar */}
      <RightSidebar cards={[{ type: 'super' }, { type: 'league' }, { type: 'quest' }, { type: 'badge' }]} />
    </div>
  );
};

export default HomePage;
