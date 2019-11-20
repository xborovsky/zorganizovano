import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { OrderItemPropType } from './OrderItemPropType';
import OrderDetailItemRow from './OrderDetailItemRow';

const OrderDetailItems = ({
    items
}) => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>Název</TableCell>
                <TableCell>Množství</TableCell>
                <TableCell>Cena</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {
                items.map(item => (
                    <OrderDetailItemRow item={item} key={item.id} />
                ))
            }
        </TableBody>
    </Table>
);

OrderDetailItems.propTypes = {
    items : PropTypes.arrayOf(OrderItemPropType).isRequired
};

export default OrderDetailItems;