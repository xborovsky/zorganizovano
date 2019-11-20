import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { OrderItemPropType } from './OrderItemPropType';
import Price from 'components/Price';

const OrderDetailItemRow = ({ item }) => (
    <TableRow>
        <TableCell>{`${item.name} ${item.subName || ''}`}</TableCell>
        <TableCell>{item.quantity}</TableCell>
        <TableCell><Price value={item.price} size="sm" /></TableCell>
    </TableRow>
);

OrderDetailItemRow.propTypes = {
    item : OrderItemPropType
};

export default OrderDetailItemRow;