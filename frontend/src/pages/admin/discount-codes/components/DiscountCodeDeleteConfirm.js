import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';

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
    const queryClient = useQueryClient();
    const deleteMutation = useMutation(
        (discountCodeId) => axios({
            method : 'DELETE',
            url : `/admin/discount-codes/${discountCodeId}`,
            headers : {
                'Authorization' : `Bearer ${auth}`
            }
        }),
        {
            onSuccess : () => {
                queryClient.invalidateQueries('admin-discount-codes');
                onSuccess();
            }
        }
    );

    const handleDeleteConfirm = () => deleteMutation.mutate(discountCodeId);

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>Opravdu si přejete smazat kód <strong>{discountCode}</strong>?</DialogTitle>
            { deleteMutation.isError && 
                <DialogContent>
                    <DialogContentText>
                        <Alert type="error">Záznam se nepovedlo smazat!</Alert>
                    </DialogContentText>
                </DialogContent>
            }
            <DialogActions>
                <Button onClick={onClose} color="primary" disabled={deleteMutation.isLoading}>
                    Zrušit
                </Button>
                <Button onClick={handleDeleteConfirm} color="primary" variant="contained" autoFocus disabled={deleteMutation.isLoading}>
                    { deleteMutation.isLoading ? <Loader /> : 'Potvrdit' }
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