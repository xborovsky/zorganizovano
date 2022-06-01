import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import Alert from '../../../../components/Alert';
import { todoItemListRowPropTypes } from '../prop-types/todo-items.prop-types';
import TodoItemsTable from './todo-items-table/TodoItemsTable';
import ConfirmDialog from 'components/ConfirmDialog';
import EditTodoItemDialog from './create-edit-dialog/EditTodoItemDialog';
import { AuthContext } from 'pages/admin/AuthProvider';
import { QUERY_TODO_ITEMS } from '..';
import CreateTodoItemDialog from './create-edit-dialog/CreateTodoItemDialog';

const TodoItems = ({ 
    items,
    onRefetchRequested
}) => {
    const { auth } = useContext(AuthContext);
    const [ alertMsg, setAlertMsg ] = useState(undefined);
    const [ showCreateDialog, setShowCreateDialog ] = useState(false);
    const [ showEditDialog, setShowEditDialog ] = useState(false);
    const [ showDeleteDialog, setShowDeleteDialog ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState(undefined);
    const [ deleteErrorMsg, setDeleteErrorMsg ] = useState(undefined);
    const history = useHistory();

    const queryClient = useQueryClient();
    const deleteMutation = useMutation(
        () => axios({
            method : 'DELETE',
            url : `/admin/todo-items/${selectedItem.id}`,
            headers : {
                'Authorization' : `Bearer ${auth}`
            }
        }),
        {
            onSuccess : res => {
                queryClient.invalidateQueries(QUERY_TODO_ITEMS);
                handleSuccess('Položka úspěšně smazána.');
            },
            onError : () => {
                setDeleteErrorMsg('Formulář se nepodařilo odeslat.');
            }
        }
    );

    const handleCreateClick = () => {
        setAlertMsg(undefined);
        setShowCreateDialog(true);
    };

    const handleCreateSuccess = () => handleSuccess('Položka úspěšně vytvořena.');

    const handleDeleteClick = (id, itemName) => e => {
        setAlertMsg(undefined);
        setSelectedItem({ id, itemName });
        setShowDeleteDialog(true);
    };

    const handleDeleteConfirm = () => deleteMutation.mutate();

    const handleEditClick = id => e => {
        setAlertMsg(undefined);
        setShowEditDialog(true);
        setSelectedItem({ id });
    };

    const handleDetailClick = id => {
        history.push(`/admin/todo-list/${id}`);
    };

    const handleEditSuccess = () => handleSuccess('Položka úspěšně upravena.');

    const handleSuccess = msg => {
        setAlertMsg({ type : 'success', message : msg });
        hideAllDialogs();
        onRefetchRequested();
    };

    const hideAllDialogs = () => {
        setShowCreateDialog(false);
        setShowEditDialog(false);
        setShowDeleteDialog(false);
        setSelectedItem(undefined);
    };

    return (
        <Grid container>
            <Grid item xs={12} style={{ margin : '20px auto 20px 10px', textAlign : 'left' }}>
                <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={handleCreateClick}>
                    <AddCircleOutlineIcon />&nbsp;&nbsp;Vytvořit nový
                </Button>
            </Grid>
            <Grid item xs={12} style={{ margin : '0 2rem'  }}>
                { alertMsg && <Alert type={alertMsg.type}>{alertMsg.message}</Alert> }
            </Grid>
            <Grid item xs={12}>
                <TodoItemsTable 
                    items={items}
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDeleteClick}
                    onDetailClick={handleDetailClick}
                />

                { showDeleteDialog && 
                    <ConfirmDialog 
                        onClose={hideAllDialogs} 
                        onConfirm={handleDeleteConfirm}
                        errorMsg={deleteErrorMsg}
                    >
                        Opravdu si přejete odstranit položku <strong>"{selectedItem.itemName}"</strong>?
                    </ConfirmDialog>
                }

                { showCreateDialog &&
                    <CreateTodoItemDialog
                        onClose={hideAllDialogs}
                        onCreateSuccess={handleCreateSuccess}
                    />
                }

                { showEditDialog &&
                    <EditTodoItemDialog
                        itemId={selectedItem.id}
                        onClose={hideAllDialogs}
                        onEditSuccess={handleEditSuccess}
                    />
                }
            </Grid>
        </Grid>
    );
};

TodoItems.propTypes = {
    items : todoItemListRowPropTypes,
    onRefetchRequested : PropTypes.func.isRequired
};

export default TodoItems;