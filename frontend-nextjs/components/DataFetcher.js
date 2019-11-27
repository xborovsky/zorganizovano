import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import Alert from './Alert';

const DataFetcher = ({
    url,
    method = 'GET',
    axiosRequestParams = {},
    children
}) => {
    const [ loading, setLoading ] = useState(true);
    const [ data, setData ] = useState(undefined);
    const [ error, setError ] = useState(undefined);

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

            return config;
        });
    }, []);

    useEffect(() => {
        axios({method, url, ...axiosRequestParams})
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(true); // todo pass error to children
                setLoading(false);
            });
    }, []);

    return (
        loading ?
            <Grid container>
                <Grid item xs={12} style={{ textAlign : 'center' }}>
                    <CircularProgress />
                </Grid>
            </Grid> :
            error ?
                <Alert type="error">Problém komunikace se serverem.</Alert> :
                children(data)
    );
};

DataFetcher.propTypes = {
    url : PropTypes.string.isRequired,
    method : PropTypes.string,
    axiosRequestParams : PropTypes.object
};

export default DataFetcher;