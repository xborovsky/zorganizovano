import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@mui/styles';

import AuthDataFetcher from 'pages/admin/components/AuthDataFetcher';
import TodoItemDetail from './TodoItemDetail';
import { QUERY_TODO_ITEM_BY_ID } from '../create-edit-dialog/EditTodoItemDialog';

const useStyles = makeStyles({
    root : {
        margin : '4vh 5vw'
    },
    backLink : {
        fontSize : 15,
        cursor : 'pointer'
    }
});

const TodoItemDetailContainer = () => {
    let { id } = useParams();
    const history = useHistory();
    const classes = useStyles();

    return (
        <AuthDataFetcher queryId={[QUERY_TODO_ITEM_BY_ID, id]} url={`/admin/todo-items/${id}`}>
            { data => (
                <div className={classes.root}>
                    <span onClick={() => history.push("/admin/todo-list")} className={classes.backLink}>
                        <FontAwesomeIcon icon={faArrowCircleLeft} /> Zpět na seznam
                    </span>
                    <TodoItemDetail item={data} />
                </div>
            ) }
        </AuthDataFetcher>
    );
};

export default TodoItemDetailContainer;