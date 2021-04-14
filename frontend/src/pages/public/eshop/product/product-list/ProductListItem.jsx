import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/styles/withStyles';
import withWidth from '@material-ui/core/withWidth';
import { useHistory, useLocation } from 'react-router-dom';

import { productShape } from '../product-prop-type';
import Price from '../../../../../components/Price';
import useShoppingCartContext from '../../shopping-cart/state-management/use-shopping-cart-context';
import { ADD_ITEM_TO_SHOPPING_CART } from '../../shopping-cart/state-management/ShoppingCartActions';
import ShoppingCartButton from 'components/ShoppingCartButton';
import QuantityInput from 'components/QuantityInput';
import ProductStockQuantity from '../common/ProductStockQuantity';
import { getImgServerPreviewUrl, getImgServerUrl } from 'util/img-util';
import ProgressiveImage from 'components/progressive-image/ProgressiveImage';

const styles = theme => ({
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
        [theme.breakpoints.down('sm')] : {
            paddingBottom : 0
        }
    },
    cover: {
        height: 200,
        cursor : 'pointer',
        objectFit : 'contain !important'
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
    quantityInput : {
        marginTop : '4px !important'
    },
    shoppingCartButton : {
        flex : 1
    }
});

const ProductListItem = ({ product, onSuccess, classes, width }) => {

    const history = useHistory();
    const location = useLocation();
    const [ quantity, setQuantity ] = useState(1);
    const { state, dispatch } = useShoppingCartContext();
    const productQuantityInCart = (state.find(cartItem => cartItem.id === product.id) || {}).quantity || 0;
    const stockQuantityLeft = product.stockQuantity - productQuantityInCart;

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

    const getProductPhotoWidthPct = () => {
        switch (width) {
            case 'xl':
            case 'lg':
            case 'md':
                return 35;
            case 'sm':
                return 50;
            case 'xs':
                return 100;
            default : return 100;
        }
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
                <ProgressiveImage
                    lowQualitySrc={getImgServerPreviewUrl(product.thumbnailLocation)}
                    highQualitySrc={getImgServerUrl(product.thumbnailLocation, getProductPhotoWidthPct())}
                    onClick={goToDetail}
                    className={classes.cover}
                />
                {/*<CardMedia
                    className={classes.cover}
                    image={getImgServerUrl(product.thumbnailLocation, getProductPhotoWidthPct())}
                    onClick={goToDetail}
                />*/}
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
                                    <QuantityInput
                                        value={quantity}
                                        onChange={handleChangeQuantity}
                                        maxVal={stockQuantityLeft}
                                        className={classes.quantityInput}
                                    />
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

export default withStyles(styles)(withWidth()(ProductListItem));