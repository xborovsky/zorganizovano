import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, TableCell, TableRow, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorIcon from '@mui/icons-material/Error';
import EditIcon from '@mui/icons-material/Edit';

import Loader from '../../../../components/Loader';
import { StockItemContext } from './StockItemContext';

const useStyles = makeStyles(theme => ({
    icon : {
        verticalAlign : 'middle',
        marginLeft : 10
    },
    rowNum : {
        textAlign : 'center'
    },
    link : {
        color : '#0000EE',
        textDecoration : 'underline',
        cursor : 'pointer'
    }
}));

const StockItemSmDown = ({
    itemId,
    name,
    quantity,
    onSaveClick,
    onCancelClick,
    onQuantityChange,
    onEditClick,
    onDetailClick
}) => {
    const classes = useStyles();
    const { showSaveCancel, showSaveProgress, error, showSuccess } = useContext(StockItemContext);

    return (
        <TableRow>
            <TableCell width="95%">
                <table>
                    <tbody>
                        <tr>
                            <td><span className={classes.link} onClick={onDetailClick}>{ name }</span></td>
                        </tr>
                        <tr>
                            <td>
                                <TextField
                                    label=""
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    value={quantity}
                                    onChange={onQuantityChange}
                                    size="small"
                                    InputProps={{
                                        inputProps: {  min: 0 }
                                    }}
                                />
                                <br />
                                { showSaveCancel &&
                                    <div style={{ marginLeft : 20, display : 'inline' }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            onClick={onSaveClick}
                                            title="Uložit">
                                            { showSaveProgress ? <Loader /> : <>Uložit</> }
                                        </Button>
                                        <Button onClick={onCancelClick} color="primary" disabled={showSaveProgress}>
                                            <strong>Zrušit</strong>
                                        </Button>
                                    </div>
                                }
                                { error && 
                                    <ErrorIcon 
                                        className={classes.icon} 
                                        style={{ color : 'red' }} 
                                        titleAccess={error}
                                    /> 
                                }
                                { showSuccess && 
                                    <CheckCircleRoundedIcon 
                                        className={classes.icon} 
                                        style={{ color : 'green' }} 
                                        titleAccess='Úspěšně uloženo'
                                    /> 
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
                <hr />
            </TableCell>
            <TableCell width="5%">
                <EditIcon 
                    style={{ cursor : 'pointer' }}
                    title="Editovat"
                    onClick={onEditClick}    
                />
            </TableCell>
        </TableRow>
    );
};

StockItemSmDown.propTypes = {
    itemId : PropTypes.number.isRequired,
    name : PropTypes.string.isRequired,
    quantity : PropTypes.number.isRequired,
    onSaveClick : PropTypes.func.isRequired,
    onCancelClick : PropTypes.func.isRequired,
    onQuantityChange : PropTypes.func.isRequired,
    onEditClick : PropTypes.func.isRequired,
    onDetailClick : PropTypes.func.isRequired
};

export default StockItemSmDown;