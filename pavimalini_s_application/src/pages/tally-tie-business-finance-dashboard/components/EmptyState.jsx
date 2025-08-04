import React from 'react';

        const EmptyState = ({ activeMenuItem }) => {
          const getEmptyStateContent = () => {
            switch (activeMenuItem) {
              case 'Customers':
                return {
                  icon: '👥',
                  title: 'No Customer Selected',
                  description: 'Start by adding your first customer to manage your business relationships.'
                };
              case 'Suppliers':
                return {
                  icon: '🏢',
                  title: 'No Supplier Selected',
                  description: 'Add suppliers to track your business purchases and payments.'
                };
              case 'Expenses':
                return {
                  icon: '💰',
                  title: 'No Expenses Recorded',
                  description: 'Track your business expenses to maintain financial records.'
                };
              case 'Staff':
                return {
                  icon: '👨‍💼',
                  title: 'No Staff Members',
                  description: 'Add staff members to manage payroll and employee information.'
                };
              default:
                return {
                  icon: '📋',
                  title: `No ${activeMenuItem} Selected`,
                  description: 'Start managing your business data from this section.'
                };
            }
          };

          const content = getEmptyStateContent();

          return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 mb-6">
              <div className="text-center">
                <div className="text-6xl mb-4">{content.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{content.title}</h3>
                <p className="text-gray-600 max-w-md mx-auto">{content.description}</p>
              </div>
            </div>
          );
        };

        export default EmptyState;