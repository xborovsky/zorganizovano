import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';

const styles = theme => ({
    img : {
        width : '90%',
        '&:hover' : {
            transform: 'scale(1.1)'
        }
    }
});

const LinkButton = ({ classes, src, alt, srcSet }) => (
    <img src={src} srcSet={srcSet} className={classes.img} alt={alt} />
);

LinkButton.propTypes = {
    src : PropTypes.string.isRequired,
    srcSet : PropTypes.string.isRequired,
    alt : PropTypes.string.isRequired
};

export default withStyles(styles)(LinkButton);