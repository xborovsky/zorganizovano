import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import ShoppingCartContext from './state-management/ShoppingCartContext';
import Alert from 'components/Alert';
import ShoppingCart from './components/ShoppingCart';
import {
    UPDATE_SHOPPING_CART_ITEM_QUANTITY,
    REMOVE_ITEM_FROM_SHOPPING_CART,
    EMPTY_SHOPPING_CART
} from './state-management/ShoppingCartActions';
import DeleteConfirm from './components/DeleteConfirm';
import BreadcrumbsNav from 'components/BreadcrumbsNav';

const initialConfirmData = {
    show : false,
    message : undefined,
    itemId : undefined,
    itemName : undefined,
    onConfirm : undefined
};

const ShoppingCartContainer = () => {
    const [ serverCartItems, setServerCartItems ] = useState(undefined);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const { state, dispatch } = useContext(ShoppingCartContext);
    const [ confirm, setConfirm ] = useState(initialConfirmData);

    useEffect(() => {
        axios.post(
            '/shopping-cart/items',
            state.map(item => item.id)
        ).then(res => {
            const serverVerifiedItems = res.data;
            const resultItems = state.map(sessionStorageItem => {
                const verifiedItemIdx = serverVerifiedItems.findIndex(serverItem => serverItem.id === sessionStorageItem.id);
                if (verifiedItemIdx === -1) {
                    dispatch({
                        type : REMOVE_ITEM_FROM_SHOPPING_CART,
                        payload : { id : sessionStorageItem.id }
                    });
                    return false;
                } else {
                    return {
                        id : serverVerifiedItems[verifiedItemIdx].id,
                        name : serverVerifiedItems[verifiedItemIdx].name,
                        subName : serverVerifiedItems[verifiedItemIdx].subName,
                        priceSingle : serverVerifiedItems[verifiedItemIdx].priceSingle,
                        quantity : sessionStorageItem.quantity,
                        warehouseCnt : serverVerifiedItems[verifiedItemIdx].warehouseCnt
                    };
                }
            });
            setServerCartItems(resultItems);
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setError(true);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (serverCartItems && serverCartItems.length) {
            const updatedItems = serverCartItems.map(serverCartItem => {
                const stateItem = state.find(item => serverCartItem.id === item.id);
                if (!stateItem) {
                    return false;
                } else {
                    return {
                        ...serverCartItem,
                        quantity : stateItem.quantity
                    };
                }
            }).filter(item => !!item);
            setServerCartItems(updatedItems);
        }
    }, [state]);

    const handleChangeQuantity = (event, item) => {
        const newQuantity = +event.currentTarget.value;
        if (newQuantity <= 0) {
            showItemDeleteConfirm(item.id);
        } else if (newQuantity > item.warehouseCnt) {
            return false;
        } else {
            dispatch({
                type : UPDATE_SHOPPING_CART_ITEM_QUANTITY,
                itemId : item.id,
                quantity : newQuantity
            });
        }
    };

    const showItemDeleteConfirm = id => {
        const itemName = serverCartItems.find(item => item.id === id).name;
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
        loading ?
            <Grid container>
                <Grid item xs={12} style={{ textAlign : 'center' }}>
                    <CircularProgress />
                </Grid>
            </Grid> :
            error ?
                <Alert type="error">Chyba spojení se serverem.</Alert> :
                <>
                    <BreadcrumbsNav items={[{ name : 'Nákupní košík' }]} />
                    <ShoppingCart
                        items={serverCartItems}
                        onChangeQuantity={handleChangeQuantity}
                        onDelete={showItemDeleteConfirm}
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

export default ShoppingCartContainer;