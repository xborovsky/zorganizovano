import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const QuantityInput = ({
    value,
    onChange,
    maxVal,
    className
}) => (
    <TextField
        value={value}
        onChange={onChange}
        type="number"
        className={className}
        InputLabelProps={{ shrink: true }}
        margin="dense"
        variant="outlined"
        InputProps={{
            endAdornment: <InputAdornment position="end">ks</InputAdornment>,
            inputProps: { min : 1, max: maxVal }
        }}
    />
);

QuantityInput.propTypes = {
    value : PropTypes.number.isRequired,
    onChange : PropTypes.func.isRequired,
    maxVal : PropTypes.number.isRequired
};

export default QuantityInput;