import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    input : {
        '&>div>input' : {
            color : '#000'
        },
        flex : 1
    },
    minusBtn : {
        cursor : 'pointer',
        paddingTop : 7,
        paddingBottom : 7,
        backgroundColor : '#ddd',
        width : '40px !important',
        minWidth : '40px !important'
    },
    plusBtn : {
        cursor : 'pointer',
        paddingTop : 7,
        paddingBottom : 7,
        backgroundColor : '#ddd',
        width : '40px !important',
        minWidth : '40px !important'
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
    const inputRef = useRef();

    useEffect(() => {
        if (inputRef?.current) {
            const foundByClassArr = inputRef.current.getElementsByClassName("PrivateNotchedOutline-legend-60");
            if (foundByClassArr.length > 0) {
                const foundSpanArr = foundByClassArr[0].getElementsByTagName("span");
                if (foundSpanArr.length > 0) {
                    const foundSpan = foundSpanArr[0];
                    foundSpan.innerHTML = '&nbsp;';
                }
            }
        }
    }, [inputRef]);

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
            <Button onClick={handleMinus} variant="outlined" className={classes.minusBtn} disabled={value === 1}>-</Button>
            <TextField
                value={value}
                onChange={onChange}
                type="number"
                label=""
                className={`${classes.input} ${className || ''}`}
                margin="dense"
                variant="outlined"
                ref={inputRef}
                InputProps={{
                    endAdornment: <InputAdornment position="end">ks</InputAdornment>,
                    inputProps: { min : 1, max: maxVal },
                    readOnly: true
                }}
                style={{ marginTop : 0, minWidth : 100 }}
                disabled
                autoComplete="off"
                {...rest}
            />
            <Button onClick={handlePlus} variant="outlined" className={classes.plusBtn} disabled={value >= maxVal}>+</Button>
        </>
    );
};

QuantityInput.propTypes = {
    value : PropTypes.number.isRequired,
    onChange : PropTypes.func.isRequired,
    maxVal : PropTypes.number.isRequired
};

export default withStyles(styles)(QuantityInput);