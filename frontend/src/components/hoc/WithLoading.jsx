import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Loader from '../../components/Loader';
import Alert from '../../components/Alert';

const withLoading = url => Component => props => {
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(undefined);
    const [ data, setData ] = useState(undefined);
    const [ statusCode, setStatusCode ] = useState(undefined);
    const params = useParams();
    console.log(params);

    useEffect(() => {
        axios.get(url)
            .then(res => {
                setData(res.data);
                setStatusCode(res.status);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        loading ?
            <Loader /> :
            error ?
                <Alert type="error">{error}</Alert> :
                <Component
                    {...props}
                    loading={loading}
                    error={error}
                    data={data}
                    statusCode={statusCode} />
    );
};

export default withLoading;