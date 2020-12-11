import { round } from "util/number-format-util";

export const calculateCartSum = (shoppingCartSum, shipmentPrice, discountCode) => {
    let discountCodeDisplayValue = 0;
    let cartIntermediateSum = shoppingCartSum;
    
    if (discountCode) {
        if (discountCode.percentage) {
            discountCodeDisplayValue = round(cartIntermediateSum * discountCode.discount / 100);
        } else {
            discountCodeDisplayValue = discountCode.discount;
        }
    }
    
    cartIntermediateSum -= discountCodeDisplayValue;
    cartIntermediateSum = cartIntermediateSum < 0 ? 0 : cartIntermediateSum;

    return {
        cartIntermediateSum,
        discountCodeDisplayValue,
        totalSum : cartIntermediateSum + shipmentPrice
    };
};