import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import withStyles from '@mui/styles/withStyles';

const styles = theme => ({
    root : {
        [theme.breakpoints.down('md')] : {
            width : '100%',
            paddingTop : 8,
            paddingBottom : 8
        }
    },
    onlyIcon : {
        fontSize : '16pt',
        [theme.breakpoints.down('md')] : {
            width : '100%',
            paddingTop : 12,
            paddingBottom : 12
        }
    },
    text : {
        marginLeft : 10
    }
});

const ShoppingCartButton = ({
    onClick,
    onlyIcon = false,
    disabled = false,
    className,
    classes
}) => (
    onlyIcon ?
        <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onClick}
            className={className ? [classes.onlyIcon, className].join(' ') : classes.root}
            title="Vložit do košíku"
            disabled={disabled}>
            <FontAwesomeIcon icon={faShoppingCart} />
        </Button> :
        <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onClick}
            className={className ? [classes.root, className].join(' ') : classes.root}
            title="Vložit do košíku"
            disabled={disabled}>
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className={classes.text}>
                Vložit do košíku
            </span>
        </Button>
);

ShoppingCartButton.propTypes = {
    onClick : PropTypes.func.isRequired,
    onlyIcon : PropTypes.bool,
    disabled : PropTypes.bool
};

export default withStyles(styles)(ShoppingCartButton);