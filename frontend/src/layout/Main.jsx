import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    root : {
        margin : '5vh 5vw'
    }
});

const Main = ({ children, classes }) => (
    <main className={classes.root}>
        { children }
    </main>
);

export default withStyles(styles)(Main);