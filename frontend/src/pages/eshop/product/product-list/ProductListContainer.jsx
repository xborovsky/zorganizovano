import React from 'react';
import { Helmet } from 'react-helmet';

import ProductList from './ProductList';
import MainText from './MainText';
import DataFetcher from 'components/DataFetcher';
import BreadcrumbsNav from 'components/BreadcrumbsNav';

const ProductListContainer = ({ data }) => (
    <>
        <Helmet>
            <meta name="description" content='TODO' />
        </Helmet>
        <BreadcrumbsNav items={[{ name : 'eshop' }]} />
        <MainText />
        <DataFetcher url='/item'>
            { data => <ProductList products={data} /> }
        </DataFetcher>
    </>
);

export default ProductListContainer;