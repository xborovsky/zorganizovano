import React from 'react';

import ShoppingCart from './shopping-cart/ShoppingCart';
import OrderWizard from './order/OrderWizard';
import ProductDetail from './product/detail/ProductDetail';
import ProductList from './product/product-list/ProductList';

const Eshop = () => (
    /*<ShoppingCart />*/
    <>
        {/*<OrderWizard />*/}
        {/*<ProductDetail product={{ id : 1, name : 'Test', description : 'Test description', price : 199, dimensionX : 12.5, dimensionY : 288.8, dimensionZ : 2 }} />*/}
        <ProductList products={[
            { id : 1, name : 'Test 1', description : 'Test description', price : 199 },
            { id : 2, name : 'Test 2', description : 'Test description', price : 29 },
            { id : 3, name : 'Test 3', description : 'Test description', price : 2999 }
        ]} />
    </>
);

export default Eshop;