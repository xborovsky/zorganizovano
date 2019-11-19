import React from 'react';

import AuthDataFetcher from '../components/AuthDataFetcher';
import OrdersTable from './components/OrdersTable';

const OrdersContainer = () => (
    <AuthDataFetcher url='/admin/orders'>
        { data => (
            <OrdersTable />
        ) }
    </AuthDataFetcher>
);

export default OrdersContainer;