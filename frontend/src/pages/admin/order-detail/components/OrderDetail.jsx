import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { format, parseISO } from 'date-fns';
import { makeStyles } from '@mui/styles';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

import { DATE_TIME_FORMAT } from 'util/date-format-util';
import Price from 'components/Price';
import { OrderItemPropType } from './OrderItemPropType';
import OrderDetailItems from './OrderDetailItems';
import Alert from 'components/Alert';
import { AuthContext } from 'pages/admin/AuthProvider';
import TrackingNumberInput from './TrackingNumberInput';
import AdminNote from './AdminNote';

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
        readyToShip : false,
        invoiceSent : false,
        shipped : false
    });
    const [alertMessage, setAlertMessage] = useState(undefined);
    const [processingDates, setProcessingDates] = useState({
        paymentReceived : order.paymentReceived,
        readyToShip : order.readyToShip,
        invoiceSent : order.invoiceSent,
        shipped : order.shipped,
        storno : order.storno
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
                setAlertMessage({ type : 'error', message : 'Ups, něco se pokazilo!' });
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

    const handleAdminNoteChanged = () => {
        setAlertMessage({ type : 'success', message : 'Změna úspěšně uložena.' });
    };

    return (
        <div className={classes.root}>
            { alertMessage && <Alert type={alertMessage.type}>{alertMessage.message}</Alert> }
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
                            <TableCell>
                                <Price value={order.totalPrice} size="sm" />
                                { order.discountValue > 0 &&
                                    <>
                                        <br />
                                        SLEVA: <Price value={order.discountValue} size="sm" /> ({ order.discountCode || '???' })
                                    </>
                                }
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.th}>Zákazník:</TableCell>
                            <TableCell>
                                {`${order.customer.firstName} ${order.customer.lastName}`}<br />
                                {order.customer.email}<br />
                                {order.customer.phoneNo}
                                { order.customer.company &&
                                    <>
                                        <br />Název firmy: {order.customer.companyName}
                                        <br />IČ: {order.customer.ico}
                                        { order.customer.dic && <><br />DIČ: {order.customer.dic}</> }
                                    </>
                                }
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
                        { ['zasilkovna', 'zasielkovna'].includes(order.shipmentType.name.toLowerCase()) &&
                            <TableRow>
                                <TableCell className={classes.th}>Doručovací adresa:</TableCell>
                                <TableCell>
                                    {order.shipmentAddress.street}<br />
                                    {order.shipmentAddress.township}<br />
                                    {order.shipmentAddress.zipCode}<br />
                                    {order.shipmentAddress.country}<br />
                                </TableCell>
                            </TableRow>
                        }
                        <TableRow>
                            <TableCell className={classes.th}>Poznámka:</TableCell>
                            <TableCell style={{whiteSpace: "pre-wrap"}}>{ order.customerNote || '' }</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.th}>Moje poznámka:</TableCell>
                            <TableCell style={{whiteSpace: "pre-wrap"}}>
                                <AdminNote
                                    orderId={order.orderId}
                                    orderAdminNote={order.adminNote}
                                    onChangeSuccess={handleAdminNoteChanged}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.th}>Platba přijata:</TableCell>
                            <TableCell>{ dateOrCheckbox('paymentReceived') }</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.th}>Připraveno k expedici:</TableCell>
                            <TableCell>{ dateOrCheckbox('readyToShip') }</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.th}>Expedováno:</TableCell>
                            <TableCell>
                            { order.shipmentType.name === 'ZASILKOVNA' || order.shipmentType.name === 'ZASIELKOVNA' ?
                                    dateOrCheckbox('shipped') :
                                    processingDates['shipped'] ?
                                        format(parseISO(processingDates['shipped']), DATE_TIME_FORMAT) :
                                        <TrackingNumberInput
                                            orderId={order.orderId}
                                            onSuccess={res => setProcessingDates(prev => ({ ...prev, shipped : res }))}
                                            onError={() => setAlertMessage({ type : 'error', message : 'Ups, něco se pokazilo!' })}
                                        />
                                }
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.th}>Faktura odeslána:</TableCell>
                            <TableCell>{ dateOrCheckbox('invoiceSent') }</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.th}>Storno:</TableCell>
                            <TableCell>{ dateOrCheckbox('storno') }</TableCell>
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
        storno : PropTypes.string,
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