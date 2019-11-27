import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import CircularProgress from '@material-ui/core/CircularProgress';

var isAbsoluteURLRegex = /^(?:\w+:)\/\//;

const MyApp = ({ Component, pageProps }) => {
    const [ loader, setLoader ] = useState(false);

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

    return loader ?
        <CircularProgress /> :
        <Component {...pageProps} />;
}

export default MyApp;