import { useContext } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

import { AuthContext } from 'pages/admin/AuthProvider';

const useStockItemTemplate = stockItemId => {
    const { auth } = useContext(AuthContext);
    const { data, isLoading, error } = useQuery(['admin-stock-item', stockItemId], () =>
        axios({
            method : 'GET',
            url : `/admin/stock-items/${stockItemId}`,
            headers : {
                'Authorization' : `Bearer ${auth}`
            }
        }).then(res => res.data),
        {
            enabled : !!stockItemId
        }
    );
    
    return {
        isLoading, 
        data, 
        error
    };
};

export default useStockItemTemplate;