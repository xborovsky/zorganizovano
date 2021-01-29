import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

import Loader from '../../../../components/Loader';
import Alert from '../../../../components/Alert';
import { AuthContext } from '../../AuthProvider';

const DiscountCodeDeleteConfirm = ({
    onClose,
    discountCodeId,
    discountCode,
    onSuccess
}) => {
    const { auth } = useContext(AuthContext);
    const [ showLoader, setShowLoader ] = useState(false);
    const [ error, setError ] = useState(undefined);

    const handleDeleteConfirm = () => {
        setShowLoader(true);
        setError(undefined);

        axios({
            method : 'DELETE',
            url : `/admin/discount-codes/${discountCodeId}`,
            headers : {
                'Authorization' : `Bearer ${auth}`
            }
        }).then(_res => {
            setShowLoader(false);
            onSuccess();
        }).catch(err => {
            setShowLoader(false);
            setError('Záznam se nepovedlo smazat!');
        });
    };

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>Opravdu si přejete smazat kód <strong>{discountCode}</strong>?</DialogTitle>
            { error && 
                <DialogContent>
                    <DialogContentText>
                        <Alert type="error">{ error }</Alert>
                    </DialogContentText>
                </DialogContent>
            }
            <DialogActions>
                <Button onClick={onClose} color="primary" disabled={showLoader}>
                    Zrušit
                </Button>
                <Button onClick={handleDeleteConfirm} color="primary" variant="contained" autoFocus disabled={showLoader}>
                    { showLoader ? <Loader /> : 'Potvrdit' }
                </Button>
            </DialogActions>
        </Dialog>
    );
};

DiscountCodeDeleteConfirm.propTypes = {
    onClose : PropTypes.func.isRequired,
    discountCodeId : PropTypes.number.isRequired,
    discountCode : PropTypes.string.isRequired,
    onSuccess : PropTypes.func.isRequired
};

export default DiscountCodeDeleteConfirm;