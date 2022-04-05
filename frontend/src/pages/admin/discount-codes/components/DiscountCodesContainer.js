import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, Grid } from '@mui/material';

import Alert from '../../../../components/Alert';
import DiscountCodesTable from './DiscountCodesTable';
import DiscountCodeDeleteConfirm from './DiscountCodeDeleteConfirm';
import CreateDiscountCodeModal from './CreateDiscountCodeModal';

const DiscountCodesContainer = ({ discountCodes }) => {

    const [ alertMsg, setAlertMsg ] = useState(undefined);
    const [ discountCodesLocal, setDiscountCodesLocal ] = useState(discountCodes);
    const [ discountCodeToDelete, setDiscountCodeToDelete ] = useState(undefined);
    const [ showCreateDiscountCodeModal, setShowCreateDiscountCodeModal ] = useState(false);

    useEffect(() => { 
        setDiscountCodesLocal(discountCodes); 
    }, [ discountCodes ]);

    const handleDeleteClick = (id, code) => e => {
        setAlertMsg(undefined);
        setDiscountCodeToDelete({id, code});
    };

    const handleDeleteCancel = () => setDiscountCodeToDelete(undefined);

    const handleDeleteSuccess = () => {
        setDiscountCodesLocal(prev => prev.filter(dc => dc.id !== discountCodeToDelete.id));
        setAlertMsg({ type : 'success', message : 'Slevový kód byl úspěšně odstraněn.' });
        setDiscountCodeToDelete(undefined);
    };

    const handleCreateDiscountCodeClick = () => setShowCreateDiscountCodeModal(true);

    const handleCreateDiscountCodeClose = () => setShowCreateDiscountCodeModal(false);

    const handleCreateDiscountCodeSuccess = createdDiscountCode => {
        setDiscountCodesLocal(prev => {
            const newDiscountCodes = [...prev, createdDiscountCode];
            newDiscountCodes.sort((a, b) => a.validUntil < b.validUntil);
            return newDiscountCodes;
        });
        setShowCreateDiscountCodeModal(false);
        setAlertMsg({ type : 'success', message :'Slevový kód byl úspěšně přidán.' });
    };

    return (
        <Grid container>
            <Grid item xs={12} style={{ margin : '20px auto 20px 10px', textAlign : 'left' }}>
                <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={handleCreateDiscountCodeClick}>
                    <AddCircleOutlineIcon />&nbsp;&nbsp;Vytvořit nový
                </Button>
            </Grid>
            <Grid item xs={12} style={{ margin : '0 2rem'  }}>
                { alertMsg && <Alert type={alertMsg.type}>{alertMsg.message}</Alert> }
            </Grid>
            <Grid item xs={12}>
                <DiscountCodesTable
                    discountCodes={discountCodesLocal} 
                    onDelete={handleDeleteClick}
                />

                { discountCodeToDelete &&
                    <DiscountCodeDeleteConfirm
                        discountCodeId={discountCodeToDelete.id}
                        discountCode={discountCodeToDelete.code}
                        onClose={handleDeleteCancel}
                        onSuccess={handleDeleteSuccess}
                    />
                }
                { showCreateDiscountCodeModal &&
                    <CreateDiscountCodeModal
                        onClose={handleCreateDiscountCodeClose}
                        onSuccess={handleCreateDiscountCodeSuccess}
                    />
                }
            </Grid>
        </Grid>
    );
};

DiscountCodesContainer.propTypes = {
    discountCodes : PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.number.isRequired,
        code : PropTypes.string.isRequired,
        discount : PropTypes.number.isRequired,
        validUntil : PropTypes.any,
        oneTime : PropTypes.bool,
        used : PropTypes.bool,
        percentage : PropTypes.bool
    }))
};

export default DiscountCodesContainer;