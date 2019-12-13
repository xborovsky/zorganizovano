import React, { Suspense } from 'react';
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

import Loader from '../../components/Loader';
import { AuthProvider } from './AuthProvider';
import AdminHeader from 'layout/AdminHeader';

import ProtectedRoute from 'components/ProtectedRoute';

const Login = React.lazy(() => import('./login'));
const Orders = React.lazy(() => import('./orders'));
const OrderDetail = React.lazy(() => import('./order-detail'));
const NotFound = React.lazy(() => import('../not-found'));

const AdminContainer = () => {
    let match = useRouteMatch();

    return (
        <AuthProvider>
            <AdminHeader />
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route path={[`${match.path}/`, `${match.path}/login`]} exact component={Login} />
                    <ProtectedRoute path={`${match.path}/orders/:id`} component={OrderDetail} />
                    <ProtectedRoute path={`${match.path}/orders`} component={Orders} />
                    <Route component={NotFound} />
                </Switch>
            </Suspense>
        </AuthProvider>
    );
};

export default AdminContainer;