import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import Ticker from '../components/home/Ticker';
import Footer from '../components/layout/Footer';
import MyTraining from '../components/home/MyTraining';
import GoalkeeperGlovesSection from '../components/home/GoalkeeperGlovesSection';
import ClothingSection from '../components/home/ClothingSection';
import EverythingSection from '../components/home/EverythingSection';
import SustainabilitySection from '../components/home/SustainabilitySection';
import FootballHistorySlider from '../components/home/FootballHistorySlider';
import BlogSection from '../components/home/BlogSection';
import CookieConsent from '../components/layout/CookieConsent';

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Ticker />
      <MyTraining />
      <GoalkeeperGlovesSection />
      <ClothingSection />
      <EverythingSection />
      <SustainabilitySection />
      <FootballHistorySlider />
      <BlogSection />
      <Footer />
      <CookieConsent />
    </div>
  );
}
