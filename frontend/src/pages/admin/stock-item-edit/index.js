import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogTitle, Grid, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

import Alert from 'components/Alert';
import Loader from 'components/Loader';
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
    const { isLoading : isLoadingCategories, data : categories, error : categoriesLoadingError } = useQuery('item-categories', () =>
        axios.get('/item-category').then(res => res.data)
    );
    const { isLoading, data, error:fetchError } = useFetchAuth(['admin-stock-item', id], `/admin/stock-items/${id}`);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (categoriesLoadingError || fetchError) {
            setAlert({ type : 'error', message : 'Chyba čtení dat ze serveru' });
        }
    }, [categoriesLoadingError, fetchError]);

    const handleSubmitError = () => setAlert({ type : 'error', message :'Chyba při ukládání dat.' });

    const handleSuccess = () => {
        queryClient.invalidateQueries(['admin-stock-item', id]);
        onSuccess();
    };

    return (
        <Dialog open={true} onClose={onClose} maxWidth='sm' fullWidth maxWidth='lg'>
            <DialogTitle>
                Upravit skladovou položku
                <IconButton onClick={onClose} className={classes.closeButton} size="large">
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
                                    onSubmitSuccess={handleSuccess}
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