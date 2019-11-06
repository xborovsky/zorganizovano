import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/styles/withStyles';

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