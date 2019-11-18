import React, { Suspense, useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/styles/withStyles';
import { ThemeProvider } from '@material-ui/core/styles';

import Main from './layout/Main';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Loader from './components/Loader';
import ErrorBoundary from './components/ErrorBoundary';
import ShoppingCartContext from './pages/eshop/shopping-cart/state-management/ShoppingCartContext';
import shoppingCartReducer from './pages/eshop/shopping-cart/state-management/ShoppingCartReducer';

import zorganizovanoTheme from './Theme';

const Home = React.lazy(() => import('./pages/home'));
const Tips = React.lazy(() => import('./pages/tips'));
const Eshop = React.lazy(() => import('./pages/eshop'));
const Contact = React.lazy(() => import('./pages/contact'));
const ShoppingCart = React.lazy(() => import('./pages/eshop/shopping-cart'));
const NotFound = React.lazy(() => import('./pages/not-found'));
const AdminLogin = React.lazy(() => import('./pages/admin/login'));
const AdminOrders = React.lazy(() => import("./pages/admin/orders"));

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  }
});

export const RECAPTCHA_SITE_KEY = '6LdrKsAUAAAAAPsXgJSwERT3AwtBDMage9E6YyTy';

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

const App = ({ classes }) => {
  const [state, dispatch] = useReducer(shoppingCartReducer, getInitialShoppingCartState());

  useEffect(() => {
      window.sessionStorage.setItem("shoppingCart", JSON.stringify(state));
  }, [state]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ThemeProvider theme={zorganizovanoTheme}>
        <Router>
          <ErrorBoundary middleOfScreen>
            <ShoppingCartContext.Provider value={{ state, dispatch }}>
              <Header />
              <Main>
                <ErrorBoundary>
                  <Suspense fallback={<Loader />}>
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route path="/tips" component={Tips} />
                      <Route path="/eshop" component={Eshop} />
                      <Route path="/contact" component={Contact} />
                      <Route path="/shopping-cart" component={ShoppingCart} />
                      <Route path="/admin/login" component={AdminLogin} />
                      <Route path="/admin/orders" component={AdminOrders} />
                      <Route component={NotFound} />
                    </Switch>
                  </Suspense>
                </ErrorBoundary>
              </Main>
            </ShoppingCartContext.Provider>
            <Footer />
          </ErrorBoundary>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default withStyles(styles)(App);
