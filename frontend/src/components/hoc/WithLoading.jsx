import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Loader from '../../components/Loader';
import Alert from '../../components/Alert';

const withLoading = url => Component => props => {
    const [ loader, setLoader ] = useState({
        loading : true
    });
    //const params = useParams();
    //console.log(params);
    console.log('xxx');

    useEffect(() => {
        axios.get(url)
            .then(res => {
                setLoader({
                    data : res.data,
                    statusCode : res.status,
                    loading : false
                });
            })
            .catch(err => {
                console.error(err);
                setLoader({
                    error : err.message,
                    loading : false
                });
            });
    }, [url]);

    return (
        loader.loading ?
            <Loader /> :
            loader.error ?
                <Alert type="error">{loader.error}</Alert> :
                <Component
                    {...props}
                    loading={loader.loading}
                    error={loader.error}
                    data={loader.data}
                    statusCode={loader.statusCode} />
    );
};

export default withLoading;