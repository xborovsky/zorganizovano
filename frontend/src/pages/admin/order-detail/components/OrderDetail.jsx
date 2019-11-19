import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const OrderDetail = ({ order }) => (
    <Paper>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell>Číslo objednávky:</TableCell>
                    <TableCell>{order.orderNum}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Datum přijetí:</TableCell>
                    <TableCell>{order.created}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Celková cena:</TableCell>
                    <TableCell>TODO</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Platba přijata:</TableCell>
                    <TableCell>{order.processed}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Faktura odeslána:</TableCell>
                    <TableCell>{order.processed}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Expedováno:</TableCell>
                    <TableCell>{order.shipped}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </Paper>
);

OrderDetail.propTypes = {}; // TODO

export default OrderDetail;