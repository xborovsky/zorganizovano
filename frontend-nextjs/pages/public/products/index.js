import React from 'react';
import fetch from 'isomorphic-unfetch';

import BreadcrumbsNav from '~/components/BreadcrumbsNav';
import MainText from './components/MainText';
import ProductList from './components/ProductList';

const Products = ({ products }) => (
    <>
        <BreadcrumbsNav items={[{ name : 'eshop' }]} />
        <MainText />

        <ProductList products={products} />
    </>
);

// TODO propTypes

Products.getInitialProps = async () => {
    const res = await fetch(`${process.env.API_URL}/item`);
    const products = await res.json();

    return { products };
};

export default Products;