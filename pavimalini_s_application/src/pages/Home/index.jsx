import React from 'react';
import Header from '../../components/common/Header';
import HeroSection from './HeroSection';
import PlatformFeatures from './PlatformFeatures';
import PowerfulFeatures from './PowerfulFeatures';

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-[linear-gradient(231deg,#c3dbff_0%,_#e3eeff_100%)]">
      {/* Header */}
      <div className="w-full pt-[15px] sm:pt-[22px] md:pt-[30px] px-[15px] sm:px-[22px] md:px-[30px]">
        <Header />
      </div>
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Platform Features Section */}
      <PlatformFeatures />
      
      {/* Powerful Features Section */}
      <PowerfulFeatures />
    </div>
  );
};

export default Home;