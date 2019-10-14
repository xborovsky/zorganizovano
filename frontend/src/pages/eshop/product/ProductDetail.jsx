import React from 'react';
import PropTypes from 'prop-types';
import { Grid, withStyles, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import ProductSpec from './ProductSpec';

const styles = theme => ({
    root : {
        margin : '0 10vw',
        padding : '1rem 3rem'
    },
    shoppingCartIcon : {
        marginRight : 10
    }
});

const ProductDetail = ({ product, classes }) => (
    <Paper className={classes.root}>
        <Grid container>
            <Grid item xs={12} sm={6}>
                TODO - obrazek
            </Grid>
            <Grid item xs={12} sm={6}>
                <h1>{ product.name }</h1>
                <ProductSpec product={product} />
                <Button variant="contained" color="primary">
                    <FontAwesomeIcon icon={faShoppingCart} className={classes.shoppingCartIcon} />Vložit do košíku
                </Button>
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