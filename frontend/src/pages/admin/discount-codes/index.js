import React from 'react';

import AuthDataFetcher from '../components/AuthDataFetcher';
import DiscountCodesContainer from './components/DiscountCodesContainer';

const DiscountCodes = () => (
    <AuthDataFetcher url={`/admin/discount-codes`}>
        { data => (
            <>
                <DiscountCodesContainer discountCodes={data} />
            </>
        )}
    </AuthDataFetcher>
);

export default DiscountCodes;