import React from 'react';
import PropTypes from 'prop-types';
import { Grid, withStyles, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import ProductSpec from './ProductSpec';
import Price from '../../../../components/Price';
import { productShape } from '../product-prop-type';
import IdeaPrompt from '../../../../components/IdeaPrompt';
import { addItemToShoppingCart } from '../../../../manager/shopping-cart.manager';

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
    },
    priceWrapper : {
        textAlign : 'center'
    },
    shoppingCartWrapper : {
        textAlign : 'right'
    },
    ideaPromptWrapper : {
        marginTop : '10vh'
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
                <Grid container>
                    <Grid item xs={6} className={classes.priceWrapper}>
                        <Price value={product.price} />
                    </Grid>
                    <Grid item xs={6} className={classes.shoppingCartWrapper}>
                        <Button variant="contained" color="primary" onClick={() => addItemToShoppingCart(product)}>
                            <FontAwesomeIcon icon={faShoppingCart} className={classes.shoppingCartIcon} />Vložit do košíku
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.ideaPromptWrapper}>
                <IdeaPrompt />
            </Grid>
        </Grid>
    </Paper>
);

ProductDetail.propTypes = {
    product : productShape.isRequired
};

export default withStyles(styles)(ProductDetail);