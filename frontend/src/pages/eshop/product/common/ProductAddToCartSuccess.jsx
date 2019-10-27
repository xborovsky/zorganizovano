import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import withStyles from '@material-ui/styles/withStyles';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { productShape } from '../product-prop-type';

const styles = theme => ({
    root : {},
    cartIcon : {
        marginRight : 10
    },
    shoppingCartBtnWrapper : {
        textAlign : 'right'
    }
});

const ProductAddToCartSuccess = ({
    product,
    onClose,
    classes
}) => {

    const history = useHistory();

    const handleGoToShoppingCart = () => {
        history.push(`/eshop/shopping-cart`);
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
                        Zboží bylo přidáno do nákupního košíku.
                    </Typography>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
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
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );

};

ProductAddToCartSuccess.propTypes = {
    product: productShape,
    onClose : PropTypes.func.isRequired
};

export default withStyles(styles)(ProductAddToCartSuccess);