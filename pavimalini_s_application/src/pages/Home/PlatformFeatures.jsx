import React from 'react';
import Button from '../../components/ui/Button';

const PlatformFeatures = () => {
  return (
    <section className="w-full relative">
      {/* Background Vector */}
      <div className="w-full">
        <img 
          src="/images/img_vector_blue_50.png" 
          alt="Background" 
          className="w-full h-auto object-cover"
        />
      </div>
      
      {/* Overlapping Content */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 -mt-[133px] sm:-mt-[200px] md:-mt-[266px] relative z-10">
        {/* Right Side Image */}
        <div className="flex justify-end mb-8 sm:mb-12 md:mb-16">
          <div className="w-full sm:w-[70%] md:w-[50%] mr-0 sm:mr-8 md:mr-[66px]">
            <img 
              src="/images/img_screenshot_2025_806x724.png" 
              alt="Platform Dashboard" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[138px] -mt-[191px] sm:-mt-[286px] md:-mt-[382px]">
          {/* Left Column - Platform Management */}
          <div className="w-full lg:w-[44%] relative">
            <div className="bg-[linear-gradient(318deg,#eef5ff19_0%,#ffffff_50%,_#fafafab2_100%)] rounded-[16px] p-6 sm:p-8 md:p-[48px] mr-0 lg:mr-[10px] relative">
              {/* Header */}
              <h2 className="font-inter text-[24px] sm:text-[32px] md:text-[40px] font-normal leading-[29px] sm:leading-[38px] md:leading-[48px] text-center text-[#000000] mb-8 sm:mb-12 md:mb-16">
                One Platform to manage all your businesses
              </h2>
              
              {/* Subtitle */}
              <p className="font-poppins text-[18px] sm:text-[21px] md:text-[24px] font-normal leading-[34px] sm:leading-[39px] md:leading-[45px] text-center text-[#003e9b] mb-12 sm:mb-16 md:mb-[114px]">
                Gain insights and improve your financial health
              </p>
              
              {/* Features List */}
              <div className="space-y-6 sm:space-y-8 md:space-y-[24px] mb-8 sm:mb-12 md:mb-[206px]">
                <div className="flex items-center">
                  <img 
                    src="/images/img_arrow_1.svg" 
                    alt="Arrow" 
                    className="w-[22px] h-[1px] mr-[10px]"
                  />
                  <span className="font-poppins text-[18px] sm:text-[21px] md:text-[24px] font-normal leading-[27px] sm:leading-[31px] md:leading-[36px] text-center text-[#003e9b]">
                    Send Reminders
                  </span>
                </div>
                
                <div className="flex items-center">
                  <img 
                    src="/images/img_arrow_1.svg" 
                    alt="Arrow" 
                    className="w-[22px] h-[1px] mr-[14px]"
                  />
                  <span className="font-poppins text-[18px] sm:text-[21px] md:text-[24px] font-normal leading-[27px] sm:leading-[31px] md:leading-[36px] text-center text-[#003e9b]">
                    Get Notified
                  </span>
                </div>
                
                <img 
                  src="/images/img_arrow_1.svg" 
                  alt="Arrow" 
                  className="w-[22px] h-[1px]"
                />
              </div>
              
              {/* Bottom Section with Image and Text */}
              <div className="flex items-end justify-between -mb-[12px]">
                <Button 
                  variant="secondary"
                  className="font-inter text-[16px] sm:text-[18px] md:text-[20px] font-extrabold leading-[20px] sm:leading-[22px] md:leading-[25px] text-[#1263dd] bg-[#9ac2ff82] shadow-[0px_4px_4px_#0000003f] border-[24px] border-solid border-transparent rounded-lg px-[26px] sm:px-[30px] md:px-[34px] py-[11px] sm:py-[12px] md:py-[14px] mb-[33px] sm:mb-[49px] md:mb-[66px]"
                >
                  Get Started!
                </Button>
                
                <div className="flex items-end -ml-[94px] sm:-ml-[141px] md:-ml-[188px]">
                  <span className="font-poppins text-[18px] sm:text-[21px] md:text-[24px] font-normal leading-[27px] sm:leading-[31px] md:leading-[36px] text-left text-[#003e9b] w-[42%] mt-[95px] sm:mt-[142px] md:mt-[190px]">
                    Collect Payments Faster
                  </span>
                  <img 
                    src="/images/img_image_7.png" 
                    alt="Payment Collection" 
                    className="w-[58%] h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Customer Orders & Digital Ledger */}
          <div className="w-full lg:w-[38%] relative mt-0 lg:mt-[1026px]">
            <div className="bg-[linear-gradient(135deg,#e3eeff_0%,#ffffff_50%,_#e3eeff_100%)] rounded-[16px] p-6 sm:p-8 md:p-[76px] mr-0 lg:mr-[8px] relative">
              {/* Header */}
              <h2 className="font-inter text-[20px] sm:text-[26px] md:text-[33px] font-bold leading-[24px] sm:leading-[31px] md:leading-[39px] text-center text-[#92beff] mb-4 sm:mb-6 md:mb-8">
                Take Customer Orders & Manage Digital Ledger
              </h2>
              
              {/* Subtitle */}
              <p className="font-poppins text-[16px] sm:text-[19px] md:text-[22px] font-normal leading-[23px] sm:leading-[27px] md:leading-[31px] text-center text-[#003e9b] mb-8 sm:mb-12 md:mb-16 -mt-[9px] sm:-mt-[13px] md:-mt-[18px]">
                Keep track of orders, dues, and reports in one platform
              </p>
              
              {/* Content with Image and Menu */}
              <div className="flex items-center justify-end">
                <div className="w-[24%] text-right mb-8 sm:mb-12 md:mb-[64px]">
                  <div className="font-poppins text-[18px] sm:text-[21px] md:text-[24px] font-normal leading-[41px] sm:leading-[48px] md:leading-[55px] text-left text-[#003e9b] space-y-2">
                    <div>Invoices</div>
                    <div>Orders</div>
                    <div>Reports</div>
                    <div>Collections</div>
                  </div>
                </div>
                
                <div className="w-[58%] -ml-[20px] sm:-ml-[30px] md:-ml-[40px]">
                  <img 
                    src="/images/img_screenshot_2025_372x332.png" 
                    alt="Digital Ledger Interface" 
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
              
              {/* Arrow Icons */}
              <div className="flex flex-col items-center gap-[27px] sm:gap-[40px] md:gap-[54px] mt-8 sm:mt-12 md:mt-[204px]">
                <img src="/images/img_arrow_1.svg" alt="Arrow" className="w-[22px] h-[1px]" />
                <img src="/images/img_arrow_1.svg" alt="Arrow" className="w-[22px] h-[1px]" />
                <img src="/images/img_arrow_1.svg" alt="Arrow" className="w-[22px] h-[1px]" />
                <img src="/images/img_arrow_1.svg" alt="Arrow" className="w-[22px] h-[1px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformFeatures;