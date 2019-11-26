import React from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/styles/withStyles';

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