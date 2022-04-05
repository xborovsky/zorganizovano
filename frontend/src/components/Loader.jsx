import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import withStyles from '@mui/styles/withStyles';

const styles = theme => ({
    root : {
        width : '100%',
        textAlign : 'center'
    }
});

const Loader = ({ classes }) =>
    <div className={classes.root}>
        <CircularProgress />
    </div>
;

export default withStyles(styles)(Loader);