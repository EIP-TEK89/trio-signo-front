import React from 'react';
import Navbar from '$components/NavBar/NavBar';
import RightSidebar from '$components/RightSidebar/RightSidebar';
import LessonPath from '$components/LessonPath/LessonPath';
import GuideIcon from '$assets/CoursesJourney/Home/guide.svg';
import BackArrowIcon from '$assets/CoursesJourney/Home/backArrow.svg';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useAllLessonProgress } from '$hooks/useLessonProgress';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { progressList, loading, error } = useAllLessonProgress();
  console.log(progressList);

  const handleStartLesson = (lessonId: string) => {
    navigate(`/courses/${lessonId}`);
  };

  const goToDictionary = () => {
    navigate('/dictionary');
  };

  if (loading) return <div>Loading lesson progress...</div>;
  if (error) return <div>Error loading lesson progress</div>;

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
            <button className="guide-button" onClick={goToDictionary}>
              <img src={GuideIcon} alt="Guide" />
              <span>GUIDE</span>
            </button>
          </div>
        </header>

        {/* Lesson Paths */}
        <div className="lesson-paths-container">
          <LessonPath
            onStartLesson={handleStartLesson}
            color="var(--color-green-primary)"
            curveDirection="left"
            title="Alphabet Path"
            lessons={progressList}
          />
        </div>
      </main>

      {/* Right Sidebar */}
      <RightSidebar cards={[{ type: 'super' }, { type: 'league' }, { type: 'quest' }, { type: 'badge' }]} />
    </div>
  );
};

export default HomePage;
