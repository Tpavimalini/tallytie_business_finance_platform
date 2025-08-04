// Unified Save Service for Customer/Supplier/Order Management

// In-memory storage (replace with actual API calls in production)
let customers = [
  { id: 1, name: 'Pavithra Stores', phone: '9876543210', address: '123 Main St, Chennai', email: '', gstNumber: '', type: 'Customer', createdAt: '2025-08-01T10:00:00Z' },
  { id: 2, name: 'Starling Stores', phone: '8765432109', address: '456 Park Ave, Mumbai', email: '', gstNumber: '', type: 'Customer', createdAt: '2025-08-02T10:00:00Z' },
  { id: 3, name: 'ABC Traders', phone: '7654321098', address: '789 Business Rd, Delhi', email: '', gstNumber: '', type: 'Customer', createdAt: '2025-08-03T10:00:00Z' }
];

let suppliers = [
  { id: 1, name: 'Premium Suppliers', phone: '9876543211', address: 'Supplier Address 1', email: 'premium@supplier.com', gstNumber: '27AAPFU0939F1Z5', type: 'Supplier', createdAt: '2025-08-01T10:00:00Z' },
  { id: 2, name: 'Quality Goods', phone: '8765432108', address: 'Supplier Address 2', email: 'quality@supplier.com', gstNumber: '29AABFQ1234M1Z3', type: 'Supplier', createdAt: '2025-08-02T10:00:00Z' }
];

let orders = [
  { id: 'ORD1234', date: '2025-08-03', customer: 'Pavithra Stores', items: [], total: 1500, paid: 1000, balance: 500, status: 'Pending', createdAt: '2025-08-03T10:00:00Z' }
];

let products = [
  { id: 1, name: 'Rice', productCode: 'PROD001', category: 'Grocery', brand: 'Premium', description: 'Premium quality rice', purchasePrice: 45, sellingPrice: 50, gstPercentage: 5, unitType: 'Kg', openingStock: 100, minimumStockAlert: 10, profitMargin: 11.11, createdAt: '2025-08-01T10:00:00Z' },
  { id: 2, name: 'Sugar', productCode: 'PROD002', category: 'Grocery', brand: 'Refined', description: 'Refined white sugar', purchasePrice: 40, sellingPrice: 45, gstPercentage: 5, unitType: 'Kg', openingStock: 80, minimumStockAlert: 15, profitMargin: 12.5, createdAt: '2025-08-02T10:00:00Z' },
  { id: 3, name: 'Oil', productCode: 'PROD003', category: 'Cooking', brand: 'Pure', description: 'Pure vegetable oil', purchasePrice: 100, sellingPrice: 120, gstPercentage: 12, unitType: 'Litre', openingStock: 50, minimumStockAlert: 5, profitMargin: 20, createdAt: '2025-08-03T10:00:00Z' }
];

// Unified Save Functions
export const saveService = {
  // Save Customer
  async saveCustomer(customerData) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newCustomer = {
        ...customerData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      
      customers.push(newCustomer);
      
      // Store in localStorage for persistence
      localStorage.setItem('customers', JSON.stringify(customers));
      
      return { success: true, data: newCustomer };
    } catch (error) {
      console.error('Error saving customer:', error);
      throw new Error('Failed to save customer');
    }
  },

  // Save Supplier
  async saveSupplier(supplierData) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newSupplier = {
        ...supplierData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      
      suppliers.push(newSupplier);
      
      // Store in localStorage for persistence
      localStorage.setItem('suppliers', JSON.stringify(suppliers));
      
      return { success: true, data: newSupplier };
    } catch (error) {
      console.error('Error saving supplier:', error);
      throw new Error('Failed to save supplier');
    }
  },

  // Save Order
  async saveOrder(orderData) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newOrder = {
        ...orderData,
        id: `ORD${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      
      orders.push(newOrder);
      
      // Store in localStorage for persistence
      localStorage.setItem('orders', JSON.stringify(orders));
      
      return { success: true, data: newOrder };
    } catch (error) {
      console.error('Error saving order:', error);
      throw new Error('Failed to save order');
    }
  },

  // Get Customers
  async getCustomers() {
    try {
      // Load from localStorage if available
      const stored = localStorage.getItem('customers');
      if (stored) {
        customers = JSON.parse(stored);
      }
      return customers;
    } catch (error) {
      console.error('Error getting customers:', error);
      return customers;
    }
  },

  // Get Suppliers
  async getSuppliers() {
    try {
      // Load from localStorage if available
      const stored = localStorage.getItem('suppliers');
      if (stored) {
        suppliers = JSON.parse(stored);
      }
      return suppliers;
    } catch (error) {
      console.error('Error getting suppliers:', error);
      return suppliers;
    }
  },

  // Get Orders
  async getOrders() {
    try {
      // Load from localStorage if available
      const stored = localStorage.getItem('orders');
      if (stored) {
        orders = JSON.parse(stored);
      }
      return orders;
    } catch (error) {
      console.error('Error getting orders:', error);
      return orders;
    }
  },

  // Delete Customer
  async deleteCustomer(id) {
    try {
      customers = customers.filter(c => c.id !== id);
      localStorage.setItem('customers', JSON.stringify(customers));
      return { success: true };
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw new Error('Failed to delete customer');
    }
  },

  // Delete Supplier
  async deleteSupplier(id) {
    try {
      suppliers = suppliers.filter(s => s.id !== id);
      localStorage.setItem('suppliers', JSON.stringify(suppliers));
      return { success: true };
    } catch (error) {
      console.error('Error deleting supplier:', error);
      throw new Error('Failed to delete supplier');
    }
  },

  // Delete Order
  async deleteOrder(id) {
    try {
      orders = orders.filter(o => o.id !== id);
      localStorage.setItem('orders', JSON.stringify(orders));
      return { success: true };
    } catch (error) {
      console.error('Error deleting order:', error);
      throw new Error('Failed to delete order');
    }
  },

  // Save Product
  async saveProduct(productData) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newProduct = {
        ...productData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      
      products.push(newProduct);
      
      // Store in localStorage for persistence
      localStorage.setItem('products', JSON.stringify(products));
      
      return { success: true, data: newProduct };
    } catch (error) {
      console.error('Error saving product:', error);
      throw new Error('Failed to save product');
    }
  },

  // Get Products
  async getProducts() {
    try {
      // Load from localStorage if available
      const stored = localStorage.getItem('products');
      if (stored) {
        products = JSON.parse(stored);
      }
      return products;
    } catch (error) {
      console.error('Error getting products:', error);
      return products;
    }
  },

  // Delete Product
  async deleteProduct(id) {
    try {
      products = products.filter(p => p.id !== id);
      localStorage.setItem('products', JSON.stringify(products));
      return { success: true };
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error('Failed to delete product');
    }
  },

  // Update Product Stock
  async updateProductStock(id, newStock) {
    try {
      const productIndex = products.findIndex(p => p.id === id);
      if (productIndex !== -1) {
        products[productIndex].openingStock = newStock;
        localStorage.setItem('products', JSON.stringify(products));
        return { success: true, data: products[productIndex] };
      }
      throw new Error('Product not found');
    } catch (error) {
      console.error('Error updating product stock:', error);
      throw new Error('Failed to update product stock');
    }
  }
};

// Toast notification service
export const toastService = {
  show(type, message) {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast-notification');
    existingToasts.forEach(toast => toast.remove());

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast-notification fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ${
      type === 'success' ? 'bg-green-500 text-white' : 
      type === 'error' ? 'bg-red-500 text-white' : 
      'bg-blue-500 text-white'
    }`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.remove();
    }, 3000);
  },

  success(message) {
    this.show('success', message);
  },

  error(message) {
    this.show('error', message);
  },

  info(message) {
    this.show('info', message);
  }
};

// Validation service
export const validationService = {
  // Validate phone number (Indian format)
  validatePhone(phone) {
    const cleanPhone = phone.replace(/\s/g, '');
    return /^(\+91|0)?[6-9]\d{9}$/.test(cleanPhone);
  },

  // Validate email
  validateEmail(email) {
    if (!email) return true; // Optional field
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  // Validate GST number
  validateGST(gst) {
    if (!gst) return true; // Optional field
    return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gst);
  },

  // Validate required field
  validateRequired(value, fieldName) {
    if (!value || !value.trim()) {
      return `${fieldName} is required`;
    }
    return null;
  }
};

export default saveService; 