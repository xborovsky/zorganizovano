import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/styles/withStyles';
import Router from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const styles = theme => ({
    root : {
        marginTop : '0.5rem',
        [theme.breakpoints.down('sm')] : {
            marginTop : 0
        }
    },
    right : {
        textAlign : 'right',
        [theme.breakpoints.up('md')] : {
            '&>button' : {
                marginLeft : '0.5rem'
            }
        }
    },
    trashIcon : {
        marginRight : 5
    },
    btn : {
        [theme.breakpoints.down('sm')] : {
            width : '100%',
            marginBottom : '0.5rem'
        }
    }
});

const Actions = ({
    classes,
    disableProceedToOrder = false,
    onEmptyShoppingCart,
    onGoToOrder
}) => {
    const goToEshopMain = () => {
        Router.push(`/public/products`);
    };

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} md={6}>
                <Button variant="contained" color="primary" onClick={goToEshopMain} className={classes.btn}>
                    Pokračovat v nákupu
                </Button>
            </Grid>
            <Grid item xs={12} md={6} className={classes.right}>
                <Button variant="contained" color="primary" onClick={onEmptyShoppingCart} disabled={disableProceedToOrder} className={classes.btn}>
                    <FontAwesomeIcon icon={faTrashAlt} className={classes.trashIcon} /> Vyprázdnit košík
                </Button>
                <Button variant="contained" color="primary" onClick={onGoToOrder} disabled={disableProceedToOrder} className={classes.btn}>
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