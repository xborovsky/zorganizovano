import React, { useContext, useState } from 'react';
import Grid from '@material-ui/core/grid';
import withStyles from '@material-ui/styles/withStyles';
import withWidth from '@material-ui/core/withWidth';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

import ProductSpec from './ProductSpec';
import Price from '../../../../../components/Price';
import { productDetailShape } from '../product-prop-type';
import IdeaPrompt from '../../../../../components/IdeaPrompt';
import ShoppingCartContext from '../../shopping-cart/state-management/ShoppingCartContext';
import { ADD_ITEM_TO_SHOPPING_CART } from '../../shopping-cart/state-management/ShoppingCartActions';
import Details from './Details';
import ProductGallery from './ProductGallery';
import ProductAddToCartSuccess from '../common/ProductAddToCartSuccess';
import ShoppingCartButton from 'components/ShoppingCartButton';
import QuantityInput from 'components/QuantityInput';
import ProductStockQuantity from '../common/ProductStockQuantity';

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
        justifyContent : 'flex-end',
        marginBottom : '.5rem'
    },
    shoppingCartButton : {
        flex : 1
    },
    quantityInput : {
        marginTop : '4px !important'
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
    productText : {
        padding : '0 1rem 2rem',
        display : 'flex',
        flexDirection : 'column',
        [theme.breakpoints.down('xs')] : {
            padding : '0 .6rem .5rem',
        }
    }
});

const ProductDetail = ({ product, classes, width }) => {
    const { state, dispatch } = useContext(ShoppingCartContext);
    const [ quantity, setQuantity ] = useState(1);
    const [ showSuccess, setShowSuccess ] = useState(undefined);
    const productQuantityInCart = (state.find(cartItem => cartItem.id === product.id) || {}).quantity || 0;
    const stockQuantityLeft = product.stockQuantity - productQuantityInCart;

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

    const handleChangeQuantity = newValue => {
        if (newValue <= 0 || newValue > stockQuantityLeft) {
            return false;
        }
        setQuantity(newValue);
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
            <Typography variant="h1">{ product.name.toUpperCase() }</Typography>
            <Typography variant="h2">{ product.subName }</Typography>
            <br />
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <ProductGallery productId={product.id} />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.productText}>
                    <ProductSpec product={product} />
                    <Grid container alignItems="center" style={{ marginTop : 'auto' }} spacing={['xs', 'sm'].indexOf(width) !== -1 ? 0 : 1}>
                        <Grid item xs={6}>
                            <ProductStockQuantity stockQuantityLeft={stockQuantityLeft} />
                        </Grid>
                        <Grid item xs={6} className={classes.priceWrapper}>
                            <Price value={product.price} size="xl" />
                        </Grid>
                        <Grid item xs={12} md={6} className={classes.shoppingCartWrapper}>
                            { getQuantityInput(product.stockQuantity > 0) }
                        </Grid>
                        <Grid item xs={12} md={6} className={classes.shoppingCartWrapper}>
                            <ShoppingCartButton
                                onClick={() => addItemToShoppingCart(product)}
                                onlyIcon={'md' === width}
                                disabled={stockQuantityLeft <= 0}
                                className={classes.shoppingCartButton}
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

            {
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
    product : productDetailShape.isRequired
};

export default withStyles(styles)(withWidth()(ProductDetail));