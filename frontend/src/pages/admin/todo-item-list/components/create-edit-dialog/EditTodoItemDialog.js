import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import { AuthContext } from 'pages/admin/AuthProvider';
import CreateEditTodoItemDialog from '.';
import useFetchAuth from 'hooks/use-fetch-auth';
import { QUERY_TODO_ITEMS } from '../..';

export const QUERY_TODO_ITEM_BY_ID = 'todo-items-by-id';

const EditTodoItemDialog = ({
    itemId,
    onClose,
    onEditSuccess
}) => {
    const { data, isLoading, error } = useFetchAuth([QUERY_TODO_ITEM_BY_ID, itemId], `/admin/todo-items/${itemId}`);
    const [ errorMsg, setErrorMsg ] = useState(undefined);
    const { auth } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const editMutation = useMutation(
        (postData) => axios({
            method : 'POST',
            url : `/admin/todo-items/${itemId}`,
            headers : {
                'Authorization' : `Bearer ${auth}`
            },
            data : postData
        }),
        {
            onSuccess : res => {
                queryClient.invalidateQueries(QUERY_TODO_ITEMS);
                queryClient.invalidateQueries(QUERY_TODO_ITEM_BY_ID);
                onEditSuccess(res.data)
            },
            onError : () => {
                 // TODO server errors!
                setErrorMsg('Formulář se nepodařilo odeslat.');
            }
        }
    );

    useEffect(() => {
        error && setErrorMsg('Problém načítání dat...');
    }, [error]);

    const handleFormSubmit = values => editMutation.mutate(values);

    return (
        <CreateEditTodoItemDialog
            onClose={onClose}
            onSubmit={handleFormSubmit}
            errorMsg={errorMsg}
            isDataLoading={isLoading}
            isSubmitLoading={editMutation.isLoading}
            item={data}
        />
    );
};

EditTodoItemDialog.propTypes = {
    itemId : PropTypes.number.isRequired,
    onClose : PropTypes.func.isRequired,
    onCreateSuccess : PropTypes.func.isRequired
};

export default EditTodoItemDialog;