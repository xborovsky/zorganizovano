import React, { Fragment } from 'react';
import withStyles from '@mui/styles/withStyles';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ReactHtmlParser from 'react-html-parser';

import { productDetailShape } from '../product-prop-type';


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
        [theme.breakpoints.down('md')] : {
            padding : 5
        }
    },
    tdCell : {
        border : 'none',
        textAlign : 'justify',
        [theme.breakpoints.down('md')] : {
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
            <TableCell className={classes.tdCell} component="div">
                { ReactHtmlParser(product.description) }
            </TableCell>
        </TableRow>
        {
            product.details.map(productDetail => (
                <Fragment key={productDetail.id}>
                    <TableRow>
                        <TableCell component="th" scope="row" className={classes.thCell}>
                            { productDetail.key }
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.tdCell}>
                            { productDetail.value }
                        </TableCell>
                    </TableRow>
                </Fragment>
            ))
        }
    </TableBody>
);

DetailsSm.propTypes = {
    product : productDetailShape.isRequired
};

export default withStyles(styles)(DetailsSm);