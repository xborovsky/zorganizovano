import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { OrderItemPropType } from './OrderItemPropType';
import OrderDetailItemRow from './OrderDetailItemRow';
import { makeStyles, withStyles } from '@material-ui/styles';

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