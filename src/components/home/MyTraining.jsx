import React from 'react';
import { motion } from 'framer-motion';

const MyTraining = () => {
  return (
    <section className="w-full px-[2%] md:px-[3%] py-6">
      <div className="flex flex-col md:flex-row gap-4 md:gap-5">
        {/* Left — Image */}
        <div className="w-full md:w-1/2 relative overflow-hidden min-h-[400px] rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80"
            alt="My Training - Athletes training"
            className="w-full h-full object-cover absolute inset-0"
          />
        </div>

        {/* Right — Black Content Panel */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full md:w-1/2 bg-black text-white flex items-center justify-center px-12 py-16 rounded-2xl"
        >
          <div className="text-center">
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase mb-8">
              MY TRAINING
            </h2>

            {/* Bold Subtitle */}
            <p className="text-sm md:text-base font-black uppercase tracking-wide mb-6 leading-snug">
              OUR BRAND NEW CATEGORY WITH TRAINING GEAR FOR BOTH INDIVIDUAL AND TEAM WORKOUTS
            </p>

            {/* Body Text */}
            <p className="text-sm text-gray-300 leading-relaxed mb-6">
              My Training has everything you need to get the most out of your workouts. Perfect for warm-ups before matches or training sessions, cool-downs afterwards, or even for strength training between team practices.
            </p>

            {/* Bold Tagline */}
            <p className="text-sm font-black mb-10">
              SELECT is player's choice – and now that includes our training equipment too.
            </p>

            {/* Red CTA Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-[#e8001c] hover:bg-[#c0001a] text-white font-bold text-sm tracking-wide py-4 px-8 transition-colors duration-200"
            >
              Discover all of our new My Training products
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MyTraining;
