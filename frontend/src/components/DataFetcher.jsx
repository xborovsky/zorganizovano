import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { useQuery } from 'react-query';

import Alert from './Alert';

const DataFetcher = ({
    url,
    method = 'GET',
    queryId,
    children
}) => {
    const { data, isLoading, error } = useQuery(queryId, () =>
        axios({ method, url }).then(res => res.data)
    );

    return (
        isLoading ?
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
    queryId : PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.any)]).isRequired
};

export default DataFetcher;