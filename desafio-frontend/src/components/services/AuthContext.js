import React, { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token') || null,
        user: null,
    });

    const login = async (email, password) => {
    
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/login`, { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            setAuth({ token, user: null });           
          
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({ token: null, user: null });
    };

    const getUser = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/user`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            setAuth(prev => ({ ...prev, user: response.data }));
        } catch (error) {
            console.error('Erro ao obter usuário:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout, getUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
