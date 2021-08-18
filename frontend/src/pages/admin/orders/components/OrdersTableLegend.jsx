import React from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { OrderState } from './OrderState';
import { LONG_PAYMENT_WAITING } from './OrdersTableRow';

const useStyles = makeStyles({
    container : {
        padding : '1rem'
    },
    legendItem : {
        '&.storno' : {
            '&>div' : {
                background : OrderState.STORNO.color
            }
        },
        '&.shipped' : {
            '&>div' : {
                background : OrderState.SHIPPED.color
            }
        },
        '&.longPaymentWaiting' : {
            '&>div' : {
                background : OrderState.LONG_PAYMENT_WAITING.color
            }
        },
        '&.paymentReceived' : {
            '&>div' : {
                background : OrderState.PAYMENT_RECEIVED.color
            }
        },
        '&>div' : {
            width : 20,
            height : 20,
            marginRight : 20,
            display : 'inline-block',
            borderRadius : 10
        },
        '&>p' : {
            display : 'inline-block',
            verticalAlign : 'super'
        }
    }
});

const LegendItem = ({ children, ...rest }) => (
    <Grid item xs={12} sm={6} {...rest}>
        <div></div>
        <Typography variant="body2">{ children }</Typography>
    </Grid>
);

const OrdersTableLegend = ({ ...rest }) => {
    const classes = useStyles();
    
    return (
        <Paper {...rest}>
            <Grid container className={classes.container}>
                <LegendItem className={[classes.legendItem, 'shipped'].join(' ')}>
                    Odesláno
                </LegendItem>
                <LegendItem className={[classes.legendItem, 'paymentReceived'].join(' ')}>
                    Platba přijata
                </LegendItem>
                <LegendItem className={[classes.legendItem, 'longPaymentWaiting'].join(' ')}>
                    Čeká na platbu déle než {LONG_PAYMENT_WAITING} dní
                </LegendItem>
                <LegendItem className={[classes.legendItem, 'storno'].join(' ')}>
                    Storno
                </LegendItem>
            </Grid>
        </Paper>
    );
};

export default OrdersTableLegend;