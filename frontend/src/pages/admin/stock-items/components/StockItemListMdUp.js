import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import StockItemContainer from './StockItemContainer';

const useStyles = makeStyles({
    root: {
      width: '95vw',
      overflowX: 'auto',
      margin : '20px auto'
    },
    table: {
      minWidth: 650
    }
});

const StockItemListMdUp = ({ data }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>ID produktu</TableCell>
                        <TableCell>Název</TableCell>
                        <TableCell>Kusů skladem</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { data.map((stockItem, cnt) => (
                        <StockItemContainer
                            id={stockItem.id}
                            itemId={stockItem.itemId}
                            name={stockItem.name}
                            quantity={stockItem.quantity}
                            rowNum={cnt + 1}
                            key={stockItem.id}
                        />
                    )) }
                </TableBody>
            </Table>
        </Paper>
    );
};

StockItemListMdUp.propTypes = {
    data : PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.number.isRequired,
        itemId : PropTypes.number.isRequired,
        name : PropTypes.string.isRequired,
        quantity : PropTypes.number.isRequired
    }))
};

export default StockItemListMdUp;