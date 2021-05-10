import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Dialog, DialogTitle, IconButton, DialogContent } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import StockItemDetail from './components/StockItemDetail';

const useStyles = makeStyles({
    closeButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        color: '#aaa',
    }
});

const StockItemDetailDialog = ({ 
    id,
    onClose
}) => {
    const classes = useStyles();

    return(
        <Dialog open={true} onClose={onClose} maxWidth='sm' fullWidth maxWidth='lg'>
            <DialogTitle>
                Upravit skladovou položku
                <IconButton onClick={onClose} className={classes.closeButton}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <StockItemDetail id={id} />
            </DialogContent>
        </Dialog>
    );
};

StockItemDetailDialog.propTypes = {
    id : PropTypes.number.isRequired,
    onClose : PropTypes.func.isRequired
};

export default StockItemDetailDialog;