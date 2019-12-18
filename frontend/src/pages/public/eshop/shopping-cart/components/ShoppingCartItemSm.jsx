import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import Price from 'components/Price';
import QuantityInput from 'components/QuantityInput';
import ShoppingCartItemPhoto from './ShoppingCartItemPhoto';

const styles = theme => ({
    avatar : {
        margin : '0 auto 3px'
    }
});

const ShoppingCartItemSm = ({
    item,
    onChangeQuantity,
    onDelete,
    classes
}) => (
    <>
        <TableRow>
            <TableCell colSpan={2} align="center">
                <ShoppingCartItemPhoto itemId={item.id} className={classes.avatar} /> {item.name}
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Počet kusů</TableCell>
            <TableCell align="center">
                <QuantityInput
                    value={item.quantity}
                    onChange={evt => onChangeQuantity(evt, item)}
                    maxVal={item.warehouseCnt}
                    className={classes.quantityInput}
                />
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Cena za kus</TableCell>
            <TableCell align="center"><Price value={item.priceSingle} size="inherit" /></TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Cena celkem</TableCell>
            <TableCell align="center"><Price value={item.quantity * item.priceSingle} size="inherit" /></TableCell>
        </TableRow>
        <TableRow>
            <TableCell align="center" colSpan={2}>
                <FontAwesomeIcon
                    icon={faTrashAlt}
                    className={classes.trashIcon}
                    title="Odebrat z košíku"
                    onClick={() => onDelete(item.id)} />
            </TableCell>
        </TableRow>
    </>
);

ShoppingCartItemSm.propTypes = {
    item : {
        id : PropTypes.number.isRequired,
        name : PropTypes.string.isRequired,
        subName : PropTypes.string.isRequired,
        priceSingle : PropTypes.number.isRequired,
        quantity : PropTypes.number.isRequired,
        warehouseCnt : PropTypes.number.isRequired
    },
    onChangeQuantity : PropTypes.func.isRequired,
    onDelete : PropTypes.func.isRequired
};

export default withStyles(styles)(ShoppingCartItemSm);