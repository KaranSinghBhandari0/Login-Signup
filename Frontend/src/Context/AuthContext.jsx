import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

// Create a context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  
  const Backend_Url = "http://localhost:3000";
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // login
  const login = async (loginData) => {
    try {
      const res = await axios.post(`${Backend_Url}/account/login`, loginData);
      if (res.status === 200) {
        toast.success('Login Successful !!!');
        localStorage.setItem('authToken', res.data.token);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Login failed");
    }
  };

  // signup
  const signup = async (registrationData) => {
    try {
      const res = await axios.post(`${Backend_Url}/account/signup`, registrationData);
      if (res.status === 200) {
        localStorage.setItem('authToken', res.data.token);
        toast.success('Welcome, you are a new user');
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Signup failed");
    }
  };

  // logout
  const logout = () => {
    try {
      localStorage.removeItem('authToken');
      toast.success("Logged Out");
      navigate('/login');
    } catch (error) {
      toast.error("Logout Error");
      console.error("Logout error:", error);
    }
  };

  // is Authenticated
  const isAuthenticated = () => {
    if(localStorage.getItem('authToken')) {
      return true;
    } else {
      return false;
    }
  }

  // is Authorized
  const isAuthorized = async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      return false;
    }
    try {
      const res = await axios.post(`${Backend_Url}/auth/isAdmin`, { authToken });
      return res.status === 200 ? res.data.isAdmin : false;
    } catch (error) {
      console.error("Authorization check error:", error);
      return false;
    }
  }

  // checking isAdmin
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await isAuthorized();
        setIsAdmin(result);
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      }
    };
    checkAuth();
  }, [isAuthorized, navigate]);

  return (
    <AuthContext.Provider value={{ login, signup, logout, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
