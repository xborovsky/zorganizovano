import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialState) => {
    const getInitialState = () => {
        const sess = window.localStorage.getItem(key);
        return !sess ? initialState : JSON.parse(sess);
    };

    const [value, setValue] = useState(getInitialState);
   
    useEffect(() => {
        if (value === undefined) {
            window.localStorage.removeItem(key);
        } else {
            window.localStorage.setItem(key, JSON.stringify(value));
        }
    }, [key, value]);

    return [value, setValue];
};

export default useLocalStorage;