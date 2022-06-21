import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { todoItemListRowPropTypes } from '../../prop-types/todo-items.prop-types';
import TodoItemListRow from './TodoItemListRow';
import TodoItemsEmpty from './TodoItemsEmpty';

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
    }
});

const TodoItemsTable = ({ 
    items,
    onDeleteClick,
    onEditClick,
    onDetailClick
}) => {
    const classes = useStyles();
    const [ rowsPerPage, setRowsPerPage ] = useState(25);
    const [ page, setPage ] = useState(0);

    return (
        <Paper className={classes.root}>
            <Table className={classes.table} size="small">
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Priorita</TableCell>
                        <TableCell>Název</TableCell>
                        <TableCell>Vytvořeno</TableCell>
                        <TableCell>Poslední úprava</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { items.length == 0 && <TodoItemsEmpty /> }
                    { items.length > 0 && items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((todoItem, cnt) => (
                            <TodoItemListRow
                                item={todoItem}
                                rowNum={cnt + 1}
                                key={todoItem.id}
                                onEditClick={onEditClick}
                                onDetailClick={onDetailClick}
                                onDeleteClick={onDeleteClick}
                            />
                    )) }
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={items.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={setPage}
                onRowsPerPageChange={setRowsPerPage}
            />
        </Paper>
    );
};

TodoItemsTable.propTypes = {
    items : todoItemListRowPropTypes,
    onDeleteClick: PropTypes.func.isRequired,
    onDetailClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired
};

export default TodoItemsTable;