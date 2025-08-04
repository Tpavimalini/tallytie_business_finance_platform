import React from 'react';

        const Sidebar = ({ activeMenuItem, setActiveMenuItem }) => {
          const menuSections = [
            {
              title: 'LEDGER MANAGEMENT',
              items: ['Customers', 'Suppliers', 'Expenses', 'Staff']
            },
            {
              title: 'ORDER MANAGEMENT',
              items: ['Take Order', 'Order History']
            },
            {
              title: 'BILL AND INVENTORY',
              items: ['Add Product', 'Inventory Management', 'Create Bill', 'View Bills']
            }
          ];

          return (
            <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
              <div className="p-4">
                {menuSections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="mb-6">
                    {/* Section Title */}
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      {section.title}
                    </h3>
                    
                    {/* Menu Items */}
                    <ul className="space-y-1">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <button
                            onClick={() => setActiveMenuItem(item)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                              activeMenuItem === item
                                ? 'bg-header-text1 text-white' :'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </aside>
          );
        };

        export default Sidebar;