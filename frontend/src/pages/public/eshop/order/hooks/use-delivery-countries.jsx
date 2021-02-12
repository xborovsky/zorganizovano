import { useState, useEffect } from 'react';
import axios from 'axios';

const useDeliveryCountries = () => {
    const [ deliveryCountries, setDeliveryCountries ] = useState([]);
    const [ isFetching, setIsFetching ] = useState(true);
    const [ error, setError ] = useState(undefined);

    useEffect(() => {
        axios.get('/order/delivery-countries')
            .then(res => {
                setDeliveryCountries(res.data);
                setIsFetching(false);
            })
            .catch(err => {
                console.error(err);
                setError(err);
                setIsFetching(false);
            });
    }, []);
    
    return {
        deliveryCountries, 
        isFetching, 
        error
    };
};

export default useDeliveryCountries;