import React, { useState } from 'react';
import EditText from '../components/ui/EditText';
import { useNavigate } from 'react-router-dom';

const TakeOrder = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [orderForm, setOrderForm] = useState({
    customerName: '',
    phone: '',
    items: '',
    totalAmount: '',
    paymentStatus: 'Pending'
  });

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleAddOrder = () => {
    setShowAddOrderModal(true);
  };

  const handleCloseModal = () => {
    setShowAddOrderModal(false);
    setOrderForm({
      customerName: '',
      phone: '',
      items: '',
      totalAmount: '',
      paymentStatus: 'Pending'
    });
  };

  const handleFormChange = (field, value) => {
    setOrderForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitOrder = () => {
    if (orderForm.customerName.trim()) {
      console.log('New order:', orderForm);
      handleCloseModal();
    }
  };

  return (
    <div className="w-full min-h-screen bg-[linear-gradient(231deg,#c3dbff_0%,_#e3eeff_100%)] flex">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:w-[20%] lg:min-h-screen">
        <div className="w-full bg-global-1 shadow-[0px_4px_35px_#888888ff] flex flex-col items-center gap-6 py-[30px] px-[22px]">
          {/* Logo Section */}
          <div className="flex items-center justify-center w-full px-[44px] mt-1">
            <div className="flex items-center justify-center gap-0">
              <img 
                src="/images/img_vector_indigo_500.svg" 
                alt="TallyTie Logo" 
                className="w-[62px] h-[82px]"
              />
              <span className="text-[40px] font-normal leading-[49px] text-global-9 font-['Keania_One'] -ml-3 self-end mb-1">
                allyTie
              </span>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="flex flex-col w-full gap-0">
            {/* LEDGER MANAGEMENT Section */}
            <h3 className="text-[20px] font-bold leading-[25px] tracking-[1px] text-global-5 font-inter mb-1.5 uppercase">
              LEDGER MANAGEMENT
            </h3>

            {/* Customers */}
            <div className="relative w-full mb-1.5 cursor-pointer" onClick={() => navigate('/customer-management-dashboard')}>
              <div className="absolute left-[18px] top-1/2 transform -translate-y-1/2 z-10">
                <img 
                  src="/images/img_vector_blue_900.svg" 
                  alt="customers icon" 
                  className="w-[22px] h-[18px]"
                />
              </div>
              <div className="w-full h-[56px] bg-global-4 rounded-lg flex items-center">
                <span className="pl-[68px] pr-[34px] py-4 text-[18px] font-light leading-[27px] text-global-8 font-poppins">
                  Customers
                </span>
              </div>
            </div>

            {/* Suppliers */}
            <div className="relative w-full mb-2 cursor-pointer" onClick={() => navigate('/supplier-management-dashboard')}>
              <div className="absolute left-[18px] top-1/2 transform -translate-y-1/2 z-10">
                <img 
                  src="/images/img_vector_blue_900_18x24.svg" 
                  alt="suppliers icon" 
                  className="w-[24px] h-[18px]"
                />
              </div>
              <div className="w-full h-[56px] bg-global-4 rounded-lg flex items-center">
                <span className="pl-[68px] pr-[34px] py-4 text-[18px] font-light leading-[27px] text-global-8 font-poppins">
                  Suppliers
                </span>
              </div>
            </div>

            {/* Expenses */}
            <div className="relative w-full mb-2">
              <div className="absolute left-[12px] top-2 z-10">
                <img 
                  src="/images/img_traced_image.svg" 
                  alt="expenses icon" 
                  className="w-[30px] h-[34px]"
                />
              </div>
              <div className="w-full h-[56px] bg-global-4 rounded-lg flex items-center">
                <span className="pl-[68px] pr-[34px] py-4 text-[18px] font-light leading-[27px] text-global-8 font-poppins">
                  Expenses
                </span>
              </div>
            </div>

            {/* Staff */}
            <div className="relative w-full mb-9">
              <div className="absolute left-[24px] top-1/2 transform -translate-y-1/2 z-10">
                <img 
                  src="/images/img_vector_blue_900_14x12.svg" 
                  alt="staff icon" 
                  className="w-[12px] h-[14px]"
                />
              </div>
              <div className="w-full h-[56px] bg-global-4 rounded-lg flex items-center">
                <span className="pl-[68px] pr-[34px] py-3 text-[18px] font-light leading-[27px] text-global-8 font-poppins">
                  Staff
                </span>
              </div>
            </div>

            {/* ORDER MANAGEMENT Section */}
            <h3 className="text-[20px] font-bold leading-[25px] tracking-[1px] text-global-5 font-inter mb-2 uppercase">
              ORDER MANAGEMENT
            </h3>

            {/* Take Order - Active */}
            <div className="relative w-full mb-2">
              <div className="absolute left-[14px] top-1/2 transform -translate-y-1/2 z-10">
                <img 
                  src="/images/img_vector_blue_900_18x16.svg" 
                  alt="take order icon" 
                  className="w-[16px] h-[18px]"
                />
              </div>
              <div className="w-full h-[56px] bg-[#e3eeff] rounded-lg flex items-center">
                <span className="pl-[64px] pr-5 py-3.5 text-[18px] font-light leading-[27px] text-[#003079] font-poppins">
                  Take Order
                </span>
              </div>
            </div>

            {/* Order History */}
            <div className="relative w-full mb-8 cursor-pointer" onClick={() => navigate('/order-history')}>
              <div className="absolute left-[24px] top-1/2 transform -translate-y-1/2 z-10">
                <img 
                  src="/images/img_vector_blue_900_18x14.svg" 
                  alt="order history icon" 
                  className="w-[14px] h-[18px]"
                />
              </div>
              <div className="w-full h-[56px] bg-global-4 rounded-lg flex items-center">
                <span className="pl-[68px] pr-[34px] py-4 text-[18px] font-light leading-[27px] text-global-8 font-poppins">
                  Order History
                </span>
              </div>
            </div>

            {/* BILL AND INVENTORY Section */}
            <h3 className="text-[20px] font-bold leading-[30px] tracking-[1px] text-global-5 font-poppins mb-1.5 uppercase">
              BILL AND INVENTORY
            </h3>

            {/* Add Product */}
            <div className="w-full bg-global-4 rounded-lg px-[22px] py-2.5 flex items-center justify-start gap-3 mb-2">
              <div className="relative w-[22px] h-[28px] flex items-center justify-center">
                <div className="w-[22px] h-5 border border-global-2 rounded-[10px]"></div>
                <span className="absolute text-[20px] font-normal leading-[25px] tracking-[1px] text-global-5 font-inter">
                  +
                </span>
              </div>
              <span className="text-[18px] font-light leading-[27px] text-global-8 font-poppins">
                Add Product
              </span>
            </div>

            {/* Inventory Management */}
            <div className="relative w-full mb-2">
              <div className="absolute left-[24px] top-1/2 transform -translate-y-1/2 z-10">
                <img 
                  src="/images/img_vector_blue_900_20x16.svg" 
                  alt="inventory icon" 
                  className="w-[16px] h-[20px]"
                />
              </div>
              <div className="w-full h-[56px] bg-global-4 rounded-lg flex items-center">
                <span className="pl-[68px] pr-[34px] py-4 text-[18px] font-light leading-[27px] text-global-8 font-poppins">
                  Inventory
                </span>
              </div>
            </div>

            {/* Generate Bill */}
            <div className="relative w-full mb-8">
              <div className="absolute left-[24px] top-1/2 transform -translate-y-1/2 z-10">
                <img 
                  src="/images/img_vector_blue_900_18x18.svg" 
                  alt="generate bill icon" 
                  className="w-[18px] h-[18px]"
                />
              </div>
              <div className="w-full h-[56px] bg-global-4 rounded-lg flex items-center">
                <span className="pl-[68px] pr-[34px] py-4 text-[18px] font-light leading-[27px] text-global-8 font-poppins">
                  Generate Bill
                </span>
              </div>
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
              <h1 className="text-3xl font-bold text-[#003079] mb-2">Take Order</h1>
              <p className="text-gray-600">Enhanced order management system</p>
            </div>

            {/* Central Illustration and Content */}
            <div className="flex flex-col items-center justify-center py-16">
              {/* Illustration */}
              <div className="relative mb-8">
                <img 
                  src="/images/img_screenshot_2025_806x724.png" 
                  alt="Take order illustration" 
                  className="w-[372px] h-[332px] object-contain"
                />
                
                {/* Green circle with person icon */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-[#0db700] rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                
                {/* Blue rectangle with lines */}
                <div className="absolute top-8 right-8 w-16 h-12 bg-[#003079] rounded-lg flex items-center justify-center">
                  <div className="flex flex-col gap-1">
                    <div className="w-8 h-1 bg-white rounded"></div>
                    <div className="w-8 h-1 bg-white rounded"></div>
                    <div className="w-8 h-1 bg-white rounded"></div>
                  </div>
                </div>
                
                {/* Blue plant elements */}
                <div className="absolute bottom-4 right-4 w-8 h-8 bg-[#003079] opacity-20 rounded-full"></div>
                <div className="absolute bottom-8 right-8 w-4 h-4 bg-[#003079] opacity-30 rounded-full"></div>
              </div>

              {/* Message */}
              <p className="text-[20px] font-normal leading-[25px] text-[#003079] font-inter text-center mb-8">
                Enhanced order management system is now available
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/order-history')}
                  className="px-8 py-3 bg-[#e3eeff] border border-[#003079] rounded-lg text-[20px] font-normal leading-[30px] text-[#003079] font-poppins hover:bg-[#c3dbff] transition-colors"
                >
                  View Order History
                </button>
                <button 
                  onClick={() => navigate('/take-order-enhanced')}
                  className="px-8 py-3 bg-[#ffffff] border border-[#003e9b] rounded-lg flex items-center gap-3 text-[20px] font-normal leading-[30px] text-[#003079] font-poppins hover:bg-[#f8f9fa] transition-colors"
                >
                  <div className="relative w-6 h-8 flex items-center justify-center">
                    <div className="w-6 h-6 border border-[#003e9b44] rounded-xl"></div>
                    <span className="absolute text-[20px] font-normal text-[#0030795b] font-poppins">
                      +
                    </span>
                  </div>
                  <span>Enhanced Take Order</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Order Selection */}
        <div className="lg:w-[300px] border-l border-gray-200 p-8 flex flex-col items-center justify-center bg-[#c9ddfb] relative z-10">
          <div className="text-center">
            <div className="mb-6">
              <img 
                src="/images/img_vector_blue_900.svg" 
                alt="order placeholder" 
                className="w-32 h-32 mx-auto opacity-50"
              />
            </div>
            <p className="text-[20px] font-normal leading-[30px] text-[#003079] font-poppins">
              Enhanced Features Available
            </p>
            <button 
              onClick={() => navigate('/take-order-enhanced')}
              className="mt-4 px-6 py-2 bg-[#003079] text-white rounded-lg hover:bg-[#002a66] transition-colors"
            >
              Try Enhanced Version
            </button>
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

      {/* Add New Order Modal */}
      {showAddOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#003079] font-poppins">
                Take New Order
              </h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Customer Name */}
              <div>
                <label className="block text-sm font-medium text-[#003079] mb-2">
                  Customer Name*
                </label>
                <input
                  type="text"
                  value={orderForm.customerName}
                  onChange={(e) => handleFormChange('customerName', e.target.value)}
                  placeholder="Enter Customer Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-[#003079] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={orderForm.phone}
                  onChange={(e) => handleFormChange('phone', e.target.value)}
                  placeholder="Enter Phone Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Items */}
              <div>
                <label className="block text-sm font-medium text-[#003079] mb-2">
                  Items*
                </label>
                <textarea
                  value={orderForm.items}
                  onChange={(e) => handleFormChange('items', e.target.value)}
                  placeholder="Enter items to order"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Total Amount */}
              <div>
                <label className="block text-sm font-medium text-[#003079] mb-2">
                  Total Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="text"
                    value={orderForm.totalAmount}
                    onChange={(e) => handleFormChange('totalAmount', e.target.value)}
                    placeholder="Enter Total Amount"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Payment Status */}
              <div>
                <label className="block text-sm font-medium text-[#003079] mb-2">
                  Payment Status
                </label>
                <select
                  value={orderForm.paymentStatus}
                  onChange={(e) => handleFormChange('paymentStatus', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Partial">Partial</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                onClick={handleSubmitOrder}
                className="w-full bg-[#003079] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#002a66] transition-colors"
              >
                Create Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TakeOrder; 