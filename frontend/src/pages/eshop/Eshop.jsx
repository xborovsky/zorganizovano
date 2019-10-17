import React, { Suspense, useReducer, useEffect } from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Loader from '../../components/Loader';
import ShoppingCartContext from './shopping-cart/state-management/ShoppingCartContext';
import shoppingCartReducer from './shopping-cart/state-management/ShoppingCartReducer';
import Header from './layout/Header';
import Main from 'layout/Main';

const ProductListContainer = React.lazy(() => import('./product/product-list/ProductListContainer'));
const ProductDetailContainer = React.lazy(() => import('./product/detail/ProductDetailContainer'));
const Faq = React.lazy(() => import('./faq'));
const Terms = React.lazy(() => import('./terms'));
const Contact = React.lazy(() => import('./contact'));
const ShoppingCart = React.lazy(() => import('./shopping-cart'));
const OrderWizard = React.lazy(() => import('./order/OrderWizard'));

const Eshop = () => {
    let match = useRouteMatch();

    const [state, dispatch] = useReducer(shoppingCartReducer, localStorage.getItem('shoppingCart') ? JSON.parse(localStorage.getItem('shoppingCart')) : []);

    useEffect(() => {
        window.localStorage.setItem("shoppingCart", JSON.stringify(state));
    }, [state]);

    return (
        <ShoppingCartContext.Provider value={{ state, dispatch }}>
            <Header />
            <Main>
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
                        <Route path={`${match.path}/contact`}>
                            <Contact />
                        </Route>
                        <Route path={`${match.path}/shopping-cart`}>
                            <ShoppingCart />
                        </Route>
                        <Route path={`${match.path}/order`}>
                            <OrderWizard />
                        </Route>
                        <Route path={match.path}>
                            <ProductListContainer />
                        </Route>
                    </Switch>
                </Suspense>
            </Main>
        </ShoppingCartContext.Provider>
    );
};

export default Eshop;