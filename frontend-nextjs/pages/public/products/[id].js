import React from 'react';
import fetch from 'isomorphic-unfetch';

import ProductDetail from './components/ProductDetail';
import BreadcrumbsNav from '~/components/BreadcrumbsNav';

const ProductDetailContainer = ({ product }) => {

    return (
        <>
            <BreadcrumbsNav items={[{ link : '/eshop', name : 'eshop' }, { name : product.name }]} />
            <ProductDetail product={product} />
        </>
    );
};

ProductDetailContainer.getInitialProps = async ({ query }) => {
    const id = query.id;
    const res = await fetch(`${process.env.API_URL}/item/${id}`);
    const product = await res.json();

    return { product };
};

export default ProductDetailContainer;