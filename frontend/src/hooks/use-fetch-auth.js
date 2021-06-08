import { useContext } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

import { AuthContext } from 'pages/admin/AuthProvider';

const useFetchAuth = (queryId, url) => {
    const { auth } = useContext(AuthContext);
    const { data, isLoading, error, refetch } = useQuery(queryId, () =>
        axios({
            method : 'GET',
            url,
            headers : {
                'Authorization' : `Bearer ${auth}`
            }
        }).then(res => res.data)
    );

    return { data, isLoading, error, refetch };
};

export default useFetchAuth;