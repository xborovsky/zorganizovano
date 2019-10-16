import React from 'react';
import { useParams } from 'react-router-dom';

import withLoading from '../../../../components/hoc/WithLoading';
import ProductDetail from './ProductDetail';

const ProductDetailContainer = ({ data }) => {
    console.log('ProductDetailContainer');
    let { id } = useParams();
    console.log(id);

    return (
        <>
            <ProductDetail product={data} />
        </>
    );
};

export default withLoading('/item/1')(ProductDetailContainer);