import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogTitle, Grid, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useQuery } from 'react-query';

import Loader from 'components/Loader';
import StockItemCreateMultiForm from './components/StockItemCreateMultiForm';
import Alert from 'components/Alert';

const useStyles = makeStyles({
    closeButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        color: '#aaa',
    }
});

const StockItemCreateMultiDialog = ({ 
    onClose,
    onSuccess
 }) => {
    const classes = useStyles();
    const [ alert, setAlert ] = useState(undefined);
    const { isLoading : isLoadingCategories, data : categories, error : categoriesLoadingError } = useQuery('item-categories', () =>
        axios.get('/item-category').then(res => res.data)
    );
    
    useEffect(() => {
        categoriesLoadingError && setAlert({ type : 'error', message : 'Chyba spojení se serverem.' });
    }, [categoriesLoadingError]);

    const handleSubmitError = () => setAlert({ type : 'error', message :'Chyba při ukládání dat.' });

    return (
        <Dialog open={true} onClose={onClose} maxWidth='sm' fullWidth maxWidth='lg'>
            <DialogTitle>
                Nové skladové položky
                <IconButton onClick={onClose} className={classes.closeButton} size="large">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12} style={{ marginBottom : '10px' }}>
                        { alert && <Alert type={alert.type}>{ alert.message }</Alert> }
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom : '10px' }}>
                        { isLoadingCategories ?
                            <Loader /> :
                            categoriesLoadingError ?
                                null :
                                <StockItemCreateMultiForm
                                    categories={categories}
                                    onSubmitError={handleSubmitError}
                                    onSubmitSuccess={onSuccess}
                                />
                        }
                    </Grid>
                    <Grid item xs={12}>
                        { alert && <Alert type={alert.type}>{ alert.message }</Alert> }
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
 };

StockItemCreateMultiDialog.propTypes = {
   onClose : PropTypes.func.isRequired
};

export default StockItemCreateMultiDialog;