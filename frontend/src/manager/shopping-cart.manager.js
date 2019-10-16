const CART = 'cart';

export const getAllCartItems = () => {
    const cart = localStorage.getItem(CART);
    return !cart ? [] : JSON.parse(cart);
};

export const setCartItems = items => {
    localStorage.setItem(CART, JSON.stringify(items));
};

export const addItemToShoppingCart = item => {
    let cart = [...getAllCartItems()];
    if (!cart.length) {
        setCartItems([item]);
    } else {
        updateItem(item);
    }
};

export const removeItemFromShoppingCart = item => {
    return getAllCartItems()
        .filter(cartItem => cartItem.id !== item.id);
};

export const updateItem = item => {
    const cart = [...getAllCartItems()];
    if (item.quantity <= 0) {
        return removeItemFromShoppingCart(item);
    } else {
        const itemInCartIdx = cart.findIndex(cartItem => cartItem.id === item.id);
        if (itemInCartIdx === -1) {
            setCartItems([...cart, item]);
        } else {
            cart[itemInCartIdx].quantity += item.quantity;
            setCartItems(cart);
        }
    }
}
