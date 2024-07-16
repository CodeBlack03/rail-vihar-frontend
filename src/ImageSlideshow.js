import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ImageSlideshow.css';

const ImageSlideshow = () => {
  const images = [
    { src: 'society1.png', alt: 'Society Image 1' },
    { src: 'society2.jpg', alt: 'Society Image 2' },
    { src: 'society3.jpg', alt: 'Society Image 3' },
  ];

  return (
    <div className="slideshow-container">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        interval={3000}
        className="carousel-background"
      >
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </Carousel>
      <div className="centered-text">
        <h1>Rail Vihar</h1>
      </div>
    </div>
  );
};

export default ImageSlideshow;
