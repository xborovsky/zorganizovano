import React, { useState } from 'react';
import { Button, CircularProgress, Grid, makeStyles, TextField } from '@material-ui/core';
import axios from 'axios';

import useShoppingCartContext from '../../../../shopping-cart/state-management/use-shopping-cart-context';

const useStyles = makeStyles((theme) => ({
    root : {
        marginBottom : '1.5rem'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    button : {
        marginTop : theme.spacing(1)
    }
  }));

const DiscountCodeSetup = () => {
    const classes = useStyles();
    const { setDiscountCode:setSessionDiscountCode } = useShoppingCartContext();
    const [ discountCode, setDiscountCode ] = useState('');
    const [ isProgress, setProgress ] = useState(false);
    const [ error, setError ] = useState(undefined);
    const [ success, setSuccess ] = useState(undefined);

    const handleChange = e => setDiscountCode(e.currentTarget.value);

    const handleCheckCodeClick = () => {
        setProgress(true);
        setError(undefined);
        setSuccess(undefined);

        axios.post('/discount-code', { code : discountCode })
            .then(res => {
                setSessionDiscountCode({
                    code : res.data.code,
                    discount : res.data.discount,
                    percentage : res.data.percentage
                });
                setDiscountCode('');
                setProgress(false);
                setSuccess('Slevový kód úspěšně přidán.');
            })
            .catch(err => {
                console.error(err);
                setError(err.response.status === 404 ? 'Slevový kód není platný.' : 'Chyba komunikace se serverem.');
                setProgress(false);
            });
    };

    const handleKeyDown = e => {
        if ((e.charCode || e.keyCode) === 13) {
            handleCheckCodeClick();
        }
    };
    
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} style={{ textAlign : 'right' }}>
                <TextField
                    label="Slevový kód"
                    className={classes.textField}
                    margin="dense"
                    variant="outlined"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    value={discountCode}
                    inputProps={{
                        maxLength : 20
                    }}
                    error={!!error}
                    helperText={error || success || undefined}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleCheckCodeClick} 
                    className={classes.button}
                    disabled={isProgress || discountCode.trim().length === 0}
                >
                    { isProgress ?
                        <CircularProgress size={25} /> :
                        <>Uplatnit</>
                    }
                </Button>
            </Grid>
        </Grid>
    );
};

export default DiscountCodeSetup;