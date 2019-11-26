import React from 'react';
import axios from 'axios';

import withPublicLayout from '~/components/hoc/withPublicLayout';
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
    const products = await axios.get('/item')
        .then(res => res.data)
        .catch(err => {
            console.error(err);
            return null;
        }); // TODO

    console.log(products);

    return { products };
};

export default withPublicLayout(Products);