import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { AuthContext } from 'pages/admin/AuthProvider';

const useFetchAuth = (url, refetchFlag) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(undefined);
    const [error, setError] = useState(undefined);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = () => {
            setError(undefined);
            setIsLoading(true);

            axios({
                method : 'GET',
                url,
                headers : {
                    'Authorization' : `Bearer ${auth}`
                }
            })
                .then(res => {
                    setData(res.data);
                    setIsLoading(false);
                }).catch(err => {
                    console.error(err);
                    setError(err);
                    setIsLoading(false);
                });
            };

        fetchData();
    }, [url, refetchFlag]);

    return { data, isLoading, error };
};

export default useFetchAuth;