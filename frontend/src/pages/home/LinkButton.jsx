import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    img : {
        width : '90%',
        '&:hover' : {
            transform: 'scale(1.2)'
        }
    }
});

const LinkButton = ({ classes, src, srcSet }) => (
    <img src={src} srcSet={srcSet} className={classes.img} />
);

LinkButton.propTypes = {
    src : PropTypes.string.isRequired,
    srcSet : PropTypes.string.isRequired
};

export default withStyles(styles)(LinkButton);