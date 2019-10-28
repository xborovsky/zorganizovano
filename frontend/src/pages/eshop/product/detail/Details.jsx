import React from 'react';
import { Hidden, withStyles, Table } from '@material-ui/core';

import { productDetailShape } from '../product-prop-type';
import DetailsSm from './DetailsSm';
import DetailsLg from './DetailsLg';

const styles = theme => ({
    root : {
        padding : '2rem .5rem',
        marginBottom : '1rem',
        [theme.breakpoints.down('xs')] : {
            marginBottom : '.7rem',
            marginTop : '2rem'
        }
    }
});

const Details = ({ product, classes }) => (
    <Table className={classes.root} id="full-desc">
        <Hidden smDown>
            <DetailsLg product={product} />
        </Hidden>
        <Hidden mdUp>
            <DetailsSm product={product} />
        </Hidden>
    </Table>
);

Details.propTypes = {
    product : productDetailShape.isRequired
};

export default withStyles(styles)(Details);