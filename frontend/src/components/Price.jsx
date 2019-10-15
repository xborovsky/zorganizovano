import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';

const styles = theme => ({
    root : {
        fontSize : 32,
        color : '#030'
    }
});

const Price = ({ value, classes }) => (
    <span className={classes.root}>{value},- Kč</span>
);

Price.propTypes = {
    value : PropTypes.number.isRequired
};

export default withStyles(styles)(Price);