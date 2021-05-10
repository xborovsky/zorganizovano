import React from 'react';
import PropTypes from 'prop-types';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const StockItemDetailsForm = ({ 
    details = [], 
    onChange,
    onDeleteClick,
    onAddClick
}) => (
    <TableContainer component={Paper} style={{ border : '1px solid #ccc' }}>
        <Table>
            <TableHead style={{ backgroundColor : '#e8e8e8' }}>
                <TableRow>
                    <TableCell width="5%"></TableCell>
                    <TableCell width="35%">Klíč</TableCell>
                    <TableCell width="35%">Hodnota</TableCell>
                    <TableCell width="20%">Priorita řazení</TableCell>
                    <TableCell width="5%"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { details.map((detail, cnt) =>
                    <TableRow key={cnt}>
                        <TableCell>{ cnt + 1 }</TableCell>
                        <TableCell>
                            <TextField
                                id={`detail-key-${cnt}`}
                                name={`detail-key-${cnt}`}
                                label="Klíč"
                                value={detail.key}
                                margin="normal"
                                fullWidth
                                onChange={e => onChange(cnt, 'key', e.target.value)}
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                id={`detail-value-${cnt}`}
                                name={`detail-value-${cnt}`}
                                label="Hodnota"
                                value={detail.value}
                                margin="normal"
                                fullWidth
                                onChange={e => onChange(cnt, 'value', e.target.value)}
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                id={`detail-priorityOrder-${cnt}`}
                                name={`detail-priorityOrder-${cnt}`}
                                label="Priorita řazení"
                                type="number"
                                value={detail.priorityOrder}
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    inputProps : {
                                        min : 0
                                    }
                                }}
                                onChange={e => onChange(cnt, 'priorityOrder', e.target.value)}
                            />
                        </TableCell>
                        <TableCell><CancelIcon style={{ color : 'red', cursor : 'pointer' }} onClick={e => onDeleteClick(cnt)} /></TableCell>
                    </TableRow>
                )}
                <TableRow>
                    <TableCell colSpan={4}>
                        <Button onClick={onAddClick} color="primary" variant="contained" onClick={onAddClick}>
                            <AddCircleIcon />&nbsp;&nbsp;Přidat
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
);

StockItemDetailsForm.propTypes = {
    details : PropTypes.arrayOf(PropTypes.shape({
        key : PropTypes.string.isRequired,
        value : PropTypes.string.isRequired,
        priorityOrder : PropTypes.number.isRequired
    })),
    onDeleteClick : PropTypes.func.isRequired,
    onAddClick : PropTypes.func.isRequired,
    onChange : PropTypes.func.isRequired
};

export default StockItemDetailsForm;