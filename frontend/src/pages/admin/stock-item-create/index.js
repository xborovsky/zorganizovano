import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
import { useQuery } from 'react-query';

import Loader from 'components/Loader';
import StockItemCreateEditForm from './components/StockItemCreateEditForm';
import Alert from 'components/Alert';
import LoadFromTemplateDialog from './components/LoadFromTemplateDialog';
import useStockItemTemplate from './hooks/use-stock-item-template';

const useStyles = makeStyles({
    closeButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        color: '#aaa',
    }
});

const StockItemCreateDialog = ({ 
    onClose,
    onSuccess
 }) => {
    const classes = useStyles();
    const [ alert, setAlert ] = useState(undefined);
    const { isLoading : isLoadingCategories, data : categories, error : categoriesLoadingError } = useQuery('item-categories', () =>
        axios.get('/item-category').then(res => res.data)
    );
    const [ showLoadFromTemplateDialog, setShowLoadFromTemplateDialog ] = useState(false);
    const [ templateId, setTemplateId ] = useState(undefined);
    const { 
        isLoading:isLoadingStockItemTemplate, 
        data:stockItemTemplate, 
        error:stockItemTeamplateFetchError 
    } = useStockItemTemplate(templateId);

    useEffect(() => {
        categoriesLoadingError && setAlert({ type : 'error', message : 'Chyba spojení se serverem.' });
    }, [categoriesLoadingError]);

    useEffect(() => {
        stockItemTeamplateFetchError && setAlert({ type : 'error', message : stockItemTeamplateFetchError });
    }, [stockItemTeamplateFetchError]);

    const handleSubmitError = () => setAlert({ type : 'error', message :'Chyba při ukládání dat.' });

    const handleCreateFromTemplateDialog = () => setShowLoadFromTemplateDialog(true);

    const handleCloseTemplateDialog = () => setShowLoadFromTemplateDialog(false);

    const handleTemplateSelected = templateId => {
        setTemplateId(templateId);
        handleCloseTemplateDialog();
    };

    return (
        <Dialog open={true} onClose={onClose} maxWidth='sm' fullWidth maxWidth='lg'>
            <DialogTitle>
                Nová skladová položka
                <IconButton onClick={onClose} className={classes.closeButton}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12} style={{ margin : '10px auto 10px 10px', textAlign : 'left' }}>
                        <Button color="primary" variant="contained" onClick={handleCreateFromTemplateDialog}>
                            <SaveIcon />&nbsp;&nbsp;Načíst ze šablony
                        </Button>
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom : '10px' }}>
                        { alert && <Alert type={alert.type}>{ alert.message }</Alert> }
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom : '10px' }}>
                        { (isLoadingCategories || isLoadingStockItemTemplate) ?
                            <Loader /> :
                            (categoriesLoadingError || stockItemTeamplateFetchError) ?
                                null :
                                <StockItemCreateEditForm
                                    categories={categories}
                                    onSubmitError={handleSubmitError}
                                    onSubmitSuccess={onSuccess}
                                    stockItem={stockItemTemplate}
                                />
                        }
                    </Grid>
                    <Grid item xs={12}>
                        { alert && <Alert type={alert.type}>{ alert.message }</Alert> }
                    </Grid>
                </Grid>
                { showLoadFromTemplateDialog &&
                    <LoadFromTemplateDialog
                        onClose={handleCloseTemplateDialog}
                        onSelect={handleTemplateSelected}
                    />
                }
            </DialogContent>
        </Dialog>
    );
 };

StockItemCreateDialog.propTypes = {
    onClose : PropTypes.func.isRequired
};

export default StockItemCreateDialog;