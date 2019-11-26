import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import withStyles from '@material-ui/styles/withStyles';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Router from 'next/router';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root : {},
    cartIcon : {
        marginRight : 10
    },
    btnWrapper : {
        [theme.breakpoints.down('sm')] : {
            textAlign : 'center',
            margin : '.5rem auto'
        }
    },
    shoppingCartBtnWrapper : {
        textAlign : 'right',
        [theme.breakpoints.down('sm')] : {
            textAlign : 'center',
            margin : '.5rem auto'
        }
    }
});

const ProductAddToCartSuccess = ({
    productName,
    onClose,
    classes
}) => {
    const handleGoToShoppingCart = () => {
        Router.push(`/public/shopping-cart`);
    };

    return (
        <Dialog
            open={true}
            onClose={onClose}
            className={classes.root}
            maxWidth='md'
            fullWidth
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography variant="body1">
                        Zboží "<strong>{productName}</strong>" bylo přidáno do nákupního košíku.
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Grid container>
                    <Grid item xs={12} sm={6} className={classes.btnWrapper}>
                        <Button variant="contained" color="primary" size="large" onClick={onClose}>
                            Pokračovat v nákupu
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.shoppingCartBtnWrapper}>
                        <Button variant="contained" color="primary" size="large" onClick={handleGoToShoppingCart}>
                            <FontAwesomeIcon icon={faShoppingCart} className={classes.cartIcon} />Přejít do košíku
                        </Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );

};

ProductAddToCartSuccess.propTypes = {
    productName : PropTypes.string.isRequired,
    onClose : PropTypes.func.isRequired
};

export default withStyles(styles)(ProductAddToCartSuccess);