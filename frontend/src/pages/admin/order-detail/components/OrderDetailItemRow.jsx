import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

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