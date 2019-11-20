import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { format, parseISO } from 'date-fns';
import { makeStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

import { DATE_TIME_FORMAT } from 'util/date-format-util';
import Price from 'components/Price';
import { OrderItemPropType } from './OrderItemPropType';
import OrderDetailItems from './OrderDetailItems';
import Alert from 'components/Alert';
import { AuthContext } from 'pages/admin/AuthProvider';

const useStyles = makeStyles({
    root : {
        marginTop : 10
    },
    th : {
        fontWeight : 'bold',
        verticalAlign : 'top'
    }
});

const OrderDetail = ({ order }) => {
    const classes = useStyles();
    const [loader, setLoader] = useState({
        paymentReceived : false,
        invoiceSent : false,
        shipped : false
    });
    const [error, setError] = useState(undefined);
    const [processingDates, setProcessingDates] = useState({
        paymentReceived : order.paymentReceived,
        invoiceSent : order.invoiceSent,
        shipped : order.shipped
    });
    const { auth, logout } = useContext(AuthContext);

    const handleCheckDate = (datePropertyName) => {
        setLoader({
            ...loader,
            [datePropertyName] : true
        });
        axios({
            method : 'POST',
            url : `/admin/orders/${order.orderId}/${datePropertyName}`,
            headers : {
                'Authorization' : `Bearer ${auth}`
            }})
            .then(res => {
                setLoader({
                    ...loader,
                    [datePropertyName] : false
                });
                setProcessingDates({
                    ...processingDates,
                    [datePropertyName] : res.data
                });
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    logout();
                }
                console.error(error);
                setError('Ups, něco se pokazilo!');
                setLoader({
                    ...loader,
                    [datePropertyName] : false
                });
            });
    };

    const dateOrCheckbox = (datePropertyName) => (
        processingDates[datePropertyName] ?
            format(parseISO(processingDates[datePropertyName]), DATE_TIME_FORMAT) :
            loader[datePropertyName] ?
                <CircularProgress /> :
                <Checkbox
                    checked={false}
                    onChange={() => handleCheckDate(datePropertyName)}
                    color="primary"
                />
    );

    return (
        <div className={classes.root}>
            { error && <Alert type="error">{error}</Alert> }
            <Paper >
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
                            <TableCell className={classes.th}>Položky:</TableCell>
                            <TableCell><OrderDetailItems items={order.orderItems} /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.th}>Doprava:</TableCell>
                            <TableCell>{order.shipmentType.readableName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.th}>Celková cena:</TableCell>
                            <TableCell><Price value={order.totalPrice} size="sm" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.th}>Zákazník:</TableCell>
                            <TableCell>
                                {`${order.customer.firstName} ${order.customer.lastName}`}<br />
                                {order.customer.email}<br />
                                {order.customer.phoneNo}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.th}>Fakturační adresa:</TableCell>
                            <TableCell>
                                {order.invoiceAddress.street}<br />
                                {order.invoiceAddress.township}<br />
                                {order.invoiceAddress.zipCode}<br />
                                {order.invoiceAddress.country}
                            </TableCell>
                        </TableRow>
                        { order.shipmentType.name === 'ZASILKOVNA' &&
                            <TableRow>
                                <TableCell className={classes.th}>Doručovací adresa:</TableCell>
                                <TableCell>
                                    {order.shipmentAddress.street}<br />
                                    {order.shipmentAddress.township}<br />>
                                    {order.shipmentAddress.zipCode}<br />
                                    {order.shipmentAddress.country}<br />
                                </TableCell>
                            </TableRow>
                        }
                        <TableRow>
                            <TableCell className={classes.th}>Platba přijata:</TableCell>
                            <TableCell>{ dateOrCheckbox('paymentReceived') }</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.th}>Faktura odeslána:</TableCell>
                            <TableCell>{ dateOrCheckbox('invoiceSent') }</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.th}>Expedováno:</TableCell>
                            <TableCell>{ dateOrCheckbox('shipped') }</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
};

OrderDetail.propTypes = {
    order : PropTypes.shape({
        orderId : PropTypes.number.isRequired,
        orderNum : PropTypes.number.isRequired,
        created : PropTypes.string.isRequired,
        shipmentType : PropTypes.string.isRequired,
        totalPrice : PropTypes.number.isRequired,
        paymentReceived : PropTypes.string,
        invoiceSent : PropTypes.string,
        shipped : PropTypes.string,
        customer : PropTypes.shape({
            firstName : PropTypes.string.isRequired,
            lastName : PropTypes.string.isRequired,
            emailName : PropTypes.string.isRequired,
            phoneNo : PropTypes.string.isRequired
        }).isRequired,
        invoiceAddress : PropTypes.shape({
            street : PropTypes.string.isRequired,
            township : PropTypes.string.isRequired,
            zipCode : PropTypes.string.isRequired,
            country : PropTypes.string.isRequired
        }).isRequired,
        shipmentAddress : PropTypes.shape({
            street : PropTypes.string.isRequired,
            township : PropTypes.string.isRequired,
            zipCode : PropTypes.string.isRequired,
            country : PropTypes.string.isRequired
        }),
        orderItems : PropTypes.arrayOf(OrderItemPropType).isRequired
    }).isRequired
};

export default OrderDetail;