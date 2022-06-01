import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const ConfirmDialog = ({
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
            <Button onClick={onConfirm} color="primary" autoFocus>
                <strong>Potvrdit</strong>
          </Button>
        </DialogActions>
    </Dialog>
);

ConfirmDialog.propTypes = {
    onClose : PropTypes.func.isRequired,
    onConfirm : PropTypes.func.isRequired
};

export default ConfirmDialog;