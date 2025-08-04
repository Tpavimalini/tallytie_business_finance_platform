import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ className = '' }) => {
  const [activeMenuItem, setActiveMenuItem] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { id: 'features', label: 'Features', href: '#features' },
    { id: 'about', label: 'About Us', href: '#about' },
    { id: 'login', label: 'Login', href: '#login', isLogin: true }
  ];

  const handleMenuClick = (itemId) => {
    setActiveMenuItem(itemId);
    setMenuOpen(false);
    
    // Handle navigation for login
    if (itemId === 'login') {
      navigate('/otp');
    }
  };

  return (
    <header className={`w-full ${className}`}>
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-start w-full mb-[38px] md:mb-[76px]">
          {/* Logo */}
          <div className="mb-2">
            <img 
              src="/images/img_header_logo.png" 
              alt="TallyTie Logo" 
              className="w-[85px] h-[39px] sm:w-[127px] sm:h-[58px] md:w-[170px] md:h-[78px]"
            />
          </div>

          {/* Hamburger Menu Icon (Mobile only) */}
          <button 
            className="block lg:hidden p-2 mt-4" 
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="w-6 h-0.5 bg-header-text1 mb-1"></div>
            <div className="w-6 h-0.5 bg-header-text1 mb-1"></div>
            <div className="w-6 h-0.5 bg-header-text1"></div>
          </button>

          {/* Navigation Menu */}
          <nav className={`${menuOpen ? 'block' : 'hidden'} lg:block absolute lg:relative top-20 lg:top-0 left-0 lg:left-auto w-full lg:w-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none z-50 lg:z-auto`}>
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-[20px] xl:gap-[40px] justify-center items-center self-end w-auto p-4 lg:p-0">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  role="menuitem"
                  onClick={() => handleMenuClick(item.id)}
                  className={`
                    font-poppins text-[16px] sm:text-[18px] lg:text-[20px] font-normal 
                    leading-[24px] sm:leading-[27px] lg:leading-[30px] tracking-[1px] text-left 
                    text-header-text1 w-auto transition-all duration-200 rounded-lg
                    ${item.isLogin 
                      ? 'bg-header-background1 border border-header-text1 hover:bg-header-text1 hover:text-header-background1 pt-[14px] sm:pt-[16px] lg:pt-[18px] pr-[26px] sm:pr-[30px] lg:pr-[34px] pb-[8px] sm:pb-[9px] lg:pb-[10px] pl-[26px] sm:pl-[30px] lg:pl-[34px]'
                      : 'bg-header-background2 shadow-[0px_4px_4px_#0000003f] border-[24px] border-solid border-transparent bg-clip-padding pt-[11px] sm:pt-[12px] lg:pt-[14px] pr-[26px] sm:pr-[30px] lg:pr-[34px] pb-[6px] sm:pb-[7px] lg:pb-[8px] pl-[26px] sm:pl-[30px] lg:pl-[34px] hover:bg-opacity-80'
                    }
                    ${activeMenuItem === item.id ? 'ring-2 ring-header-text1 ring-opacity-50' : ''}
                  `}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;