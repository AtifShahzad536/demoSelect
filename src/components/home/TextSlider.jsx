import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function TextSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      quote: "NO ONE SHOULD BE PREVENTED FROM ENJOYING KICKING A GOOD BALL",
      author: "EIGIL NIELSEN, FOUNDER OF SELECT"
    },
    {
      quote: "THE WORLD'S FIRST FOOTBALL WITH 32 PANELS WAS INVENTED BY SELECT IN 1962",
      author: "EIGIL NIELSEN, FOUNDER OF SELECT"
    },
    {
      quote: "A GOOD FOOTBALL IS ESSENTIAL FOR A GOOD GAME. THAT'S WHY WE FOCUS ON QUALITY",
      author: "EIGIL NIELSEN, FOUNDER OF SELECT"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full bg-gray-150 py-20">
      <div className="relative text-center">
       

        <div className="relative overflow-hidden h-48 flex items-center justify-center">
          <div 
            className="transition-transform duration-500 ease-in-out flex"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              width: `${slides.length * 100}%`,
            }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0 flex flex-col items-center justify-center px-4">
                <p className="relative text-gray-800 font-black text-2xl md:text-4xl font-bold mb-4 px-6 md:px-24 text-center whitespace-normal">
                  <span className="text-gray-300 text-5xl md:text-8xl font-serif absolute -top-6 md:-top-8 left-2 md:left-12 opacity-75">"</span>
                  <span className="text-lg md:text-3xl">{slide.quote}</span>
                  <span className="text-gray-300 text-5xl md:text-8xl font-serif absolute -bottom-6 md:-bottom-8 right-2 md:right-12 opacity-75">"</span>
                </p>
                <p className="text-base md:text-lg text-gray-600 uppercase tracking-wider font-medium">{slide.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows and Dots */}
        <div className="flex justify-center items-center mt-12 space-x-8">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-300 transition-all duration-300 hover:scale-110"
          >
            <FaChevronLeft className="text-black text-sm" />
          </button>
          
          {/* Navigation Dots */}
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-gray-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-300 transition-all duration-300 hover:scale-110"
          >
            <FaChevronRight className="text-black text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}
