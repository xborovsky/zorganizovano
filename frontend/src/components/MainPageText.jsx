import React from 'react';
import withStyles from '@mui/styles/withStyles';

const styles = theme => ({
    root : {
        textAlign : 'justify',
        marginBottom : '2rem',
        '&>p' : {
            marginBottom : '1rem'
        }
    }
});

const MainPageText = ({classes, children}) => (
    <div className={classes.root}>
        { children }
    </div>
);

export default withStyles(styles)(MainPageText);