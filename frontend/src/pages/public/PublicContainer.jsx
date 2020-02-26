import React, { Suspense, useReducer, useEffect } from 'react';
import { Switch, Route } from "react-router-dom";

import Main from '../../layout/Main';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Loader from '../../components/Loader';
import ErrorBoundary from '../../components/ErrorBoundary';
import ShoppingCartContext from './eshop/shopping-cart/state-management/ShoppingCartContext';
import shoppingCartReducer from './eshop/shopping-cart/state-management/ShoppingCartReducer';
import ServerNotification from 'components/ServerNotification';

const Home = React.lazy(() => import('./home'));
const Eshop = React.lazy(() => import('./eshop'));
const Contact = React.lazy(() => import('./contact'));
const ShoppingCart = React.lazy(() => import('./eshop/shopping-cart'));
const NotFound = React.lazy(() => import('../not-found'));
const Events = React.lazy(() => import('./events'));

const getInitialShoppingCartState = () => {
    const storage = window.sessionStorage.getItem('shoppingCart') ? JSON.parse(window.sessionStorage.getItem('shoppingCart')) : [];
    const storageDeduplicated = [];

    storage.forEach(item => {
      if (!storageDeduplicated.find(i => i.id === item.id)) {
        storageDeduplicated.push(item);
      }
    });

    window.sessionStorage.setItem("shoppingCart", JSON.stringify(storageDeduplicated));
    return storageDeduplicated;
};

const PublicContainer = () => {
    const [state, dispatch] = useReducer(shoppingCartReducer, getInitialShoppingCartState());

    useEffect(() => {
        window.sessionStorage.setItem("shoppingCart", JSON.stringify(state));
    }, [state]);

    return (
        <ShoppingCartContext.Provider value={{ state, dispatch }}>
            <Header />
            <ServerNotification />
            <Main>
                <ErrorBoundary>
                    <Suspense fallback={<Loader />}>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/eshop" component={Eshop} />
                            {/*<Route path="/contact" component={Contact} />
                            <Route path="/shopping-cart" component={ShoppingCart} />*/}
                            <Route path="/events" component={Events} />
                            <Route component={NotFound} />
                        </Switch>
                    </Suspense>
                </ErrorBoundary>
            </Main>
            <Footer />
        </ShoppingCartContext.Provider>
    );
};

export default PublicContainer;