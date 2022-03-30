import React, { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, useLocation } from 'react-router-dom';
import { CircularProgress, Grid } from '@material-ui/core';
import axios from 'axios';
import { useQuery } from 'react-query';

import ProductList from './ProductList';
import ItemCategoriesFilter from './item-categories-filter';
import Alert from 'components/Alert';
import ProductBreadcrumbs from '../common/ProductBreadcrumbs';
import PaginationContext from './pagination/PaginationContext';
import BottomPaginationPanel from './pagination/BottomPaginationPanel';
import TopPaginationPanel from './pagination/TopPaginationPanel';
import useLocalStorage from 'hooks/use-local-storage';

const DEFAULT_PAGE_SIZE = 9;
const DEFAULT_PAGE = 1;

const ProductListContainer = () => {
    const history = useHistory();
    const routeQuery = new URLSearchParams(useLocation().search);
    const [ currentPageSize, setCurrentPageSize ] = useLocalStorage("products.pageSize", DEFAULT_PAGE_SIZE);
    const currentSelectedCategory = +routeQuery.get('categoryId');
    const page = +routeQuery.get('page') || DEFAULT_PAGE;
    const itemsPerPage = +routeQuery.get('limit') || currentPageSize;
    const { data, isLoading, error } = useQuery(['products', currentSelectedCategory, page, itemsPerPage], () =>
        axios.get(currentSelectedCategory ? `/item?categoryId=${currentSelectedCategory}&limit=${itemsPerPage}&page=${page-1}` : `/item?limit=${itemsPerPage}&page=${page-1}`).then(res => res.data)
    );
    const { data:categories, isLoading:isLoadingCategories } = useQuery(['categories', currentSelectedCategory || 1], () =>
        axios.get(`/item-category/${currentSelectedCategory || 1}/children`).then(res => res.data)
    );
    const { data:breadcrumbsData, isLoading:isLoadingBreadcrumbsData } = useQuery(['breadcrumbs', currentSelectedCategory || 1], () =>
        axios.get(`/item-category/${currentSelectedCategory || 1}`).then(res => res.data)
    );
    const isLoadingAny = isLoading || isLoadingCategories || isLoadingBreadcrumbsData;
    const isFirstRender = useRef(true);

    const handleCategoryClick = id => e => history.push(`?categoryId=${id}`);

    useEffect(() => {
        if (!isFirstRender.current) {
            history.push(`/eshop/products?categoryId=${currentSelectedCategory}&limit=${currentPageSize}&page=${1}`);
        }
      }, [currentPageSize])
      
      useEffect(() => { 
            isFirstRender.current = false;
      }, []);

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
                            <PaginationContext.Provider value={{
                                pageSize : itemsPerPage,
                                page,
                                currentSelectedCategory,
                                totalItems : data.totalItems,
                                setPageSize : setCurrentPageSize
                            }}>
                                <Grid item xs={12}>
                                    <TopPaginationPanel />
                                </Grid>
                                <Grid item xs={12}>
                                    <ProductList products={data.data} />
                                </Grid>
                                <Grid item xs={12}>
                                    <BottomPaginationPanel />
                                </Grid>
                            </PaginationContext.Provider>
                        </>
                }
            </Grid>
        </>
    );
};

export default ProductListContainer;