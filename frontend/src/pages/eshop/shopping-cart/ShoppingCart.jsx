import React, { useContext, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';

import Actions from './Actions';
import ShoppingCartContext from './state-management/ShoppingCartContext';
import {
    UPDATE_SHOPPING_CART_ITEM_QUANTITY,
    REMOVE_ITEM_FROM_SHOPPING_CART,
    EMPTY_SHOPPING_CART
} from './state-management/ShoppingCartActions';
import ShoppingCartItem from './ShoppingCartItem';
import DeleteConfirm from './DeleteConfirm';

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        marginBottom : '3rem'
    },
    table : {
        width : '100%'
    },
    actionsWrapper : {
        textAlign : 'right'
    },
    orderBtn : {
        marginTop : '0.5rem'
    }
});

const initialConfirmData = {
    show : false,
    message : undefined,
    itemId : undefined,
    itemName : undefined,
    onConfirm : undefined
};

const ShoppingCart = ({ classes }) => {

    const { state, dispatch } = useContext(ShoppingCartContext);
    const [ confirm, setConfirm ] = useState(initialConfirmData);

    const renderEmpty = () => (
        <TableRow>
            <TableCell align="center" colSpan={7}>
                <strong>Váš košík je prázdný</strong>
            </TableCell>
        </TableRow>
    );

    const handleChangeQuantity = (event, id) => {
        const newQuantity = +event.currentTarget.value;
        if (newQuantity === 0) {
            showItemDeleteConfirm(id);
        } else {
            dispatch({
                type : UPDATE_SHOPPING_CART_ITEM_QUANTITY,
                itemId : id,
                quantity : newQuantity
            });
        }
    };

    const showItemDeleteConfirm = id => {
        const itemName = state[state.findIndex(item => item.id === id)].name;
        setConfirm({
            show : true,
            message : (<>Opravdu si přejete odstranit <strong>{itemName}</strong> z košíku?'</>),
            itemId : id,
            onConfirm : handleItemDelete
        });
    };

    const handleItemDelete = id => {
        dispatch({
            type : REMOVE_ITEM_FROM_SHOPPING_CART,
            payload : { id }
        });
        setConfirm({ show : false });
    };

    const showEmptyShoppingCartConfirm = () => {
        setConfirm({
            show : true,
            message : 'Opravdu si přejete vyprázdnit košík?',
            onConfirm : handleEmptyShoppingCart
        });
    };

    const handleEmptyShoppingCart = () => {
        dispatch({ type : EMPTY_SHOPPING_CART });
        setConfirm({ show : false });
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
                                    <ShoppingCartItem
                                        item={item}
                                        onChangeQuantity={handleChangeQuantity}
                                        onDelete={showItemDeleteConfirm}
                                    />
                                ))}
                    </TableBody>
                </Table>
            </Paper>
            <Actions
                disableProceedToOrder={!state || !state.length}
                onEmptyShoppingCart={showEmptyShoppingCartConfirm} />
            {
                confirm.show &&
                    <DeleteConfirm
                        itemId={confirm.itemId}
                        onClose={() => setConfirm(initialConfirmData)}
                        onConfirm={confirm.onConfirm}>
                        {confirm.message}
                    </DeleteConfirm>
            }
        </>
    );
};

export default withStyles(styles)(ShoppingCart);