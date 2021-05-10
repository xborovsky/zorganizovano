import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

const StockItemDetailsTable = ({ details }) => (
    <TableContainer component={Paper}>
        <Table>
            <TableHead style={{ backgroundColor : '#e8e8e8' }}>
                <TableRow>
                    <TableCell width="40%">Klíč</TableCell>
                    <TableCell width="40%">Hodnota</TableCell>
                    <TableCell width="20%">Priorita řazení</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { details?.length > 0 ?
                    details.map(detail =>
                        <TableRow>
                            <TableCell>{ detail.key }</TableCell>
                            <TableCell>{ detail.value }</TableCell>
                            <TableCell>{ detail.priorityOrder }</TableCell>
                        </TableRow>
                    ) :
                    <TableRow>
                        <TableCell style={{ textAlign : 'center' }} colSpan={3}>nic zde není...</TableCell>
                    </TableRow>
                }
            </TableBody>
        </Table>
    </TableContainer>
);

StockItemDetailsTable.propTypes = {
    details : PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.number.isRequired,
        key : PropTypes.string.isRequired,
        value : PropTypes.any.isRequired,
        priorityOrder : PropTypes.number.isRequired
    })).isRequired
};

export default StockItemDetailsTable;