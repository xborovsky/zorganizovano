import { useState, useEffect } from 'react';
import axios from 'axios';

const useDeliveryOptions = (shoppingCartItemIds, selectedCountry) => {
    const [isDeliveryOptionsLoading, seIsDeliveryOptionsLoading] = useState(true);
    const [deliveryOptions, setDeliveryOptions] = useState(undefined);
    const [deliveryOptionsLoadingError, setDeliveryOptionsLoadingError] = useState(false);

    useEffect(() => {
        const fetchData = () => {
            axios.post(
                '/order/delivery-options', 
                { 
                    orderItemIds : shoppingCartItemIds,
                    selectedCountry
                }
            ).then(res => {
                setDeliveryOptions(res.data);
                seIsDeliveryOptionsLoading(false);
            }).catch(err => {
                setDeliveryOptionsLoadingError(true);
                seIsDeliveryOptionsLoading(false);
            });
        };

        fetchData();
    }, []);

    return {
        isFetchingDeliveryOptions : isDeliveryOptionsLoading,
        deliveryOptions,
        deliveryOptionsFetchError : deliveryOptionsLoadingError
    };
};

export default useDeliveryOptions;