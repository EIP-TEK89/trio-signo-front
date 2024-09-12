import './header.css';
import book from './homeAssets/book.png';

const Header = () => {
    return (
        <header className="header">
            <div className='sectionTitle'>
                <h1>Chapitre 1</h1>
                <p>Apprendre l'alphabet</p>
            </div>
            <img src={book} alt="lesson-icon" className="iconHeader" />
        </header>
    );
};

export default Header;