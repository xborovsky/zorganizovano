import React, { useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import TextField from '@material-ui/core/TextField';

import Actions from './Actions';
import ShoppingCartContext from './state-management/ShoppingCartContext';
import { UPDATE_SHOPPING_CART_ITEM_QUANTITY } from './state-management/ShoppingCartActions';

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table : {
        width : '100%'
    },
    textField: {
        width: 50
    },
    actionsWrapper : {
        textAlign : 'right'
    },
    orderBtn : {
        marginTop : '0.5rem'
    }
});

const ShoppingCart = ({ classes }) => {

    const { state, dispatch } = useContext(ShoppingCartContext);

    const renderEmpty = () => (
        <TableRow>
            <TableCell align="center" colSpan={4}>
                <strong>Váš košík je prázdný</strong>
            </TableCell>
        </TableRow>
    );

    const handleChangeQuantity = (event, id) => {
        dispatch({
            type : UPDATE_SHOPPING_CART_ITEM_QUANTITY,
            itemId : id,
            quantity : +event.currentTarget.value
        });
    };

    return (
        <>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Položka</TableCell>
                            <TableCell align="center">Počet kusů</TableCell>
                            <TableCell align="center">Cena za kus</TableCell>
                            <TableCell align="center">Cena celkem</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (!state || !state.length) ?
                                renderEmpty() :
                                state.map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell>TODO - obrazok</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                value={item.quantity}
                                                onChange={evt => handleChangeQuantity(evt, item.id)}
                                                type="number"
                                                className={classes.textField}
                                                InputLabelProps={{ shrink: true }}
                                                margin="dense"
                                                hiddenLabel
                                            />
                                        </TableCell>
                                        <TableCell align="center">{item.price}</TableCell>
                                        <TableCell align="center">{item.quantity * item.price}</TableCell>
                                        <TableCell align="center"><FontAwesomeIcon icon={faTrashAlt} /></TableCell>
                                    </TableRow>
                                ))}
                    </TableBody>
                </Table>
            </Paper>
            <Actions />
        </>
    );
};

export default withStyles(styles)(ShoppingCart);