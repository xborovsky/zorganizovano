import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles, TableCell, TableRow, TextField } from '@material-ui/core';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import ErrorIcon from '@material-ui/icons/Error';

import Loader from '../../../../components/Loader';
import { StockItemContext } from './StockItemContext';

const useStyles = makeStyles(theme => ({
    icon : {
        verticalAlign : 'middle',
        marginLeft : 10
    },
    rowNum : {
        textAlign : 'center'
    }
}));

const StockItemSmDown = ({
    itemId,
    name,
    quantity,
    onSaveClick,
    onCancelClick,
    onQuantityChange
}) => {
    const classes = useStyles();
    const { showSaveCancel, showSaveProgress, error, showSuccess } = useContext(StockItemContext);

    return (
        <TableRow>
            <TableCell>
                <table>
                    <tbody>
                        <tr>
                            <td>{ name }</td>
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
        </TableRow>
    );
};

StockItemSmDown.propTypes = {
    itemId : PropTypes.number.isRequired,
    name : PropTypes.string.isRequired,
    quantity : PropTypes.number.isRequired,
    onSaveClick : PropTypes.func.isRequired,
    onCancelClick : PropTypes.func.isRequired,
    onQuantityChange : PropTypes.func.isRequired
};

export default StockItemSmDown;