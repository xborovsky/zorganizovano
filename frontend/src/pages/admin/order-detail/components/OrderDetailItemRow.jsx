import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import withStyles from '@mui/styles/withStyles';

import { OrderItemPropType } from './OrderItemPropType';
import Price from 'components/Price';

const StyledTableCell = withStyles(theme => ({
    body: {
      backgroundColor: '#eee'
    }
}))(TableCell);

const OrderDetailItemRow = ({ item }) => (
    <TableRow>
        <StyledTableCell>{`${item.name} ${item.subName || ''}`}</StyledTableCell>
        <StyledTableCell>{item.quantity}</StyledTableCell>
        <StyledTableCell><Price value={item.price} size="sm" /></StyledTableCell>
    </TableRow>
);

OrderDetailItemRow.propTypes = {
    item : OrderItemPropType
};

export default OrderDetailItemRow;