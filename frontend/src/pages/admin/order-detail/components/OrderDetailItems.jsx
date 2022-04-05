import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { OrderItemPropType } from './OrderItemPropType';
import OrderDetailItemRow from './OrderDetailItemRow';
import { makeStyles, withStyles } from '@mui/styles';

const useStyle = makeStyles(theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    }
}));

const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    }
}))(TableCell);

const OrderDetailItems = ({
    items
}) => {
    const classes = useStyle();
    return (
        <Paper className={classes.root}>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Název</StyledTableCell>
                        <StyledTableCell>Množství</StyledTableCell>
                        <StyledTableCell>Cena</StyledTableCell>
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
        </Paper>
    );
};

OrderDetailItems.propTypes = {
    items : PropTypes.arrayOf(OrderItemPropType).isRequired
};

export default OrderDetailItems;