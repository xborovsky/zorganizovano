import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { AuthContext } from '../../AuthProvider';
import { Hidden } from '@material-ui/core';
import StockItemMdUp from './StockItemMdUp';
import StockItemSmDown from './StockItemSmDown';
import { StockItemContext } from './StockItemContext';

const StockItemContainer = ({ 
    id,
    itemId,
    name,
    quantity,
    rowNum
 }) => {
    const { auth } = useContext(AuthContext);
    const [ prevQuantity, setPrevQuantity ] = useState(quantity);
    const [ localQuantity, setLocalQuantity ] = useState(quantity);
    const [ showSaveCancel, setShowSaveCancel ] = useState(false);
    const [ showSaveProgress, setShowSaveProgress ] = useState(false);
    const [ error, setError ] = useState(undefined);
    const [ showSuccess, setShowSuccess ] = useState(false);

    useEffect(() => {
        setPrevQuantity(quantity);
        setLocalQuantity(quantity);
    }, [quantity]);

    const handleChangeLocalQuantity = newVal => {
        setLocalQuantity(newVal);
        setShowSaveCancel(true);
        setShowSuccess(false);
        setError(undefined);
    };

    const handleSaveClick = () => {
        setShowSuccess(false);
        setError(undefined);
        setShowSaveProgress(true);

        axios({
            method : 'POST',
            url : `/admin/stock-items/${id}`,
            data : {
                quantity : localQuantity
            },
            headers : {
                'Authorization' : `Bearer ${auth}`
            }
        }).then(_res => {
            setPrevQuantity(localQuantity);
            setShowSaveProgress(false);
            setShowSaveCancel(false);
            setShowSuccess(true);
        }).catch(err => {
            setShowSaveProgress(false);
            setError('Záznam se nepovedlo uložit!');
        });
        setShowSaveCancel(false);
    };

    const handleCancelClick = () => {
        setLocalQuantity(prevQuantity);
        setShowSaveCancel(false);
    };

    return (
        <StockItemContext.Provider value={{ showSaveCancel, showSaveProgress, error, showSuccess }}>
            <Hidden smDown>
                <StockItemMdUp
                    itemId={itemId}
                    name={name}
                    quantity={localQuantity}
                    rowNum={rowNum}
                    onSaveClick={handleSaveClick}
                    onCancelClick={handleCancelClick}
                    onQuantityChange={handleChangeLocalQuantity}
                />
            </Hidden>
            <Hidden mdUp>
                <StockItemSmDown
                    itemId={itemId}
                    name={name}
                    quantity={localQuantity}
                    onSaveClick={handleSaveClick}
                    onCancelClick={handleCancelClick}
                    onQuantityChange={handleChangeLocalQuantity}

                />
            </Hidden>
        </StockItemContext.Provider>
    );
};

StockItemContainer.propTypes = {
    data : PropTypes.shape({
        id : PropTypes.number.isRequired,
        itemId : PropTypes.number.isRequired,
        name : PropTypes.string.isRequired,
        quantity : PropTypes.number.isRequired,
        rowNum : PropTypes.number.isRequired
    })
};

export default StockItemContainer;