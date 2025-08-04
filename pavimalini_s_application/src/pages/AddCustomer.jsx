import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveService, toastService } from '../services/saveService';
import AddCustomerModal from '../components/AddCustomerModal';

const AddCustomer = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const data = await saveService.getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Error loading customers:', error);
      toastService.error('Failed to load customers');
    }
  };

  const handleSaveCustomer = async (customerData) => {
    try {
      await saveService.saveCustomer(customerData);
      await loadCustomers(); // Refresh the list
      toastService.success('Customer saved successfully!');
      return true;
    } catch (error) {
      console.error('Error saving customer:', error);
      toastService.error('Failed to save customer');
      return false;
    }
  };

  const handleDeleteCustomer = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await saveService.deleteCustomer(id);
        await loadCustomers(); // Refresh the list
        toastService.success('Customer deleted successfully!');
      } catch (error) {
        console.error('Error deleting customer:', error);
        toastService.error('Failed to delete customer');
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-[linear-gradient(231deg,#c3dbff_0%,_#e3eeff_100%)] flex">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:w-[20%] lg:min-h-screen">
        <div className="w-full bg-global-1 shadow-[0px_4px_35px_#888888ff] flex flex-col items-center gap-6 py-[30px] px-[22px]">
          {/* Logo Section */}
          <div className="flex items-center justify-center w-full px-[44px] mt-1">
            <img 
              src="/images/img_header_logo.png" 
              alt="TallyTie Logo" 
              className="w-[120px] h-[40px] object-contain"
            />
          </div>

          {/* Navigation Menu */}
          <div className="w-full flex flex-col gap-2">
            {/* Dashboard */}
            <div className="w-full bg-global-4 rounded-lg px-[22px] py-2.5 flex items-center justify-start gap-3 mb-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="relative w-[22px] h-[28px] flex items-center justify-center">
                <div className="w-[22px] h-5 border border-global-2 rounded-[10px]"></div>
                <div className="absolute top-1 left-1 w-4 h-3 bg-global-2 rounded-sm"></div>
              </div>
              <span className="text-[16px] font-normal leading-[24px] text-[#003079] font-poppins">Dashboard</span>
            </div>

            {/* Customer Management */}
            <div className="w-full bg-global-4 rounded-lg px-[22px] py-2.5 flex items-center justify-start gap-3 mb-2 cursor-pointer" onClick={() => navigate('/customer-management')}>
              <div className="relative w-[22px] h-[28px] flex items-center justify-center">
                <div className="w-[22px] h-5 border border-global-2 rounded-[10px]"></div>
                <div className="absolute top-1 left-1 w-4 h-3 bg-global-2 rounded-sm"></div>
              </div>
              <span className="text-[16px] font-normal leading-[24px] text-[#003079] font-poppins">Customer Management</span>
            </div>

            {/* Supplier Management */}
            <div className="w-full bg-global-4 rounded-lg px-[22px] py-2.5 flex items-center justify-start gap-3 mb-2 cursor-pointer" onClick={() => navigate('/supplier-management')}>
              <div className="relative w-[22px] h-[28px] flex items-center justify-center">
                <div className="w-[22px] h-5 border border-global-2 rounded-[10px]"></div>
                <div className="absolute top-1 left-1 w-4 h-3 bg-global-2 rounded-sm"></div>
              </div>
              <span className="text-[16px] font-normal leading-[24px] text-[#003079] font-poppins">Supplier Management</span>
            </div>

            {/* Take Order */}
            <div className="w-full bg-global-4 rounded-lg px-[22px] py-2.5 flex items-center justify-start gap-3 mb-2 cursor-pointer" onClick={() => navigate('/take-order')}>
              <div className="relative w-[22px] h-[28px] flex items-center justify-center">
                <div className="w-[22px] h-5 border border-global-2 rounded-[10px]"></div>
                <div className="absolute top-1 left-1 w-4 h-3 bg-global-2 rounded-sm"></div>
              </div>
              <span className="text-[16px] font-normal leading-[24px] text-[#003079] font-poppins">Take Order</span>
            </div>

            {/* Order History */}
            <div className="w-full bg-global-4 rounded-lg px-[22px] py-2.5 flex items-center justify-start gap-3 mb-2 cursor-pointer" onClick={() => navigate('/order-history')}>
              <div className="relative w-[22px] h-[28px] flex items-center justify-center">
                <div className="w-[22px] h-5 border border-global-2 rounded-[10px]"></div>
                <div className="absolute top-1 left-1 w-4 h-3 bg-global-2 rounded-sm"></div>
              </div>
              <span className="text-[16px] font-normal leading-[24px] text-[#003079] font-poppins">Order History</span>
            </div>

            {/* Ledger Management */}
            <div className="w-full bg-global-4 rounded-lg px-[22px] py-2.5 flex items-center justify-start gap-3 mb-2 cursor-pointer" onClick={() => navigate('/ledger-management')}>
              <div className="relative w-[22px] h-[28px] flex items-center justify-center">
                <div className="w-[22px] h-5 border border-global-2 rounded-[10px]"></div>
                <div className="absolute top-1 left-1 w-4 h-3 bg-global-2 rounded-sm"></div>
              </div>
              <span className="text-[16px] font-normal leading-[24px] text-[#003079] font-poppins">Ledger Management</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Panel - Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#003079] mb-2">Add Customer</h1>
              <p className="text-gray-600">Manage your customer information</p>
            </div>

            {/* Action Buttons */}
            <div className="mb-8 flex gap-4">
              <button 
                onClick={() => setShowModal(true)}
                className="px-6 py-3 bg-[#003079] text-white rounded-lg font-medium hover:bg-[#002a66] transition-colors flex items-center gap-2"
              >
                <span>+</span>
                Add New Customer
              </button>
              <button 
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>

            {/* Customers List */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-[#003079] mb-4">Existing Customers</h2>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003079] mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading customers...</p>
                </div>
              ) : customers.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No customers found. Add your first customer!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-[#003079]">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-[#003079]">Phone</th>
                        <th className="text-left py-3 px-4 font-medium text-[#003079]">Address</th>
                        <th className="text-left py-3 px-4 font-medium text-[#003079]">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-[#003079]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer) => (
                        <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{customer.name}</td>
                          <td className="py-3 px-4">{customer.phone}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{customer.address}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{customer.email || '-'}</td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleDeleteCustomer(customer.id)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Info */}
        <div className="lg:w-[300px] border-l border-gray-200 p-8 bg-[#c9ddfb]">
          <div className="text-center">
            <div className="mb-6">
              <img 
                src="/images/img_vector_blue_900.svg" 
                alt="customer placeholder" 
                className="w-32 h-32 mx-auto opacity-50"
              />
            </div>
            <h3 className="text-xl font-semibold text-[#003079] mb-4">Customer Management</h3>
            <p className="text-gray-600 mb-4">
              Add and manage your customer information. All customer data is securely stored and can be used across the platform.
            </p>
            <div className="text-sm text-gray-500">
              <p>• Add new customers</p>
              <p>• View existing customers</p>
              <p>• Delete customers</p>
              <p>• Use in orders</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-lg shadow-lg"
        aria-label="Open menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span className="block w-5 h-0.5 bg-gray-700 mb-1"></span>
          <span className="block w-5 h-0.5 bg-gray-700 mb-1"></span>
          <span className="block w-5 h-0.5 bg-gray-700"></span>
        </div>
      </button>

      {/* Add Customer Modal */}
      <AddCustomerModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveCustomer}
        customerType="Customer"
      />
    </div>
  );
};

export default AddCustomer; 