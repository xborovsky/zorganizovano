import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    input : {
        '&>div>input' : {
            color : '#000'
        }
    },
    minusBtn : {
        marginRight : 5,
        cursor : 'pointer',
        marginTop : 4
    },
    plusBtn : {
        marginLeft : 5,
        cursor : 'pointer',
        marginTop : 4
    }
});

const QuantityInput = ({
    value,
    onChange,
    maxVal,
    className,
    classes,
    ...rest
}) => {
    
    const handlePlus = () => {
        if (value + 1 > maxVal) {
            return false;
        }
        onChange(++value);
    };

    const handleMinus = () => {
        if (value - 1 < 1) {
            return false;
        }
        onChange(--value);
    };

    return (
        <>
            <Button onClick={handleMinus} variant="contained" className={classes.minusBtn}>-</Button>
            <TextField
                value={value}
                onChange={onChange}
                type="number"
                className={`${classes.input} ${className || ''}`}
                InputLabelProps={{ shrink: true }}
                margin="dense"
                variant="outlined"
                InputProps={{
                    endAdornment: <InputAdornment position="end">ks</InputAdornment>,
                    inputProps: { min : 1, max: maxVal }
                }}
                style={{ marginTop : 4, minWidth : 100 }}
                disabled
                {...rest}
            />
            <Button onClick={handlePlus} variant="contained" className={classes.plusBtn}>+</Button>
        </>
    );
};

QuantityInput.propTypes = {
    value : PropTypes.number.isRequired,
    onChange : PropTypes.func.isRequired,
    maxVal : PropTypes.number.isRequired
};

export default withStyles(styles)(QuantityInput);