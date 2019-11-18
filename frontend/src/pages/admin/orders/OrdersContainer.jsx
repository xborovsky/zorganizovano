import React from 'react';

import DataFetcher from 'components/DataFetcher';

const OrdersContainer = () => (
    <DataFetcher url='/admin/orders'>
        { data => console.log(data) }
    </DataFetcher>
);

export default OrdersContainer;