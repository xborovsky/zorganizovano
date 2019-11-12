import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/styles/withStyles';
import withWidth from '@material-ui/core/withWidth';
import { useHistory, useLocation } from 'react-router-dom';

import { productShape } from '../product-prop-type';
import Price from '../../../../components/Price';
import ShoppingCartContext from '../../shopping-cart/state-management/ShoppingCartContext';
import { ADD_ITEM_TO_SHOPPING_CART } from '../../shopping-cart/state-management/ShoppingCartActions';
import ShoppingCartButton from 'components/ShoppingCartButton';
import QuantityInput from 'components/QuantityInput';
import ProductStockQuantity from '../common/ProductStockQuantity';
import { getImgServerUrl } from 'util/img-util';

const styles = theme => ({
    card : {
        //cursor : 'pointer'
    },
    header : {
        backgroundColor : '#2e4b14',
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
            backgroundColor : '#6c815a'
        }
    },
    headerTitle : {
        fontSize : '1.2rem',
        color : '#fff'
    },
    headerSubtitle : {
        fontSize : '0.8rem',
        color : '#fff'
    },
    content : {
        cursor : 'pointer'
    },
    cover: {
        height: 200,
        cursor : 'pointer'
    },
    orderActionWrapper : {
        display : 'flex',
        justifyContent : 'flex-end',
        alignItems : 'center',
        paddingTop : '5px !important'
    },
    priceWrapper : {
        textAlign : 'right',
        paddingTop : '5px !important',
        paddingBottom : '5px !important'
    },
    cardActions : {
        marginRight : 15,
        mefginLeft : 15
    },
    quantityInput : {
        marginRight : 20
    }
});

const ProductListItem = ({ product, onSuccess, classes, width }) => {

    const history = useHistory();
    const location = useLocation();
    const [ quantity, setQuantity ] = useState(1);
    const { state, dispatch } = useContext(ShoppingCartContext);
    const productQuantityInCart = (state.find(cartItem => cartItem.id === product.id) || {}).quantity || 0;
    const stockQuantityLeft = product.stockQuantity - productQuantityInCart;

    const goToDetail = () => {
        history.push(`${location.pathname}/products/${product.id}`);
    };

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
                return 25;
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
                <CardMedia
                    className={classes.cover}
                    image={getImgServerUrl(product.thumbnailLocation, getProductPhotoWidthPct())}
                    onClick={goToDetail}
                />
                <CardContent onClick={goToDetail} className={classes.content}>
                    <Typography variant="body2">{product.descriptionShort}</Typography>
                    <ProductStockQuantity stockQuantityLeft={stockQuantityLeft} />
                </CardContent>

                <CardActions className={classes.cardActions}>
                    <Grid container spacing={5} alignItems="center">
                        <Grid item xs={12} className={classes.priceWrapper}>
                            <Price value={product.price} />
                        </Grid>
                        <Grid item xs={12} className={classes.orderActionWrapper}>
                            <QuantityInput
                                value={quantity}
                                onChange={handleChangeQuantity}
                                maxVal={stockQuantityLeft}
                                className={classes.quantityInput}
                            />
                            <ShoppingCartButton
                                onClick={() => addToShoppingCart(product)}
                                onlyIcon={true}
                                disabled={stockQuantityLeft <= 0} />
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