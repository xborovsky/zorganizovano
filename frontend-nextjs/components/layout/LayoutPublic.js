import React, { useReducer, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/styles/withStyles';
import { ThemeProvider } from '@material-ui/core/styles';

import Header from '~/components/layout/Header';
import Main from '~/components/layout/Main';
import Footer from '~/components/layout/Footer';
import ErrorBoundary from '~/components/ErrorBoundary';
import zorganizovanoTheme from './Theme';
import ShoppingCartContext from '~/components/global-context/ShoppingCartContext';
import shoppingCartReducer from '~/components/global-context/ShoppingCartReducer';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    }
});

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

const LayoutPublic = ({ classes, children }) => {
    const [state, dispatch] = useReducer(shoppingCartReducer, []);

    useEffect(() => {
        // TODO
        /*const storage = window.sessionStorage.getItem('shoppingCart') ? JSON.parse(window.sessionStorage.getItem('shoppingCart')) : [];
        const storageDeduplicated = [];

        storage.forEach(item => {
            if (!storageDeduplicated.find(i => i.id === item.id)) {
                storageDeduplicated.push(item);
            }
        });

        window.sessionStorage.setItem("shoppingCart", JSON.stringify(storageDeduplicated));
        return storageDeduplicated;*/
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
                            {children}
                        </Main>
                    </ShoppingCartContext.Provider>
                    <Footer />
                </ErrorBoundary>
            </ThemeProvider>
        </div>
    );
};

export default withStyles(styles)(LayoutPublic);