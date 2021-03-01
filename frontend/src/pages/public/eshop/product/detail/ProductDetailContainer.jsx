import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from 'hooks/use-fetch';
import { CircularProgress, Grid } from '@material-ui/core';

import ProductDetail from './ProductDetail';
import Alert from 'components/Alert';
import ProductBreadcrumbs from '../common/ProductBreadcrumbs';

const ProductDetailContainer = () => {
    let { id } = useParams();
    const { data, isLoading, error } = useFetch(`/item/${id}`);
    const { data:breadcrumbsData, isLoading:isLoadingBreadcrumbsData } = useFetch(`/item-category/${data?.itemCategory?.id || 1}`);
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