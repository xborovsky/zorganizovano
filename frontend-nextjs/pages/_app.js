import { useEffect } from 'react';
import axios from 'axios';
import join from 'url-join';

var isAbsoluteURLRegex = /^(?:\w+:)\/\//;

const MyApp = ({ Component, pageProps }) => {

    // TODO
    useEffect(() => {
        axios.interceptors.request.use(config => {
            // Concatenate base path if not an absolute URL
            if (!isAbsoluteURLRegex.test(config.url)) {
                const urlPrefix = process.env.NODE_ENV === "production" ?
                    "https://zorganizovano.cz:" : "http://localhost:";
                const port = config.url.startsWith('/img-api') ? 8082 : 8081;
                const defaultContextPath = port === 8081 ? '/api' : '';
                config.url = join(`${urlPrefix}${port}${defaultContextPath}`, config.url);
            }
            console.log('config.url: ' + config.url);

            return config;
        });
    }, []);

    return <Component {...pageProps} />
}

export default MyApp;