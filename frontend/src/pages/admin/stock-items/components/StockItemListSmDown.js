import React from 'react';
import PropTypes from 'prop-types';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
} from '@mui/material';

import { makeStyles } from '@mui/styles';

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
    onDetailClick,
    rowsPerPage,
    page,
    onPageChange,
    onRowsPerPageChange
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
                                variant='standard'
                                onChange={onSearchFilterChange}
                                fullWidth
                            />
                        </TableCell>
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
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
            />
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
    onDetailClick : PropTypes.func.isRequired,
    rowsPerPage : PropTypes.number.isRequired,
    page : PropTypes.number.isRequired,
    onPageChange : PropTypes.func.isRequired,
    onRowsPerPageChange : PropTypes.func.isRequired
};

export default StockItemListSmDown;