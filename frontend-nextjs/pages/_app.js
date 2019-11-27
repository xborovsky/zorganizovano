import React, { useEffect, useState } from 'react';
import axios from 'axios';
import join from 'url-join';
import Router from 'next/router';
import CircularProgress from '@material-ui/core/CircularProgress';

var isAbsoluteURLRegex = /^(?:\w+:)\/\//;

const MyApp = ({ Component, pageProps }) => {
    const [ loader, setLoader ] = useState(false);

    axios.interceptors.request.use(config => {
        // Concatenate base path if not an absolute URL
        if (!isAbsoluteURLRegex.test(config.url)) {
            const urlPrefix = process.env.NODE_ENV === "production" ?
                "https://zorganizovano.cz:" : "http://localhost:";
            const port = config.url.startsWith('/img-api') ? 8082 : 8081;
            const defaultContextPath = port === 8081 ? '/api' : '';
            config.url = join(`${urlPrefix}${port}${defaultContextPath}`, config.url);
        }

        return config;
    });

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