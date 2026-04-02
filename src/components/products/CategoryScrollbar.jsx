import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../../data/productsData';

const CategoryScrollbar = ({ activeCategory, onCategoryChange }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction * 240, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full bg-white border-b border-gray-100 py-6 overflow-hidden">
      {/* ── Scroll Controls ── */}
      <button
        onClick={() => scroll(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors"
      >
        <ChevronLeft size={18} className="text-black" />
      </button>

      <button
        onClick={() => scroll(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors"
      >
        <ChevronRight size={18} className="text-black" />
      </button>

      {/* ── Simplified Category Grid ── */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto custom-scrollbar scroll-smooth px-[2%] md:px-[3%] gap-6 md:gap-10 items-stretch"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.slug;

          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.slug)}
              className={`relative flex-shrink-0 w-[160px] md:w-[240px] group transition-all duration-300`}
            >
              <div className={`relative w-full h-[100px] md:h-[140px] rounded-sm overflow-hidden border transition-all duration-300 ${
                isActive 
                  ? 'border-black shadow-md' 
                  : 'border-gray-200 hover:border-gray-400 shadow-sm'
              }`}>
                {/* Image */}
                <div className="absolute inset-0 bg-white">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className={`w-full h-full object-contain p-4 transition-transform duration-500 ${
                      isActive ? 'scale-105' : 'group-hover:scale-105'
                    }`}
                  />
                </div>

                {/* Subtle Overlay */}
                <div className={`absolute inset-0 bg-black/5 transition-opacity ${isActive ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`} />
              </div>

              {/* Label below the card for a cleaner look */}
              <div className="mt-2 text-center">
                <span className={`text-[10px] md:text-xs font-black uppercase tracking-widest transition-colors ${
                  isActive ? 'text-black' : 'text-gray-400 group-hover:text-gray-900'
                }`}>
                  {cat.name}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="activeUnderline"
                    className="h-0.5 bg-black w-full mt-1"
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryScrollbar;
