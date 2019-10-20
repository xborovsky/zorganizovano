import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const ItemDeleteConfirm = ({
    itemId,
    itemName,
    onClose,
    onConfirm
}) => (
    <Dialog
        open={true}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            Opravdu si přejete odstranit <strong>{itemName}</strong> z košíku?
        </DialogTitle>
        <DialogActions>
            <Button onClick={onClose} color="primary">
                Zrušit
          </Button>
            <Button onClick={() => onConfirm(itemId)} color="primary" autoFocus>
                Potvrdit
          </Button>
        </DialogActions>
    </Dialog>
);

ItemDeleteConfirm.propTypes = {
    itemId : PropTypes.number.isRequired,
    itemName : PropTypes.string.isRequired,
    onClose : PropTypes.func.isRequired,
    onConfirm : PropTypes.func.isRequired
};

export default ItemDeleteConfirm;