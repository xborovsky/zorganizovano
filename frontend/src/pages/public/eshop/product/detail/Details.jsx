import React from 'react';
import Hidden from '@mui/material/Hidden';
import withStyles from '@mui/styles/withStyles';
import Table from '@mui/material/Table';

import { productDetailShape } from '../product-prop-type';
import DetailsSm from './DetailsSm';
import DetailsLg from './DetailsLg';

const styles = theme => ({
    root : {
        padding : '2rem .5rem',
        marginBottom : '1rem',
        [theme.breakpoints.down('sm')] : {
            marginBottom : '.7rem',
            marginTop : '2rem'
        }
    }
});

const Details = ({ product, classes }) => (
    <Table className={classes.root} id="full-desc">
        <Hidden mdDown>
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