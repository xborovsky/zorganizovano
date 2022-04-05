import React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
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
    tableHead : {
        backgroundColor : '#ddd'
    },
    noRecord : {
        textAlign : 'center'
    }
  });

const OrdersTable = ({ 
    orders,
    checkedOrderIds,
    onOrderCheckboxClick
}) => {
    const classes = useStyles();
    const history = useHistory();
    
    return (
        <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell>Číslo objednávky</TableCell>
                        <TableCell>Datum přijetí</TableCell>
                        <TableCell>Jméno</TableCell>
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
                            <TableCell colSpan={8} className={classes.noRecord}>žádný záznam</TableCell>
                        </TableRow> :
                        orders.map((order, cnt) => (
                            <OrdersTableRow
                                key={order.orderId}
                                rowNum={cnt+1}
                                orderId={order.orderId}
                                orderNum={order.orderNum}
                                shipmentType={order.shipmentType}
                                created={order.created}
                                customerName={order.customerName}
                                totalPrice={order.totalPrice}
                                paymentReceived={order.paymentReceived}
                                readyToShip={order.readyToShip}
                                invoiceSent={order.invoiceSent}
                                shipped={order.shipped}
                                storno={order.storno}
                                onGoToDetail={id => history.push(`/admin/orders/${id}`)}
                                checked={checkedOrderIds.indexOf(order.orderId) > -1}
                                onOrderCheckboxClick={onOrderCheckboxClick}
                            />
                        ))
                    }
                </TableBody>
            </Table>
        </Paper>
    );
};

OrdersTable.propTypes = {
    data : PropTypes.array.isRequired,
    checkedOrderIds : PropTypes.arrayOf(PropTypes.number.isRequired),
    onOrderCheckboxClick : PropTypes.func.isRequired
}; // TODO

export default OrdersTable;