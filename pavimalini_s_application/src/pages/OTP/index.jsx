import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import EditText from '../../components/ui/EditText';

const OTPPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get phone number from navigation state
  useEffect(() => {
    if (location.state?.phoneNumber) {
      setPhoneNumber(location.state.phoneNumber);
    }
  }, [location.state]);

  const handleSendOTP = () => {
    if (phoneNumber.length >= 10) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setShowOtpInput(true);
        // In real app, you would send OTP to the phone number
        console.log('OTP sent to:', phoneNumber);
      }, 2000);
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      setIsLoading(true);
      // Simulate OTP verification
      setTimeout(() => {
        setIsLoading(false);
        // Navigate to customer dashboard
        navigate('/customer-management-dashboard');
      }, 2000);
    }
  };

  const handleResendOTP = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('OTP resent to:', phoneNumber);
    }, 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[linear-gradient(231deg,#c3dbff_0%,_#e3eeff_100%)] flex items-center justify-center">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 flex items-center gap-2"
      >
        ← Back to Home
      </button>
      
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md mx-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="/images/img_header_logo.png" 
            alt="TallyTie Logo" 
            className="w-32 h-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800 font-poppins">
            {showOtpInput ? 'Verify OTP' : 'Get Started'}
          </h1>
          <p className="text-gray-600 mt-2">
            {showOtpInput 
              ? `Enter the 6-digit code sent to ${phoneNumber}`
              : 'Enter your phone number to continue'
            }
          </p>
        </div>

        {/* Phone Number Input */}
        {!showOtpInput && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="flex border border-gray-300 rounded-lg">
                <span className="px-3 py-3 bg-gray-50 text-gray-500 border-r border-gray-300">
                  +91
                </span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter your phone number"
                  className="flex-1 px-3 py-3 border-0 focus:ring-0 focus:outline-none"
                  maxLength={10}
                />
              </div>
            </div>
            
            <button
              onClick={handleSendOTP}
              disabled={phoneNumber.length < 10 || isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </div>
        )}

        {/* OTP Input */}
        {showOtpInput && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 6-digit OTP"
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={6}
              />
            </div>
            
            <button
              onClick={handleVerifyOTP}
              disabled={otp.length < 6 || isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </button>
            
            <div className="text-center">
              <button
                onClick={handleResendOTP}
                disabled={isLoading}
                className="text-blue-600 hover:text-blue-800 text-sm disabled:text-gray-400"
              >
                {isLoading ? 'Sending...' : 'Resend OTP'}
              </button>
            </div>
            
            <div className="text-center">
              <button
                onClick={() => setShowOtpInput(false)}
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                ← Back to phone number
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OTPPage; 