import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';

import Alert from 'components/Alert';
import TipDetail from './TipDetail';

const TipDetailContainer = () => {
    let { id } = useParams();
    const [ blogPost, setBlogPost ] = useState(undefined);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(undefined);

    useEffect(() => {
        axios.get(`/blog/posts/${id}`)
            .then(res => {
                setBlogPost(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
                setError('Chyba spojení...'); // TODO
            });
    }, []);

    return (
        loading ?
            <CircularProgress /> :
            error ?
                <Alert type="error">{ error }</Alert> :
                <TipDetail tip={blogPost} />
    );
};

export default TipDetailContainer;