import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from 'pages/admin/AuthProvider';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { auth } = useContext(AuthContext);

    return (
        <Route {...rest} render={props => 
            auth ?
                <Component {...props} /> :
                <Redirect to='/admin/login' />
        } />
    );
};

export default ProtectedRoute;