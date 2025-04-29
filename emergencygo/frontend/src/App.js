import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoutes';
import PasswordResetRequest from './components/PasswordResetRequest';
import PasswordReset from './components/PasswordReset';
import AdminBanUser from './components/AdminBanUser'; // you imported this but weren't using it
import AdminManageUsers from './components/AdminManageUsers'; // same here
import AdminCreateUser from './pages/AdminCreateUser';
import AdminEditUser from './pages/AdminEditUser';
import AxiosInstance from './components/AxiosInstance';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const noNavbarRoutes = ['/', '/register', '/request/password_reset'];
  const noNavbar = noNavbarRoutes.includes(location.pathname) || location.pathname.startsWith('/password-reset');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await AxiosInstance.get('users/me/');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (localStorage.getItem('Token')) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {!noNavbar && <Navbar user={user} />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/request/password_reset" element={<PasswordResetRequest />} />
        <Route path="/password-reset/:token" element={<PasswordReset />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/admin/create-user" element={<AdminCreateUser />} />
          <Route path="/admin/edit-user/:id" element={<AdminEditUser />} />
          <Route path="/admin/manage" element={<AdminManageUsers />} />
          {/* You might want these too */}
          <Route path="/admin/ban-user/:id" element={<AdminBanUser />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </>
  );
}

export default App;
