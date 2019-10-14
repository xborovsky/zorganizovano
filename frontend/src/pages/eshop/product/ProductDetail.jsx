import React from 'react';
import PropTypes from 'prop-types';
import { Grid, withStyles } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root : {
        margin : '0 10vw'
    },
    price : {
        fontSize : '22pt',
        padding : '1rem'
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
                <Grid container>
                    <Grid item xs={12}>
                        <Chip label={product.price} className={classes.price} color="primary" />
                    </Grid>
                    <Grid item xs={12}>
                        {product.description}
                    </Grid>
                </Grid>
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