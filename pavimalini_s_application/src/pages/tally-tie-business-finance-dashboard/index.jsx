import React, { useState } from 'react';
        import DashboardHeader from './components/DashboardHeader';
        import Sidebar from './components/Sidebar';
        import MainContent from './components/MainContent';

        const TallyTieBusinessFinanceDashboard = () => {
          const [activeMenuItem, setActiveMenuItem] = useState('Customers');
          const [searchQuery, setSearchQuery] = useState('');
          const [filterBy, setFilterBy] = useState('');
          const [sortBy, setSortBy] = useState('');

          return (
            <div className="min-h-screen bg-gray-50">
              {/* Dashboard Header */}
              <DashboardHeader />
              
              {/* Main Dashboard Layout */}
              <div className="flex">
                {/* Sidebar */}
                <Sidebar 
                  activeMenuItem={activeMenuItem} 
                  setActiveMenuItem={setActiveMenuItem} 
                />
                
                {/* Main Content Area */}
                <MainContent 
                  activeMenuItem={activeMenuItem}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  filterBy={filterBy}
                  setFilterBy={setFilterBy}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />
              </div>
            </div>
          );
        };

        export default TallyTieBusinessFinanceDashboard;