import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import OrdersTableRow from './OrdersTableRow';

const useStyles = makeStyles({
    root: {
      width: '95vw',
      overflowX: 'auto',
      margin : '20px auto'
    },
    table: {
      minWidth: 650
    },
    noRecord : {
        textAlign : 'center'
    }
  });

const OrdersTable = ({ orders }) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Číslo objednávky</TableCell>
                        <TableCell>Datum přijetí</TableCell>
                        <TableCell>Doprava</TableCell>
                        <TableCell>Celková cena</TableCell>
                        <TableCell>Platba přijata</TableCell>
                        <TableCell>Připraveno k expedici</TableCell>
                        <TableCell>Expedováno</TableCell>
                        <TableCell>Faktura odeslána</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { !orders || !orders.length ?
                        <TableRow>
                            <TableCell colSpan={7} className={classes.noRecord}>žádný záznam</TableCell>
                        </TableRow> :
                        orders.map((order, cnt) => (
                            <OrdersTableRow
                                key={order.id}
                                rowNum={cnt+1}
                                orderId={order.orderId}
                                orderNum={order.orderNum}
                                shipmentType={order.shipmentType}
                                created={order.created}
                                totalPrice={order.totalPrice}
                                paymentReceived={order.paymentReceived}
                                readyToShip={order.readyToShip}
                                invoiceSent={order.invoiceSent}
                                shipped={order.shipped}
                                storno={order.storno}
                                onGoToDetail={id => history.push(`/admin/orders/${id}`)}
                            />
                        ))
                    }
                </TableBody>
            </Table>
        </Paper>
    );
};

OrdersTable.propTypes = {}; // TODO

export default OrdersTable;