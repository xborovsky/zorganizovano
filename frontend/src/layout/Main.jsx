import React from 'react';
import withStyles from '@material-ui/styles/withStyles';

const styles = theme => ({
    root : {
        margin : '2vh 5vw 5vh',
        position : 'relative',
        [theme.breakpoints.down('sm')] : {
            margin : '1vh 3vw 2vh'
        },
        [theme.breakpoints.down('xs')] : {
            margin : '0 3vw 2vh'
        }
    }
});

const Main = ({ children, classes }) => (
    <main className={classes.root}>
        { children }
    </main>
);

export default withStyles(styles)(Main);