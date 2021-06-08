import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';

import Alert from 'components/Alert';
import { AuthContext } from '../AuthProvider';

const AuthDataFetcher = ({
    url,
    method = 'GET',
    queryId,
    children
}) => {
    const { auth, logout } = useContext(AuthContext);
    const { data, isLoading, error } = useQuery(queryId, () =>
        axios({
            method,
            url,
            headers : {
                'Authorization' : `Bearer ${auth}`
            }
        })
        .then(res => res.data)
        .catch(err => {
            console.error(err);
            if (err.response && err.response.status === 401) {
                logout();
                history.push('/admin/login');
            }
            return error;
        })
    );
    const history = useHistory();

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

AuthDataFetcher.propTypes = {
    url : PropTypes.string.isRequired,
    method : PropTypes.string,
    queryId : PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.any)]).isRequired
};

export default AuthDataFetcher;