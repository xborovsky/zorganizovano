import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import withStyles from '@mui/styles/withStyles';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const styles = theme => ({
    root : {},
    cartIcon : {
        marginRight : 10
    },
    btnWrapper : {
        [theme.breakpoints.down('md')] : {
            textAlign : 'center',
            margin : '.5rem auto'
        }
    },
    shoppingCartBtnWrapper : {
        textAlign : 'right',
        [theme.breakpoints.down('md')] : {
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

    const history = useHistory();

    const handleGoToShoppingCart = () => {
        history.push(`/shopping-cart`);
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