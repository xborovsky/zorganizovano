import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
  });

const OrdersTable = ({ data }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell>Číslo objednávky</TableCell>
                        <TableCell>Datum přijetí</TableCell>
                        <TableCell>Celková cena</TableCell>
                        <TableCell>Zpracováno</TableCell>
                        <TableCell>Expedováno</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={7}>TODO</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
};

OrdersTable.propTypes = {}; // TODO

export default OrdersTable;