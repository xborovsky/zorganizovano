import React, { useEffect, useState, useReducer } from 'react';
import Router from 'next/router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import Header from '~/components/layout/Header';
import Main from '~/components/layout/Main';
import Footer from '~/components/layout/Footer';
import ErrorBoundary from '~/components/ErrorBoundary';
import zorganizovanoTheme from '~/components/layout/Theme';
import ShoppingCartContext from '~/components/global-context/ShoppingCartContext';
import shoppingCartReducer from '~/components/global-context/ShoppingCartReducer';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    },
    loaderWrapper : {
        textAlign : 'center'
    }
}));

const MyApp = ({ Component, pageProps }) => {
    const [ loader, setLoader ] = useState(false);
    const [state, dispatch] = useReducer(shoppingCartReducer, []);
    const classes = useStyles();

    const showLoader = () => setLoader(true);
    const hideLoader = () => setLoader(false);

    useEffect(() => {
        Router.events.on('routeChangeStart', showLoader);
        Router.events.on('routeChangeComplete', hideLoader);
        Router.events.on('routeChangeError', hideLoader);

        return () => {
            Router.events.off('routeChangeStart', showLoader);
            Router.events.off('routeChangeComplete', hideLoader);
            Router.events.off('routeChangeError', hideLoader);
        }
    }, []);

    useEffect(() => {
        const storage = window.sessionStorage.getItem('shoppingCart') ? JSON.parse(window.sessionStorage.getItem('shoppingCart')) : [];
        const storageDeduplicated = [];

        storage.forEach(item => {
            if (!storageDeduplicated.find(i => i.id === item.id)) {
                storageDeduplicated.push(item);
            }
        });

        window.sessionStorage.setItem("shoppingCart", JSON.stringify(storageDeduplicated));
        return storageDeduplicated;
    }, []);

    useEffect(() => {
        window.sessionStorage.setItem("shoppingCart", JSON.stringify(state));
    }, [state]);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <ThemeProvider theme={zorganizovanoTheme}>
                <ErrorBoundary middleOfScreen>
                    <ShoppingCartContext.Provider value={{ state, dispatch }}>
                        <Header />
                        <Main>
                            {
                                loader ?
                                    <Grid container>
                                        <Grid item xs={12} className={classes.loaderWrapper}>
                                            <CircularProgress />
                                        </Grid>
                                    </Grid> :
                                    <Component {...pageProps} />
                            }
                        </Main>
                    </ShoppingCartContext.Provider>
                    <Footer />
                </ErrorBoundary>
            </ThemeProvider>
        </div>
    );
}

export default MyApp;