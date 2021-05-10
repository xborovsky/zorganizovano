import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Hidden } from '@material-ui/core';

import { AuthContext } from '../../AuthProvider';
import StockItemMdUp from './StockItemMdUp';
import StockItemSmDown from './StockItemSmDown';
import { StockItemContext } from './StockItemContext';

const StockItemContainer = ({ 
    id,
    itemId,
    name,
    quantity,
    rowNum,
    onEditClick,
    onDetailClick
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

    const handleChangeLocalQuantity = e => {
        setLocalQuantity(+e.currentTarget.value);
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
            url : `/admin/stock-items/${id}/quantity`,
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
                    itemId={id}
                    name={name}
                    quantity={localQuantity}
                    rowNum={rowNum}
                    onSaveClick={handleSaveClick}
                    onCancelClick={handleCancelClick}
                    onQuantityChange={handleChangeLocalQuantity}
                    onEditClick={e => onEditClick(id)}
                    onDetailClick={e => onDetailClick(id)}
                />
            </Hidden>
            <Hidden mdUp>
                <StockItemSmDown
                    itemId={id}
                    name={name}
                    quantity={localQuantity}
                    onSaveClick={handleSaveClick}
                    onCancelClick={handleCancelClick}
                    onQuantityChange={handleChangeLocalQuantity}
                    onEditClick={e => onEditClick(id)}
                    onDetailClick={e => onDetailClick(id)}
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
    }),
    onEditClick : PropTypes.func.isRequired,
    onDetailClick : PropTypes.func.isRequired
};

export default StockItemContainer;