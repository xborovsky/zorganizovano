import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/styles';
import Price from 'components/Price';
import { format, parseISO } from 'date-fns';

import { DATE_TIME_FORMAT } from 'util/date-format-util';

const useStyles = makeStyles({
    tr : {
        cursor : 'pointer',
        '&:hover' : {
            background : '#f3f3f3'
        },
        '&.shipped' : {
            background: '#ddd',
            '&:hover' : {
                background : '#ccc'
            }
        },
        '&.storno' : {
            background: '#aaa',
            '&:hover' : {
                background : '#999'
            }
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
    readyToShip,
    invoiceSent,
    shipped,
    storno,
    onGoToDetail,
    checked,
    onOrderCheckboxClick
}) => {
    const classes = useStyles();
    const additionalClass = storno ? 'storno' : shipped ? 'shipped' : undefined;

    const handleRowClick = e => onGoToDetail(orderId);

    const handleChbxClick = e => e.stopPropagation();

    return (
        <TableRow 
            className={[classes.tr, additionalClass].join(' ')} 
            onClick={handleRowClick}>
            <TableCell>
                <Checkbox 
                    checked={checked} 
                    onClick={handleChbxClick}
                    onChange={onOrderCheckboxClick(orderId)} 
                    name={`chbx-${orderId}`} 
                    color='primary'
                />
            </TableCell>
            <TableCell>{rowNum}</TableCell>
            <TableCell>{orderNum}</TableCell>
            <TableCell>{format(parseISO(created), DATE_TIME_FORMAT)}</TableCell>
            <TableCell>{shipmentType}</TableCell>
            <TableCell><Price value={totalPrice} size="sm" /></TableCell>
            <TableCell>{paymentReceived && format(parseISO(paymentReceived), DATE_TIME_FORMAT)}</TableCell>
            <TableCell>{readyToShip && format(parseISO(readyToShip), DATE_TIME_FORMAT)}</TableCell>
            <TableCell>{shipped && format(parseISO(shipped), DATE_TIME_FORMAT)}</TableCell>
            <TableCell>{invoiceSent && format(parseISO(invoiceSent), DATE_TIME_FORMAT)}</TableCell>
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
    readyToShip : PropTypes.string,
    invoiceSent : PropTypes.string,
    shipped : PropTypes.string,
    storno : PropTypes.string,
    onGoToDetail : PropTypes.func.isRequired,
    checked : PropTypes.bool.isRequired,
    onOrderCheckboxClick : PropTypes.func.isRequired
};

export default OrdersTableRow;