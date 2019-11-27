import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import fetch from 'isomorphic-unfetch';

import Alert from './Alert';

const DataFetcher = ({
    url,
    method = 'GET',
    requestParams = {},
    children
}) => {
    const [ loading, setLoading ] = useState(true);
    const [ data, setData ] = useState(undefined);
    const [ error, setError ] = useState(undefined);

    useEffect(() => {
        fetch(url, {method, body : { ...requestParams }})
            .then(res => {
                setData(res.json());
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
    requestParams : PropTypes.object
};

export default DataFetcher;