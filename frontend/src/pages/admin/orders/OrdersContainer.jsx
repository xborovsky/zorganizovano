import React, { useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import { makeStyles } from '@material-ui/core';

import AuthDataFetcher from '../components/AuthDataFetcher';
import OrdersTable from './components/OrdersTable';

const useStyles = makeStyles(theme => ({
    filtersContainer : {
        width: '95vw',
        overflowX: 'auto',
        margin : '20px auto'
    }
}));

const OrdersContainer = () => {
    const classes = useStyles();
    const [ showShipped, setShowShipped ] = useState(false);
    const [ showStorno, setShowStorno ] = useState(false);

    return (
        <>
            <FormGroup row className={classes.filtersContainer}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={showShipped}
                            onChange={() => setShowShipped(prev => !prev)}
                            value="showShipped"
                            color="primary"
                        />
                    }
                    label="Zobrazit odeslané"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={showStorno}
                            onChange={() => setShowStorno(prev => !prev)}
                            value="showStorno"
                            color="primary"
                        />
                    }
                    label="Zobrazit storno"
                />
            </FormGroup>

            <AuthDataFetcher url={`/admin/orders?shipped=${showShipped}&storno=${showStorno}`}>
                { data => (
                    <>

                        <OrdersTable orders={data} />
                    </>
                ) }
            </AuthDataFetcher>
        </>
    );
};

export default OrdersContainer;