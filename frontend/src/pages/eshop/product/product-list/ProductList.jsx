import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, withStyles } from '@material-ui/core';

import ProductListItem from './ProductListItem';
import { productShape } from '../product-prop-type';
import Alert from 'components/Alert';

const styles = theme => ({
    root : {
        margin : '0 5vw'
    },
    alert : {
        marginBottom : '2rem'
    }
});

const ProductList = ({ products, classes }) => {
    const [successMessage, setSuccessMessage] = useState(undefined);

    return (
        <div className={classes.root}>
            {
                successMessage &&
                    <Alert type="success" className={classes.alert}>{ successMessage }</Alert>
            }
            <Grid container spacing={5}>
                {
                    products.map(product => (
                        <ProductListItem
                            product={product}
                            key={product.id}
                            onSuccess={message => setSuccessMessage(message)}
                        />
                    ))
                }
            </Grid>
        </div>
    );
};

ProductList.propTypes = {
    products : PropTypes.arrayOf(productShape).isRequired
};

export default withStyles(styles)(ProductList);