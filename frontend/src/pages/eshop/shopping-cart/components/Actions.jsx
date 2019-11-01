import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const styles = theme => ({
    root : {
        marginTop : '0.5rem'
    },
    right : {
        textAlign : 'right'
    },
    trashIcon : {
        marginRight : 5
    }
});

const Actions = ({
    classes,
    disableProceedToOrder = false,
    onEmptyShoppingCart,
    onGoToOrder
}) => {
    const history = useHistory();

    const goToEshopMain = () => {
        history.push(`/eshop`);
    };

    return (
        <Grid container className={classes.root}>
            <Grid item xs={6}>
                <Button variant="contained" color="primary" onClick={goToEshopMain}>
                    Pokračovat v nákupu
                </Button>
            </Grid>
            <Grid item xs={6} className={classes.right}>
                <Button variant="contained" color="primary" onClick={onEmptyShoppingCart} disabled={disableProceedToOrder}>
                    <FontAwesomeIcon icon={faTrashAlt} className={classes.trashIcon} /> Vyprázdnit košík
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button variant="contained" color="primary" onClick={onGoToOrder} disabled={disableProceedToOrder}>
                    Přejít k objednávce
                </Button>
            </Grid>
        </Grid>
    );
};

Actions.propsTypes = {
    disableProceedToOrder : PropTypes.bool,
    onEmptyShoppingCart : PropTypes.func.isRequired,
    onGoToOrder : PropTypes.func.isRequired
};

export default withStyles(styles)(Actions);