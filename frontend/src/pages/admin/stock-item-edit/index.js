import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogTitle, Grid, IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import Alert from 'components/Alert';
import Loader from 'components/Loader';
import useFetch from 'hooks/use-fetch';
import useFetchAuth from 'hooks/use-fetch-auth';
import StockItemCreateEditForm from '../stock-item-create/components/StockItemCreateEditForm';

const useStyles = makeStyles({
    closeButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        color: '#aaa',
    }
});

const StockItemEditDialog = ({ 
    id,
    onClose,
    onSuccess
}) => {
    const classes = useStyles();
    const [ alert, setAlert ] = useState(undefined);
    const { isLoading : isLoadingCategories, data : categories, error : categoriesLoadingError } = useFetch('/item-category');
    const { isLoading, data, error:fetchError } = useFetchAuth(`/admin/stock-items/${id}`);

    useEffect(() => {
        if (categoriesLoadingError || fetchError) {
            setAlert({ type : 'error', message : 'Chyba čtení dat ze serveru' });
        }
    }, [categoriesLoadingError, fetchError]);

    const handleSubmitError = () => setAlert({ type : 'error', message :'Chyba při ukládání dat.' });

    return (
        <Dialog open={true} onClose={onClose} maxWidth='sm' fullWidth maxWidth='lg'>
            <DialogTitle>
                Upravit skladovou položku
                <IconButton onClick={onClose} className={classes.closeButton}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12} style={{ marginTop : 10, marginBottom : 10 }}>
                        { alert && <Alert type={alert.type}>{ alert.message }</Alert> }
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom : 10 }}>
                        { isLoadingCategories || isLoading ?
                            <Loader /> :
                            categoriesLoadingError || fetchError ?
                                null :
                                <StockItemCreateEditForm
                                    stockItem={data}
                                    categories={categories}
                                    onSubmitError={handleSubmitError}
                                    onSubmitSuccess={onSuccess}
                                />
                        }
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom : 10 }}>
                        { alert && <Alert type={alert.type}>{ alert.message }</Alert> }
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

StockItemEditDialog.propTypes = {
    id : PropTypes.number.isRequired,
    onClose : PropTypes.func.isRequired,
    onSuccess : PropTypes.func.isRequired
};

export default StockItemEditDialog;