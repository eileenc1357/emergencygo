import '../App.css';
import { Box } from '@mui/material';
import MyTextField from './forms/MyTextField';
import MyPassField from './forms/MyPassField';
import MyButton from './forms/MyButton';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AxiosInstance from './AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from 'react';

const Register = () => {
  const navigate = useNavigate();
  const [idPhoto, setIdPhoto] = useState(null);

  const schema = yup.object({
    email: yup.string().email('Field expects an email address').required('Email is a required field'),
    password: yup.string()
      .required('Password is a required field')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[!@#$%^&*(),.?":;{}|<>+]/, 'Password must contain at least one special character'),
    password2: yup.string().required('Password confirmation is a required field')
      .oneOf([yup.ref('password'), null], 'Passwords must match')
  });

  const { handleSubmit, control } = useForm({ resolver: yupResolver(schema) });

  const handleFileChange = (e) => {
    setIdPhoto(e.target.files[0]);
  };

  const submission = async (data) => {
    try {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);
      if (idPhoto) {
        formData.append('id_photo', idPhoto);
      }

      console.log(formData);

      await AxiosInstance.post(`register/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate(`/`);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="myBackground">
      <form onSubmit={handleSubmit(submission)} className="myForm">
        <Box className="whiteBox">

          <Box className="itemBox">
            <Box className="title">User registration</Box>
          </Box>

          <Box className="itemBox">
            <MyTextField
              label={"Email"}
              name={"email"}
              control={control}
            />
          </Box>

          <Box className="itemBox">
            <MyPassField
              label={"Password"}
              name={"password"}
              control={control}
            />
          </Box>

          <Box className="itemBox">
            <MyPassField
              label={"Confirm password"}
              name={"password2"}
              control={control}
            />
          </Box>

          {/* Upload Photo ID Section */}
          <Box className="itemBox" sx={{ flexDirection: 'column', marginTop: '10px' }}>
            <label htmlFor="file-upload" className="fileInputLabel" style={{ color: 'grey', fontSize: '0.95rem', marginBottom: '6px' }}>
              Upload Photo ID
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="fileInput"
              style={{
                backgroundColor: '#f9f9f9',
                border: '1px solid grey',
                borderRadius: '8px',
                fontSize: '0.85rem',
                color: 'grey',
                width: '70%',              // 👈 Smaller width
                padding: '8px 10px',
                margin: '0 auto',           // 👈 Centered
                cursor: 'pointer',
                display: 'block',           // 👈 Ensure it's block to center
              }}
            />
          </Box>

          <Box className="itemBox">
            <MyButton
              type={"submit"}
              label={"Register"}
            />
          </Box>

          <Box className="itemBox">
            <Link to="/">Already registered? Please login!</Link>
          </Box>

        </Box>
      </form>
    </div>
  );
};

export default Register;
