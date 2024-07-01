import React, { useState } from 'react';
import Footer from './footer';
import Header from './header';

import Home from './home';
import Lesson from './lesson';

import './App.css';

function App() {
  const [display, setDisplay] = useState('home');

  const showLesson = () => {
    setDisplay('lesson');
  };

  const showHome = () => {
    setDisplay('home');
  };

  return (
    <div className="app-container">

      <Header />

      <main className="main-content">
        <div className="ads">
          <h1>ads</h1>
        </div>
        <div className="containt">
          {display === 'home' && <Home showLesson={showLesson} />}
          {display === 'lesson' && <Lesson showHome={showHome} />}
        </div>
        <div className="ads">
          <h1>ads</h1>
        </div>

      </main >

      <Footer />

    </div >
  );
}

export default App;
