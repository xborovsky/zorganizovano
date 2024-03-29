import React, { Suspense, useReducer, useEffect } from 'react';
import { Switch, Route } from "react-router-dom";

import Main from '../../layout/Main';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Loader from '../../components/Loader';
import ShoppingCartContext from './eshop/shopping-cart/state-management/ShoppingCartContext';
import shoppingCartReducer from './eshop/shopping-cart/state-management/ShoppingCartReducer';
import ServerNotification from 'components/ServerNotification';
import useSessionStorage from 'hooks/use-session-storage';

const Home = React.lazy(() => import('./home'));
const Tips = React.lazy(() => import('./tips'));
const Eshop = React.lazy(() => import('./eshop'));
const Contact = React.lazy(() => import('./contact'));
const ShoppingCart = React.lazy(() => import('./eshop/shopping-cart'));
const NotFound = React.lazy(() => import('../not-found'));

const SHOPPING_CART_STORAGE_NAME = 'shoppingCart';

const getInitialShoppingCartState = () => {
    const storage = window.localStorage.getItem(SHOPPING_CART_STORAGE_NAME) ? JSON.parse(window.localStorage.getItem(SHOPPING_CART_STORAGE_NAME)) : [];
    const storageDeduplicated = [];

    storage.forEach(item => {
      if (!storageDeduplicated.find(i => i.id === item.id)) {
        storageDeduplicated.push(item);
      }
    });

    window.localStorage.setItem(SHOPPING_CART_STORAGE_NAME, JSON.stringify(storageDeduplicated));
    return storageDeduplicated;
};

const PublicContainer = () => {
    const [state, dispatch] = useReducer(shoppingCartReducer, getInitialShoppingCartState());
    const [ discountCode, setDiscountCode ] = useSessionStorage('discountCode');

    useEffect(() => {
        window.localStorage.setItem(SHOPPING_CART_STORAGE_NAME, JSON.stringify(state));
    }, [state]);

    return (
        <ShoppingCartContext.Provider value={{ state, dispatch, discountCode, setDiscountCode }}>
            <Header />
            <ServerNotification />
            <Main>
                <Suspense fallback={<Loader />}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/tips" component={Tips} />
                        <Route path="/eshop" component={Eshop} />
                        <Route path="/contact" component={Contact} />
                        <Route path="/shopping-cart" component={ShoppingCart} />
                        <Route component={NotFound} />
                    </Switch>
                </Suspense>
            </Main>
            <Footer />
        </ShoppingCartContext.Provider>
    );
};

export default PublicContainer;