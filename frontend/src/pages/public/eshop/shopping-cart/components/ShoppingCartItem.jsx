import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import withStyles from '@mui/styles/withStyles';

import Price from 'components/Price';
import QuantityInput from 'components/QuantityInput';
import ShoppingCartItemPhoto from './ShoppingCartItemPhoto';

const styles = theme => ({
    quantityInput: {
        width: 90
    },
    trashIcon : {
        cursor : 'pointer'
    }
});

const ShoppingCartItem = ({
    item,
    onChangeQuantity,
    onDelete,
    classes
}) => (
    <TableRow>
        <TableCell><ShoppingCartItemPhoto itemId={item.id} /></TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell align="center">
            <QuantityInput
                value={item.quantity}
                onChange={evt => onChangeQuantity(evt, item)}
                maxVal={item.warehouseCnt}
                className={classes.quantityInput}
            />
        </TableCell>
        <TableCell align="center"><Price value={item.priceSingle} size="inherit" /></TableCell>
        <TableCell align="center"><Price value={item.quantity * item.priceSingle} size="inherit" /></TableCell>
        <TableCell align="center">
            <FontAwesomeIcon
                icon={faTrashAlt}
                className={classes.trashIcon}
                title="Odebrat z košíku"
                onClick={() => onDelete(item.id)} />
        </TableCell>
    </TableRow>
);

ShoppingCartItem.propTypes = {
    item : PropTypes.shape({
        id : PropTypes.number.isRequired,
        name : PropTypes.string.isRequired,
        subName : PropTypes.string.isRequired,
        priceSingle : PropTypes.number.isRequired,
        quantity : PropTypes.number.isRequired,
        warehouseCnt : PropTypes.number.isRequired
    }).isRequired,
    onChangeQuantity : PropTypes.func.isRequired,
    onDelete : PropTypes.func.isRequired
};

export default withStyles(styles)(ShoppingCartItem);