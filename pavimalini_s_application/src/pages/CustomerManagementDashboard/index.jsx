import React, { useState } from 'react';
import EditText from '../../components/ui/EditText';
import { useNavigate } from 'react-router-dom';

const CustomerManagementDashboard = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customerForm, setCustomerForm] = useState({
    name: '',
    phone: '',
    location: '',
    itemPurchased: '',
    totalAmount: '',
    openingBalance: '',
    balanceType: 'You Get'
  });
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleAddCustomer = () => {
    setShowAddCustomerModal(true);
  };

  const handleCloseModal = () => {
    setShowAddCustomerModal(false);
    setCustomerForm({
      name: '',
      phone: '',
      location: '',
      itemPurchased: '',
      totalAmount: '',
      openingBalance: '',
      balanceType: 'You Get'
    });
  };

  const handleFormChange = (field, value) => {
    setCustomerForm(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-suggestion for name field
    if (field === 'name' && value.trim()) {
      const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredCustomers.map(c => c.name));
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmitCustomer = () => {
    if (customerForm.name.trim()) {
      const newCustomer = {
        id: Date.now(),
        ...customerForm,
        createdAt: new Date().toISOString(),
        daysAgo: Math.floor(Math.random() * 3) + 1
      };
      setCustomers(prev => [...prev, newCustomer]);
      handleCloseModal();
    }
  };

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    customer.phone.includes(searchValue)
  );

  // Calculate totals
  const totalCustomers = customers.length;
  const totalYouGet = customers.reduce((sum, customer) => {
    if (customer.balanceType === 'You Get') {
      return sum + (parseFloat(customer.openingBalance) || 0);
    }
    return sum;
  }, 0);
  const totalYouGive = customers.reduce((sum, customer) => {
    if (customer.balanceType === 'You Give') {
      return sum + (parseFloat(customer.openingBalance) || 0);
    }
    return sum;
  }, 0);

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
            {/* Ledger Management Section */}
            <h3 className="text-[20px] font-normal leading-[25px] tracking-[1px] text-global-5 font-inter mb-1.5">
              LEDGER MANAGEMENT
            </h3>

            {/* Customers - Active */}
            <div className="relative w-full mb-1.5">
              <div className="absolute left-[18px] top-1/2 transform -translate-y-1/2 z-10">
                <img 
                  src="/images/img_vector_blue_900.svg" 
                  alt="customers icon" 
                  className="w-[22px] h-[18px]"
                />
              </div>
              <EditText
                placeholder="Customers"
                className="w-full pl-[56px] pr-5 py-3.5 bg-global-4 text-global-5 font-inter text-[18px] leading-[22px] rounded-lg shadow-[4px_4px_4px_#0000001d] border-0"
                fullWidth
              />
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

            {/* Order Management Section */}
            <h3 className="text-[20px] font-normal leading-[25px] tracking-[1px] text-global-5 font-inter mb-2">
              ORDER MANAGEMENT
            </h3>

            {/* Take Order */}
            <div className="relative w-full mb-2 cursor-pointer" onClick={() => navigate('/take-order')}>
              <div className="absolute left-[14px] top-1/2 transform -translate-y-1/2 z-10">
                <img 
                  src="/images/img_vector_blue_900_18x16.svg" 
                  alt="take order icon" 
                  className="w-[16px] h-[18px]"
                />
              </div>
              <div className="w-full h-[56px] bg-global-4 rounded-lg flex items-center">
                <span className="pl-[64px] pr-5 py-3.5 text-[18px] font-light leading-[27px] text-global-8 font-poppins">
                  Take Order
                </span>
              </div>
            </div>

            {/* Order History */}
            <div className="relative w-full mb-8">
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

            {/* Bill and Inventory Section */}
            <h3 className="text-[20px] font-normal leading-[30px] tracking-[1px] text-global-5 font-poppins mb-1.5">
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
                  src="/images/img_vector_blue_900_18x18.svg" 
                  alt="inventory icon" 
                  className="w-[18px] h-[18px]"
                />
              </div>
              <div className="w-full h-[56px] bg-global-4 rounded-lg flex items-center">
                <span className="pl-[56px] text-[17px] font-light leading-[25px] text-global-8 font-poppins">
                  Inventory Management
                </span>
              </div>
            </div>

            {/* Create Bill */}
            <div className="relative w-full mb-2">
              <div className="absolute left-[26px] bottom-4 z-10">
                <img 
                  src="/images/img_vector_blue_900_20x16.svg" 
                  alt="create bill icon" 
                  className="w-[16px] h-5"
                />
              </div>
              <div className="w-full h-[56px] bg-global-4 rounded-lg flex items-center">
                <span className="pl-[68px] pr-[34px] py-3 text-[18px] font-light leading-[27px] text-global-8 font-poppins">
                  Create Bill
                </span>
              </div>
            </div>

            {/* View Bills */}
            <div className="relative w-full">
              <div className="absolute left-[26px] bottom-4 z-10">
                <img 
                  src="/images/img_vector_18x16.svg" 
                  alt="view bills icon" 
                  className="w-4 h-[18px]"
                />
              </div>
              <div className="w-full h-[56px] bg-global-4 rounded-lg flex items-center">
                <span className="pl-[68px] pr-[34px] py-3 text-[18px] font-light leading-[27px] text-global-8 font-poppins">
                  View Bills
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header Section with Cards */}
        <div className="p-6 relative">
          {/* Background Wave Image */}
          <div className="absolute inset-0 bg-[url('/images/img_vector_blue_50.png')] bg-cover bg-center opacity-30"></div>
          
          {/* Header Line */}
          <div className="relative z-10 mb-6">
            <img 
              src="/images/img_line_6.svg" 
              alt="header line" 
              className="w-full h-16"
            />
          </div>
          
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start gap-6 mb-6">
            {/* Left Cards */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Customers Card */}
              <div className="bg-[#ffffff65] rounded-lg px-6 py-3 flex items-center gap-4 shadow-[0px_4px_4px_#0000003f]">
                <span className="text-[20px] font-normal leading-[30px] text-[#003079] font-poppins">
                  Customers
                </span>
                <div className="bg-[#80b2ff] rounded-[10px] w-[30px] h-[34px] flex items-center justify-center">
                  <span className="text-[20px] font-normal leading-[30px] text-[#003079] font-poppins">
                    {totalCustomers}
                  </span>
                </div>
              </div>

              {/* Suppliers Card */}
              <div className="bg-[#ffffff65] rounded-lg px-6 py-3 flex items-center gap-4 shadow-[0px_4px_4px_#0000003f]">
                <span className="text-[20px] font-normal leading-[30px] text-[#003079] font-poppins">
                  Suppliers
                </span>
                <div className="bg-[#80b2ff] rounded-[10px] w-[30px] h-[34px] flex items-center justify-center">
                  <span className="text-[20px] font-normal leading-[30px] text-[#003079] font-poppins">
                    0
                  </span>
                </div>
              </div>
            </div>

            {/* Right Button */}
            <div className="bg-[#e3eeff] border border-[#e3eeff] rounded-lg px-2.5 py-2.5 flex items-center gap-4">
              <div className="relative w-6 h-8 flex items-center justify-center">
                <div className="w-6 h-6 border border-[#0db700] rounded-xl bg-[#ffffffc6]"></div>
                <span className="absolute text-[20px] font-normal text-[#003079] font-poppins">
                  +
                </span>
              </div>
              <span className="text-[20px] font-normal leading-[25px] text-[#003079] font-inter">
                Add Business name
              </span>
            </div>
          </div>

          {/* Financial Summary */}
          <div className="relative z-10 flex gap-8 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-[20px] font-normal leading-[25px] text-[#003079] font-inter">
                You'll Get:
              </span>
              <span className="text-[24px] font-normal leading-[36px] text-[#0db700] font-poppins">
                ₹{totalYouGet.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[20px] font-normal leading-[30px] text-[#003079] font-poppins">
                You'll Give:
              </span>
              <span className="text-[24px] font-normal leading-[36px] text-[#c70000] font-poppins">
                ₹{totalYouGive.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="flex-1 bg-white rounded-2xl mx-6 shadow-lg flex flex-col lg:flex-row relative">
          {/* Background Wave Pattern */}
          <div className="absolute inset-0 bg-[url('/images/img_vector_blue_50.png')] bg-cover bg-center opacity-10 rounded-2xl"></div>
          
          {/* Left Content Area */}
          <div className="flex-1 p-8 relative z-10">
            {/* Search and Filter Section */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* Search Input */}
              <div className="flex-1">
                <div className="mb-2">
                  <span className="text-[18px] font-normal leading-[22px] text-[#003079] font-inter">
                    Search for Customers
                  </span>
                </div>
                <EditText
                  placeholder="Name or Phone Number"
                  value={searchValue}
                  onChange={handleSearchChange}
                  className="w-full px-5 py-3.5 bg-[#e3eeff] border border-[#0030797f] rounded-lg text-[18px] font-normal leading-[22px] text-[#00307966] font-inter"
                  fullWidth
                />
              </div>

              {/* Filter Dropdown */}
              <div className="sm:w-[200px]">
                <div className="mb-2">
                  <span className="text-[18px] font-normal leading-[22px] text-[#003079] font-inter">
                    Filter By
                  </span>
                </div>
                <div className="w-full px-5 py-3.5 bg-[#e3eeff] border border-[#0030797f] rounded-lg flex items-center justify-between">
                  <span className="text-[18px] font-normal leading-[22px] text-[#00307966] font-inter">
                    Select
                  </span>
                  <img 
                    src="/images/img_arrow_6.svg" 
                    alt="dropdown arrow" 
                    className="w-4 h-4"
                  />
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="sm:w-[200px]">
                <div className="mb-2">
                  <span className="text-[18px] font-normal leading-[22px] text-[#003079] font-inter">
                    Sort By
                  </span>
                </div>
                <div className="w-full px-5 py-3.5 bg-[#e3eeff] border border-[#0030797f] rounded-lg flex items-center justify-between">
                  <span className="text-[18px] font-normal leading-[22px] text-[#00307966] font-inter">
                    Select
                  </span>
                  <img 
                    src="/images/img_arrow_6.svg" 
                    alt="dropdown arrow" 
                    className="w-4 h-4"
                  />
                </div>
              </div>
            </div>

            {/* Customer List or Empty State */}
            {customers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                {/* Illustration */}
                <div className="relative mb-8">
                  {/* Main illustration - using the screenshot as it matches the image better */}
                  <img 
                    src="/images/img_screenshot_2025_372x332.png" 
                    alt="Customer management illustration" 
                    className="w-[372px] h-[332px] object-contain"
                  />
                  
                  {/* Green circle with person icon */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-[#0db700] rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                  
                  {/* White speech bubble */}
                  <div className="absolute top-8 right-8 w-16 h-12 bg-white rounded-lg shadow-md flex items-center justify-center">
                    <div className="flex flex-col gap-1">
                      <div className="w-8 h-1 bg-gray-400 rounded"></div>
                      <div className="w-8 h-1 bg-gray-400 rounded"></div>
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Blue leaves/plant elements */}
                  <div className="absolute bottom-4 right-4 w-8 h-8 bg-[#003079] opacity-20 rounded-full"></div>
                  <div className="absolute bottom-8 right-8 w-4 h-4 bg-[#003079] opacity-30 rounded-full"></div>
                </div>

                {/* Message */}
                <p className="text-[20px] font-normal leading-[25px] text-[#003079] font-inter text-center mb-8">
                  Build a Customer list and store details in one place
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-3 bg-[#e3eeff] border border-[#003079] rounded-lg text-[20px] font-normal leading-[30px] text-[#003079] font-poppins hover:bg-[#c3dbff] transition-colors">
                    Upload Bulk Customer
                  </button>
                  <button 
                    onClick={handleAddCustomer}
                    className="px-8 py-3 bg-[#ffffff] border border-[#003e9b] rounded-lg flex items-center gap-3 text-[20px] font-normal leading-[30px] text-[#003079] font-poppins hover:bg-[#f8f9fa] transition-colors"
                  >
                    <div className="relative w-6 h-8 flex items-center justify-center">
                      <div className="w-6 h-6 border border-[#003e9b44] rounded-xl"></div>
                      <span className="absolute text-[20px] font-normal text-[#0030795b] font-poppins">
                        +
                      </span>
                    </div>
                    <span>Add Customer</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Customer List Header */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[24px] font-semibold text-[#003079] font-poppins">
                    Customer List ({filteredCustomers.length})
                  </h3>
                  <button 
                    onClick={handleAddCustomer}
                    className="px-6 py-2 bg-[#003079] text-white rounded-lg text-[16px] font-medium hover:bg-[#002a66] transition-colors flex items-center gap-2"
                  >
                    <span className="text-xl">+</span>
                    Add Customer
                  </button>
                </div>

                {/* Customer Cards */}
                <div className="space-y-3">
                  {filteredCustomers.map((customer) => (
                    <div 
                      key={customer.id}
                      onClick={() => handleSelectCustomer(customer)}
                      className={`bg-white border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg ${
                        selectedCustomer?.id === customer.id 
                          ? 'border-[#003079] shadow-lg' 
                          : 'border-gray-200 hover:border-[#003079]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-[#003079] font-semibold text-lg">
                              {customer.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-[18px] font-semibold text-[#003079] font-poppins">
                              {customer.name}
                            </h4>
                            <p className="text-[14px] text-gray-600 font-inter">
                              {customer.daysAgo} days ago
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[18px] font-semibold text-[#0db700] font-poppins">
                            ₹{customer.openingBalance || '0'}
                          </div>
                          <div className="text-[12px] text-gray-600 font-inter">
                            YOU'LL GET
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* No Results Message */}
                {filteredCustomers.length === 0 && customers.length > 0 && (
                  <div className="text-center py-8">
                    <p className="text-[18px] text-gray-500 font-inter">
                      No customers found matching your search criteria.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Panel - Customer Details */}
          <div className="lg:w-[300px] border-l border-gray-200 p-8 flex flex-col bg-[#c9ddfb] relative z-10">
            {selectedCustomer ? (
              <div className="space-y-6">
                {/* Customer Header */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-[#003079] font-semibold text-2xl">
                      {selectedCustomer.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-[24px] font-semibold text-[#003079] font-poppins mb-2">
                    {selectedCustomer.name}
                  </h3>
                  <div className="text-[18px] font-semibold text-[#0db700] font-poppins">
                    ₹{selectedCustomer.openingBalance || '0'}
                  </div>
                  <div className="text-[14px] text-gray-600 font-inter">
                    YOU'LL GET
                  </div>
                </div>

                {/* Set Remainder/Add Remarks */}
                <div>
                  <label className="block text-sm font-medium text-[#003079] mb-2">
                    Set Remainder/Add Remarks
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Select</option>
                  </select>
                </div>

                {/* Entries Table */}
                <div>
                  <h4 className="text-[16px] font-semibold text-[#003079] font-poppins mb-3">
                    ENTRIES
                  </h4>
                  <div className="bg-white rounded-lg p-3">
                    <div className="grid grid-cols-3 gap-2 text-xs font-medium text-gray-600 mb-2">
                      <div>ENTRIES</div>
                      <div>YOU GAVE</div>
                      <div>YOU GOT</div>
                    </div>
                    <div className="text-[12px] text-gray-700">
                      {new Date(selectedCustomer.createdAt).toLocaleDateString('en-GB')} {new Date(selectedCustomer.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>

                {/* Balance */}
                <div className="text-center">
                  <div className="text-[16px] font-semibold text-[#003079] font-poppins">
                    Balance: ₹ {selectedCustomer.openingBalance || '0'}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <button className="w-full py-2 bg-[#c70000] text-white rounded-lg text-[14px] font-medium hover:bg-[#a00000] transition-colors">
                    YOU GAVE ₹
                  </button>
                  <button className="w-full py-2 bg-[#0db700] text-white rounded-lg text-[14px] font-medium hover:bg-[#0a9500] transition-colors">
                    YOU GOT ₹
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-6">
                  <img 
                    src="/images/img_vector_blue_900.svg" 
                    alt="customer placeholder" 
                    className="w-32 h-32 mx-auto opacity-50"
                  />
                </div>
                <p className="text-[20px] font-normal leading-[30px] text-[#003079] font-poppins">
                  {customers.length > 0 ? 'Select a Customer' : 'No Customer Selected'}
                </p>
                {customers.length > 0 && (
                  <p className="text-[14px] text-gray-600 font-inter mt-2">
                    Click on a customer card to view details
                  </p>
                )}
              </div>
            )}
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

      {/* Add New Customer Modal */}
      {showAddCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#003079] font-poppins">
                Add New Customer
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
                <div className="relative">
                  <input
                    type="text"
                    value={customerForm.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                    placeholder="Enter Customer Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  {/* Auto-suggestions */}
                  {suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-32 overflow-y-auto">
                      {suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => {
                            handleFormChange('name', suggestion);
                            setSuggestions([]);
                          }}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-[#003079] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={customerForm.phone}
                  onChange={(e) => handleFormChange('phone', e.target.value)}
                  placeholder="Enter Phone Number"
                  pattern="[0-9]{10}"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-[#003079] mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={customerForm.location}
                  onChange={(e) => handleFormChange('location', e.target.value)}
                  placeholder="Enter Location"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Item Purchased */}
              <div>
                <label className="block text-sm font-medium text-[#003079] mb-2">
                  Item Purchased
                </label>
                <input
                  type="text"
                  value={customerForm.itemPurchased}
                  onChange={(e) => handleFormChange('itemPurchased', e.target.value)}
                  placeholder="Enter Item"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Total Purchase Amount */}
              <div>
                <label className="block text-sm font-medium text-[#003079] mb-2">
                  Total Purchase Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={customerForm.totalAmount}
                    onChange={(e) => handleFormChange('totalAmount', e.target.value)}
                    placeholder="Enter Total Amount"
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Opening Balance */}
              <div>
                <label className="block text-sm font-medium text-[#003079] mb-2">
                  Opening Balance
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={customerForm.openingBalance}
                      onChange={(e) => handleFormChange('openingBalance', e.target.value)}
                      placeholder="Enter amount"
                      min="0"
                      step="0.01"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={customerForm.balanceType}
                    onChange={(e) => handleFormChange('balanceType', e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-[#0db700] text-white font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="You Get">You Get</option>
                    <option value="You Give">You Give</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                onClick={handleSubmitCustomer}
                disabled={!customerForm.name.trim()}
                className="w-full bg-[#003079] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#002a66] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Add Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagementDashboard;