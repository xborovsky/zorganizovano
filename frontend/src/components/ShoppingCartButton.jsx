import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import withStyles from '@material-ui/styles/withStyles';
import Hidden from '@material-ui/core/Hidden';

const styles = theme => ({
    root : {
        [theme.breakpoints.down('xs')] : {
            width : '100%',
            paddingTop : 12,
            paddingBottom : 12
        }
    },
    onlyIcon : {
        fontSize : '16pt',
        [theme.breakpoints.down('xs')] : {
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
    classes
}) => (
    onlyIcon ?
        <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onClick}
            className={classes.onlyIcon}
            title="Vložit do košíku"
            disabled={disabled}>
            <FontAwesomeIcon icon={faShoppingCart} />
        </Button> :
        <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onClick}
            className={classes.root}
            title="Vložit do košíku"
            disabled={disabled}>
            <FontAwesomeIcon icon={faShoppingCart} />
            <Hidden smDown>
                { !onlyIcon &&
                    <span className={classes.text}>
                        Vložit do košíku
                    </span>
                }
            </Hidden>
        </Button>
);

ShoppingCartButton.propTypes = {
    onClick : PropTypes.func.isRequired,
    onlyIcon : PropTypes.bool,
    disabled : PropTypes.bool
};

export default withStyles(styles)(ShoppingCartButton);