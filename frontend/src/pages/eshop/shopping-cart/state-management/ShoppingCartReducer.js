import {
    ADD_ITEM_TO_SHOPPING_CART,
    REMOVE_ITEM_FROM_SHOPPING_CART,
    UPDATE_SHOPPING_CART
} from './ShoppingCartActions';

const initialState = [];

const shoppingCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_SHOPPING_CART: {
            const item = action.payload;

            if (!state.length) {
                return [...state, action.payload];
            } else {
                if (item.quantity <= 0) {
                    return [...state];
                } else {
                    const itemInCartIdx = state.findIndex(cartItem => cartItem.id === item.id);
                    if (itemInCartIdx === -1) {
                        return [...state, action.payload];
                    } else {
                        let cart = [...state];
                        cart[itemInCartIdx].quantity += item.quantity;
                        return cart;
                    }
                }
            }
        }

        case REMOVE_ITEM_FROM_SHOPPING_CART:
            return state.filter(cartItem => cartItem.id !== action.payload.id);

        case UPDATE_SHOPPING_CART:
            const item = action.payload;

            if (item.quantity <= 0) {
                return state.filter(cartItem => cartItem.id !== action.payload.id);
            } else {
                const itemInCartIdx = state.findIndex(cartItem => cartItem.id === item.id);
                if (itemInCartIdx === -1) {
                    return [...state, item];
                } else {
                    let cart = [...state];
                    cart[itemInCartIdx].quantity += item.quantity;
                    return cart;
                }
            }

        default:
            return state;
    }
};

export default shoppingCartReducer;