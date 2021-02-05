import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, refetchFlag) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(undefined);
    const [error, setError] = useState(undefined);

    useEffect(() => {
        const fetchData = () => {
            setError(undefined);
            setIsLoading(true);

            axios.get(url)
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

export default useFetch;