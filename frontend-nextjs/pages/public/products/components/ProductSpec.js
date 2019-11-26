import React from 'react';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import AnchorLink from 'react-anchor-link-smooth-scroll';

//import { productDetailShape } from '../product-prop-type';

const styles = theme => ({
    root : {
        textAlign : 'justify'
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
    //product : productDetailShape.isRequired
};

export default withStyles(styles)(ProductSpec);