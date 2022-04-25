import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import withStyles from '@mui/styles/withStyles';

import ProductListItem from './ProductListItem';
import { productShape } from '../product-prop-type';
import ProductAddToCartSuccess from '../common/ProductAddToCartSuccess';

const styles = theme => ({
    root : {
        margin : 0
    },
    alert : {
        marginBottom : '2rem'
    }
});

const ProductList = ({ products, classes }) => {
    const [ showSuccess, setShowSuccess ] = useState(undefined);

    const handleSuccessClose = () => {
        setShowSuccess(undefined);
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={5}>
                { 
                    products.length === 0 && 
                        <Grid item xs={12}>Produkty v této sekci pro vás usilovně připravujeme...</Grid> 
                }
                {
                    products.map(product => (
                        <ProductListItem
                            product={product}
                            key={product.id}
                            onSuccess={shoppingCartItem => setShowSuccess(shoppingCartItem.productName)}
                        />
                    ))
                }
                {
                    showSuccess &&
                        <ProductAddToCartSuccess
                            productName={showSuccess}
                            onClose={handleSuccessClose}
                        />
                }
            </Grid>
        </div>
    );
};

ProductList.propTypes = {
    products : PropTypes.arrayOf(productShape).isRequired
};

export default withStyles(styles)(ProductList);