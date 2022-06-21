import React from 'react';

import useFetchAuth from 'hooks/use-fetch-auth';
import Loader from 'components/Loader';
import Alert from 'components/Alert';
import TodoItems from './components/TodoItems';

export const QUERY_TODO_ITEMS = 'todo-items';

const TodoItemList = () => {
    const { data, isLoading, error, refetch } = useFetchAuth(QUERY_TODO_ITEMS, '/admin/todo-items');

    if (isLoading) {
        return <Loader />;
    } else if (error) {
        return <Alert type='error'>Problém čtení dat ze serveru</Alert>
    }

    return (
        <TodoItems
            items={data}
            onRefetchRequested={refetch}
        />
    );
};

export default TodoItemList;