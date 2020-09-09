import React, { useState, useContext } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import AuthDataFetcher from '../components/AuthDataFetcher';
import OrdersTable from './components/OrdersTable';
import { AuthContext } from '../AuthProvider';
import Alert from '../../../components/Alert';

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
    const { auth } = useContext(AuthContext);
    const [ isGenerateReportProgress, setGenerateReportProgress ] = useState(false);
    const [ reportErrorMsg, setReportErrorMsg ] = useState(undefined);

    const handleGenerateReportClicked = () => {
        setGenerateReportProgress(true);
        setReportErrorMsg(undefined);

        axios({
            method : 'GET',
            url : '/admin/orders/report',
            headers : {
                'Authorization' : `Bearer ${auth}`
            },
            responseType: "blob"
        }).then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "report.pdf");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            setGenerateReportProgress(false);
        })
        .catch(err => {
            console.error(err);
            setGenerateReportProgress(false);
            setReportErrorMsg('Report se nepodařilo stáhnout.');
        });
    };

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

                <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={handleGenerateReportClicked}
                    disabled={isGenerateReportProgress}>
                    { isGenerateReportProgress ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Stáhnout report' }
                </Button>
            </FormGroup>

            { reportErrorMsg && <Alert type="error">{reportErrorMsg}</Alert> }

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