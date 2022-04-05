import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { CircularProgress, Grid } from '@mui/material';

import ProductDetail from './ProductDetail';
import Alert from 'components/Alert';
import ProductBreadcrumbs from '../common/ProductBreadcrumbs';

const ProductDetailContainer = () => {
    let { id } = useParams();
    const { data, isLoading, error } = useQuery(['item-detail', id], () => 
        axios.get(`/item/${id}`).then(res => res.data)
    );
    const { data:breadcrumbsData, isLoading:isLoadingBreadcrumbsData } = useQuery(['breadcrumbs', data?.itemCategory?.id || 1], () =>
        axios.get(`/item-category/${data?.itemCategory?.id || 1}`).then(res => res.data)
    );
    const isLoadingAny = isLoading || isLoadingBreadcrumbsData;

    return (
        isLoadingAny ?
            <Grid item xs={12} style={{ textAlign : 'center' }}>
                <CircularProgress />
            </Grid> :
             error ?
                <Alert type="error">Problém komunikace se serverem.</Alert> :
                <>
                    <ProductBreadcrumbs
                        categoriesTree={breadcrumbsData}
                        currentProductName={data.name} 
                    />
                    <ProductDetail product={data} />
                </>
    );
};

export default ProductDetailContainer;