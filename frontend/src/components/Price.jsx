import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';

const styles = theme => ({
    root : {
        color : '#030'
    }
});

const getFontSize = size => {
    switch (size) {
        case 'normal' : return 26;
        case 'xl' : return 32;
        default : return 26;
    }
};

const Price = ({ value, size = 'normal', classes }) => (
    <span className={classes.root} style={{ fontSize : getFontSize(size) }}>{value},- Kč</span>
);

Price.propTypes = {
    value : PropTypes.number.isRequired,
    size : PropTypes.oneOf('normal', 'xl')
};

export default withStyles(styles)(Price);