import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root : {
        marginBottom : '3rem',
        [theme.breakpoints.down('sm')] : {
            marginBottom : '2rem',
            '&:last-child' : {
                marginBottom : 0
            }
        }
    },
    subHeader : {
        marginTop : '2rem',
        marginBottom : '1.5rem',
        fontSize : '1.8rem',
        [theme.breakpoints.down('sm')] : {
            marginTop : '1rem',
            marginBottom : '1rem',
            fontSize : '1.1rem'
        }
    },
    padLeft : {
        marginLeft : '2rem',
        [theme.breakpoints.down('sm')] : {
            marginLeft : 0
        }
    }
});

const Section = ({ title, children, className, classes }) => (
    <div className={classes.root}>
        { title && <Typography variant="h2" className={classes.subHeader}>{ title }</Typography> }
        <div className={className ? [classes.padLeft, className].join(' ') : classes.padLeft}>{ children }</div>
    </div>
);

Section.propTypes = {
    title : PropTypes.string
};

export default withStyles(styles)(Section);