import React from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const StockItemPicturesForm = ({ 
    pictures = [],
    onDeleteClick,
    onAddClick,
    onChange
}) => (
    <TableContainer component={Paper} style={{ border : '1px solid #ccc' }}>
        <Table>
            <TableHead style={{ backgroundColor : '#e8e8e8' }}>
                <TableRow>
                    <TableCell width="5%"></TableCell>
                    <TableCell width="85%">Název</TableCell>
                    <TableCell width="5%">Hlavní</TableCell>
                    <TableCell width="5%"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { pictures.map((picture, cnt) =>
                    <TableRow key={cnt}>
                        <TableCell>{ cnt + 1 }</TableCell>
                        <TableCell>
                            <TextField
                                id={`picture-src-${cnt}`}
                                name={`picture-src-${cnt}`}
                                label="Název"
                                value={picture.src}
                                margin="normal"
                                fullWidth
                                onChange={e => onChange(cnt, 'src', e.target.value)}
                            />
                        </TableCell>
                        <TableCell>
                            <Checkbox
                                checked={picture.main}
                                name={`picture-main-${cnt}`}
                                color="primary"
                                onChange={e => onChange(cnt, 'main', e.target.checked)}
                            />
                        </TableCell>
                        <TableCell><CancelIcon style={{ color : 'red', cursor : 'pointer' }} onClick={e => onDeleteClick(cnt)} /></TableCell>
                    </TableRow>
                    )
                }
                <TableRow>
                    <TableCell colSpan={4}>
                        <Button onClick={onAddClick} color="primary" variant="contained">
                            <AddCircleIcon />&nbsp;&nbsp;Přidat
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
);

StockItemPicturesForm.propTypes = {
    pictures : PropTypes.arrayOf(PropTypes.shape({
        src : PropTypes.string.isRequired
    })),
    onDeleteClick : PropTypes.func.isRequired,
    onAddClick : PropTypes.func.isRequired,
    onChange : PropTypes.func.isRequired
};

export default StockItemPicturesForm;