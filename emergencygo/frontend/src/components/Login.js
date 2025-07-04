import '../App.css'
import React, { useState } from 'react'
import { Box, Typography, Button } from '@mui/material';
import MyTextField from './forms/MyTextField'
import MyPassField from './forms/MyPassField'
import MyButton from './forms/MyButton'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AxiosInstance from './AxiosInstance'
import MyMessage from './Message'
import { useUser } from '../context/UserContext'  // 👈 ADD THIS

const Login = () => {
    const navigate = useNavigate()
    const { handleSubmit, control } = useForm()
    const [ShowMessage, setShowMessage] = useState(false)
    const { setUser } = useUser();  // 👈 ADD THIS

    const submission = async (data) => {
        try {
            const response = await AxiosInstance.post('users/login/', {
                email: data.email,
                password: data.password,
            });

            if (response.data.token) {
                localStorage.setItem('Token', response.data.token);
                AxiosInstance.defaults.headers['Authorization'] = `Token ${response.data.token}`;

                try {
                    const userResponse = await AxiosInstance.get('users/me/');
                    const user = userResponse.data;
                    
                    setUser(user);  // 👈 STORE USER GLOBALLY
                    console.log("Fetched user:", user);
                    if (user.is_superuser || user.is_staff) {
                        navigate('/admin/manage');
                    } else {
                        navigate('/home');
                    }
                } catch (userError) {
                    console.error('Error fetching user after login:', userError);
                    navigate('/home');
                }
            } else {
                setShowMessage(true);
                console.error('Token missing in response');
            }
        } catch (error) {
            setShowMessage(true);
            console.error('Login error:', {
                status: error.response?.status,
                data: error.response?.data,
                error: error.message
            });
        }
    };

    return (
        <div className={"myBackground"}>
             <Box
                sx={{
                textAlign: 'center',
                mt: 4,
                mb: 8,
                mr: 30,
                }}
            >
                <Typography
                variant="h1"
                sx={{
                    fontWeight: 'bold',
                    color: '#fff',
                    fontSize: { xs: '3rem', sm: '4rem', md: '6rem' },
                }}
                >
                EmergencyGO
                </Typography>
            </Box>
            {ShowMessage && (
        <MyMessage
          text="Login has failed, please try again, or reset your password"
          color="#EC5A76"
        />
      )}

      <form onSubmit={handleSubmit(submission)}>
        <Box className="whiteBox">
          <Box className="itemBox">
            <Box className="title">Login for Auth App</Box>
          </Box>

          <Box className="itemBox">
            <MyTextField label="Email" name="email" control={control} />
          </Box>

          <Box className="itemBox">
            <MyPassField label="Password" name="password" control={control} />
          </Box>

          <Box className="itemBox">
            <MyButton label="Login" type="submit" />
          </Box>

          <Box className="itemBox" sx={{ flexDirection: 'column' }}>
            <Link to="/register">No account yet? Please register!</Link>
            <Link to="/request/password_reset">Password forgotten? Click here</Link>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default Login;