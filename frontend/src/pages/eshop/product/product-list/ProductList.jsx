import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, withStyles } from '@material-ui/core';

import ProductListItem from './ProductListItem';
import { productShape } from '../product-prop-type';
import ProductAddToCartSuccess from '../common/ProductAddToCartSuccess';

const styles = theme => ({
    root : {
        margin : '0 5vw'
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
                    products.map(product => (
                        <ProductListItem
                            product={product}
                            key={product.id}
                            onSuccess={shoppingCartItem => setShowSuccess({ productName : shoppingCartItem.name})}
                        />
                    ))
                }
                { // TODO refaktoring HC???
                    showSuccess &&
                        <ProductAddToCartSuccess
                            product={showSuccess.productName}
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