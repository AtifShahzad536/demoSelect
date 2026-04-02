import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const VIDEO_URL =
  'https://www.select-sport.com/cdn/shop/videos/c/vp/a15a4f58c7c84e6a8ff37c206633d943/a15a4f58c7c84e6a8ff37c206633d943.HD-1080p-7.2Mbps-75294252.mp4?v=0';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden bg-black h-[31svh] md:h-[100svh]">

      {/* Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        src={VIDEO_URL}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto md:h-full md:object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-[8%] px-[2%] md:px-[3%]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="flex flex-col items-center gap-4 w-full"
        >
          <h1 className="text-white font-bold tracking-widest uppercase text-center text-[11px] md:text-lg">
            OFFICIAL BALL SUPPLIER TO MAJOR LEAGUES WORLDWIDE
          </h1>

          <motion.button
            onClick={() => navigate('/products/all-balls')}
            whileHover={{ scale: 1.05, backgroundColor: '#fff', color: '#000' }}
            whileTap={{ scale: 0.97 }}
            className="border border-white bg-transparent text-white font-semibold tracking-widest uppercase text-[9px] md:text-sm px-4 py-2 md:px-10 md:py-4 transition-all duration-300 hover:bg-white hover:text-black cursor-pointer"
          >
            Explore All Products
          </motion.button>
        </motion.div>
      </div>

    </section>
  );
};

export default Hero;