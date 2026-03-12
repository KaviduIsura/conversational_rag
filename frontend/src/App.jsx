import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from './components/public/PublicLayout';
import { AdminLayout } from './components/admin/AdminLayout';
import { Home } from './components/public/Home';
import { Dashboard } from './components/admin/Dashboard';
import { KnowledgeBase } from './components/admin/KnowledgeBase';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with PublicTheme */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Admin Routes with AdminTheme */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="knowledge-base" element={<KnowledgeBase />} />
          {/* Add more routes here as we build them */}
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
