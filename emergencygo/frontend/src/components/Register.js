import '../App.css'
import { Box, Typography } from '@mui/material'
import MyTextField from './forms/MyTextField'
import MyPassField from './forms/MyPassField'
import MyButton from './forms/MyButton'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AxiosInstance from './AxiosInstance'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from 'react'

const Register = () => {
    const navigate = useNavigate()
    const [idFile, setIdFile] = useState(null)

    const schema = yup
    .object({
        email: yup.string().email('Field expects an email address').required('Email is a required field'),
        password: yup.string()
                    .required('Password is a required field')
                    .min(8,'Password must be at least 8 characters')
                    .matches(/[A-Z]/,'Password must contain at least one uppercase letter')
                    .matches(/[a-z]/,'Password must contain at least one lowercase letter')
                    .matches(/[0-9]/,'Password must contain at least one number')
                    .matches(/[!@#$%^&*(),.?":;{}|<>+]/, 'Password must contain at least one special character'),
        password2: yup.string().required('Password confirmation is a required field')
                     .oneOf([yup.ref('password'), null], 'Passwords must match')
    })  

    const { handleSubmit, control } = useForm({ resolver: yupResolver(schema) })

    const submission = (data) => {
        console.log("Sending POST to /register/");
        AxiosInstance.post(`register/`,{
            email: data.email, 
            password: data.password,
        })

        .then(() => {
            navigate(`/`)
        }
        )
        .catch((error) => {
            console.error("Registration error:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
            }
        })
    }    

    return (
        <div 
            className="myBackground" 
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
        > 
            <form 
                onSubmit={handleSubmit(submission)} 
                encType="multipart/form-data" 
                style={{ width: '100%', maxWidth: '500px' }}
            >
                <Box className="whiteBox">
    
                    <Box className="itemBox">
                        <Box className="title"> User registration </Box>
                    </Box>
    
                    <Box className="itemBox">
                        <MyTextField label="Email" name="email" control={control} />
                    </Box>
    
                    <Box className="itemBox">
                        <MyPassField label="Password" name="password" control={control} />
                    </Box>
    
                    <Box className="itemBox">
                        <MyPassField label="Confirm password" name="password2" control={control} />
                    </Box>
    
                    <Box className="itemBox" sx={{ flexDirection: 'column' }}>
                        <Typography 
                            sx={{ 
                                color: '#000000',
                                fontSize: '1rem',
                                maxWidth: '100%',
                                fontWeight: 500,
                                mb: 1,
                            }}
                        >
                            Upload a photo of your ID
                        </Typography>
                        <label style={{
                            display: 'inline-block', 
                            padding: '8px 12px', 
                            backgroundColor: '#f0f0f0', 
                            color: '#6b6b6b', 
                            borderRadius: '6px', 
                            cursor: 'pointer',
                            fontSize: '0.875rem'
                        }}>
                            Choose File
                            <input
                                type="file" 
                                accept="image/*,application/pdf"
                                onChange={(e) => setIdFile(e.target.files[0])}
                                style={{ display: 'none' }}
                            />
                        </label>
                        {idFile && (
                            <Typography sx={{ mt: 1, fontSize: '0.8rem', color: '#6b6b6b' }}>
                                {idFile.name}
                            </Typography>
                        )}
                    </Box>
                    <Box className="itemBox">
                        <MyButton type="submit" label="Register" />
                    </Box>
    
                    <Box className="itemBox">
                        <Link to="/"> Already registered? Please login! </Link>
                    </Box>
    
                </Box>
            </form> 
        </div>
    )    
}

export default Register
