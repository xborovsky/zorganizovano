import React, { createContext, useState } from 'react';

const AuthContext = createContext({
    auth : null,
    updateAuth : token => {},
    logout : () => {}
});

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('jwtToken')));

    const updateAuth = token => {
        setAuth(token);
        localStorage.setItem('jwtToken', JSON.stringify(token));
    };

    const logout = () => {
        setAuth(null);
        localStorage.removeItem('jwtToken');
    };

    return (
        <AuthContext.Provider value={{ auth, updateAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };