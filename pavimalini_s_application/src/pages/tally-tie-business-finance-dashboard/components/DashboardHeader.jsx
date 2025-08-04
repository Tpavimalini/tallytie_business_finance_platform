import React from 'react';
        import Button from '../../../components/ui/Button';

        const DashboardHeader = () => {
          return (
            <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Left Section - Logo */}
                <div className="flex items-center">
                  <img 
                    src="/images/img_header_logo.png" 
                    alt="TallyTie" 
                    className="h-8 w-auto"
                  />
                </div>
                
                {/* Center Section - Business Counters */}
                <div className="flex items-center space-x-6">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Customers:</span> 
                    <span className="ml-1 font-semibold text-header-text1">0</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Suppliers:</span> 
                    <span className="ml-1 font-semibold text-header-text1">0</span>
                  </div>
                </div>
                
                {/* Right Section - Add Business Button */}
                <div>
                  <Button 
                    variant="outline"
                    size="small"
                    className="text-header-text1 border-header-text1 hover:bg-header-text1 hover:text-white"
                  >
                    Add Business name
                  </Button>
                </div>
              </div>
            </header>
          );
        };

        export default DashboardHeader;