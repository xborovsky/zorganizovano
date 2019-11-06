import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import Price from 'components/Price';
import { Paper } from '@material-ui/core';

const styles = theme => ({
    table : {
        width : '100%'
    },
    itemName : {
        fontWeight : 'bold'
    },
    itemPriceTotal : {
        fontWeight : 'bold'
    }
});

const ShoppingCartSm = ({ items, selectedDelivery, classes }) => {
    const intermediateSum = items.reduce((a, b) => a + (b.quantity * b.priceSingle), 0);
    const totalSum = intermediateSum + selectedDelivery.price;

    return (
        <Paper>
            <Table className={classes.table}>
                <TableBody>
                    { items.map(item => (
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
                    <TableRow>
                        <TableCell>Doprava - { selectedDelivery.readableName }</TableCell>
                        <TableCell align="right"><Price value={selectedDelivery.price} size="inherit" /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell >Celková cena</TableCell>
                        <TableCell align="right"><Price value={totalSum} /></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
};

export default withStyles(styles)(ShoppingCartSm);