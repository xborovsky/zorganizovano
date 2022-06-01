import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { DATE_TIME_FORMAT } from 'util/date-format-util';
import { TableCell, TableRow } from '@mui/material';
import { todoItemListItemPropTypes } from '../../prop-types/todo-items.prop-types';
import PriorityIcon from './PriorityIcon';

const TodoItemListRow = ({
    rowNum,
    item,
    onDetailClick,
    onDeleteClick,
    onEditClick
}) => {
    const handleRowClick = e => {
        if (['TR', 'TD'].includes(e.target.tagName)) {
            onDetailClick(item.id);
        }
    };

    return (
        <TableRow onClick={handleRowClick} style={{ cursor : 'pointer' }}>
            <TableCell>{rowNum}</TableCell>
            <TableCell><PriorityIcon priority={item.priority} /></TableCell>
            <TableCell>{item.name} <br /> {item.descriptionShort}</TableCell>
            <TableCell>{format(new Date(item.created), DATE_TIME_FORMAT)}</TableCell>
            <TableCell>{format(new Date(item.updated), DATE_TIME_FORMAT)}</TableCell>
            <TableCell width='15%' style={{ textAlign : 'right' }}>
                <EditIcon
                    style={{ cursor : 'pointer' }}
                    title="Editovat"
                    onClick={onEditClick(item.id)}    
                />
                &nbsp;
                <DeleteIcon
                    style={{ cursor : 'pointer' }}
                    title="Smazat"
                    onClick={onDeleteClick(item.id, item.name)}
                />
            </TableCell>
        </TableRow>
    );
};

TodoItemListRow.propTypes = {
    rowNum : PropTypes.number.isRequired,
    item : todoItemListItemPropTypes,
    onDetailClick : PropTypes.func.isRequired,
    onDeleteClick : PropTypes.func.isRequired,
    onEditClick : PropTypes.func.isRequired
};

export default TodoItemListRow;