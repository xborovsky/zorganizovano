import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField } from '@material-ui/core';

import StockItemContainer from './StockItemContainer';

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
    tableHeadSearch : {
        backgroundColor : '#fff'
    }
});

const StockItemListMdUp = ({ 
    data, 
    searchFilter,
    onSearchFilterChange,
    onEditClick,
    onDetailClick,
    rowsPerPage,
    page,
    onPageChange,
    onRowsPerPageChange
}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Table className={classes.table} size="small">
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
                    <TableRow>
                        <TableCell>Název</TableCell>
                        <TableCell>Kusů skladem</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((stockItem, cnt) => (
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
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={onPageChange}
                onChangeRowsPerPage={onRowsPerPageChange}
            />
        </Paper>
    );
};

StockItemListMdUp.propTypes = {
    data : PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.number.isRequired,
        itemId : PropTypes.number.isRequired,
        name : PropTypes.string.isRequired,
        quantity : PropTypes.number.isRequired
    })),
    searchFilter : PropTypes.string,
    onSearchFilterChange : PropTypes.func.isRequired,
    onEditClick : PropTypes.func.isRequired,
    onDetailClick : PropTypes.func.isRequired,
    rowsPerPage : PropTypes.number.isRequired,
    page : PropTypes.number.isRequired,
    onPageChange : PropTypes.func.isRequired,
    onRowsPerPageChange : PropTypes.func.isRequired
};

export default StockItemListMdUp;