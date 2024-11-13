import React, { useEffect, useState } from 'react';
import './Carousel.css';

import Pub1 from '../Assets/Pub/pub1.png';
import Pub2 from '../Assets/Pub/pub2.png';
import Pub3 from '../Assets/Pub/pub3.png';
import Pub4 from '../Assets/Pub/pub4.png';

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    Pub1,
    Pub2,
    Pub3,
    Pub4
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="carousel">
      {images.map((image, index) => (
        <div
          key={index}
          className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
    </div>
  );
};

export default Carousel;