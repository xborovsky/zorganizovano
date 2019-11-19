import React from 'react';
import { useParams } from 'react-router-dom';

import AuthDataFetcher from '../components/AuthDataFetcher';
import OrderDetail from './components/OrderDetail';

const OrderDetailContainer = () => {
    let { id } = useParams();

    return (
        <AuthDataFetcher url={`/admin/orders/${id}`}>
            { data => (
                <>
                    <OrderDetail order={data} />
                </>
            ) }
        </AuthDataFetcher>
    );
};

export default OrderDetailContainer;