import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import HomePage from './pages/Home';
import OTPPage from './pages/OTP';
import CustomerManagementDashboard from './pages/CustomerManagementDashboard';
import SupplierManagementDashboard from './pages/SupplierManagementDashboard';
import TakeOrder from './pages/TakeOrder';
import TakeOrderEnhanced from './pages/TakeOrderEnhanced';
import OrderHistory from './pages/OrderHistory';
import AddCustomer from './pages/AddCustomer';
import AddSupplier from './pages/AddSupplier';
import AddProduct from './pages/AddProduct';
import InventoryManagement from './pages/InventoryManagement';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/otp" element={<OTPPage />} />
        <Route path="/customer-management-dashboard" element={<CustomerManagementDashboard />} />
        <Route path="/supplier-management-dashboard" element={<SupplierManagementDashboard />} />
        <Route path="/take-order" element={<TakeOrder />} />
        <Route path="/take-order-enhanced" element={<TakeOrderEnhanced />} />
        <Route path="/order-history" element={<OrderHistory />} />
                        <Route path="/add-customer" element={<AddCustomer />} />
                <Route path="/add-supplier" element={<AddSupplier />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/customer-management" element={<AddCustomer />} />
                <Route path="/supplier-management" element={<AddSupplier />} />
                <Route path="/inventory" element={<InventoryManagement />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;