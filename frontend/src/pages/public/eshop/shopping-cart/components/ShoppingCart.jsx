import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import withStyles from '@mui/styles/withStyles';
import { useHistory } from 'react-router-dom';
import Hidden from '@mui/material/Hidden';

import Actions from './Actions';
import ShoppingCartItem from './ShoppingCartItem';
import ShoppingCartItemSm from './ShoppingCartItemSm';

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        marginBottom : '3rem',
        [theme.breakpoints.down('md')] : {
            marginBottom : '1rem'
        }
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

    return <>
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <Hidden mdDown>
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
                </Hidden>
                <TableBody>
                    {
                        (!items || !items.length) ?
                            renderEmpty() :
                            items.map(item => (
                                <Fragment key={item.id}>
                                    <Hidden mdDown>
                                        <ShoppingCartItem
                                            item={item}
                                            onChangeQuantity={onChangeQuantity}
                                            onDelete={onDelete}
                                        />
                                    </Hidden>
                                    <Hidden mdUp>
                                        <ShoppingCartItemSm
                                            item={item}
                                            onChangeQuantity={onChangeQuantity}
                                            onDelete={onDelete}
                                        />
                                    </Hidden>
                                </Fragment>
                            ) )
                    }
                </TableBody>
            </Table>
        </Paper>
        <Actions
            disableProceedToOrder={!items || !items.length}
            onEmptyShoppingCart={onEmptyShoppingCart}
            onGoToOrder={goToOrder} />
    </>;
};

ShoppingCart.propTypes = {
    items : PropTypes.arrayOf(
        PropTypes.shape({
            id : PropTypes.number.isRequired,
            name : PropTypes.string.isRequired,
            subName : PropTypes.string.isRequired,
            priceSingle : PropTypes.number.isRequired,
            quantity : PropTypes.number.isRequired,
            warehouseCnt : PropTypes.number.isRequired
        })
    ).isRequired,
    onChangeQuantity : PropTypes.func.isRequired,
    onDelete : PropTypes.func.isRequired,
    onEmptyShoppingCart : PropTypes.func.isRequired
};

export default withStyles(styles)(ShoppingCart);