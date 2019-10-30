import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/styles/withStyles';
import { useHistory, useLocation } from 'react-router-dom';

import { productShape } from '../product-prop-type';
import Price from '../../../../components/Price';
import ShoppingCartContext from '../../shopping-cart/state-management/ShoppingCartContext';
import { ADD_ITEM_TO_SHOPPING_CART } from '../../shopping-cart/state-management/ShoppingCartActions';
import ProductListItemPhoto from './ProductListItemPhoto';
import ShoppingCartButton from 'components/ShoppingCartButton';
import QuantityInput from 'components/QuantityInput';

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
    warehouseCnt : {
        color : '#6c815a',
        marginTop : '0.7rem'
    },
    orderActionWrapper : {
        display : 'flex',
        justifyContent : 'flex-end',
        alignItems : 'baseline',
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

const ProductListItem = ({ product, onSuccess, classes }) => {

    const history = useHistory();
    const location = useLocation();
    const [ quantity, setQuantity ] = useState(1);
    const { dispatch } = useContext(ShoppingCartContext);

    const goToDetail = () => {
        history.push(`${location.pathname}/products/${product.id}`);
    };

    const addToShoppingCart = item => {
        const shoppingCartItem = {
            ...(({ id, name, subName, price }) => ({ id, name, subName, price }))(item),
            quantity
        };
        dispatch({
            type : ADD_ITEM_TO_SHOPPING_CART,
            payload : {
                ...(({ id, name, subName, price }) => ({ id, name, subName, price }))(item),
                quantity
            }
        });
        onSuccess(shoppingCartItem);
        setQuantity(1);
    };

    const handleChangeQuantity = event => {
        setQuantity(+event.currentTarget.value);
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
                <ProductListItemPhoto
                    id={product.id}
                    onClick={goToDetail}
                />
                <CardContent onClick={goToDetail} className={classes.content}>
                    <Typography variant="body2">{product.descriptionShort}</Typography>
                    {
                        product.stockQuantity > 5 ?
                            <Typography variant="body2" className={classes.warehouseCnt}>
                                Skladem > 5 kusů
                            </Typography> :
                            product.stockQuantity === 0 ?
                                <Typography variant="body2" className={classes.warehouseCnt}>
                                    Není skladem
                                </Typography> :
                                <Typography variant="body2" className={classes.warehouseCnt}>
                                    Skladem {product.stockQuantity} {product.stockQuantity === 5 ? 'kusů' : product.stockQuantity === 1 ? 'kus' : 'kusy'}
                                </Typography>
                    }
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
                                maxVal={product.stockQuantity}
                                className={classes.quantityInput}
                            />
                            <ShoppingCartButton
                                onClick={() => addToShoppingCart(product)}
                                onlyIcon={true} />
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

export default withStyles(styles)(ProductListItem);