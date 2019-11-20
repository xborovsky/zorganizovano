import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/styles';
import Price from 'components/Price';
import { format, parseISO } from 'date-fns';

import { DATE_TIME_FORMAT } from 'util/date-format-util';

const useStyles = makeStyles({
    tr : {
        cursor : 'pointer',
        '&:hover' : {
            background : '#f3f3f3'
        }
    }
});

const OrdersTableRow = ({
    rowNum,
    orderId,
    orderNum,
    created,
    shipmentType,
    totalPrice,
    paymentReceived,
    invoiceSent,
    shipped,
    onGoToDetail
}) => {
    const classes = useStyles();

    return (
        <TableRow className={classes.tr} onClick={() => onGoToDetail(orderId)}>
            <TableCell>{rowNum}</TableCell>
            <TableCell>{orderNum}</TableCell>
            <TableCell>{format(parseISO(created), DATE_TIME_FORMAT)}</TableCell>
            <TableCell>{shipmentType}</TableCell>
            <TableCell><Price value={totalPrice} size="sm" /></TableCell>
            <TableCell>{paymentReceived && format(parseISO(paymentReceived), DATE_TIME_FORMAT)}</TableCell>
            <TableCell>{invoiceSent && format(parseISO(invoiceSent), DATE_TIME_FORMAT)}</TableCell>
            <TableCell>{shipped && format(parseISO(shipped), DATE_TIME_FORMAT)}</TableCell>
        </TableRow>
    );
};

OrdersTableRow.propTypes = {
    rowNum : PropTypes.number.isRequired,
    orderId : PropTypes.number.isRequired,
    orderNum : PropTypes.number.isRequired,
    shipmentType : PropTypes.string.isRequired,
    created : PropTypes.string.isRequired,
    totalPrice : PropTypes.number.isRequired,
    paymentReceived : PropTypes.string,
    invoiceSent : PropTypes.string,
    shipped : PropTypes.string,
    onGoToDetail : PropTypes.func.isRequired
};

export default OrdersTableRow;