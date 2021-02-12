import { createContext } from 'react';

const OrderContext = createContext({
    customerInfo : undefined,
    customerAddress : undefined,
    selectedDelivery : undefined,
    allowedDeliveryCountries : undefined,
    shoppingCart : undefined,
    setCustomerInfo : undefined,
    setCustomerAddress : undefined,
    setSelectedDelivery : undefined
});

export default OrderContext;