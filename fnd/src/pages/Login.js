import React, { useState } from 'react';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate=useNavigate();
  const [loginDetails, setLoginDetails] = useState({email:"",password:""});
  const [registerDetails, setRegisterDetails] = useState({email:"",password:"",username:""});


  const handleClick=async()=>{
    try {
      const data=await axios.post("http://localhost:5000/auth/login",{
        email:loginDetails.email,
        password:loginDetails.password
      });
      // if(data?.user) {
        console.log("data",data);
        navigate('/construction');
      // }
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleRegister=async()=>{

    try {
      const data=await axios.post("http://localhost:5000/auth/register",{
        email:registerDetails.email,
        password:registerDetails.password,
        username:registerDetails.username
      });
      console.log("data",data);
      navigate('/construction');
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='container'>
      <div className={`wrapper ${isLogin ? '' : 'active'}`}>
        <div className='login-box'>
          <h2>Login</h2>
          <input type='text' placeholder='Enter Email' value={loginDetails.email} onChange={(e)=> setLoginDetails({...loginDetails,email:e.target.value})} />
          <input type='password' placeholder='Enter Password' value={loginDetails.password} onChange={(e)=> setLoginDetails({...loginDetails,password:e.target.value})} />
          <button onClick={handleClick}>Login</button>
          <p onClick={() => setIsLogin(false)}>Don't have an account? Register</p>
        </div>

        <div className='register-box'>
          <h2>Register</h2>
          <input type='text' placeholder='Enter Email'  value={registerDetails.email} onChange={(e)=> setRegisterDetails({...registerDetails,email:e.target.value})} />
          <input type='password' placeholder='Enter Password' value={registerDetails.password} onChange={(e)=> setRegisterDetails({...registerDetails,password:e.target.value})} />
          <input type='text' placeholder='Enter username' value={registerDetails.username} onChange={(e)=> setRegisterDetails({...registerDetails,username:e.target.value})} />
          <button onClick={handleRegister}>Register</button>
          <p onClick={() => setIsLogin(true)}>Already have an account? Login</p>
        </div>

        <div className='toggle-card'>
          <div className='toggle-content'>
            <h2>{isLogin ? 'Welcome Back!' : 'Join Us Today!'}</h2>
            <button onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Go to Register' : 'Go to Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
