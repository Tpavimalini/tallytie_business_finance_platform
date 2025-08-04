import React from 'react';

        const FinanceCounters = () => {
          return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-center space-x-12">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">₹0</div>
                  <div className="text-sm text-gray-600 mt-1">You'll Get</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">₹0</div>
                  <div className="text-sm text-gray-600 mt-1">You'll Give</div>
                </div>
              </div>
            </div>
          );
        };

        export default FinanceCounters;