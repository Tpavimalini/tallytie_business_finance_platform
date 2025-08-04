import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveService, toastService } from '../services/saveService';
import AddCustomerModal from '../components/AddCustomerModal';

const TakeOrderEnhanced = () => {
  const navigate = useNavigate();
  
  // State for order form
  const [orderForm, setOrderForm] = useState({
    customerName: '',
    customerPhone: '',
    deliveryAddress: '',
    orderDate: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    orderType: 'Pickup',
    items: [],
    discount: 0,
    tax: 0,
    notes: '',
    totalAmount: 0,
    amountPaid: 0,
    paymentMode: 'Cash'
  });

  // State for modals and UI
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Calculate totals
  useEffect(() => {
    const subtotal = orderForm.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const discountAmount = (subtotal * orderForm.discount) / 100;
    const taxAmount = ((subtotal - discountAmount) * orderForm.tax) / 100;
    const total = subtotal - discountAmount + taxAmount;
    
    setOrderForm(prev => ({
      ...prev,
      totalAmount: total,
      balanceRemaining: total - prev.amountPaid
    }));
  }, [orderForm.items, orderForm.discount, orderForm.tax, orderForm.amountPaid]);

  // Load customers and products from service
  useEffect(() => {
    loadCustomers();
    loadProducts();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await saveService.getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Error loading customers:', error);
      toastService.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      const data = await saveService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      toastService.error('Failed to load products');
    }
  };

  // Handle form changes
  const handleFormChange = (field, value) => {
    setOrderForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Add new item to order
  const addItem = () => {
    setOrderForm(prev => ({
      ...prev,
      items: [...prev.items, { id: Date.now(), productId: '', quantity: 1, price: 0, total: 0 }]
    }));
  };

  // Update item in order
  const updateItem = (index, field, value) => {
    const newItems = [...orderForm.items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    if (field === 'quantity' || field === 'price') {
      newItems[index].total = newItems[index].quantity * newItems[index].price;
    }
    
    if (field === 'productId') {
      const product = products.find(p => p.id === parseInt(value));
      if (product) {
        newItems[index].price = product.sellingPrice;
        newItems[index].total = newItems[index].quantity * product.sellingPrice;
      }
    }
    
    setOrderForm(prev => ({
      ...prev,
      items: newItems
    }));
  };

  // Remove item from order
  const removeItem = (index) => {
    setOrderForm(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  // Handle save customer
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

  // Save order
  const saveOrder = async () => {
    if (orderForm.customerName && orderForm.items.length > 0) {
      try {
        const orderData = {
          ...orderForm,
          customer: orderForm.customerName,
          date: orderForm.orderDate,
          status: 'Pending',
          balance: orderForm.totalAmount - orderForm.amountPaid
        };
        
        await saveService.saveOrder(orderData);
        toastService.success('Order saved successfully!');
        clearForm();
      } catch (error) {
        console.error('Error saving order:', error);
        toastService.error('Failed to save order');
      }
    } else {
      toastService.error('Please fill in customer name and add at least one item.');
    }
  };

  // Clear form
  const clearForm = () => {
    setOrderForm({
      customerName: '',
      customerPhone: '',
      deliveryAddress: '',
      orderDate: new Date().toISOString().split('T')[0],
      deliveryDate: '',
      orderType: 'Pickup',
      items: [],
      discount: 0,
      tax: 0,
      notes: '',
      totalAmount: 0,
      amountPaid: 0,
      paymentMode: 'Cash'
    });
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
            <div className="w-full bg-[#e3eeff] rounded-lg px-[22px] py-2.5 flex items-center justify-start gap-3 mb-2">
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
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#003079] mb-2">Take Order - Enhanced</h1>
            <p className="text-gray-600">Create and manage customer orders with advanced features</p>
          </div>

          {/* Order Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            {/* Customer Section */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[#003079] mb-4">Customer Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Name*
                  </label>
                  <div className="relative">
                    <select
                      value={orderForm.customerName}
                      onChange={(e) => {
                        const customer = customers.find(c => c.name === e.target.value);
                        handleFormChange('customerName', e.target.value);
                        if (customer) {
                          handleFormChange('customerPhone', customer.phone);
                          handleFormChange('deliveryAddress', customer.address);
                        }
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Customer</option>
                      {customers.map(customer => (
                        <option key={customer.id} value={customer.name}>
                          {customer.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowAddCustomerModal(true)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      + Add New
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    value={orderForm.customerPhone}
                    onChange={(e) => handleFormChange('customerPhone', e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Address
                  </label>
                  <textarea
                    value={orderForm.deliveryAddress}
                    onChange={(e) => handleFormChange('deliveryAddress', e.target.value)}
                    placeholder="Enter delivery address"
                    rows="2"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Order Details Section */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[#003079] mb-4">Order Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order Date
                  </label>
                  <input
                    type="date"
                    value={orderForm.orderDate}
                    onChange={(e) => handleFormChange('orderDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Date
                  </label>
                  <input
                    type="date"
                    value={orderForm.deliveryDate}
                    onChange={(e) => handleFormChange('deliveryDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order Type
                  </label>
                  <select
                    value={orderForm.orderType}
                    onChange={(e) => handleFormChange('orderType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Pickup">Pickup</option>
                    <option value="Delivery">Delivery</option>
                    <option value="In-Store">In-Store</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Items Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#003079]">Order Items</h2>
                <button
                  onClick={addItem}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  + Add Item
                </button>
              </div>
              
              {orderForm.items.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No items added yet. Click "Add Item" to start.
                </div>
              ) : (
                <div className="space-y-4">
                  {orderForm.items.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-12 gap-4 items-center p-4 border border-gray-200 rounded-lg">
                      <div className="col-span-1 text-sm font-medium text-gray-700">
                        {index + 1}
                      </div>
                      
                      <div className="col-span-4">
                        <select
                          value={item.productId}
                          onChange={(e) => updateItem(index, 'productId', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Product</option>
                          {products.map(product => (
                            <option key={product.id} value={product.id}>
                              {product.name} - ₹{product.sellingPrice}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="col-span-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                          placeholder="Qty"
                          min="1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div className="col-span-2">
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                          placeholder="Price"
                          step="0.01"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div className="col-span-2">
                        <input
                          type="number"
                          value={item.total}
                          readOnly
                          placeholder="Total"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>
                      
                      <div className="col-span-1">
                        <button
                          onClick={() => removeItem(index)}
                          className="w-full px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Payment Summary */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[#003079] mb-4">Payment Summary</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Amount
                    </label>
                    <div className="text-2xl font-bold text-[#003079]">
                      ₹{orderForm.totalAmount.toFixed(2)}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount Paid
                    </label>
                    <input
                      type="number"
                      value={orderForm.amountPaid}
                      onChange={(e) => handleFormChange('amountPaid', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="text-lg font-semibold text-gray-700">
                    Balance Remaining: ₹{orderForm.balanceRemaining.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={saveOrder}
                className="flex-1 px-6 py-3 bg-[#003079] text-white rounded-lg font-medium hover:bg-[#002a66] transition-colors"
              >
                Save Order
              </button>
              <button
                onClick={saveOrder}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Save and Generate Bill
              </button>
              <button
                onClick={clearForm}
                className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
              >
                Clear Form
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Customer Modal */}
      <AddCustomerModal
        isOpen={showAddCustomerModal}
        onClose={() => setShowAddCustomerModal(false)}
        onSave={handleSaveCustomer}
        customerType="Customer"
      />
    </div>
  );
};

export default TakeOrderEnhanced; 