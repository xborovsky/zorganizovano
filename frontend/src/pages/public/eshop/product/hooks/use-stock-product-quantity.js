import axios from 'axios';
import { useQuery } from 'react-query';

const useStockProductQuantity = productId => {
    const { data, isLoading, error } = useQuery(['item-quantity', productId], () =>
        axios.get(`/item/${productId}/quantity`).then(res => res.data)
    );

    return { 
        data : data || 0, 
        isLoading, 
        error 
    };
};

export default useStockProductQuantity;