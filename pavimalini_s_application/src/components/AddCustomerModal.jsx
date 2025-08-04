import React, { useState } from 'react';

const AddCustomerModal = ({ isOpen, onClose, onSave, customerType = 'Customer' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    gstNumber: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(\+91|0)?[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    // Email validation (optional)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // GST validation (for suppliers only)
    if (customerType === 'Supplier' && formData.gstNumber && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstNumber)) {
      newErrors.gstNumber = 'Please enter a valid GST number';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newCustomer = {
        id: Date.now(),
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        email: formData.email.trim(),
        gstNumber: formData.gstNumber.trim(),
        type: customerType,
        createdAt: new Date().toISOString()
      };

      await onSave(newCustomer);
      
      // Show success message
      showToast('success', `${customerType} saved successfully!`);
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        address: '',
        email: '',
        gstNumber: ''
      });
      
      onClose();
    } catch (error) {
      console.error('Error saving customer:', error);
      showToast('error', 'Failed to save. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (type, message) => {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ${
      type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  const handleClear = () => {
    setFormData({
      name: '',
      phone: '',
      address: '',
      email: '',
      gstNumber: ''
    });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#003079] font-poppins">
            Add New {customerType}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-[#003079] mb-2">
              {customerType} Name*
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder={`Enter ${customerType.toLowerCase()} name`}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-[#003079] mb-2">
              Phone Number*
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter phone number"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-[#003079] mb-2">
              Address*
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter address"
              rows="3"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#003079] mb-2">
              Email ID
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter email address (optional)"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* GST Number (Supplier only) */}
          {customerType === 'Supplier' && (
            <div>
              <label className="block text-sm font-medium text-[#003079] mb-2">
                GST Number
              </label>
              <input
                type="text"
                value={formData.gstNumber}
                onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                placeholder="Enter GST number (optional)"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.gstNumber ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.gstNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.gstNumber}</p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-[#003079] text-white rounded-lg font-medium hover:bg-[#002a66] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerModal; 