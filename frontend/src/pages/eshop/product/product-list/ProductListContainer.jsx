import React from 'react';

import ProductList from './ProductList';
import withLoading from '../../../../components/hoc/WithLoading';

const ProductListContainer = ({ data }) =>
    <ProductList products={data} />
;

export default withLoading('/item')(ProductListContainer);