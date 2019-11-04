import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    root : {
        color : 'red',
        fontSize : '11pt'
    }
});

const QuantityError = ({ classes }) => (
    <Typography className={classes.root} component="p">Zadaný počet kusů není validní.</Typography>
);

export default withStyles(styles)(QuantityError);