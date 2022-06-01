import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import { format, parseISO } from 'date-fns';
import ReactHtmlParser from 'react-html-parser';

import { DATE_TIME_FORMAT } from 'util/date-format-util';
import { todoItemDetailPropTypes } from '../../prop-types/todo-items.prop-types';
import PriorityIcon from '../todo-items-table/PriorityIcon';

const useStyles = makeStyles({
    root : {
        marginTop : 10
    },
    th : {
        fontWeight : 'bold',
        verticalAlign : 'top'
    }
});

const TodoItemDetail = ({ item }) => {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <Paper >
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className={classes.th} width={`20%`}>Název:</TableCell>
                            <TableCell>{item.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.th}>Popis:</TableCell>
                            <TableCell>{ReactHtmlParser(item.description.replace('\n', '<br />'))}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.th}>Priorita:</TableCell>
                            <TableCell><PriorityIcon priority={item.priority} /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.th}>Vytvořeno:</TableCell>
                            <TableCell>{format(parseISO(item.created), DATE_TIME_FORMAT)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.th}>Poslední úprava:</TableCell>
                            <TableCell>{format(parseISO(item.updated), DATE_TIME_FORMAT)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
};

TodoItemDetail.propTypes = {
    item : todoItemDetailPropTypes
};

export default TodoItemDetail;