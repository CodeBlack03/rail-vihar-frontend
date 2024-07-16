import React, { useState, useEffect } from 'react';
import './ImageSlideshow.css';

const images = [
  '../../public/images/society1.jpg',
  '../../public/images/society2.jpg',
  '../../public/images/society3.jpg'
];

const ImageSlideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow">
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide ${index === currentImageIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      ))}
    </div>
  );
};

export default ImageSlideshow;
