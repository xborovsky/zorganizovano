import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ReactHtmlParser from 'react-html-parser';

import { productDetailShape } from '../product-prop-type';

const styles = theme => ({
    root : {
        padding : '2rem .5rem',
        marginBottom : '1rem'
    },
    price : {
        fontSize : '22pt',
        padding : '1.5rem 2rem',
        borderRadius : 25
    },
    thCell : {
        border : 'none',
        fontWeight : 'bold',
        verticalAlign : 'top'
    },
    tdCell : {
        border : 'none'
    }
});

const Details = ({ product, classes }) => (
    <Table className={classes.root} id="full-desc">
        <TableBody>
            <TableRow>
                <TableCell component="th" scope="row" className={classes.thCell}>
                    Popis
                </TableCell>
                <TableCell className={classes.tdCell}>
                    { ReactHtmlParser(product.description) }
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell component="th" scope="row" className={classes.thCell}>
                    Rozměry (mm)
                </TableCell>
                <TableCell className={classes.tdCell}>
                    {product.dimensions}
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
);

Details.propTypes = {
    product : productDetailShape.isRequired
};

export default withStyles(styles)(Details);