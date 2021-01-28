import React from 'react';
import { Hidden } from '@material-ui/core';

import AuthDataFetcher from '../components/AuthDataFetcher';
import StockItemListMdUp from './components/StockItemListMdUp';
import StockItemListSmDown from './components/StockItemListSmDown';

const StockItems = () => (
    <AuthDataFetcher url={`/admin/stock-items`}>
        { data => (
            <>
                <Hidden mdUp>
                    <StockItemListSmDown data={data} />
                </Hidden>
                <Hidden smDown>
                    <StockItemListMdUp data={data} />
                </Hidden>
            </>
        )}
    </AuthDataFetcher>
);

export default StockItems;