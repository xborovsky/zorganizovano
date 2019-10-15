import React from 'react';
import PropTypes from 'prop-types';
import { Grid, withStyles, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import ProductSpec from './ProductSpec';
import Price from '../../../components/Price';

const styles = theme => ({
    root : {
        margin : '0 10vw',
        padding : '1rem 3rem'
    },
    shoppingCartIcon : {
        marginRight : 10
    },
    image : {
        width : '70%',
        marign : '0 auto'
    }
});

const ProductDetail = ({ product, classes }) => (
    <Paper className={classes.root}>
        <Grid container>
            <Grid item xs={12} sm={6}>
                <img src="http://www.tracyhensel.com/wp-content/uploads/2016/01/FullSizeRender-4-1024x795.jpg" className={classes.image} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <h1>{ product.name }</h1>
                <ProductSpec product={product} />
                <Button variant="contained" color="primary">
                    <FontAwesomeIcon icon={faShoppingCart} className={classes.shoppingCartIcon} />Vložit do košíku
                </Button>
                <Price value={product.price} />
            </Grid>
        </Grid>
    </Paper>
);

ProductDetail.propTypes = {
    product : PropTypes.shape({
        id : PropTypes.number.isRequired,
        name : PropTypes.string.isRequired,
        description : PropTypes.string.isRequired,
        price : PropTypes.number.isRequired
    }).isRequired
};

export default withStyles(styles)(ProductDetail);