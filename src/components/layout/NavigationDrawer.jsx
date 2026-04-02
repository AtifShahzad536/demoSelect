import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NavigationDrawer = ({ isOpen, onClose, data }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringBackdrop, setIsHoveringBackdrop] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);
  const navigate = useNavigate();

  const { 
    categories = [], 
    bottomImage = null,
    hideChevrons = false
  } = data || {};

  useEffect(() => {
    setCurrentSlideIndex(0);
    setActiveCategoryIndex(null);
  }, [data, isOpen]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    if (isOpen) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  let isSlider = Array.isArray(bottomImage);
  let activeImageContent = null;
  if (isSlider && bottomImage.length > 0) {
    activeImageContent = bottomImage[currentSlideIndex];
  } else if (!isSlider && bottomImage) {
    activeImageContent = bottomImage;
  }

  const handleNextSlide = (e) => {
    e.stopPropagation();
    if (isSlider) {
      setCurrentSlideIndex((prev) => (prev + 1) % bottomImage.length);
    }
  };

  const handlePrevSlide = (e) => {
    e.stopPropagation();
    if (isSlider) {
      setCurrentSlideIndex((prev) => (prev === 0 ? bottomImage.length - 1 : prev - 1));
    }
  };

  // Navigate to subcategories page when a sub-item is clicked
  const handleSubCategoryClick = (sub) => {
    onClose();
    navigate('/products/all-balls');
  };

  const activeCat = activeCategoryIndex !== null ? categories[activeCategoryIndex] : null;
  const hasSubMenu = activeCat && typeof activeCat === 'object' && activeCat.subCategories && activeCat.subCategories.length > 0;

  return (
    <>
      <div 
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm cursor-none transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        onMouseEnter={() => setIsHoveringBackdrop(true)}
        onMouseLeave={() => setIsHoveringBackdrop(false)}
      >
        {isOpen && isHoveringBackdrop && (
          <div 
            className="fixed pointer-events-none w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-75"
            style={{ 
              left: mousePos.x - 20, 
              top: mousePos.y - 20,
              zIndex: 9999
            }}
          >
            <X size={18} className="text-black" />
          </div>
        )}
      </div>

      <div className={`fixed top-0 left-0 h-[100dvh] bg-white z-[65] shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] transform flex flex-row ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${hasSubMenu ? 'w-[750px] max-w-[95vw]' : 'w-[400px] max-w-[85vw]'}`}>
        
        {/* LEFT COLUMN - Main Categories */}
        <div className="flex flex-col h-full w-[400px] flex-shrink-0 relative">
          <div className="p-8 flex justify-start">
            <button 
              onClick={onClose}
              className="p-3 border border-gray-200 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={20} className="text-black stroke-[1.5]" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-10 pb-6 custom-scrollbar">
            <ul className="flex flex-col gap-6 mt-2">
              {categories.map((cat, idx) => {
                const isObj = typeof cat === 'object';
                const name = isObj ? cat.name : cat;
                const hasItemSubMenu = isObj && cat.subCategories && cat.subCategories.length > 0;
                const isActive = activeCategoryIndex === idx;

                return (
                  <li 
                    key={idx} 
                    className="flex items-center justify-between group cursor-pointer"
                    onMouseEnter={() => setActiveCategoryIndex(idx)}
                    onClick={() => {
                      // If no sub-menu, clicking the main category also navigates
                      if (!hasItemSubMenu) {
                        onClose();
                        navigate('/products/all-balls');
                      }
                    }}
                  >
                    <span className={`relative text-lg font-normal tracking-wider transition-all duration-300 ${!hasItemSubMenu ? 'inline-block py-1 group-hover:text-black' : 'group-hover:translate-x-2'}`}>
                      {name}
                      {!hasItemSubMenu && (
                         <span className="absolute left-0 bottom-[2px] w-full h-[2px] bg-black origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                      )}
                    </span>
                    {!hideChevrons && (
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive ? 'bg-black text-white' : 'bg-gray-50 group-hover:bg-black group-hover:text-white'}`}>
                        <ChevronRight size={14} className="stroke-[1.5]" />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {activeImageContent && activeImageContent.isRawImage ? (
            <div className="p-6 mt-auto flex flex-col justify-center items-center drop-shadow-2xl hover:-translate-y-2 transition-transform duration-500 ease-out cursor-pointer">
              <img 
                  src={activeImageContent.src} 
                  alt={activeImageContent.alt} 
                  className={`max-h-56 max-w-full object-contain ${activeImageContent.noRotate ? '' : '-rotate-6 rounded-sm shadow-xl'}`}
                />
              {activeImageContent.title && (
                <h3 className={`mt-4 text-black text-sm font-bold tracking-wider ${activeImageContent.noRotate ? '' : 'text-center'}`}>{activeImageContent.title}</h3>
              )}
            </div>
          ) : (
            activeImageContent && (
              <div className="p-6 mt-auto">
                <div className="relative w-full h-64 rounded-xl overflow-hidden group cursor-pointer bg-black">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity group-hover:opacity-60"></div>
                  
                  <img 
                    key={activeImageContent.src}
                    src={activeImageContent.src} 
                    alt={activeImageContent.alt} 
                    className="w-full h-full object-cover animate-fade-in group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  <div className="absolute bottom-5 left-5 z-20 pointer-events-none">
                    {activeImageContent.badge && (
                      <span className="bg-[#481e9f] text-white text-[10px] font-bold px-2 py-1 rounded tracking-widest mb-3 inline-block">
                        {activeImageContent.badge}
                      </span>
                    )}
                    <h3 className="text-white text-xl font-bold tracking-wider">{activeImageContent.title}</h3>
                  </div>

                  {isSlider && bottomImage.length > 1 && (
                    <div className="absolute bottom-5 right-5 z-30 flex gap-2">
                      <button 
                        onClick={handlePrevSlide}
                        className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm"
                      >
                        <ChevronLeft size={14} className="text-black stroke-[3]" />
                      </button>
                      <button 
                        onClick={handleNextSlide}
                        className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm"
                      >
                        <ChevronRight size={14} className="text-black stroke-[3]" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>

        {/* RIGHT COLUMN - Subcategories (click navigates to products page) */}
        <div className={`flex flex-col h-full bg-white border-l-2 border-gray-100 flex-1 overflow-hidden transition-all duration-300 ${hasSubMenu ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex-1 overflow-y-auto pt-[120px] px-12 custom-scrollbar pb-12">
            {hasSubMenu && (
              <ul className="flex flex-col gap-6 animate-fade-in">
                {activeCat.subCategories.map((sub, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-6 cursor-pointer group"
                    onClick={() => handleSubCategoryClick(sub)}
                  >
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
                      <img 
                        src={sub.image} 
                        alt={sub.name} 
                        className="w-[120%] h-[120%] object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <span className="relative text-[14px] font-medium tracking-wider text-gray-800 transition-colors inline-block py-1">
                      {sub.name}
                      <span className="absolute left-0 bottom-0 w-full h-[1.5px] bg-black origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>
    </>
  );
};

export default NavigationDrawer;
