import React from 'react';

import ProductList from './ProductList';
import MainText from './MainText';
import DataFetcher from 'components/DataFetcher';
import BreadcrumbsNav from 'components/BreadcrumbsNav';

const ProductListContainer = ({ data }) => (
    <>
        <BreadcrumbsNav items={[{ name : 'eshop' }]} />
        <MainText />
        <DataFetcher url='/item'>
            { data => <ProductList products={data} /> }
        </DataFetcher>
    </>
);

export default ProductListContainer;