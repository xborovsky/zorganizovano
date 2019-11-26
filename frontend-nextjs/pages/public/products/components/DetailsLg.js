import React from 'react';
import withStyles from '@material-ui/styles/withStyles';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ReactHtmlParser from 'react-html-parser';
import Typography from '@material-ui/core/Typography';

//import { productDetailShape } from '../product-prop-type';

const styles = theme => ({
    price : {
        fontSize : '22pt',
        padding : '1.5rem 2rem',
        borderRadius : 25
    },
    thCell : {
        border : 'none',
        verticalAlign : 'top'
    },
    th : {
        fontWeight : 'bold !important'
    },
    tdCell : {
        border : 'none',
        textAlign : 'justify'
    }
});

const Details = ({ product, classes }) => (
    <TableBody>
        <TableRow>
            <TableCell component="th" scope="row" className={classes.thCell}>
                <Typography variant="body1" className={classes.th}>
                    Popis
                </Typography>
            </TableCell>
            <TableCell className={classes.tdCell}>
                <Typography variant="body1" component="div">
                    { ReactHtmlParser(product.description) }
                </Typography>
            </TableCell>
        </TableRow>
        {
            product.details.map(productDetail => (
                <TableRow key={productDetail.id}>
                    <TableCell component="th" scope="row" className={classes.thCell}>
                        <Typography variant="body1" className={classes.th}>
                            { productDetail.key }
                        </Typography>
                    </TableCell>
                    <TableCell className={classes.tdCell}>
                        <Typography variant="body1">
                            { productDetail.value }
                        </Typography>
                    </TableCell>
                </TableRow>
            ))
        }
    </TableBody>
);

Details.propTypes = {
    //product : productDetailShape.isRequired
};

export default withStyles(styles)(Details);