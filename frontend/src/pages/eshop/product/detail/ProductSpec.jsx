import React from 'react';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { productDetailShape } from '../product-prop-type';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const styles = theme => ({
    root : {
        padding : '0 1rem 2rem',
        [theme.breakpoints.down('xs')] : {
            padding : '0 .6rem .5rem',
        }
    },
    inlineDisplay : {
        display : 'inline'
    }
});

const ProductSpec = ({ product, classes }) => (
    <div className={classes.root}>
        <Typography variant="body1" className={classes.inlineDisplay}>
            { product.description.substring(0, 300) + '...' }&nbsp;
        </Typography>
        <Typography variant="body1" className={classes.inlineDisplay}>
            <AnchorLink href='#full-desc' offset="80">(detailní popis)</AnchorLink>
        </Typography>
    </div>
);

ProductSpec.propTypes = {
    product : productDetailShape.isRequired
};

export default withStyles(styles)(ProductSpec);