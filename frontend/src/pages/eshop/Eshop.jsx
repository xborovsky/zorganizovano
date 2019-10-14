import React from 'react';

import ShoppingCart from './shopping-cart/ShoppingCart';
import OrderWizard from './order/OrderWizard';
import ProductDetail from './product/ProductDetail';

const Eshop = () => (
    /*<ShoppingCart />*/
    <>
    <OrderWizard />
    <ProductDetail product={{ id : 1, name : 'Test', description : 'Test description', price : 199 }} />
    </>
);

export default Eshop;