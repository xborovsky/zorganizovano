import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Alert from 'components/Alert';

const useStyles = makeStyles(theme => ({
    root : {
        marginBottom : '1rem !important'
    }
}));

const FreeShippingAlert = () => {
    const classes = useStyles();

    return (
        <Alert type="info" className={classes.root}>!!! Při nákupu pouze roušek možnost doručení zdarma !!!</Alert>
    );
};

export default FreeShippingAlert;