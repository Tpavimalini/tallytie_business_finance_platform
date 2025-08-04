import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveService, toastService } from '../services/saveService';

const InventoryManagement = () => {
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [stockFilter, setStockFilter] = useState('');
  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stockToAdd, setStockToAdd] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await saveService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      toastService.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await saveService.deleteProduct(id);
        await loadProducts();
        toastService.success('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        toastService.error('Failed to delete product');
      }
    }
  };

  const handleAddStock = async () => {
    if (!stockToAdd || parseInt(stockToAdd) <= 0) {
      toastService.error('Please enter a valid stock quantity');
      return;
    }

    try {
      const newStock = selectedProduct.openingStock + parseInt(stockToAdd);
      await saveService.updateProductStock(selectedProduct.id, newStock);
      await loadProducts();
      setShowAddStockModal(false);
      setSelectedProduct(null);
      setStockToAdd('');
      toastService.success('Stock updated successfully!');
    } catch (error) {
      console.error('Error updating stock:', error);
      toastService.error('Failed to update stock');
    }
  };

  const openAddStockModal = (product) => {
    setSelectedProduct(product);
    setShowAddStockModal(true);
  };

  // Filter products based on search and filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    
    let matchesStock = true;
    if (stockFilter === 'low') {
      matchesStock = product.openingStock <= product.minimumStockAlert;
    } else if (stockFilter === 'out') {
      matchesStock = product.openingStock === 0;
    } else if (stockFilter === 'available') {
      matchesStock = product.openingStock > 0;
    }
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  const categories = [...new Set(products.map(p => p.category))];

  const getStockStatus = (product) => {
    if (product.openingStock === 0) {
      return { text: 'Out of Stock', color: 'text-red-600', bg: 'bg-red-100' };
    } else if (product.openingStock <= product.minimumStockAlert) {
      return { text: 'Low Stock', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    } else {
      return { text: 'In Stock', color: 'text-green-600', bg: 'bg-green-100' };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
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
            {/* Ledger Management Section */}
            <h3 className="text-[20px] font-normal leading-[25px] tracking-[1px] text-global-5 font-inter mb-1.5">
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
                <span className="pl-[68px] pr-[34px] py-4 text-[18px] font-light leading-[27px] text-global-8 font-poppins">
                  Take Order
                </span>
              </div>
            </div>

            {/* Order History */}
            <div className="relative w-full mb-2 cursor-pointer" onClick={() => navigate('/order-history')}>
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

            {/* Inventory Management */}
            <div className="relative w-full mb-2 cursor-pointer" onClick={() => navigate('/inventory')}>
              <div className="absolute left-[18px] top-1/2 transform -translate-y-1/2 z-10">
                <img 
                  src="/images/img_vector_blue_900.svg" 
                  alt="inventory icon" 
                  className="w-[22px] h-[18px]"
                />
              </div>
              <div className="w-full h-[56px] bg-global-4 rounded-lg flex items-center">
                <span className="pl-[68px] pr-[34px] py-4 text-[18px] font-light leading-[27px] text-global-8 font-poppins">
                  Inventory
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
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-[#003079]">Inventory Management</h1>
              <button 
                onClick={() => navigate('/add-product')}
                className="px-6 py-3 bg-[#003079] text-white rounded-lg font-medium hover:bg-[#002a66] transition-colors flex items-center gap-2"
              >
                <span>+</span>
                Add New Product
              </button>
            </div>
            <p className="text-gray-600">Manage your product inventory, track stock levels, and monitor product performance</p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-[#003079] mb-2">Search Products</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, code, or brand..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-[#003079] mb-2">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Stock Filter */}
              <div>
                <label className="block text-sm font-medium text-[#003079] mb-2">Stock Status</label>
                <select
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Stock</option>
                  <option value="available">In Stock</option>
                  <option value="low">Low Stock</option>
                  <option value="out">Out of Stock</option>
                </select>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('');
                    setStockFilter('');
                  }}
                  className="w-full px-4 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003079] mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <img 
                  src="/images/img_vector_blue_900.svg" 
                  alt="No products" 
                  className="w-24 h-24 mx-auto opacity-50 mb-4"
                />
                <h3 className="text-lg font-semibold text-[#003079] mb-2">No Products Found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || categoryFilter || stockFilter 
                    ? 'Try adjusting your search or filters' 
                    : 'Get started by adding your first product'
                  }
                </p>
                {!searchTerm && !categoryFilter && !stockFilter && (
                  <button
                    onClick={() => navigate('/add-product')}
                    className="px-6 py-3 bg-[#003079] text-white rounded-lg font-medium hover:bg-[#002a66] transition-colors"
                  >
                    Add First Product
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-[#003079]">Product</th>
                      <th className="text-left py-4 px-6 font-semibold text-[#003079]">Code</th>
                      <th className="text-left py-4 px-6 font-semibold text-[#003079]">Category</th>
                      <th className="text-left py-4 px-6 font-semibold text-[#003079]">Stock</th>
                      <th className="text-left py-4 px-6 font-semibold text-[#003079]">Purchase Price</th>
                      <th className="text-left py-4 px-6 font-semibold text-[#003079]">Selling Price</th>
                      <th className="text-left py-4 px-6 font-semibold text-[#003079]">Profit Margin</th>
                      <th className="text-left py-4 px-6 font-semibold text-[#003079]">Expiry Date</th>
                      <th className="text-left py-4 px-6 font-semibold text-[#003079]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => {
                      const stockStatus = getStockStatus(product);
                      return (
                        <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              {product.imageUrl ? (
                                <img 
                                  src={product.imageUrl} 
                                  alt={product.name}
                                  className="w-10 h-10 rounded-lg object-cover mr-3"
                                />
                              ) : (
                                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                                  <span className="text-gray-500 text-xs">📦</span>
                                </div>
                              )}
                              <div>
                                <div className="font-medium text-gray-900">{product.name}</div>
                                {product.brand && (
                                  <div className="text-sm text-gray-500">{product.brand}</div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-600">{product.productCode}</td>
                          <td className="py-4 px-6">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {product.category}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{product.openingStock} {product.unitType}</span>
                              <span className={`px-2 py-1 text-xs rounded-full ${stockStatus.bg} ${stockStatus.color}`}>
                                {stockStatus.text}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-600">₹{product.purchasePrice}</td>
                          <td className="py-4 px-6 text-sm text-gray-600">₹{product.sellingPrice}</td>
                          <td className="py-4 px-6">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              product.profitMargin > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {product.profitMargin > 0 ? '+' : ''}{product.profitMargin}%
                            </span>
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-600">
                            {product.expiryDate ? formatDate(product.expiryDate) : '-'}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex gap-2">
                              <button
                                onClick={() => openAddStockModal(product)}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                Add Stock
                              </button>
                              <button
                                onClick={() => navigate(`/edit-product/${product.id}`)}
                                className="text-green-600 hover:text-green-800 text-sm font-medium"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Summary Stats */}
          {filteredProducts.length > 0 && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-[#003079] mb-2">Total Products</h3>
                <p className="text-3xl font-bold text-blue-600">{filteredProducts.length}</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-[#003079] mb-2">Low Stock Items</h3>
                <p className="text-3xl font-bold text-yellow-600">
                  {filteredProducts.filter(p => p.openingStock <= p.minimumStockAlert && p.openingStock > 0).length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-[#003079] mb-2">Out of Stock</h3>
                <p className="text-3xl font-bold text-red-600">
                  {filteredProducts.filter(p => p.openingStock === 0).length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-[#003079] mb-2">Total Value</h3>
                <p className="text-3xl font-bold text-green-600">
                  ₹{filteredProducts.reduce((sum, p) => sum + (p.openingStock * p.purchasePrice), 0).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Stock Modal */}
      {showAddStockModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#003079]">Add Stock</h2>
              <button 
                onClick={() => {
                  setShowAddStockModal(false);
                  setSelectedProduct(null);
                  setStockToAdd('');
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                <strong>Product:</strong> {selectedProduct.name}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Current Stock:</strong> {selectedProduct.openingStock} {selectedProduct.unitType}
              </p>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#003079] mb-2">
                Stock to Add ({selectedProduct.unitType})
              </label>
              <input
                type="number"
                value={stockToAdd}
                onChange={(e) => setStockToAdd(e.target.value)}
                placeholder="Enter quantity"
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={handleAddStock}
                className="flex-1 px-6 py-3 bg-[#003079] text-white rounded-lg font-medium hover:bg-[#002a66] transition-colors"
              >
                Add Stock
              </button>
              <button
                onClick={() => {
                  setShowAddStockModal(false);
                  setSelectedProduct(null);
                  setStockToAdd('');
                }}
                className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
    </div>
  );
};

export default InventoryManagement; 