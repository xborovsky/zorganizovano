import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import { makeStyles } from '@mui/styles';
import Price from 'components/Price';
import { format, parseISO, differenceInCalendarDays, addBusinessDays, addDays } from 'date-fns';

import { DATE_TIME_FORMAT } from 'util/date-format-util';
import { OrderState } from './OrderState';

const useStyles = makeStyles({
    tr : {
        cursor : 'pointer',
        '&:hover' : {
            background : '#f3f3f3'
        },
        '&.shipped' : {
            background : OrderState.SHIPPED.color,
            '&:hover' : {
                background : OrderState.SHIPPED.hoverColor
            }
        },
        '&.storno' : {
            background: OrderState.STORNO.color,
            '&:hover' : {
                background : OrderState.STORNO.hoverColor
            }
        },
        '&.long-payment-waiting' : {
            background: OrderState.LONG_PAYMENT_WAITING.color,
            '&:hover' : {
                background : OrderState.LONG_PAYMENT_WAITING.hoverColor
            }
        },
        '&.storno-candidate' : {
            background: OrderState.STORNO_CANDIDATE.color,
            '&:hover' : {
                background : OrderState.STORNO_CANDIDATE.hoverColor
            }
        },
        '&.payment-received' : {
            background: OrderState.PAYMENT_RECEIVED.color,
            '&:hover' : {
                background : OrderState.PAYMENT_RECEIVED.hoverColor
            }
        }
    }
});

export const LONG_PAYMENT_WAITING = 6;
export const STORNO_CANDIDATE_ADDITIONAL_WORKDAYS = 5;

const getAdditionalClass = order => {
    if (order.storno) {
        return 'storno';
    } else if (order.shipped) {
        return 'shipped';
    } else if (order.paymentReceived) {
        return 'payment-received';
    } else if (!order.paymentReceived) {
        const now = new Date();
        const calendarDaysSinceOrderCreated = differenceInCalendarDays(now, parseISO(order.created));
        if (calendarDaysSinceOrderCreated > LONG_PAYMENT_WAITING) {
            const isStornoCandidate = differenceInCalendarDays(now, addBusinessDays(addDays(parseISO(order.created), LONG_PAYMENT_WAITING), STORNO_CANDIDATE_ADDITIONAL_WORKDAYS)) > 0;
            return isStornoCandidate ? 'storno-candidate' : 'long-payment-waiting';
        }
    }

    return undefined;
};

const OrdersTableRow = ({
    rowNum,
    orderId,
    orderNum,
    created,
    customerName,
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
    const additionalClass = getAdditionalClass({
        storno, shipped, paymentReceived, created
    });

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
            <TableCell>{customerName}</TableCell>
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
    customerName : PropTypes.string.isRequired,
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