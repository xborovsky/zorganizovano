import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { AuthContext } from 'pages/admin/AuthProvider';

const useStockItemTemplate = stockItemId => {
    const [ isLoading, setLoading ] = useState(false);
    const [ error, setError ] = useState(undefined);
    const [ data, setData ] = useState(undefined);
    const { auth } = useContext(AuthContext);
    
    useEffect(() => {
        if (stockItemId) {
            setLoading(true);
            setError(undefined);

            axios({
                method : 'GET',
                url : `/admin/stock-items/${stockItemId}`,
                headers : {
                    'Authorization' : `Bearer ${auth}`
                }
            })
                .then(res => {
                    setData(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    setError('Problém načítání dat ze serveru.');
                    setLoading(false);
                });
        };
    }, [stockItemId]);
    
    return {
        isLoading, 
        data, 
        error
    };
};

export default useStockItemTemplate;