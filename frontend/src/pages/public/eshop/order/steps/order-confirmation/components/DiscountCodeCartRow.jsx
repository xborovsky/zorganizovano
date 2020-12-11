import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@material-ui/core';

import useShoppingCartContext from '../../../../shopping-cart/state-management/use-shopping-cart-context';
import Price from 'components/Price';

const DiscountCodeCartRow = ({
    sm = false,
    calculatedDiscountValue,
    className
}) => {

    const { discountCode } = useShoppingCartContext();

    if (discountCode) {
        if (sm) {
            return (
                <TableRow>
                    <TableCell >Slevový kód ({ discountCode.code }):</TableCell>
                    <TableCell align="right">
                        <Price value={(calculatedDiscountValue * (-1))} size="inherit" />
                    </TableCell>
                </TableRow>
            );
        } else {
            return (
                <TableRow className={ className }>
                    <TableCell align="right" colSpan={4}>Slevový kód ({discountCode.code}):</TableCell>
                    <TableCell align="center">
                        <Price value={(calculatedDiscountValue * (-1))} size="inherit" />
                    </TableCell>
                </TableRow>
            );
        }
    }

    return null;
};

DiscountCodeCartRow.propTypes = {
    sm : PropTypes.bool,
    calculatedDiscountValue : PropTypes.number
};

export default DiscountCodeCartRow;