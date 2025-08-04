import React from 'react';
        import Button from '../../../components/ui/Button';

        const ActionButtons = ({ activeMenuItem }) => {
          const getActionButtons = () => {
            switch (activeMenuItem) {
              case 'Customers':
                return [
                  { label: 'Upload Bulk Customer', variant: 'outline' },
                  { label: 'Add Customer', variant: 'primary', icon: '+' }
                ];
              case 'Suppliers':
                return [
                  { label: 'Upload Bulk Supplier', variant: 'outline' },
                  { label: 'Add Supplier', variant: 'primary', icon: '+' }
                ];
              case 'Expenses':
                return [
                  { label: 'Import Expenses', variant: 'outline' },
                  { label: 'Add Expense', variant: 'primary', icon: '+' }
                ];
              case 'Staff':
                return [
                  { label: 'Import Staff Data', variant: 'outline' },
                  { label: 'Add Staff Member', variant: 'primary', icon: '+' }
                ];
              case 'Add Product':
                return [
                  { label: 'Import Products', variant: 'outline' },
                  { label: 'Add Product', variant: 'primary', icon: '+' }
                ];
              default:
                return [
                  { label: `Add ${activeMenuItem}`, variant: 'primary', icon: '+' }
                ];
            }
          };

          const buttons = getActionButtons();

          return (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  variant={button.variant}
                  className={`px-6 py-3 ${button.variant === 'outline' ?'border-header-text1 text-header-text1 hover:bg-header-text1 hover:text-white' :'bg-header-text1 text-white hover:bg-blue-800'
                  }`}
                >
                  {button.icon && <span className="mr-2">{button.icon}</span>}
                  {button.label}
                </Button>
              ))}
            </div>
          );
        };

        export default ActionButtons;