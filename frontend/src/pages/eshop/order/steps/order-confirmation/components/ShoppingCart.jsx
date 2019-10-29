import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    table : {
        width : '100%'
    },
    totalRow : {
        fontWeight : 'bold !important'
    },
    intermediateSum : {
        fontSize : '13pt',
    },
    totalPrice : {
        fontSize : '16pt'
    }
});

const ShoppingCart = ({ items, selectedDelivery, classes }) => {
    const intermediateSum = items.reduce((a, b) => a + (b.quantity * b.price), 0);
    const totalSum = intermediateSum + selectedDelivery.price;

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
                    items.map(item => (
                        <TableRow key={item.id}>
                            <TableCell></TableCell>
                            <TableCell>{ item.name }</TableCell>
                            <TableCell align="center">{ item.quantity }</TableCell>
                            <TableCell align="center">{ item.price }</TableCell>
                            <TableCell align="center">{ item.price * item.quantity }</TableCell>
                        </TableRow>
                    ))
                }
                <TableRow className={ classes.totalRow }>
                    <TableCell align="right" colSpan={4}>Mezisoučet:</TableCell>
                    <TableCell align="center" className={classes.intermediateSum}>{ intermediateSum },- Kč</TableCell> {/* TODO price component? */}
                </TableRow>
                <TableRow>
                    <TableCell align="left" colSpan={5}>Doprava</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="left" colSpan={4}>{ selectedDelivery.readableName }</TableCell>
                    <TableCell align="center">{ selectedDelivery.price }</TableCell>
                </TableRow>
                <TableRow className={ classes.totalRow }>
                    <TableCell align="right" colSpan={4}>Celková cena:</TableCell>
                    <TableCell align="center" className={classes.totalPrice}>{ totalSum },- Kč</TableCell> {/* TODO price component? */}
                </TableRow>
            </TableBody>
        </Table>
    );
};

ShoppingCart.propTypes = {
    items : PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.number.isRequired,
        name : PropTypes.string.isRequired,
        price : PropTypes.number.isRequired,
        quantity : PropTypes.number.isRequired
    })).isRequired,
    selectedDelivery : PropTypes.shape({
        readableName : PropTypes.string.isRequired,
        price : PropTypes.number.isRequired
    }).isRequired
};

export default withStyles(styles)(ShoppingCart);