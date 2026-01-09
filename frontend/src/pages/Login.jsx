import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/shopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { token, setToken, backendUrl, navigate } = useContext(ShopContext);
  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (currentState === "Sign Up") {
        // Registration logic
        const response = await axios.post(
          `${backendUrl}/api/user/register`, 
          { name, email, password },
          { 
            timeout: 10000,
            headers: { 'Content-Type': 'application/json' }
          }
        );
        
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("🎉 Account created successfully! Welcome!", {
            position: "top-right",
            autoClose: 3000,
          });
          // Clear form
          setName('');
          setEmail('');
          setPassword('');
        } else {
          // Backend returned success: false
          toast.error(response.data.message || "Registration failed", {
            position: "top-right",
            autoClose: 4000,
          });
        }
      } else {
        // Login logic
        const response = await axios.post(
          `${backendUrl}/api/user/login`, 
          { email, password },
          { 
            timeout: 10000,
            headers: { 'Content-Type': 'application/json' }
          }
        );
        
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success(`✅ Welcome back${response.data.user?.name ? ', ' + response.data.user.name : ''}!`, {
            position: "top-right",
            autoClose: 3000,
          });
          // Clear form
          setEmail('');
          setPassword('');
        } else {
          // Backend returned success: false
          toast.error(response.data.message || "Login failed", {
            position: "top-right",
            autoClose: 4000,
          });
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      
      // Detailed error handling with specific messages
      if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
        toast.error("⚠️ Network error: Unable to connect to server. Please check your internet connection.", {
          position: "top-right",
          autoClose: 5000,
        });
      } else if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const message = error.response.data?.message;
        
        switch (status) {
          case 400:
            toast.error(`❌ ${message || 'Invalid input. Please check your information.'}`, {
              position: "top-right",
              autoClose: 4000,
            });
            break;
          case 401:
            toast.error("🔒 Invalid email or password. Please try again.", {
              position: "top-right",
              autoClose: 4000,
            });
            break;
          case 409:
            toast.error("📧 This email is already registered. Please login instead.", {
              position: "top-right",
              autoClose: 4000,
            });
            // Automatically switch to login
            setCurrentState('Login');
            break;
          case 500:
            toast.error("⚠️ Server error. Please try again later.", {
              position: "top-right",
              autoClose: 5000,
            });
            break;
          default:
            toast.error(`❌ ${message || 'Authentication failed. Please try again.'}`, {
              position: "top-right",
              autoClose: 4000,
            });
        }
      } else if (error.request) {
        // Request made but no response received
        toast.error("⚠️ No response from server. Please try again later.", {
          position: "top-right",
          autoClose: 5000,
        });
      } else {
        // Something else happened
        toast.error("❌ An unexpected error occurred. Please try again.", {
          position: "top-right",
          autoClose: 4000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);
  
  // Handle state switching
  const handleStateChange = (newState) => {
    setCurrentState(newState);
    // Clear form when switching
    setName('');
    setEmail('');
    setPassword('');
  };
  
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      
      {currentState === 'Sign Up' && (
        <input 
          onChange={(e) => setName(e.target.value)} 
          value={name} 
          type="text" 
          className='w-full px-3 py-2 border border-gray-800 focus:outline-none focus:border-gray-600' 
          placeholder='Full Name' 
          required 
          disabled={isLoading}
          minLength={2}
        />
      )}
      
      <input 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
        type="email" 
        className='w-full px-3 py-2 border border-gray-800 focus:outline-none focus:border-gray-600' 
        placeholder='Email Address' 
        required 
        disabled={isLoading}
      />
      
      <input 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
        type="password" 
        className='w-full px-3 py-2 border border-gray-800 focus:outline-none focus:border-gray-600' 
        placeholder='Password' 
        required 
        disabled={isLoading}
        minLength={8}
      />
      
      {currentState === 'Sign Up' && (
        <p className='text-xs text-gray-600 w-full text-left mt-[-8px]'>
          Password must be at least 8 characters with uppercase, lowercase, and number
        </p>
      )}
      
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer hover:underline'>Forgot Your Password?</p>
        {currentState === 'Login' 
          ? <p onClick={() => handleStateChange('Sign Up')} className='cursor-pointer hover:underline font-medium'>Create Account</p>
          : <p onClick={() => handleStateChange('Login')} className='cursor-pointer hover:underline font-medium'>Login Here</p>
        }
      </div>
      
      <button 
        type="submit"
        disabled={isLoading}
        className='bg-black text-white font-light px-8 py-2 mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors'
      >
        {isLoading 
          ? (currentState === 'Login' ? 'Signing In...' : 'Creating Account...') 
          : (currentState === 'Login' ? 'Sign In' : 'Sign Up')
        }
      </button>
    </form>
  );
};

export default Login;