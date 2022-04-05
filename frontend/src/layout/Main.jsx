import React from 'react';
import withStyles from '@mui/styles/withStyles';

const styles = theme => ({
    root : {
        margin : '6vh 5vw 5vh',
        position : 'relative',
        [theme.breakpoints.down('md')] : {
            margin : '4vh 3vw 2vh'
        },
        [theme.breakpoints.down('sm')] : {
            margin : '3vh 3vw 2vh'
        }
    }
});

const Main = ({ children, classes }) => (
    <main className={classes.root}>
        { children }
    </main>
);

export default withStyles(styles)(Main);