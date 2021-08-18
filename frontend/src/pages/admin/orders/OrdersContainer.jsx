import React, { useState, useContext } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';


import AuthDataFetcher from '../components/AuthDataFetcher';
import OrdersTable from './components/OrdersTable';
import { AuthContext } from '../AuthProvider';
import Alert from '../../../components/Alert';
import ActionButtons from './components/ActionButtons';
import OrdersTableLegend from './components/OrdersTableLegend';

const useStyles = makeStyles(theme => ({
    filtersContainer : {
        width: '95vw',
        overflowX: 'auto',
        margin : '20px auto'
    },
    orderTableLegend : {
        margin : '1rem auto 1rem',
        width : '95vw',
        [theme.breakpoints.up('sm')] : {
            width : '75vw'
        },
        [theme.breakpoints.up('md')] : {
            width : '65vw'
        },
        [theme.breakpoints.up('lg')] : {
            width : '50vw'
        }
    }
}));

const OrdersContainer = () => {
    const classes = useStyles();
    const [ showShipped, setShowShipped ] = useState(false);
    const [ showStorno, setShowStorno ] = useState(false);
    const { auth } = useContext(AuthContext);
    const [ isGenerateReportProgress, setGenerateReportProgress ] = useState(false);
    const [ isGenerateZasilkovnaCSVProgress, setGenerateZasilkovnaCSVProgress ] = useState(false);
    const [ reportErrorMsg, setReportErrorMsg ] = useState(undefined);
    const [ checkedOrderIds, setCheckedOrderIds ] = useState([]);

    const handleOrderCheckboxClick = orderNum => e => {
        if (e.currentTarget.checked) {
            setCheckedOrderIds([...checkedOrderIds, orderNum]);
        } else {
            setCheckedOrderIds(checkedOrderIds.filter(on => on !== orderNum));
        }
    };

    const handleGenerateReportClicked = () => {
        setGenerateReportProgress(true);
        setReportErrorMsg(undefined);

        axios({
            method : 'POST',
            url : '/admin/orders/report',
            data : {
                orderIds : checkedOrderIds
            },
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

    const handleGenerateZasilkovnaCSV = () => {
        setGenerateZasilkovnaCSVProgress(true);
        setReportErrorMsg(undefined);

        axios({
            method : 'POST',
            url : '/admin/orders/zasilkovna-csv',
            data : {
                orderIds : checkedOrderIds
            },
            headers : {
                'Authorization' : `Bearer ${auth}`
            },
            responseType: "blob"
        }).then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "zasilkovna-csv.csv");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            setGenerateZasilkovnaCSVProgress(false);
        })
        .catch(err => {
            console.error(err);
            setGenerateZasilkovnaCSVProgress(false);
            setReportErrorMsg('CSV pro zásilkovnu se nepodařilo stáhnout.');
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

                { checkedOrderIds.length > 0 &&
                    <ActionButtons
                        onGenerateReportClicked={handleGenerateReportClicked}
                        isGenerateReportProgress={isGenerateReportProgress}
                        onGenerateZasilkovnaCSVClicked={handleGenerateZasilkovnaCSV}
                        isGenerateZasilkovnaCSVProgress={isGenerateZasilkovnaCSVProgress}
                    />
                }
            </FormGroup>

            { reportErrorMsg && <Alert type="error">{reportErrorMsg}</Alert> }

            <AuthDataFetcher queryId={['admin-orders', showShipped, showStorno]} url={`/admin/orders?shipped=${showShipped}&storno=${showStorno}`}>
                { data => (
                    <OrdersTable 
                        orders={data}
                        checkedOrderIds={checkedOrderIds}
                        onOrderCheckboxClick={handleOrderCheckboxClick}
                    />
                ) }
            </AuthDataFetcher>

            <OrdersTableLegend className={classes.orderTableLegend} />
        </>
    );
};

export default OrdersContainer;