import React, { Suspense } from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Loader from '../../components/Loader';
import { AuthProvider } from './AuthProvider';

const Login = React.lazy(() => import('./login'));
const Orders = React.lazy(() => import('./orders'));
const OrderDetail = React.lazy(() => import('./order-detail'));
const NotFound = React.lazy(() => import('../not-found'));

const AdminContainer = () => {
    let match = useRouteMatch();

    return (
        <AuthProvider>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route path={`${match.path}/login`} component={Login} />
                    <Route path={`${match.path}/orders/:id`} component={OrderDetail} />
                    <Route path={`${match.path}/orders`} component={Orders} />
                    <Route component={NotFound} />
                </Switch>
            </Suspense>
        </AuthProvider>
    );
};

export default AdminContainer;