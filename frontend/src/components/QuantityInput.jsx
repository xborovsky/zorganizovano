import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    input : {
        '&>div' : {
            height: 40
        },
        '&>div>input' : {
            color : '#000'
        },
        marginBottom: 0,
        [theme.breakpoints.down('lg')]: {
            flex: 1
        }
    },
    minusBtn : {
        cursor : 'pointer',
        paddingTop : 7,
        paddingBottom : 7,
        backgroundColor : '#ddd',
        width : '40px !important',
        minWidth : '40px !important',
        color: 'rgba(0, 0, 0, 0.87)',
        border: '1px solid rgba(0, 0, 0, 0.23)',
        '&:hover': {
            color: 'rgba(0, 0, 0, 0.87)',
            border: '1px solid rgba(0, 0, 0, 0.23)',
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
        }
    },
    plusBtn : {
        cursor : 'pointer',
        paddingTop : 7,
        paddingBottom : 7,
        backgroundColor : '#ddd',
        width : '40px !important',
        minWidth : '40px !important',
        color: 'rgba(0, 0, 0, 0.87)',
        border: '1px solid rgba(0, 0, 0, 0.23)',
        '&:hover': {
            color: 'rgba(0, 0, 0, 0.87)',
            border: '1px solid rgba(0, 0, 0, 0.23)',
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
        }
    },
    wrapper : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('lg')]: {
            marginBottom: '.2rem',
            justifyContent: 'stretch',
            width: '100%'
        },
    }
}));

const QuantityInput = ({
    value,
    onChange,
    maxVal,
    className,
    ...rest
}) => {
    const inputRef = useRef();
    const classes = useStyles();

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
        <div className={classes.wrapper}>
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
        </div>
    );
};

QuantityInput.propTypes = {
    value : PropTypes.number.isRequired,
    onChange : PropTypes.func.isRequired,
    maxVal : PropTypes.number.isRequired
};

export default QuantityInput;