import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress, TextField } from '@material-ui/core';
import axios from 'axios';

import { AuthContext } from 'pages/admin/AuthProvider';

const TrackingNumberInput = ({ 
    orderId,
    onSuccess,
    onError
}) => {
    const { auth, logout } = useContext(AuthContext);
    const [ showLoader, setShowLoader ] = useState(false);
    const [ value, setValue ] = useState('');

    const handleChange = e => setValue(e.currentTarget.value);

    const handleBlur = e => setValue(e.currentTarget.value.trim());

    const handleSubmit = e => {
        console.log(value);
        e.preventDefault();
        setShowLoader(true);
        axios({
            method : 'POST',
            url : `/admin/orders/${orderId}/shipped`,
            headers : {
                'Authorization' : `Bearer ${auth}`
            },
            data : {
                trackingNumber : value
            }
        })
            .then(res => {
                setShowLoader(false);
                onSuccess(res.data);
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    logout();
                }
                onError();
                setShowLoader(false);
            });
    };

    return (
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField 
                variant="outlined"
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Sledovací číslo zásilky"
                size="small"
            />
             <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginTop : 3, marginLeft : 10 }}
                disabled={showLoader || value.trim().length === 0}>
                    { showLoader ?
                        <CircularProgress /> :
                        <>Uložit</>
                    }
            </Button>
        </form>
    );
};

TrackingNumberInput.propTypes = {
    orderId : PropTypes.number.isRequired,
    onSuccess : PropTypes.func.isRequired,
    onError : PropTypes.func.isRequired
};

export default TrackingNumberInput;