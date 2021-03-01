import React from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, useLocation } from 'react-router-dom';
import { CircularProgress, Grid } from '@material-ui/core';

import ProductList from './ProductList';
import ItemCategoriesFilter from './item-categories-filter';
import Alert from 'components/Alert';
import useFetch from '../../../../../hooks/use-fetch';
import ProductBreadcrumbs from '../common/ProductBreadcrumbs';

const ProductListContainer = () => {
    const history = useHistory();
    const routeQuery = new URLSearchParams(useLocation().search);
    const currentSelectedCategory = +routeQuery.get('categoryId');
    const { data, isLoading, error } = useFetch(currentSelectedCategory ? `/item?categoryId=${currentSelectedCategory}` : '/item');
    const { data:categories, isLoading:isLoadingCategories } = useFetch(`/item-category/${currentSelectedCategory || 1}/children`);
    const { data:breadcrumbsData, isLoading:isLoadingBreadcrumbsData } = useFetch(`/item-category/${currentSelectedCategory || 1}`);
    const isLoadingAny = isLoading || isLoadingCategories || isLoadingBreadcrumbsData;

    const handleCategoryClick = id => e => history.push(`?categoryId=${id}`);

    return (
        <>
            <Helmet>
                <meta name="description" content='Veškeré produkty vznikly z reálné potřeby naší domácnosti. Rodinný plánovací kalendář 2020 se jmény
                    členů rodiny po straně, stolní kalendář, do kterého děti malují nebo vlepují obrázky či fotky, pro babičky, rodinný plánovací diář
                    i plán na vánoční svátky.' />
            </Helmet>

            <Grid container>
                { isLoadingAny ?
                    <Grid item xs={12} style={{ textAlign : 'center' }}>
                        <CircularProgress />
                    </Grid> :
                    error ?
                        <Alert type="error">Problém komunikace se serverem.</Alert> :
                        <>
                            { breadcrumbsData &&
                                <Grid item xs={12}>
                                    <ProductBreadcrumbs categoriesTree={breadcrumbsData} />
                                </Grid>
                            }
                            { categories &&
                                <Grid item xs={12}>
                                    <ItemCategoriesFilter 
                                        categories={categories}
                                        onCategoryClick={handleCategoryClick} 
                                    />
                                </Grid>
                            }
                            <Grid item xs={12}>
                                <ProductList products={data} />
                            </Grid>
                        </>
                }
            </Grid>
        </>
    );
};

export default ProductListContainer;