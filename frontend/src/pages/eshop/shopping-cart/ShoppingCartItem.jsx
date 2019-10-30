import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { withStyles } from '@material-ui/styles';

import Price from 'components/Price';
import QuantityInput from 'components/QuantityInput';

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
    <TableRow key={item.id}>
        <TableCell>TODO - obrazok</TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell align="center">
            <QuantityInput
                value={item.quantity}
                onChange={evt => onChangeQuantity(evt, item.id)}
                max={99} // TODO max product.stockQuantity (ajax)
                className={classes.quantityInput}
            />
        </TableCell>
        <TableCell align="center"><Price value={item.price} size="inherit" /></TableCell>
        <TableCell align="center"><Price value={item.quantity * item.price} size="inherit" /></TableCell>
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
    item : {
        id : PropTypes.number.isRequired,
        name : PropTypes.string.isRequired,
        price : PropTypes.number.isRequired,
        quantity : PropTypes.number.isRequired
    },
    onChangeQuantity : PropTypes.func.isRequired,
    onDelete : PropTypes.func.isRequired
};

export default withStyles(styles)(ShoppingCartItem);