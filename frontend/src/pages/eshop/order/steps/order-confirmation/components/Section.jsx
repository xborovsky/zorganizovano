import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    subHeader : {
        marginTop : '2rem',
        marginBottom : '1.5rem',
        fontSize : '1.8rem'
    },
    padLeft : {
        marginLeft : '2rem'
    }
});

const Section = ({ title, children, className, classes }) => (
    <>
        { title && <Typography variant="h2" className={classes.subHeader}>{ title }</Typography> }
        <div className={className ? [classes.padLeft, className].join(' ') : classes.padLeft}>{ children }</div>
    </>
);

Section.propTypes = {
    title : PropTypes.string
};

export default withStyles(styles)(Section);