import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const DeleteConfirm = ({
    itemId,
    onClose,
    onConfirm,
    children
}) => (
    <Dialog
        open={true}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">{ children }</DialogTitle>
        <DialogActions>
            <Button onClick={onClose} color="primary">
                <strong>Zrušit</strong>
          </Button>
            <Button onClick={() => onConfirm(itemId)} color="primary" autoFocus>
                <strong>Potvrdit</strong>
          </Button>
        </DialogActions>
    </Dialog>
);

DeleteConfirm.propTypes = {
    itemId : PropTypes.number,
    onClose : PropTypes.func.isRequired,
    onConfirm : PropTypes.func.isRequired
};

export default DeleteConfirm;