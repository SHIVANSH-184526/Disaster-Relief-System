import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Requests from './pages/Requests';
import Supplies from './pages/Supplies';
import Allocation from './pages/Allocation';
import Tracking from './pages/Tracking';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="requests" element={<Requests />} />
          <Route path="supplies" element={<Supplies />} />
          <Route path="allocation" element={<Allocation />} />
          <Route path="tracking" element={<Tracking />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
