import React from 'react';

import ProductList from './ProductList';
import withLoading from '../../../../components/hoc/WithLoading';
import MainText from './MainText';

const ProductListContainer = ({ data }) => (
    <>
        <MainText />
        <ProductList products={data} />
    </>
);

export default withLoading('/item')(ProductListContainer);