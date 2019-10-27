import React, { useContext, useState } from 'react';
import { Grid, withStyles, Button, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import ProductSpec from './ProductSpec';
import Price from '../../../../components/Price';
import { productShape } from '../product-prop-type';
import IdeaPrompt from '../../../../components/IdeaPrompt';
import ShoppingCartContext from '../../shopping-cart/state-management/ShoppingCartContext';
import { ADD_ITEM_TO_SHOPPING_CART } from '../../shopping-cart/state-management/ShoppingCartActions';
import Details from './Details';
import ProductGallery from './ProductGallery';
import ProductAddToCartSuccess from '../common/ProductAddToCartSuccess';

const styles = theme => ({
    root : {
        margin : 0,
        padding : '7vh 3rem'
    },
    alert : {
        marginBottom : '3rem'
    },
    shoppingCartIcon : {
        marginRight : 10
    },
    image : {
        width : '70%',
        marign : '0 auto'
    },
    priceWrapper : {
        textAlign : 'right'
    },
    shoppingCartWrapper : {
        textAlign : 'right'
    },
    ideaPromptWrapper : {
        marginTop : '3vh'
    },
    ideaPrompt : {
        width: '70%',
        margin : '0 auto',
        [theme.breakpoints.down('sm')] : {
            width : '100%'
        }
    },
    quantityWrapper: {
        textAlign : 'center'
    },
    quantity : {
        width : 100
    }
});

const ProductDetail = ({ product, classes }) => {
    const { dispatch } = useContext(ShoppingCartContext);
    const [ quantity, setQuantity ] = useState(1);
    const [ showSuccess, setShowSuccess ] = useState(undefined);

    const addItemToShoppingCart = item => {
        const shoppingCartItem = {
            ...(({ id, name, subName, price }) => ({ id, name, subName, price }))(item),
            quantity
        };
        dispatch({
            type : ADD_ITEM_TO_SHOPPING_CART,
            payload : shoppingCartItem
        });
        setShowSuccess({ productName : shoppingCartItem.name });
        setQuantity(1);
    };

    const handleChangeQuantity = event => {
        setQuantity(+event.currentTarget.value);
    };

    const handleSuccessClose = () => {
        setShowSuccess(undefined);
    };

    return (
        <Paper className={classes.root}>
            <Typography variant="h1">{ product.name }</Typography>
            <Typography variant="h2">{ product.subName }</Typography>
            <br />
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <ProductGallery productId={product.id} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <ProductSpec product={product} />
                    <Grid container alignItems="center">
                        <Grid item xs={12} className={classes.priceWrapper}>
                            <Price value={product.price} size="xl" />
                        </Grid>
                        <Grid item xs={12} sm={4} className={classes.quantityWrapper}>
                            <TextField
                                label="Počet kusů"
                                value={quantity}
                                onChange={handleChangeQuantity}
                                type="number"
                                className={classes.quantity}
                                inputProps={{
                                    min: 1,
                                    max: 5
                                }}
                                margin="none"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} className={classes.shoppingCartWrapper}>
                            <Button variant="contained" color="primary" onClick={() => addItemToShoppingCart(product)}>
                                <FontAwesomeIcon icon={faShoppingCart} className={classes.shoppingCartIcon} />Vložit do košíku
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Details product={product} />
                </Grid>
                <Grid item xs={12} className={classes.ideaPromptWrapper}>
                    <IdeaPrompt className={ classes.ideaPrompt } />
                </Grid>
            </Grid>

            { // TODO refaktoring HC???
                showSuccess &&
                    <ProductAddToCartSuccess
                        productName={showSuccess.productName}
                        onClose={handleSuccessClose}
                    />
            }
        </Paper>
    );
};

ProductDetail.propTypes = {
    product : productShape.isRequired
};

export default withStyles(styles)(ProductDetail);