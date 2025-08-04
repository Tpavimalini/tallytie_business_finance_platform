import React from 'react';

        const SearchSection = ({ 
          searchQuery, 
          setSearchQuery, 
          filterBy, 
          setFilterBy, 
          sortBy, 
          setSortBy 
        }) => {
          return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Search for Customers</h2>
              
              <div className="space-y-4">
                {/* Search Bar */}
                <div>
                  <input
                    type="text"
                    placeholder="Name or Phone Number"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-header-text1 focus:border-header-text1 outline-none transition-colors"
                  />
                </div>
                
                {/* Filter and Sort */}
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <select
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-header-text1 focus:border-header-text1 outline-none transition-colors bg-white"
                    >
                      <option value="">Filter By</option>
                      <option value="recent">Recent</option>
                      <option value="amount">Amount</option>
                      <option value="name">Name</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-header-text1 focus:border-header-text1 outline-none transition-colors bg-white"
                    >
                      <option value="">Sort By</option>
                      <option value="asc">A to Z</option>
                      <option value="desc">Z to A</option>
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          );
        };

        export default SearchSection;