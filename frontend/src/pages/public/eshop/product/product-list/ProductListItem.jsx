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
import { useHistory } from 'react-router-dom';
import { AdvancedImage, responsive, lazyload, placeholder } from '@cloudinary/react';
import { pad } from "@cloudinary/base/actions/resize";
import { auto } from "@cloudinary/base/qualifiers/format";
import { format, quality } from "@cloudinary/base/actions/delivery";
import { auto as qAuto } from "@cloudinary/base/qualifiers/quality";

import { productShape } from '../product-prop-type';
import Price from '../../../../../components/Price';
import useShoppingCartContext from '../../shopping-cart/state-management/use-shopping-cart-context';
import { ADD_ITEM_TO_SHOPPING_CART } from '../../shopping-cart/state-management/ShoppingCartActions';
import ShoppingCartButton from 'components/ShoppingCartButton';
import QuantityInput from 'components/QuantityInput';
import ProductStockQuantity from '../common/ProductStockQuantity';
import { getCloudinaryImageName } from 'util/img-util';
import useCloudinary from 'hooks/use-cloudinary';
import useStockProductQuantity from '../hooks/use-stock-product-quantity';
import Loader from 'components/Loader';

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

    const cloudinary = useCloudinary();
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

    const image = cloudinary
        .image(getCloudinaryImageName(product.thumbnailLocation))
        .resize(pad().height(200).width(350))
        .delivery(format(auto()))
        .delivery(quality(qAuto()));

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
                <AdvancedImage 
                    cldImg={image} 
                    plugins={[lazyload('30px 0px 30px 0px', 0.1), responsive(), placeholder('blur')]}
                    onClick={goToDetail}
                    height="200"
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

export default withStyles(styles)(withWidth()(ProductListItem));