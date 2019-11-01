import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

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