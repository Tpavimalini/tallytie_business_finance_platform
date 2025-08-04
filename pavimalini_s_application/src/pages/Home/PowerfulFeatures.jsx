import React from 'react';

const PowerfulFeatures = () => {
  return (
    <section className="w-full py-8 sm:py-12 md:py-16">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-[56px]">
        <div className="w-full bg-[#ffffff19] border border-solid border-transparent bg-clip-padding rounded-lg shadow-[0px_4px_35px_#888888ff] p-6 sm:p-8 md:p-[80px]">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="font-inter text-[20px] sm:text-[26px] md:text-[32px] font-normal leading-[24px] sm:leading-[31px] md:leading-[39px] text-[#9b0000] mb-4 sm:mb-6 md:mb-8">
              POWERFUL FEATURES TO HELP YOU
            </h2>
            
            <h3 className="font-inter text-[24px] sm:text-[32px] md:text-[40px] font-normal leading-[29px] sm:leading-[39px] md:leading-[49px] text-[#003e9b]">
              Built with features for growing businesses
            </h3>
          </div>
          
          {/* Features List */}
          <div className="flex justify-start ml-0 sm:ml-8 md:ml-[148px] mt-8 sm:mt-12 md:mt-[142px] mb-8 sm:mb-12 md:mb-[138px]">
            <div className="w-full sm:w-[80%] md:w-[32%]">
              <div className="font-jost text-[18px] sm:text-[21px] md:text-[24px] font-normal leading-[41px] sm:leading-[48px] md:leading-[55px] text-left text-[#000000] space-y-2">
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">✔️</span>
                  <span>Easy GST Billing</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">✔️</span>
                  <span>Payment Reminders</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">✔️</span>
                  <span>Daily Sales Summary</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PowerfulFeatures;