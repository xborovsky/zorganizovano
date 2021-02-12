import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import withStyles from '@material-ui/styles/withStyles';

import Price from 'components/Price';
import DiscountCodeCartRow from './DiscountCodeCartRow';
import OrderContext from '../../../OrderContext';

const styles = theme => ({
    table : {
        width : '100%'
    },
    totalRow : {
        fontWeight : 'bold !important'
    }
});

const ShoppingCart = ({ 
    intermediateSum,
    totalSum,
    discountValue = 0,
    classes
}) => {
    const { shoppingCart, selectedDelivery } = useContext(OrderContext);

    return (
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Položka</TableCell>
                    <TableCell align="center">Počet kusů</TableCell>
                    <TableCell align="center">Cena za kus</TableCell>
                    <TableCell align="center">Cena celkem</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    shoppingCart.map(item => (
                        <TableRow key={item.id}>
                            <TableCell></TableCell>
                            <TableCell>{ item.name }</TableCell>
                            <TableCell align="center">{ item.quantity }</TableCell>
                            <TableCell align="center"><Price value={item.priceSingle} size="inherit" /></TableCell>
                            <TableCell align="center"><Price value={item.priceSingle * item.quantity} size="inherit" /></TableCell>
                        </TableRow>
                    ))
                }
                { !!discountValue &&
                    <DiscountCodeCartRow 
                        className={classes.totalRow}
                        calculatedDiscountValue={discountValue}
                    />
                }
                <TableRow className={ classes.totalRow }>
                    <TableCell align="right" colSpan={4}>Mezisoučet:</TableCell>
                    <TableCell align="center">
                        <Price value={intermediateSum} size="inherit" />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="left" colSpan={5}>Doprava</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="left" colSpan={4}>{ selectedDelivery.type.readableName }</TableCell>
                    <TableCell align="center"><Price value={selectedDelivery.type.price} size="inherit" /></TableCell>
                </TableRow>
                <TableRow className={ classes.totalRow }>
                    <TableCell align="right" colSpan={4}>Celková cena:</TableCell>
                    <TableCell align="center">
                        <Price value={totalSum} />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

ShoppingCart.propTypes = {
    intermediateSum : PropTypes.number.isRequired,
    totalSum : PropTypes.number.isRequired,
    discountValue : PropTypes.number
};

export default withStyles(styles)(ShoppingCart);