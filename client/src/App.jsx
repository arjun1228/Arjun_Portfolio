import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';

import Home from './pages/Home.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import NotFound from './pages/NotFound.jsx';
import Loader from './components/common/Loader.jsx';

// Code-split admin dashboard
const AdminDashboard = lazy(() => import('./pages/AdminDashboard.jsx'));

// Protected Route for Admin Panel
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg">
        <Loader message="Verifying session..." />
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <Suspense
                  fallback={
                    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg">
                      <Loader message="Loading dashboard..." />
                    </div>
                  }
                >
                  <PrivateRoute>
                    <AdminDashboard />
                  </PrivateRoute>
                </Suspense>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;

