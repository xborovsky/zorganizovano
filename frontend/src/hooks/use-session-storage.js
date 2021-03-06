import { useState, useEffect } from 'react';

const useSessionStorage = (key, initialState) => {
    const getInitialState = () => {
        const sess = window.sessionStorage.getItem(key);
        return !sess ? initialState : JSON.parse(sess);
    };

    const [value, setValue] = useState(getInitialState);
   
    useEffect(() => {
        if (value === undefined) {
            sessionStorage.removeItem(key);
        } else {
            sessionStorage.setItem(key, JSON.stringify(value));
        }
    }, [key, value]);

    return [value, setValue];
};

export default useSessionStorage;