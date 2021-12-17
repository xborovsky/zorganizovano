import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';

import Loader from 'components/Loader';
import Alert from 'components/Alert';
import { AuthContext } from 'pages/admin/AuthProvider';

const AdminNote = ({ 
    orderId,
    orderAdminNote, 
    onChangeSuccess 
}) => {
    const [ adminNote, setAdminNote ] = useState(undefined);
    const [ adminNoteChanged, setAdminNoteChanged ] = useState(false);
    const [ showLoader, setShowLoader ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState(undefined);
    const { auth, logout } = useContext(AuthContext);

    useEffect(() => {
        orderAdminNote && setAdminNote(orderAdminNote);
    }, [orderAdminNote]);

    const handleChange = e => {
        setAdminNote(e.currentTarget.value);
        setAdminNoteChanged(true);
    };

    const handleSave = () => {
        setShowLoader(true);
        axios({
            method : 'POST',
            url : `/admin/orders/${orderId}/adminNote`,
            headers : {
                'Authorization' : `Bearer ${auth}`
            },
            data : { adminNote }
        }).then(res => {
            onChangeSuccess();
            setShowLoader(false);
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                logout();
            }
            console.error(error);
            setErrorMessage('Ups, něco se pokazilo!');
            setShowLoader(false);
        });
    };

    return (
        <>
            { errorMessage && <Alert type='error'>{errorMessage}</Alert> }
            <TextField
                id="note"
                name="note"
                label="Poznámka"
                fullWidth
                multiline
                rows={4}
                value={adminNote}
                onChange={handleChange}
                margin="normal"
                variant='outlined'
            />
            <Button
                variant="contained"
                color="primary"
                disabled={!adminNoteChanged || showLoader}
                type="button"
                onClick={handleSave}>
                    { showLoader ? <Loader /> : 'Uložit' }
            </Button>
        </>
    );
};

AdminNote.propTypes = {
    orderId : PropTypes.number.isRequired,
    orderAdminNote : PropTypes.string,
    onChangeSuccess : PropTypes.func.isRequired
};

export default AdminNote;