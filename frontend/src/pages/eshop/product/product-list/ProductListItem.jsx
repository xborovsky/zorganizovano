import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/styles/withStyles';
import { useHistory, useLocation } from 'react-router-dom';

import { productShape } from '../product-prop-type';
import Price from '../../../../components/Price';
import ShoppingCartButton from '../../../../components/ShoppingCartButton';

const styles = theme => ({
    card : {
        cursor : 'pointer'
    },
    cover: {
        height: 200
    },
});

const ProductListItem = ({ product, classes }) => {

    const history = useHistory();
    const location = useLocation();

    const goToDetail = () => {
        history.push(`${location.pathname}/products/${product.id}`);
    };

    const addToShoppingCart = product => {
        console.log('TODO add to shopping cart...');
    };

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card} onClick={goToDetail}>
                <CardMedia
                    className={classes.cover}
                    image="http://www.tracyhensel.com/wp-content/uploads/2016/01/FullSizeRender-4-1024x795.jpg"
                    title="TODO - titulek"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5">
                        { product.name }
                    </Typography>
                </CardContent>

                <CardActions>
                    <Grid container spacing={5}>
                        <Grid item xs={6}>
                            <Price value={product.price} />
                        </Grid>
                        <Grid item xs={6}>
                            <ShoppingCartButton onClick={() => addToShoppingCart(product)} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" element="span">
                                Skladem: TODO kusů
                            </Typography>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </Grid>
    );
};

ProductListItem.propTypes = {
    product : productShape.isRequired
};

export default withStyles(styles)(ProductListItem);