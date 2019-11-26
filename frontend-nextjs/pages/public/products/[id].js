import React from 'react';
import axios from 'axios';

import withPublicLayout from '~/components/hoc/withPublicLayout';
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
    const product = await axios.get(`/item/${id}`)
        .then(res => res.data)
        .catch(err => {
            //console.error(err);
            return null;
        }); // TODO

    return { product };
};

export default withPublicLayout(ProductDetailContainer);