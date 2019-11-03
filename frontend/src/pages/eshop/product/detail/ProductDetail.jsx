import React, { useContext, useState } from 'react';
import { Grid, withStyles, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

import ProductSpec from './ProductSpec';
import Price from '../../../../components/Price';
import { productShape } from '../product-prop-type';
import IdeaPrompt from '../../../../components/IdeaPrompt';
import ShoppingCartContext from '../../shopping-cart/state-management/ShoppingCartContext';
import { ADD_ITEM_TO_SHOPPING_CART } from '../../shopping-cart/state-management/ShoppingCartActions';
import Details from './Details';
import ProductGallery from './ProductGallery';
import ProductAddToCartSuccess from '../common/ProductAddToCartSuccess';
import ShoppingCartButton from 'components/ShoppingCartButton';
import QuantityInput from 'components/QuantityInput';

const styles = theme => ({
    root : {
        margin : 0,
        padding : '7vh 3rem',
        [theme.breakpoints.down('sm')] : {
            padding : '3vh 2rem'
        },
        [theme.breakpoints.down('xs')] : {
            padding : '2vh 1rem'
        }
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
        alignItems : 'center',
        display : 'flex',
        justifyContent : 'flex-end'
    },
    quantityInput : {
        marginRight : 20
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
    }
});

const ProductDetail = ({ product, classes }) => {
    const { dispatch } = useContext(ShoppingCartContext);
    const [ quantity, setQuantity ] = useState(1);
    const [ showSuccess, setShowSuccess ] = useState(undefined);

    const addItemToShoppingCart = item => {
        const shoppingCartItem = {
            id : item.id,
            price : item.price,
            quantity
        };
        dispatch({
            type : ADD_ITEM_TO_SHOPPING_CART,
            payload : shoppingCartItem
        });
        setShowSuccess({ productName : item.name });
        setQuantity(1);
    };

    const handleChangeQuantity = event => {
        setQuantity(+event.currentTarget.value);
    };

    const handleSuccessClose = () => {
        setShowSuccess(undefined);
    };

    const getQuantityInput = tooltiped => {
        return tooltiped && product.stockQuantity > 0 ?
            <Tooltip title={`Do košíku je možno vložit pouze ${product.stockQuantity} kus${product.stockQuantity === 1 ? '' : product.stockQuantity > 4 ? 'ů' : 'y'}. Pro více kusů mě prosím kontaktujte, určitě se domluvíme.`}>
                <QuantityInput
                    value={quantity}
                    onChange={handleChangeQuantity}
                    maxVal={product.stockQuantity}
                    className={classes.quantityInput}
                />
            </Tooltip> :
            <QuantityInput
                value={quantity}
                onChange={handleChangeQuantity}
                maxVal={product.stockQuantity}
                className={classes.quantityInput}
            />
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
                        <Grid item xs={12} className={classes.shoppingCartWrapper}>
                            { getQuantityInput(product.stockQuantity > 0) }
                            <ShoppingCartButton
                                onClick={() => addItemToShoppingCart(product)}
                            />
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