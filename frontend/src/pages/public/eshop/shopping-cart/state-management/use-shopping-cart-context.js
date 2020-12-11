import { useContext } from 'react';

import ShoppingCartContext from './ShoppingCartContext';

const useShoppingCartContext = () => {
    const context = useContext(ShoppingCartContext);

    if (!context) {
        throw new Error("Should be called within ShoppingCartContext!");
    }

    return context;
};

export default useShoppingCartContext;