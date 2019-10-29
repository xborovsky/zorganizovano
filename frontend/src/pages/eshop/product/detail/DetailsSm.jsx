import React, { Fragment } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
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