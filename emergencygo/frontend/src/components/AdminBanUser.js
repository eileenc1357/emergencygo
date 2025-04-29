import React, { useState, useEffect } from 'react'
import axios from 'axios'

function AdminBanUser() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    user_id: '',
    reason: ''
  })

  const [user, setUser] = useState(null)

  useEffect(() => {
    // Replace this with however you fetch current logged-in user info
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users/me/') // example endpoint
        setUser(response.data)
      } catch (error) {
        console.error('Failed to fetch user info:', error)
      }
    }

    fetchUser()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/admin-tools/ban_user/', formData)
      alert('User banned successfully!')
    } catch (error) {
      alert('Error banning user: ' + (error.response?.data?.error || error.message))
    }
  }

  // 🔐 Don't allow access if user isn't admin
  if (user && !user.is_staff && !user.is_superuser) {
    return <p>You are not authorized to view this page.</p>
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="email" placeholder="Email" onChange={handleChange} />
      <input type="text" name="username" placeholder="Username" onChange={handleChange} />
      <input type="text" name="user_id" placeholder="User ID" onChange={handleChange} />
      <input type="text" name="reason" placeholder="Reason (optional)" onChange={handleChange} />
      <button type="submit">Ban User</button>
    </form>
  )
}

export default AdminBanUser
