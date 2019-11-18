import React from 'react';
import { useParams } from 'react-router-dom';

import ProductDetail from './ProductDetail';
import BreadcrumbsNav from 'components/BreadcrumbsNav';
import DataFetcher from 'components/DataFetcher';

const ProductDetailContainer = () => {
    let { id } = useParams();

    return (
        <DataFetcher url={`/item/${id}`}>
            { data => (
                <>
                    <BreadcrumbsNav items={[{ link : '/eshop', name : 'eshop' }, { name : data.name }]} />
                    <ProductDetail product={data} />
                </>
            ) }
        </DataFetcher>
    );
};

export default ProductDetailContainer;