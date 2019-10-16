import React, { Suspense } from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Loader from '../../components/Loader';

const ProductListContainer = React.lazy(() => import('./product/product-list/ProductListContainer'));
const ProductDetailContainer = React.lazy(() => import('./product/detail/ProductDetailContainer'));

const Eshop = () => {
    let match = useRouteMatch();

    return (
        <Suspense fallback={<Loader />}>
            <Switch>
                <Route path={`${match.path}/products/:id`}>
                    <ProductDetailContainer />
                </Route>
                <Route path={match.path}>
                    <ProductListContainer />
                </Route>
            </Switch>
        </Suspense>
    );
};

export default Eshop;