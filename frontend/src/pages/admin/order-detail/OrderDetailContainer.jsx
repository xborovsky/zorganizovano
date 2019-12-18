import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core/styles';

import AuthDataFetcher from '../components/AuthDataFetcher';
import OrderDetail from './components/OrderDetail';

const useStyles = makeStyles({
    root : {
        margin : '4vh 5vw'
    },
    backLink : {
        fontSize : 15,
        cursor : 'pointer'
    }
});

const OrderDetailContainer = () => {
    let { id } = useParams();
    const history = useHistory();
    const classes = useStyles();

    return (
        <AuthDataFetcher url={`/admin/orders/${id}`}>
            { data => (
                <div className={classes.root}>
                    <span onClick={() => history.push("/admin/orders")} className={classes.backLink}>
                        <FontAwesomeIcon icon={faArrowCircleLeft} /> Zpět na seznam
                    </span>
                    <OrderDetail order={data} />
                </div>
            ) }
        </AuthDataFetcher>
    );
};

export default OrderDetailContainer;