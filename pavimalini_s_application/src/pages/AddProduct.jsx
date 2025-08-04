import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveService, toastService } from '../services/saveService';

const AddProduct = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    productName: '',
    productCode: '',
    category: '',
    brand: '',
    description: '',
    purchasePrice: '',
    sellingPrice: '',
    gstPercentage: '',
    unitType: '',
    openingStock: '',
    minimumStockAlert: '',
    expiryDate: '',
    isPerishable: false,
    productImage: null
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const categories = ['Grocery', 'Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Health & Beauty', 'Automotive', 'Toys', 'Other'];
  const unitTypes = ['Kg', 'Litre', 'Piece', 'Pack', 'Box', 'Meter', 'Gram', 'Milliliter', 'Dozen', 'Bundle'];

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.purchasePrice || parseFloat(formData.purchasePrice) <= 0) {
      newErrors.purchasePrice = 'Purchase price must be greater than 0';
    }

    if (!formData.sellingPrice || parseFloat(formData.sellingPrice) <= 0) {
      newErrors.sellingPrice = 'Selling price must be greater than 0';
    }

    if (!formData.unitType) {
      newErrors.unitType = 'Unit type is required';
    }

    if (!formData.openingStock || parseInt(formData.openingStock) < 0) {
      newErrors.openingStock = 'Opening stock must be 0 or greater';
    }

    // Price validation
    if (parseFloat(formData.purchasePrice) > parseFloat(formData.sellingPrice)) {
      newErrors.sellingPrice = 'Selling price should be greater than purchase price';
    }

    // GST validation
    if (formData.gstPercentage && (parseFloat(formData.gstPercentage) < 0 || parseFloat(formData.gstPercentage) > 28)) {
      newErrors.gstPercentage = 'GST percentage must be between 0 and 28';
    }

    // Expiry date validation
    if (formData.isPerishable && formData.expiryDate) {
      const expiryDate = new Date(formData.expiryDate);
      const today = new Date();
      if (expiryDate <= today) {
        newErrors.expiryDate = 'Expiry date must be in the future';
      }
    }

    // File size validation
    if (formData.productImage && formData.productImage.size > 5 * 1024 * 1024) {
      newErrors.productImage = 'Image size must be less than 5MB';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const calculateProfitMargin = () => {
    const purchasePrice = parseFloat(formData.purchasePrice) || 0;
    const sellingPrice = parseFloat(formData.sellingPrice) || 0;
    
    if (purchasePrice > 0 && sellingPrice > 0) {
      return ((sellingPrice - purchasePrice) / purchasePrice * 100).toFixed(2);
    }
    return '0.00';
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          productImage: 'Image size must be less than 5MB'
        }));
        return;
      }
      setFormData(prev => ({
        ...prev,
        productImage: file
      }));
      setErrors(prev => ({
        ...prev,
        productImage: ''
      }));
    }
  };

  const generateProductCode = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `PROD${timestamp}${random}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const productData = {
        name: formData.productName.trim(),
        productCode: formData.productCode || generateProductCode(),
        category: formData.category,
        brand: formData.brand.trim(),
        description: formData.description.trim(),
        purchasePrice: parseFloat(formData.purchasePrice),
        sellingPrice: parseFloat(formData.sellingPrice),
        gstPercentage: parseFloat(formData.gstPercentage) || 0,
        unitType: formData.unitType,
        openingStock: parseInt(formData.openingStock),
        minimumStockAlert: parseInt(formData.minimumStockAlert) || 0,
        expiryDate: formData.isPerishable && formData.expiryDate ? formData.expiryDate : null,
        isPerishable: formData.isPerishable,
        profitMargin: parseFloat(calculateProfitMargin()),
        imageUrl: formData.productImage ? URL.createObjectURL(formData.productImage) : null
      };

      await saveService.saveProduct(productData);
      
      toastService.success('Product saved successfully!');
      clearForm();
      
      // Navigate to inventory after a short delay
      setTimeout(() => {
        navigate('/inventory');
      }, 1500);
      
    } catch (error) {
      console.error('Error saving product:', error);
      toastService.error('Failed to save product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearForm = () => {
    setFormData({
      productName: '',
      productCode: '',
      category: '',
      brand: '',
      description: '',
      purchasePrice: '',
      sellingPrice: '',
      gstPercentage: '',
      unitType: '',
      openingStock: '',
      minimumStockAlert: '',
      expiryDate: '',
      isPerishable: false,
      productImage: null
    });
    setErrors({});
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
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-[#003079]">Add New Product</h1>
              <button 
                onClick={() => navigate('/inventory')}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
              >
                Back to Inventory
              </button>
            </div>
            <p className="text-gray-600">Add new products to your inventory with complete details</p>
          </div>

          {/* Product Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#003079] mb-2">
                  Product Name*
                </label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) => handleInputChange('productName', e.target.value)}
                  placeholder="Enter product name"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.productName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.productName && (
                  <p className="text-red-500 text-sm mt-1">{errors.productName}</p>
                )}
              </div>

              {/* Product Code */}
              <div>
                <label className="block text-sm font-medium text-[#003079] mb-2">
                  Product Code/SKU
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.productCode}
                    onChange={(e) => handleInputChange('productCode', e.target.value)}
                    placeholder="Auto-generate or enter manually"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => handleInputChange('productCode', generateProductCode())}
                    className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Generate
                  </button>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-[#003079] mb-2">
                  Category*
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
              </div>

              {/* Brand */}
              <div>
                <label className="block text-sm font-medium text-[#003079] mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  placeholder="Enter brand name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#003079] mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter product description"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Purchase Price */}
              <div>
                <label className="block text-sm font-medium text-[#003079] mb-2">
                  Purchase Price*
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={formData.purchasePrice}
                    onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.purchasePrice ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.purchasePrice && (
                  <p className="text-red-500 text-sm mt-1">{errors.purchasePrice}</p>
                )}
              </div>

              {/* Selling Price */}
              <div>
                <label className="block text-sm font-medium text-[#003079] mb-2">
                  Selling Price*
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={formData.sellingPrice}
                    onChange={(e) => handleInputChange('sellingPrice', e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.sellingPrice ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.sellingPrice && (
                  <p className="text-red-500 text-sm mt-1">{errors.sellingPrice}</p>
                )}
              </div>

              {/* GST Percentage */}
              <div>
                <label className="block text-sm font-medium text-[#003079] mb-2">
                  GST %
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.gstPercentage}
                    onChange={(e) => handleInputChange('gstPercentage', e.target.value)}
                    placeholder="0"
                    step="0.01"
                    min="0"
                    max="28"
                    className={`w-full pr-8 pl-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.gstPercentage ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                </div>
                {errors.gstPercentage && (
                  <p className="text-red-500 text-sm mt-1">{errors.gstPercentage}</p>
                )}
              </div>

              {/* Unit Type */}
              <div>
                <label className="block text-sm font-medium text-[#003079] mb-2">
                  Unit Type*
                </label>
                <select
                  value={formData.unitType}
                  onChange={(e) => handleInputChange('unitType', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.unitType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Unit Type</option>
                  {unitTypes.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
                {errors.unitType && (
                  <p className="text-red-500 text-sm mt-1">{errors.unitType}</p>
                )}
              </div>

              {/* Opening Stock */}
              <div>
                <label className="block text-sm font-medium text-[#003079] mb-2">
                  Opening Stock*
                </label>
                <input
                  type="number"
                  value={formData.openingStock}
                  onChange={(e) => handleInputChange('openingStock', e.target.value)}
                  placeholder="0"
                  min="0"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.openingStock ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.openingStock && (
                  <p className="text-red-500 text-sm mt-1">{errors.openingStock}</p>
                )}
              </div>

              {/* Minimum Stock Alert */}
              <div>
                <label className="block text-sm font-medium text-[#003079] mb-2">
                  Minimum Stock Alert
                </label>
                <input
                  type="number"
                  value={formData.minimumStockAlert}
                  onChange={(e) => handleInputChange('minimumStockAlert', e.target.value)}
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Perishable Checkbox */}
              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isPerishable}
                    onChange={(e) => handleInputChange('isPerishable', e.target.checked)}
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-[#003079]">This is a perishable product</span>
                </label>
              </div>

              {/* Expiry Date */}
              {formData.isPerishable && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#003079] mb-2">
                    Expiry Date*
                  </label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.expiryDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                  )}
                </div>
              )}

              {/* Product Image */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#003079] mb-2">
                  Product Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.productImage ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.productImage && (
                  <p className="text-red-500 text-sm mt-1">{errors.productImage}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">Maximum file size: 5MB</p>
              </div>

              {/* Profit Margin Display */}
              <div className="md:col-span-2">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-[#003079] mb-2">Profit Margin</h3>
                  <div className="text-2xl font-bold text-green-600">
                    {calculateProfitMargin()}%
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Based on purchase price: ₹{formData.purchasePrice || '0'} and selling price: ₹{formData.sellingPrice || '0'}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-[#003079] text-white rounded-lg font-medium hover:bg-[#002a66] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Saving...' : 'Save Product'}
              </button>
              <button
                type="button"
                onClick={clearForm}
                className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
              >
                Clear Form
              </button>
              <button
                type="button"
                onClick={() => navigate('/inventory')}
                className="flex-1 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition-colors"
              >
                Back to Inventory
              </button>
            </div>
          </form>
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
    </div>
  );
};

export default AddProduct; 