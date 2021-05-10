import React, { useState } from 'react';
import { Grid, Hidden } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Button } from '@material-ui/core';

import StockItemListMdUp from './components/StockItemListMdUp';
import StockItemListSmDown from './components/StockItemListSmDown';
import StockItemCreateDialog from '../stock-item-create';
import StockItemEditDialog from '../stock-item-edit';
import useFetchAuth from 'hooks/use-fetch-auth';
import Loader from 'components/Loader';
import Alert from 'components/Alert';
import StockItemDetailDialog from '../stock-item-detail';

const StockItems = () => {
    const [ showCreateDialog, setShowCreateDialog ] = useState(false);
    const [ refetchFlag, setRefetchFlag ] = useState(false);
    const { isLoading, data, error } = useFetchAuth('/admin/stock-items', refetchFlag);
    const [ alertMsg, setAlertMsg ] = useState(undefined);
    const [ stockItemToEdit, setStockItemToEdit ] = useState(undefined);
    const [ stockItemDetail, setStockItemDetail ] = useState(undefined);

    const handleShowCreateDialog = () => setShowCreateDialog(true);

    const handleDialogClose = () => {
        setShowCreateDialog(false);
        setStockItemToEdit(undefined);
        setStockItemDetail(undefined);
    };

    const handleCreateSuccess = () => {
        handleDialogClose();
        setRefetchFlag(prev => !prev);
        setAlertMsg({ type : 'success', message : 'Položka úspěšně vytvořena' });
    };

    const handleEditSuccess = () => {
        handleDialogClose();
        setRefetchFlag(prev => !prev);
        setAlertMsg({ type : 'success', message : 'Položka úspěšně editována' });
    };

    const handleEditClick = itemId => setStockItemToEdit(itemId);

    const handleShowDetailClick = itemId => setStockItemDetail(itemId);

    if (isLoading) {
        return <Loader />;
    } else if (error) {
        return <Alert type='error'>Problém čtení dat ze serveru</Alert>
    }

    return (
        <>    
            <Grid container>
                <Grid item xs={12} style={{ margin : '20px auto 20px 10px', textAlign : 'left' }}>
                    <Button color="primary" variant="contained" onClick={handleShowCreateDialog}>
                        <AddCircleIcon />&nbsp;&nbsp;Přidat skladovou položku
                    </Button>
                </Grid>
                { alertMsg &&
                    <Grid item xs={12}>
                        <Alert type={alertMsg.type}>{alertMsg.message}</Alert>
                    </Grid>
                }
                <Grid item xs={12}>
                    <Hidden mdUp>
                        <StockItemListSmDown 
                            data={data} 
                            onEditClick={handleEditClick}
                            onDetailClick={handleShowDetailClick}
                        />
                    </Hidden>
                    <Hidden smDown>
                        <StockItemListMdUp 
                            data={data}
                            onEditClick={handleEditClick}
                            onDetailClick={handleShowDetailClick}
                        />
                    </Hidden>
                </Grid>
            </Grid>
            { showCreateDialog &&
                <StockItemCreateDialog
                    onClose={handleDialogClose}
                    onSuccess={handleCreateSuccess}
                />
            }
            { stockItemToEdit &&
                <StockItemEditDialog
                    id={stockItemToEdit}
                    onClose={handleDialogClose}
                    onSuccess={handleEditSuccess}
                />
            }
            { stockItemDetail &&
                <StockItemDetailDialog
                    id={stockItemDetail}
                    onClose={handleDialogClose}
                />
            }
        </>
    );
};

export default StockItems;