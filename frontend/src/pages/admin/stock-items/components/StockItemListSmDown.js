import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';

import StockItemContainer from './StockItemContainer';

const useStyles = makeStyles({
    root: {
      width: '95vw',
      overflowX: 'auto',
      margin : '20px auto'
    },
    tableHead : {
        backgroundColor : '#ddd'
    },
    tableHeadSearch : {
        backgroundColor : '#fff'
    }
});

const StockItemListSmDown = ({ 
    data, 
    searchFilter,
    onSearchFilterChange,
    onEditClick,
    onDetailClick
}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Table size="small">
                <TableHead className={classes.tableHead}>
                    <TableRow className={classes.tableHeadSearch}>
                        <TableCell colSpan={6}>
                            <TextField 
                                value={searchFilter}
                                placeholder="Vyhledejte položku"
                                onChange={onSearchFilterChange}
                                fullWidth
                            />
                        </TableCell>
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
                            onEditClick={onEditClick}
                            onDetailClick={onDetailClick}
                        />
                    )) }
                </TableBody>
            </Table>
        </Paper>
    );
};

StockItemListSmDown.propTypes = {
    data : PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.number.isRequired,
        itemId : PropTypes.number.isRequired,
        name : PropTypes.string.isRequired,
        quantity : PropTypes.number.isRequired,
    })),
    searchFilter : PropTypes.string,
    onSearchFilterChange : PropTypes.func.isRequired,
    onEditClick : PropTypes.func.isRequired,
    onDetailClick : PropTypes.func.isRequired
};

export default StockItemListSmDown;