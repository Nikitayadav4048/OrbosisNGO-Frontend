import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button.jsx';
import { ArrowRight, Users, Award, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { Link, useNavigate } from 'react-router-dom';

// Import images
import img1 from '../assets/women-empowerment/img1.jpg';
// import img2 from '../assets/women-empowerment/img2.jpg';
import img3 from '../assets/women-empowerment/img3.jpg';
import img4 from '../assets/women-empowerment/img4.jpg';
import img5 from '../assets/women-empowerment/img5.jpg';
import img6 from '../assets/women-empowerment/img6.jpg';
import img7 from '../assets/women-empowerment/img7.jpg';
import img8 from '../assets/women-empowerment/img8.jpg';
import img9 from '../assets/women-empowerment/img9.jpg';

const HeroSection = () => {
  const { language, t } = useLanguage();
  
  // Images for slider
  const images = [
    img1,
    // img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const navigate = useNavigate();
  const handeClick = () =>{
     navigate('/signup', { state: "Donor" });
  }
   
  // const navigate = useNavigate();
  // const handeClick = () =>{
  //   navigate('/signup', { state: "Volunteer" });
  // }


  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentImageIndex(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1);
  };

  const goToNext = () => {
    setCurrentImageIndex(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh] lg:min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Where Women Lead
                <span className="text-purple-600"> Society</span>
                <span className="block">
                  <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
                    Thrives
                  </span>
                </span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto lg:mx-0">
                Together, we build a future where every woman can learn, earn, and lead with confidence.
              </p>
            </div>

            {/* Stats */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-2 sm:p-3 bg-purple-100 rounded-full">
                    <Users className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">5000+</div>
                <div className="text-xs sm:text-sm text-gray-600">{t('hero.stats.womenTrained')}</div>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-2 sm:p-3 bg-orange-100 rounded-full">
                    <Award className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">50+</div>
                <div className="text-xs sm:text-sm text-gray-600">{t('hero.stats.programs')}</div>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-2 sm:p-3 bg-pink-100 rounded-full">
                    <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-pink-600" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">25+</div>
                <div className="text-xs sm:text-sm text-gray-600">{t('hero.stats.states')}</div>
              </div>
            </div> */}

            {/* CTA Buttons - 2x2 Grid Layout */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto lg:mx-0">
              {/* First Row */}
              {/* <Link to="/signup" className="w-full"> */}
                <Button
              onClick={()=>handeClick()}
                  size="lg"
                  variant="outline"
                  className="w-full border border-purple-600 cursor-pointer text-purple-600 hover:bg-purple-100 hover:text-black px-4 sm:px-6 py-3 text-sm sm:text-base font-medium rounded-lg bg-white"
                >
                  Donate Now
                </Button>



              {/* </Link> */}
              <Link to="/volunteer-registration" className="w-full">
                <Button
                onClick={()=>handeClick()}
                  size="lg"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-3 text-sm sm:text-base font-medium rounded-lg"
                >
                  Volunteer With Us
                </Button>
              </Link>
              
              {/* Second Row */}
              <Link to="/beneficiary-registration" className="w-full">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border border-orange-500 cursor-pointer text-orange-600 hover:bg-orange-100 hover:text-black px-4 sm:px-6 py-3 text-sm sm:text-base font-medium rounded-lg bg-white"
                >
                  Get Support
                </Button>
              </Link>
              <a href="#about" className="w-full">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border border-gray-500 cursor-pointer text-gray-600 hover:bg-gray-100 hover:text-black px-4 sm:px-6 py-3 text-sm sm:text-base font-medium rounded-lg bg-white transition-all duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    const aboutSection = document.getElementById('about');
                    if (aboutSection) {
                      aboutSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      // Fallback if about section not found
                      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                    }
                  }}
                >
                  Know More
                </Button>
              </a>
            </div>
          </div>

          {/* Right Content - Image Slider */}
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-full order-first lg:order-last">
            <div className="bg-gradient-to-br from-purple-600 to-orange-500 rounded-2xl lg:rounded-3xl p-3 lg:p-4 h-full relative overflow-hidden">
              {/* Image Slider */}
              <div className="relative w-full h-full rounded-xl lg:rounded-2xl overflow-hidden">
                {/* Main Image */}
                <div className="relative w-full h-full">
                  <img 
                    src={images[currentImageIndex]} 
                    alt={`Women Empowerment ${currentImageIndex + 1}`} 
                    className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={goToPrevious}
                    className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-1.5 sm:p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
                  </button>
                  
                  <button
                    onClick={goToNext}
                    className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-1.5 sm:p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
                  >
                    <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
                  </button>
                  
                  {/* Dots Indicator */}
                  <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'bg-white scale-125' 
                            : 'bg-white/50 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                  
                  {/* Image Counter */}
                  {/* <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                    {currentImageIndex + 1} / {images.length}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
