import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';

const HeroSection = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (phoneNumber.length >= 10) {
      // Navigate to OTP page with phone number
      navigate('/otp', { state: { phoneNumber } });
    }
  };
  return (
    <section className="w-full bg-[linear-gradient(231deg,#c3dbff_0%,_#e3eeff_100%)] relative">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Background Vector Image */}
        <div className="absolute inset-0 bg-[url('/images/img_vector.png')] bg-cover bg-center z-0"></div>
        
        {/* Main Hero Content */}
        <div className="relative z-10 pt-[125px] sm:pt-[187px] md:pt-[250px] pb-8 sm:pb-12 md:pb-16">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-16">
            {/* Left Content */}
            <div className="w-full lg:w-[30%]">
              <h1 className="font-poppins font-bold text-[40px] sm:text-[60px] md:text-[80px] leading-[50px] sm:text-[75px] md:leading-[100px] text-left text-[#41669c] mb-8 sm:mb-12 md:mb-16">
                <span className="text-[#41669c]">SIMPLIFY</span>
                <br />
                <span className="text-[#41669c]">BUSINESS</span>
                <br />
                <span className="text-[#41669c]">FINANCES</span>
              </h1>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-[38px] mb-8 sm:mb-12">
                <div className="flex items-center border border-[#003079] rounded-lg bg-[#ffffff] px-[17px] sm:px-[34px] py-[6px] sm:py-[12px]">
                  <span className="font-poppins text-[16px] sm:text-[20px] font-normal leading-[24px] sm:leading-[30px] tracking-[1px] text-[#003079] mr-2">+91</span>
                  <input 
                    type="tel" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter your Phone" 
                    className="font-poppins text-[16px] sm:text-[20px] font-normal leading-[24px] sm:leading-[30px] tracking-[1px] text-[#003079] bg-transparent border-none outline-none flex-1"
                    maxLength={10}
                  />
                </div>
                <Button 
                  variant="primary" 
                  onClick={handleGetStarted}
                  disabled={phoneNumber.length < 10}
                  className="font-poppins text-[16px] sm:text-[20px] font-normal leading-[24px] sm:leading-[30px] text-[#003079] border border-[#003e9b] rounded-lg bg-[#ffffff] px-[17px] sm:px-[34px] py-[6px] sm:py-[12px] hover:bg-[#003079] hover:text-[#ffffff] disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  Get Started!
                </Button>
              </div>
            </div>

            {/* Right Content - 3D Graphics */}
            <div className="w-full lg:w-[70%] relative">
              <img 
                src="/images/img_screenshot_2025.png" 
                alt="TallyTie Platform Interface" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;