const CART = 'cart';

export const shoppingCartManager = (() => {
    const getAllItems = () => {
        const cart = localStorage.getItem(CART);
        return !cart ? [] : JSON.parse(cart);
    };

    const getNumItems = () => {
        return getAllItems().length;
    };

    const setItems = items => {
        localStorage.setItem(CART, JSON.stringify(items));
    };

    const addItem = item => {
        let cart = [...getAllItems()];
        if (!cart.length) {
            setItems([item]);
        } else {
            updateItem(item);
        }
    };

    const removeItem = item => {
        return getAllItems()
            .filter(cartItem => cartItem.id !== item.id);
    };

    const updateItem = item => {
        const cart = [...getAllItems()];
        if (item.quantity <= 0) {
            return removeItem(item);
        } else {
            const itemInCartIdx = cart.findIndex(cartItem => cartItem.id === item.id);
            if (itemInCartIdx === -1) {
                setItems([...cart, item]);
            } else {
                cart[itemInCartIdx].quantity += item.quantity;
                setItems(cart);
            }
        }
    };

    return {
        getAllItems,
        getNumItems,
        setItems,
        addItem,
        removeItem,
        updateItem
    };
})();