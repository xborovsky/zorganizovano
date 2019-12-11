import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/styles/withStyles';
import Router from 'next/router';
import Hidden from '@material-ui/core/Hidden';

import Actions from './Actions';
import ShoppingCartItem from './ShoppingCartItem';
import ShoppingCartItemSm from './ShoppingCartItemSm';

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        marginBottom : '3rem',
        [theme.breakpoints.down('sm')] : {
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
    const renderEmpty = () => (
        <TableRow>
            <TableCell align="center" colSpan={7}>
                <strong>Váš košík je prázdný</strong>
            </TableCell>
        </TableRow>
    );

    const goToOrder = () => {
        Router.push({ pathname : `/public/order` });
    };

    return (
        <>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <Hidden smDown>
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
                                        <Hidden smDown>
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
            quantity : PropTypes.number.isRequired,
            warehouseCnt : PropTypes.number.isRequired
        })
    ).isRequired,
    onChangeQuantity : PropTypes.func.isRequired,
    onDelete : PropTypes.func.isRequired,
    onEmptyShoppingCart : PropTypes.func.isRequired
};

export default withStyles(styles)(ShoppingCart);