import React from 'react';
        import FinanceCounters from './FinanceCounters';
        import SearchSection from './SearchSection';
        import EmptyState from './EmptyState';
        import ActionButtons from './ActionButtons';

        const MainContent = ({ 
          activeMenuItem, 
          searchQuery, 
          setSearchQuery, 
          filterBy, 
          setFilterBy, 
          sortBy, 
          setSortBy 
        }) => {
          return (
            <main className="flex-1 bg-gray-50">
              <div className="p-6">
                {/* Finance Counters */}
                <FinanceCounters />
                
                {/* Search Section */}
                <SearchSection 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  filterBy={filterBy}
                  setFilterBy={setFilterBy}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />
                
                {/* Empty State */}
                <EmptyState activeMenuItem={activeMenuItem} />
                
                {/* Action Buttons */}
                <ActionButtons activeMenuItem={activeMenuItem} />
              </div>
            </main>
          );
        };

        export default MainContent;