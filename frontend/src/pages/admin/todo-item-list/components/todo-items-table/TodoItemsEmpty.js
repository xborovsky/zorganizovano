import { TableCell, TableRow } from '@mui/material';
import React from 'react';

const TodoItemsEmpty = () => (
    <TableRow>
        <TableCell style={{ textAlign: 'center' }} colSpan={6}>zatím prázdno...</TableCell>
    </TableRow>
);

export default TodoItemsEmpty;