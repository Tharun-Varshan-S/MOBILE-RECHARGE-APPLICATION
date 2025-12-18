import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

import { Dashboard } from './pages/Dashboard';
import { Plans } from './pages/Plans';
import { Payment } from './pages/Payment';
import { Success } from './pages/Success';
import { History } from './pages/History';
import { Notifications } from './pages/Notifications';

// Admin Pages
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminPlans } from './pages/AdminPlans';
import { AdminNotifications } from './pages/AdminNotifications';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Protected User Routes (Mock protected) */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="recharge" element={<Plans />} />
        <Route path="plans" element={<Plans />} />
        <Route path="payment" element={<Payment />} />
        <Route path="success" element={<Success />} />
        <Route path="history" element={<History />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<Layout />}>
        <Route index element={<AdminLogin />} />
        <Route path="login" element={<AdminLogin />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="plans" element={<AdminPlans />} />
        <Route path="notifications" element={<AdminNotifications />} />
      </Route>
    </Routes>
  );
}

export default App;
