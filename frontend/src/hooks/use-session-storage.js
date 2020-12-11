import { useState, useEffect } from 'react';

const useSessionStorage = key => {
    const getInitialState = () => {
        const sess = window.localStorage.getItem('key');
        return !sess ? undefined : JSON.parse(sess);
    };

    const [value, setValue] = useState(getInitialState);
   
    useEffect(() => {
        if (value === undefined) {
            sessionStorage.removeItem(key);
        } else {
            sessionStorage.setItem(key, JSON.stringify(value));
        }
    }, [value]);

    return [value, setValue];
};

export default useSessionStorage;