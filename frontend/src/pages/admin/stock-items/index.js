import React, { useState } from 'react';
import { Grid, Hidden } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Button } from '@material-ui/core';
import { useQueryClient } from 'react-query';

import StockItemListMdUp from './components/StockItemListMdUp';
import StockItemListSmDown from './components/StockItemListSmDown';
import StockItemCreateDialog from '../stock-item-create';
import StockItemEditDialog from '../stock-item-edit';
import useFetchAuth from 'hooks/use-fetch-auth';
import Loader from 'components/Loader';
import Alert from 'components/Alert';
import StockItemDetailDialog from '../stock-item-detail';
import { removeAccents } from 'util/string-util';
import StockItemCreateMultiDialog from '../stock-item-create-multi';

const StockItems = () => {
    const [ showCreateDialog, setShowCreateDialog ] = useState(false);
    const [ showCreateMultipleDialog, setShowCreateMultipleDialog ] = useState(false);
    const { data, isLoading, error, refetch } = useFetchAuth('admin-stock-items', '/admin/stock-items');
    const queryClient = useQueryClient();
    const [ alertMsg, setAlertMsg ] = useState(undefined);
    const [ stockItemToEdit, setStockItemToEdit ] = useState(undefined);
    const [ stockItemDetail, setStockItemDetail ] = useState(undefined);
    const [ rowsPerPage, setRowsPerPage ] = useState(10);
    const [ page, setPage ] = useState(0);
    const [ searchFilter, setSearchFilter ] = useState('');
    const stockItemsFiltered = data?.filter(si => searchFilter.length === 0 ? true : removeAccents(si.name.toLowerCase()).includes(removeAccents(searchFilter.toLowerCase())));

    const handleSearchFilterChange = e => setSearchFilter(e.currentTarget.value);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleShowCreateDialog = () => setShowCreateDialog(true);

    const handleDialogClose = () => {
        setShowCreateDialog(false);
        setShowCreateMultipleDialog(false);
        setStockItemToEdit(undefined);
        setStockItemDetail(undefined);
    };

    const handleShowCreateMultipleDialog = () => setShowCreateMultipleDialog(true);

    const handleCreateSuccess = () => {
        handleDialogClose();
        queryClient.invalidateQueries('admin-stock-items');
        refetch();
        setAlertMsg({ type : 'success', message : 'Položka úspěšně vytvořena' });
    };

    const handleEditSuccess = () => {
        handleDialogClose();
        queryClient.invalidateQueries('admin-stock-items');
        refetch();
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
                        <AddCircleIcon />&nbsp;&nbsp;Přidat položku
                    </Button>
                    &nbsp;&nbsp;
                    <Button color="primary" variant="contained" onClick={handleShowCreateMultipleDialog}>
                        <AddCircleIcon />&nbsp;&nbsp;Přidat hromadně
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
                            data={stockItemsFiltered} 
                            searchFilter={searchFilter}
                            onSearchFilterChange={handleSearchFilterChange}
                            onEditClick={handleEditClick}
                            onDetailClick={handleShowDetailClick}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            onPageChange={handleChangePage}
                        />
                    </Hidden>
                    <Hidden smDown>
                        <StockItemListMdUp 
                            data={stockItemsFiltered} 
                            searchFilter={searchFilter}
                            onSearchFilterChange={handleSearchFilterChange}
                            onEditClick={handleEditClick}
                            onDetailClick={handleShowDetailClick}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            onPageChange={handleChangePage}
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
            { showCreateMultipleDialog &&
                <StockItemCreateMultiDialog
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