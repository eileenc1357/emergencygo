// src/pages/AdminEditUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AdminEditUser = () => {
  const { id } = useParams(); // gets user ID from the URL
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/admin-tools/users/${id}/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem('authToken')}`,  // ✅ Consistent token key
          },
        });
        setFormData({ email: response.data.email, password: '' });
      } catch (error) {
        console.error('Error fetching user:', error);
        setMessage('Failed to fetch user data.');
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { email: formData.email };
    if (formData.password) {
      payload.password = formData.password;
    }

    try {
      await axios.put(`/admin-tools/users/${id}/`, payload, {
        headers: {
          Authorization: `Token ${localStorage.getItem('authToken')}`,  // ✅ Consistent token key
        },
      });
      setMessage('User updated successfully!');
    } catch (error) {
      console.error('Update error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      setMessage('Error updating user: ' + (error.response?.data?.detail || 'Unknown error'));
    }
  };

  return (
    <div className="p-4" style={{ marginLeft: '240px', paddingLeft: '20px' }}>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit User</h2>

        <div className="space-y-6 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Current Email:</span>
            <span className="text-gray-600">{formData.email}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Current Password:</span>
            <span className="text-gray-600">••••••••</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium">New Email:</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium">New Password:</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white p-3 w-full rounded-md hover:bg-green-600 transition-colors"
          >
            Update User
          </button>
        </form>

        {message && <p className="mt-4 text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export default AdminEditUser;
