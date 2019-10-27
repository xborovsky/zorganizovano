import React, { Suspense } from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Loader from '../../components/Loader';
import OrderCreated from './order-created';

const ProductListContainer = React.lazy(() => import('./product/product-list/ProductListContainer'));
const ProductDetailContainer = React.lazy(() => import('./product/detail/ProductDetailContainer'));
const Faq = React.lazy(() => import('./faq'));
const Terms = React.lazy(() => import('./terms'));
const ShoppingCart = React.lazy(() => import('./shopping-cart'));
const OrderWizard = React.lazy(() => import('./order/OrderWizard'));


const Eshop = () => {
    let match = useRouteMatch();

    return (
        <Suspense fallback={<Loader />}>
            <Switch>
                <Route path={`${match.path}/products/:id`}>
                    <ProductDetailContainer />
                </Route>
                <Route path={`${match.path}/faq`}>
                    <Faq />
                </Route>
                <Route path={`${match.path}/terms`}>
                    <Terms />
                </Route>
                <Route path={`${match.path}/shopping-cart`}>
                    <ShoppingCart />
                </Route>
                <Route path={`${match.path}/order`}>
                    <OrderWizard />
                </Route>
                <Route path={`${match.path}/order-created`}>
                    <OrderCreated />
                </Route>
                <Route path={match.path}>
                    <ProductListContainer />
                </Route>
            </Switch>
        </Suspense>
    );
};

export default Eshop;