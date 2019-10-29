import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';

import ProductDetail from './ProductDetail';
import Alert from 'components/Alert';
import BreadcrumbsNav from 'components/BreadcrumbsNav';

const ProductDetailContainer = () => {
    let { id } = useParams();
    const [ item, setItem ] = useState(undefined);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(undefined);

    useEffect(() => {
        axios.get(`/item/${id}`)
            .then(res => {
                setItem(res.data);
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
                <>
                    <BreadcrumbsNav items={[{ link : '/eshop', name : 'Produkty' }, { name : item.name }]} />
                    <ProductDetail product={item} />
                </>
    );
};

export default ProductDetailContainer;