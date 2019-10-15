import React from 'react';

import ShoppingCart from './shopping-cart/ShoppingCart';
import OrderWizard from './order/OrderWizard';
import ProductDetail from './product/ProductDetail';

const Eshop = () => (
    /*<ShoppingCart />*/
    <>
    <OrderWizard />
    <ProductDetail product={{ id : 1, name : 'Test', description : 'Test description', price : 199, dimensionX : 12.5, dimensionY : 288.8, dimensionZ : 2 }} />
    </>
);

export default Eshop;