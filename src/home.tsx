import './home.css';

import chest from './homeAssets/chest.png';
import reward from './homeAssets/trophy.png';
import star from './homeAssets/star.png';

interface HomeProps {
  showLesson: () => void;
}

const Home: React.FC<HomeProps> = ({ showLesson }) => {
  return (
    <div className="lessonSection">
      <button className="round-button left" onClick={showLesson}>
        <img src={star} alt="Icon" className="button-icon" />
      </button>
      <button className="round-button right locked" onClick={showLesson}>
        <img src={star} alt="Icon" className="button-icon" />
      </button>
      <button className="round-button left locked" onClick={showLesson}>
        <img src={chest} alt="Icon" className="button-icon" />
      </button>
      <button className="round-button right locked" onClick={showLesson}>
        <img src={star} alt="Icon" className="button-icon" />
      </button>
      <button className="round-button left locked" onClick={showLesson}>
        <img src={star} alt="Icon" className="button-icon" />
      </button>
      <button className="round-button right locked" onClick={showLesson}>
        <img src={reward} alt="Icon" className="button-icon" />
      </button>
    </div>
  );
}

export default Home;
