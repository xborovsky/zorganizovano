import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import Alert from 'components/Alert';
import { AuthContext } from '../AuthProvider';

const AuthDataFetcher = ({
    url,
    method = 'GET',
    children
}) => {
    const [ loading, setLoading ] = useState(true);
    const [ data, setData ] = useState(undefined);
    const [ error, setError ] = useState(undefined);
    const { auth, logout } = useContext(AuthContext);

    useEffect(() => {
        axios({
            method,
            url,
            headers : {
                'Authorization' : `Bearer ${auth}`
            }
        })
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                if (err.response && err.response.status === 401) {
                    logout();
                    return;
                }
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

AuthDataFetcher.propTypes = {
    url : PropTypes.string.isRequired,
    method : PropTypes.string
};

export default AuthDataFetcher;