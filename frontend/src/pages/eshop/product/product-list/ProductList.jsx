import React from 'react';
import PropTypes from 'prop-types';
import { Grid, withStyles } from '@material-ui/core';

import ProductListItem from './ProductListItem';
import { productShape } from '../product-prop-type';

const styles = theme => ({
    root : {
        margin : '0 5vw'
    }
});

const ProductList = ({ products, classes }) => (
    <div className={classes.root}>
        <Grid container spacing={5}>
            {
                products.map(product => (
                    <ProductListItem product={product} key={product.id} />
                ))
            }
        </Grid>
    </div>
);

ProductList.propTypes = {
    products : PropTypes.arrayOf(productShape).isRequired
};

export default withStyles(styles)(ProductList);