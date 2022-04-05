import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom';

import { productShape } from '../product-prop-type';
import Price from '../../../../../components/Price';
import useShoppingCartContext from '../../shopping-cart/state-management/use-shopping-cart-context';
import { ADD_ITEM_TO_SHOPPING_CART } from '../../shopping-cart/state-management/ShoppingCartActions';
import ShoppingCartButton from 'components/ShoppingCartButton';
import QuantityInput from 'components/QuantityInput';
import ProductStockQuantity from '../common/ProductStockQuantity';
import useStockProductQuantity from '../hooks/use-stock-product-quantity';
import Loader from 'components/Loader';
import CdnImage from 'components/CdnImage';
import { makeStyles } from '@mui/styles';
import useWidth from 'hooks/use-width';

const useStyles = makeStyles(theme => ({
    card : {
        display : 'flex',
        flexDirection : 'column',
        height : '100%'
    },
    header : {
        backgroundColor : '#444',
        color : '#fff',
        cursor : 'pointer',
        '&>.MuiCardHeader-content' : {
            '&>.MuiCardHeader-title' : {
                //fontSize : 18
            },
            '&>.MuiCardHeader-subheader' : {
                color : '#fff !important',
                //fontSize : 13
            }
        },
        '&:hover' : {
            backgroundColor : '#000'
        }
    },
    headerTitle : {
        fontSize : '1.2rem',
        color : '#fff',
        textTransform : 'uppercase'
    },
    headerSubtitle : {
        fontSize : '0.8rem',
        color : '#fff'
    },
    content : {
        cursor : 'pointer',
        textAlign : 'justify',
        [theme.breakpoints.down('md')] : {
            paddingBottom : 0
        }
    },
    orderActionWrapper : {
        display : 'flex',
        alignItems: 'center',
        marginBottom: '.5rem',
        [theme.breakpoints.up('lg')] : {
            marginBottom: '.1rem'
        }
    },
    quantityWrapper : {
        display : 'flex',
        alignItems: 'center'
    },
    priceWrapper : {
        textAlign : 'right'
    },
    cardActions : {
        marginRight : 15,
        marginLeft : 15,
        marginTop : 'auto'
    },
    shoppingCartButton : {
        flex : 1
    }
}));

const ProductListItem = ({ product, onSuccess }) => {
    const classes = useStyles();
    const width = useWidth();
    const history = useHistory();
    const [ quantity, setQuantity ] = useState(1);
    const { state, dispatch } = useShoppingCartContext();
    const productQuantityInCart = (state.find(cartItem => cartItem.id === product.id) || {}).quantity || 0;
    const { data:productQuantityInStock, isLoading:isLoadingProductQuantity } = useStockProductQuantity(product.id);
    let stockQuantityLeft = productQuantityInStock - productQuantityInCart;
    stockQuantityLeft = stockQuantityLeft < 0 ? 0 : stockQuantityLeft;

    const goToDetail = () => history.push(`/eshop/products/${product.id}`);

    const addToShoppingCart = item => {
        const shoppingCartItem = {
            id : item.id,
            price : item.price,
            quantity
        };
        dispatch({
            type : ADD_ITEM_TO_SHOPPING_CART,
            payload : shoppingCartItem
        });

        onSuccess({ productName : item.name });
        setQuantity(1);
    };

    const handleChangeQuantity = newValue => {
        if (newValue <= 0 || newValue > stockQuantityLeft) {
            return false;
        }
        setQuantity(newValue);
    };

    const headerTitle = <Typography varian="h5" className={classes.headerTitle}>{product.name}</Typography>;
    const headerSubtitle = <Typography varian="h6" className={classes.headerSubtitle}>{product.subName}</Typography>;

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardHeader
                    title={headerTitle}
                    subheader={headerSubtitle}
                    className={classes.header}
                    onClick={goToDetail}
                    disableTypography
                    titleTypographyProps={classes.headerTitle}
                    subheaderTypographyProps={classes.headerSubtitle}
                />
                <CdnImage 
                    name={product.thumbnailLocation}
                    alt={product.thumbnailLocation}
                    onClick={goToDetail}
                    style={{ objectFit : 'contain' }}
                />
                <CardContent onClick={goToDetail} className={classes.content}>
                    <Typography variant="body2">{product.descriptionShort}</Typography>
                </CardContent>

                <CardActions className={classes.cardActions}>
                    <Grid container spacing={1} alignItems="center" justifyContent="center">
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <ProductStockQuantity stockQuantityLeft={stockQuantityLeft} />
                                </Grid>
                                <Grid item xs={6} className={classes.priceWrapper}>
                                    <Price value={product.price} size={['xs', 'sm', 'md'].indexOf(width) === -1 ? 'xl' : 'normal'} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container className={classes.quantityPriceWrapper} spacing={['lg', 'xl'].indexOf(width) !== -1 ? 1 : 0}>
                                <Grid item xs={12} lg={8} xl={6} className={classes.quantityWrapper}>
                                    { isLoadingProductQuantity ?
                                        <Loader /> :
                                        <QuantityInput
                                            value={quantity}
                                            onChange={handleChangeQuantity}
                                            maxVal={stockQuantityLeft}
                                            className={classes.quantityInput}
                                        />
                                    }
                                </Grid>
                                <Grid item xs={12} lg={4} xl={6} className={classes.orderActionWrapper}>
                                    <ShoppingCartButton
                                        onClick={() => addToShoppingCart(product)}
                                        onlyIcon={['xs', 'sm', 'md'].indexOf(width) === -1}
                                        disabled={stockQuantityLeft <= 0}
                                        className={classes.shoppingCartButton} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </Grid>
    );
};

ProductListItem.propTypes = {
    product : productShape.isRequired,
    onSuccess : PropTypes.func.isRequired
};

export default ProductListItem;