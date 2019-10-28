import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ReactHtmlParser from 'react-html-parser';

import { productDetailShape } from '../product-prop-type';
import { Hidden } from '@material-ui/core';

const styles = theme => ({
    price : {
        fontSize : '22pt',
        padding : '1.5rem 2rem',
        borderRadius : 25
    },
    thCell : {
        border : 'none',
        fontWeight : 'bold',
        verticalAlign : 'top',
        [theme.breakpoints.down('sm')] : {
            padding : 5
        }
    },
    tdCell : {
        border : 'none',
        [theme.breakpoints.down('sm')] : {
            padding : 5
        }
    }
});

const DetailsSm = ({ product, classes }) => (
    <TableBody>
        <TableRow>
            <TableCell component="th" scope="row" className={classes.thCell}>
                Popis
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell className={classes.tdCell}>
                { ReactHtmlParser(product.description) }
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell component="th" scope="row" className={classes.thCell}>
                Rozměry (mm)
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell className={classes.tdCell}>
                {product.dimensions}
            </TableCell>
        </TableRow>
    </TableBody>
);

DetailsSm.propTypes = {
    product : productDetailShape.isRequired
};

export default withStyles(styles)(DetailsSm);