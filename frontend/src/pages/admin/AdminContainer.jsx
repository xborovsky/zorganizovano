import React, { Suspense } from 'react';
import { Switch, Route, useRouteMatch, Link, useLocation } from "react-router-dom";

import Loader from '../../components/Loader';
import { AuthProvider } from './AuthProvider';
import AdminHeader from 'layout/AdminHeader';

import ProtectedRoute from 'components/ProtectedRoute';
import { AppBar, Tab, Tabs } from '@material-ui/core';

const Login = React.lazy(() => import('./login'));
const Orders = React.lazy(() => import('./orders'));
const OrderDetail = React.lazy(() => import('./order-detail'));
const StockItems = React.lazy(() => import('./stock-items'));
const DiscountCodes = React.lazy(() => import('./discount-codes'));
const NotFound = React.lazy(() => import('../not-found'));

const AdminContainer = () => {
    let match = useRouteMatch();
    let location = useLocation();

    return (
        <AuthProvider>
            <AdminHeader />
            { (!location.pathname.endsWith('/login') && !location.pathname.endsWith('/admin')) &&
                <AppBar position="static">
                    <Tabs value={location.pathname} variant="scrollable" scrollButtons="auto">
                        <Tab label="Objednávky" component={Link} to={`${match.path}/orders`} value={`${match.path}/orders`} />
                        <Tab label="Skladové položky" component={Link} to={`${match.path}/stock-items`} value={`${match.path}/stock-items`} />
                        <Tab label="Slevové kódy" component={Link} to={`${match.path}/discount-codes`} value={`${match.path}/discount-codes`} />
                    </Tabs>
                </AppBar>
            }
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route path={[`${match.path}/`, `${match.path}/login`]} exact component={Login} />
                    <ProtectedRoute path={`${match.path}/orders/:id`} component={OrderDetail} />
                    <ProtectedRoute path={`${match.path}/orders`} component={Orders} />
                    <ProtectedRoute path={`${match.path}/stock-items`} component={StockItems} />
                    <ProtectedRoute path={`${match.path}/discount-codes`} component={DiscountCodes} />
                    <Route component={NotFound} />
                </Switch>
            </Suspense>
        </AuthProvider>
    );
};

export default AdminContainer;