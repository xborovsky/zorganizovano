import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    textField: {
        width: 70
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
            <TextField
                value={item.quantity}
                onChange={evt => onChangeQuantity(evt, item.id)}
                type="number"
                className={classes.textField}
                InputLabelProps={{ shrink: true }}
                InputProps={{ inputProps: { min : 0, max: 99 } }}
                margin="dense"
                variant="outlined"
                hiddenLabel
            />
        </TableCell>
        <TableCell align="center">{item.price},- Kč</TableCell>
        <TableCell align="center">{item.quantity * item.price},- Kč</TableCell>
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