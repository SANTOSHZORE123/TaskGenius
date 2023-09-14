import React, { useState, useEffect } from 'react';
import "./Slider.css"
const Slider = () => {
  const imageArray = [
    "https://th.bing.com/th/id/OIP.judBnlS1HnccS2QSm6p2bQHaDt?w=298&h=180&c=7&r=0&o=5&pid=1.7",
    "https://th.bing.com/th/id/OIP.8JDLHRxf26SOBrH41COCEQHaGY?w=221&h=190&c=7&r=0&o=5&pid=1.7",
    "https://th.bing.com/th/id/OIP.G9ojNu3_M_OTZ1tzPTLLrwAAAA?w=241&h=188&c=7&r=0&o=5&pid=1.7",
    "https://th.bing.com/th/id/OIP.yV0R68uQnkafF1ZA2riJvgHaE6?w=244&h=188&c=7&r=0&o=5&pid=1.7",
    "https://th.bing.com/th/id/OIP.xIrCNe51yShjuFErLSLXRwHaFL?w=230&h=188&c=7&r=0&o=5&pid=1.7"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
  };

  useEffect(() => {
    // Automatically advance to the next slide every 3 seconds (3000 milliseconds)
    const timer = setTimeout(nextSlide, 2000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [currentImageIndex]);

  return (
    <div className="slider">
      <img className='ImageSlider'
        src={imageArray[currentImageIndex]}
        alt={`Image ${currentImageIndex + 1}`}
      />
    </div>
  );
};

export default Slider;
