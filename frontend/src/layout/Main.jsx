import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    root : {
        margin : '2vh 5vw 5vh',
        [theme.breakpoints.down('xs')] : {
            margin : '0 4vw'
        }
    }
});

const Main = ({ children, classes }) => (
    <main className={classes.root}>
        { children }
    </main>
);

export default withStyles(styles)(Main);