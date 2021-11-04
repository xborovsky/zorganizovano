import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { CSVLink } from "react-csv";

import AuthDataFetcher from '../../../components/AuthDataFetcher';

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

const ProductsByYearDataTable = ({ year }) => {
    const classes = useStyles();

    return (
        <AuthDataFetcher queryId={['products-by-year-report', year]} url={`/admin/reports/products-by-year/${year}`}>
            { data => {
                const csvData = [['Položka', 'Počet prodaných kusů'], ...data.map(item => { return [item.itemName, item.quantity]; })];

                return (
                    <>
                        <Button
                            variant="contained"
                            color="primary" 
                            size="small"
                            style={{ marginLeft : 30, verticalAlign : 'bottom' }}>
                            <CSVLink 
                                data={csvData} 
                                style={{ color : 'white', textDecoration : 'none' }}
                                filename={`Počty prodaných kusů za rok ${year}.csv`}
                            >
                                Stáhnout report
                            </CSVLink>
                        </Button>
                        <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead className={classes.tableHead}>
                                    <TableRow>
                                        <TableCell>Položka</TableCell>
                                        <TableCell>Počet prodaných kusů</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { data.map(item => (
                                        <TableRow key={item.itemName}>
                                            <TableCell>{ item.itemName }</TableCell>
                                            <TableCell>{ item.quantity }</TableCell>
                                        </TableRow>
                                    )) }
                                </TableBody>
                            </Table>
                        </Paper>
                    </>
                )}}
        </AuthDataFetcher>
    );
};

ProductsByYearDataTable.propTypes = {
    year : PropTypes.number.isRequired
};

export default ProductsByYearDataTable;