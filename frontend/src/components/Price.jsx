import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';

const styles = theme => ({
    root : {
        color : '#000'
    }
});

const getFontSize = size => {
    switch (size) {
        case 'sm' : return 16;
        case 'normal' : return 26;
        case 'xl' : return 32;
        case 'inherit' : return 'inherit';
        default : return 26;
    }
};

const Price = ({ value, size = 'normal', classes, className }) => (
    <span className={className ? [classes.root, className].join(' ') : classes.root}
        style={{ fontSize : getFontSize(size) }}>
        {value},- Kč
    </span>
);

Price.propTypes = {
    value : PropTypes.number.isRequired,
    size : PropTypes.oneOf(['sm', 'normal', 'xl', 'inherit'])
};

export default withStyles(styles)(Price);