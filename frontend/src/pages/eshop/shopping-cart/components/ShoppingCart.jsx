import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';

import Actions from './Actions';
import ShoppingCartItem from './ShoppingCartItem';

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

const ShoppingCart = ({
    classes,
    items,
    onChangeQuantity,
    onDelete,
    onEmptyShoppingCart
}) => {
    const history = useHistory();

    const renderEmpty = () => (
        <TableRow>
            <TableCell align="center" colSpan={7}>
                <strong>Váš košík je prázdný</strong>
            </TableCell>
        </TableRow>
    );

    const goToOrder = () => {
        history.push({
            pathname : `/eshop/order`,
            state : {
                shoppingCart : items
            }
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
                            (!items || !items.length) ?
                                renderEmpty() :
                                items.map(item => (
                                    <ShoppingCartItem
                                        item={item}
                                        onChangeQuantity={onChangeQuantity}
                                        onDelete={onDelete}
                                    />
                                ) )
                        }
                    </TableBody>
                </Table>
            </Paper>
            <Actions
                disableProceedToOrder={!items || !items.length}
                onEmptyShoppingCart={onEmptyShoppingCart}
                onGoToOrder={goToOrder} />
        </>
    );
};

ShoppingCart.propTypes = {
    items : PropTypes.arrayOf(
        PropTypes.shape({
            id : PropTypes.number.isRequired,
            name : PropTypes.string.isRequired,
            subName : PropTypes.string.isRequired,
            priceSingle : PropTypes.number.isRequired,
            quantity : PropTypes.number.isRequired
        })
    ).isRequired,
    onChangeQuantity : PropTypes.func.isRequired,
    onDelete : PropTypes.func.isRequired,
    onEmptyShoppingCart : PropTypes.func.isRequired
};

export default withStyles(styles)(ShoppingCart);