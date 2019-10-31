import React from 'react';

import ProductList from './ProductList';
import MainText from './MainText';
import DataFetcher from 'components/DataFetcher';

const ProductListContainer = ({ data }) => (
    <>
        <MainText />
        <DataFetcher url='/item'>
            { data => <ProductList products={data} /> }
        </DataFetcher>
    </>
);

export default ProductListContainer;