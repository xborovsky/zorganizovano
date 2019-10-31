import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Grid } from '@material-ui/core';
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
        axios({method, url, ...axiosRequestParams})
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(true);
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
                <Alert type="error">Chyba spojení se serverem.</Alert> :
                children(data)
    );
};

DataFetcher.propTypes = {
    url : PropTypes.string.isRequired,
    method : PropTypes.string,
    axiosRequestParams : PropTypes.object
};

export default DataFetcher;