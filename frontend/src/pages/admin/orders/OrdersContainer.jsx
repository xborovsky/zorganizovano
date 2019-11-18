import React from 'react';

import DataFetcher from 'components/DataFetcher';

const OrdersContainer = () => (
    <DataFetcher url='/admin/orders' headers={{ Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwtToken'))}` }}>
        { data => console.log(data) }
    </DataFetcher>
);

export default OrdersContainer;