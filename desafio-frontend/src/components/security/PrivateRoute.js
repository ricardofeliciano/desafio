import React, { useState, useEffect } from 'react';
import { Navigate, useLocation,useNavigate } from 'react-router-dom';


const PrivateRoute = ({ element: Component, ...rest }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      
     if(typeof token == undefined ||typeof token == 'undefined' || typeof token == 'null'|| token == null){    
      await navigate('/')
      setAuthenticated(false)
      return
     }
     setAuthenticated(true)
     setLoading(false)
    };
    checkAuth();
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return authenticated ? Component : <Navigate to="/admin/login" state={{ from: location }} />;
};

export default PrivateRoute;
