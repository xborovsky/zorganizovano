import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import Chip from '@material-ui/core/Chip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const styles = theme => ({
    root : {
        borderTop : '1px solid #ccc',
        borderBottom : '1px solid #ccc',
        padding : '2rem .5rem',
        marginBottom : '1rem'
    },
    price : {
        fontSize : '22pt',
        padding : '1.5rem 2rem',
        borderRadius : 25
    },
    tableCell : {
        border : 'none'
    }
});

const ProductSpec = ({ product, classes }) => (
    <Table className={classes.root}>
        <TableBody>
            <TableRow>
                <TableCell colSpan={2} className={classes.tableCell}>
                    <Chip label={`${product.price},-`} className={classes.price} color="primary" />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell component="th" scope="row" className={classes.tableCell}>
                    Description
                </TableCell>
                <TableCell className={classes.tableCell}>
                    {product.description}
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
);

ProductSpec.propTypes = {
    product : PropTypes.shape({
        id : PropTypes.number.isRequired,
        name : PropTypes.string.isRequired,
        description : PropTypes.string.isRequired,
        price : PropTypes.number.isRequired
    }).isRequired
};

export default withStyles(styles)(ProductSpec);