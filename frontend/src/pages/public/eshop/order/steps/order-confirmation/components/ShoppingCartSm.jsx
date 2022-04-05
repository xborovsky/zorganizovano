import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Price from 'components/Price';
import DiscountCodeCartRow from './DiscountCodeCartRow';
import OrderContext from '../../../OrderContext';

const styles = theme => ({
    table : {
        width : '100%'
    },
    itemName : {
        fontWeight : 'bold'
    },
    itemPriceTotal : {
        fontWeight : 'bold'
    },
    totalPrice : {
        [theme.breakpoints.down('md')] : {
            fontSize : '1.2rem !important'
        }
    }
});

const ShoppingCartSm = ({ 
    intermediateSum,
    totalSum,
    discountValue = 0,
    classes
}) => {
    const { shoppingCart, selectedDelivery } = useContext(OrderContext);

    return (
        <Paper>
            <Table className={classes.table}>
                <TableBody>
                    { shoppingCart.map(item => (
                        <Fragment key={item.id}>
                            <TableRow>
                                <TableCell colSpan={2} align="center" className={classes.itemName}>{ item.name }</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Počet kusů</TableCell>
                                <TableCell align="right">{ item.quantity }</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Cena za kus<br />Cena celkem</TableCell>
                                <TableCell align="right">
                                    <Price value={item.priceSingle} size="inherit" /><br />
                                    <Price value={item.priceSingle * item.quantity} size="inherit" className={classes.itemPriceTotal} />
                                </TableCell>
                            </TableRow>
                        </Fragment>
                    ))}
                    { !!discountValue &&
                        <DiscountCodeCartRow
                            calculatedDiscountValue={discountValue} 
                            sm 
                        />
                    }
                    <TableRow>
                        <TableCell >Mezisoučet:</TableCell>
                        <TableCell align="right">
                            <Price value={intermediateSum} size="inherit" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Doprava - { selectedDelivery.type.readableName }</TableCell>
                        <TableCell align="right"><Price value={selectedDelivery.type.price} size="inherit" /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Celková cena</TableCell>
                        <TableCell align="right"><Price value={totalSum} className={classes.totalPrice} /></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
};

ShoppingCartSm.propTypes = {
    intermediateSum : PropTypes.number.isRequired,
    totalSum : PropTypes.number.isRequired,
    discountValue : PropTypes.number
};

export default withStyles(styles)(ShoppingCartSm);