import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const navigate = useNavigate();
  
  // State for filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Mock orders data
  const [orders] = useState([
    {
      id: 'ORD1234',
      date: '2025-08-03',
      customer: 'Pavithra Stores',
      customerPhone: '9876543210',
      items: [
        { name: 'Rice', quantity: 2, price: 50, total: 100 },
        { name: 'Sugar', quantity: 1, price: 45, total: 45 },
        { name: 'Oil', quantity: 1, price: 120, total: 120 }
      ],
      total: 1500,
      paid: 1000,
      balance: 500,
      status: 'Pending',
      paymentMode: 'Cash',
      orderType: 'Delivery',
      notes: 'Please deliver before 6 PM',
      deliveryAddress: '123 Main St, Chennai'
    },
    {
      id: 'ORD1235',
      date: '2025-08-02',
      customer: 'Starling Stores',
      customerPhone: '8765432109',
      items: [
        { name: 'Flour', quantity: 3, price: 35, total: 105 },
        { name: 'Sugar', quantity: 2, price: 45, total: 90 }
      ],
      total: 800,
      paid: 800,
      balance: 0,
      status: 'Delivered',
      paymentMode: 'UPI',
      orderType: 'Pickup',
      notes: 'Ready for pickup',
      deliveryAddress: '456 Park Ave, Mumbai'
    },
    {
      id: 'ORD1236',
      date: '2025-08-01',
      customer: 'ABC Traders',
      customerPhone: '7654321098',
      items: [
        { name: 'Rice', quantity: 5, price: 50, total: 250 },
        { name: 'Oil', quantity: 2, price: 120, total: 240 }
      ],
      total: 1200,
      paid: 600,
      balance: 600,
      status: 'Partial',
      paymentMode: 'Credit',
      orderType: 'Delivery',
      notes: 'Partial payment received',
      deliveryAddress: '789 Business Rd, Delhi'
    }
  ]);

  // Filter orders based on search and filters
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDateFrom = !dateFrom || order.date >= dateFrom;
    const matchesDateTo = !dateTo || order.date <= dateTo;
    const matchesOrderStatus = !orderStatus || order.status === orderStatus;
    const matchesPaymentStatus = !paymentStatus || 
      (paymentStatus === 'Paid' && order.balance === 0) ||
      (paymentStatus === 'Unpaid' && order.paid === 0) ||
      (paymentStatus === 'Partial' && order.paid > 0 && order.balance > 0);
    
    return matchesSearch && matchesDateFrom && matchesDateTo && matchesOrderStatus && matchesPaymentStatus;
  });

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleEditOrder = (order) => {
    // Navigate to take order page with pre-filled data
    navigate('/take-order-enhanced', { state: { editOrder: order } });
  };

  const handlePrintOrder = (order) => {
    // Generate and print invoice
    console.log('Printing order:', order.id);
    alert(`Printing invoice for ${order.id}`);
  };

  const handleDeleteOrder = (order) => {
    if (window.confirm(`Are you sure you want to delete order ${order.id}?`)) {
      console.log('Deleting order:', order.id);
      alert(`Order ${order.id} deleted successfully`);
    }
  };

  const exportToExcel = () => {
    console.log('Exporting to Excel');
    alert('Exporting orders to Excel...');
  };

  const exportToPDF = () => {
    console.log('Exporting to PDF');
    alert('Exporting orders to PDF...');
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

            {/* ORDER MANAGEMENT Section */}
            <h3 className="text-[20px] font-bold leading-[25px] tracking-[1px] text-global-5 font-inter mb-2 uppercase">
              ORDER MANAGEMENT
            </h3>

            {/* Take Order */}
            <div className="relative w-full mb-2 cursor-pointer" onClick={() => navigate('/take-order-enhanced')}>
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

            {/* Order History - Active */}
            <div className="relative w-full mb-8">
              <div className="absolute left-[24px] top-1/2 transform -translate-y-1/2 z-10">
                <img 
                  src="/images/img_vector_blue_900_18x14.svg" 
                  alt="order history icon" 
                  className="w-[14px] h-[18px]"
                />
              </div>
              <div className="w-full h-[56px] bg-[#e3eeff] rounded-lg flex items-center">
                <span className="pl-[68px] pr-[34px] py-4 text-[18px] font-light leading-[27px] text-[#003079] font-poppins">
                  Order History
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#003079] mb-2">Order History</h1>
            <p className="text-gray-600">View and manage all customer orders</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-[#003079] mb-4">Search & Filters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by customer or order ID"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date From</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date To</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order Status</label>
                <select
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Partial">Partial</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All</option>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                  <option value="Partial">Partial</option>
                </select>
              </div>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-600">
              Showing {filteredOrders.length} of {orders.length} orders
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportToExcel}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Export Excel
              </button>
              <button
                onClick={exportToPDF}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Export PDF
              </button>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Items</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Total</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Paid</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Balance</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-[#003079]">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          {order.items.length} items
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">₹{order.total}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">₹{order.paid}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">₹{order.balance}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'Partial' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewOrder(order)}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEditOrder(order)}
                            className="text-xs text-green-600 hover:text-green-800"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handlePrintOrder(order)}
                            className="text-xs text-purple-600 hover:text-purple-800"
                          >
                            Print
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(order)}
                            className="text-xs text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#003079]">Order Details - {selectedOrder.id}</h2>
              <button 
                onClick={() => setShowOrderDetails(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Order Information */}
              <div>
                <h3 className="text-lg font-semibold text-[#003079] mb-4">Order Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Order ID:</span>
                    <span className="ml-2 text-sm text-gray-600">{selectedOrder.id}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Date:</span>
                    <span className="ml-2 text-sm text-gray-600">{selectedOrder.date}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Status:</span>
                    <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                      selectedOrder.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      selectedOrder.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      selectedOrder.status === 'Partial' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Order Type:</span>
                    <span className="ml-2 text-sm text-gray-600">{selectedOrder.orderType}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Payment Mode:</span>
                    <span className="ml-2 text-sm text-gray-600">{selectedOrder.paymentMode}</span>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-semibold text-[#003079] mb-4">Customer Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Customer:</span>
                    <span className="ml-2 text-sm text-gray-600">{selectedOrder.customer}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Phone:</span>
                    <span className="ml-2 text-sm text-gray-600">{selectedOrder.customerPhone}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Address:</span>
                    <span className="ml-2 text-sm text-gray-600">{selectedOrder.deliveryAddress}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-[#003079] mb-4">Order Items</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Item</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Quantity</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Price</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="px-4 py-2 text-sm text-gray-600">{item.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">{item.quantity}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">₹{item.price}</td>
                        <td className="px-4 py-2 text-sm font-medium">₹{item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-[#003079] mb-4">Payment Summary</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Total Amount:</span>
                    <span className="ml-2 text-lg font-bold text-[#003079]">₹{selectedOrder.total}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Amount Paid:</span>
                    <span className="ml-2 text-lg font-medium text-green-600">₹{selectedOrder.paid}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Balance:</span>
                    <span className="ml-2 text-lg font-medium text-red-600">₹{selectedOrder.balance}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {selectedOrder.notes && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-[#003079] mb-4">Notes</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">{selectedOrder.notes}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={() => handleEditOrder(selectedOrder)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Edit Order
              </button>
              <button
                onClick={() => handlePrintOrder(selectedOrder)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Print Invoice
              </button>
              <button
                onClick={() => setShowOrderDetails(false)}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory; 