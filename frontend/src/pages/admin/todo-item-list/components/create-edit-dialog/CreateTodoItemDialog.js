import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import { QUERY_TODO_ITEMS } from '../..';
import { AuthContext } from 'pages/admin/AuthProvider';
import CreateEditTodoItemDialog from '.';

const CreateTodoItemDialog = ({
    onClose,
    onCreateSuccess
}) => {
    const [ errorMsg, setErrorMsg ] = useState(undefined);
    const { auth } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const createMutation = useMutation(
        (postData) => axios({
            method : 'PUT',
            url : `/admin/todo-items`,
            headers : {
                'Authorization' : `Bearer ${auth}`
            },
            data : postData
        }),
        {
            onSuccess : res => {
                queryClient.invalidateQueries(QUERY_TODO_ITEMS);
                onCreateSuccess(res.data)
            },
            onError : () => {
                 // TODO server errors!
                setErrorMsg('Formulář se nepodařilo odeslat.');
            }
        }
    );

    const handleFormSubmit = values => createMutation.mutate(values);

    return (
        <CreateEditTodoItemDialog
            onClose={onClose}
            onSubmit={handleFormSubmit}
            errorMsg={errorMsg}
            isSubmitLoading={createMutation.isLoading}
        />
    );
};

CreateTodoItemDialog.propTypes = {
    onClose : PropTypes.func.isRequired,
    onCreateSuccess : PropTypes.func.isRequired
};

export default CreateTodoItemDialog;