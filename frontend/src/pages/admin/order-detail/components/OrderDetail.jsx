import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { format, parseISO } from 'date-fns';
import { makeStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';

import { DATE_TIME_FORMAT } from 'util/date-format-util';
import Price from 'components/Price';

const useStyles = makeStyles({
    th : {
        fontWeight : 'bold'
    }
});

const OrderDetail = ({ order }) => {
    const classes = useStyles();

    const dateOrCheckbox = (order, datePropertyName) => (
        order[datePropertyName] ?
            format(parseISO(order[datePropertyName]), DATE_TIME_FORMAT) :
            <Checkbox
                checked={false}
                //onChange={handleChange('datePropertyName')}
                color="primary"
            />
    );

    return (
        <Paper>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell className={classes.th} width={`20%`}>Číslo objednávky:</TableCell>
                        <TableCell>{order.orderNum}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.th}>Datum přijetí:</TableCell>
                        <TableCell>{format(parseISO(order.created), DATE_TIME_FORMAT)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.th}>Celková cena:</TableCell>
                        <TableCell><Price value={order.totalPrice} size="sm" /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.th}>Platba přijata:</TableCell>
                        <TableCell>{ dateOrCheckbox(order, 'paymentReceived') }</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.th}>Faktura odeslána:</TableCell>
                        <TableCell>{ dateOrCheckbox(order, 'invoiceSent') }</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.th}>Expedováno:</TableCell>
                        <TableCell>{ dateOrCheckbox(order, 'shipped') }</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
};

OrderDetail.propTypes = {
    order : PropTypes.shape({
        orderId : PropTypes.number.isRequired,
        orderNum : PropTypes.number.isRequired,
        created : PropTypes.string.isRequired,
        totalPrice : PropTypes.number.isRequired,
        paymentReceived : PropTypes.string,
        invoiceSent : PropTypes.string,
        shipped : PropTypes.string,
    }).isRequired
};

export default OrderDetail;