import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import withStyles from '@mui/styles/withStyles';

import OrderContext from '../../../OrderContext';

const styles = theme => ({
    card : {
        border : '1px solid #ccc'
    },
    title : {
        fontSize : 17,
        fontWeight : 'bold'
    },
    content : {
        fontSize : 15
    }
});

const CustomerInfo = ({
    classes
}) => {
    const { customerInfo, customerAddress, selectedDelivery } = useContext(OrderContext);
    const zasilkovna = ['zasilkovna', 'zasielkovna'].includes(selectedDelivery.type.name.toLowerCase());
    const mdCols = zasilkovna ? 4 : 6;

    return (
        <Grid container spacing={5}>
            <Grid item xs={12} md={mdCols}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title}>Osobní údaje</Typography>
                        <Typography className={classes.content}>
                            {customerInfo.firstName} {customerInfo.lastName}<br />
                            {customerInfo.email}<br />
                            {customerInfo.phoneNo}<br />
                            {customerInfo.isCompany &&
                                <>
                                    Název firmy: {customerInfo.companyName}<br />
                                    IČ: {customerInfo.ico}
                                    { customerInfo.dic &&
                                        <>
                                            <br />
                                            DIČ: {customerInfo.dic}
                                        </>
                                    }
                                </>
                            }
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={mdCols}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title}>{selectedDelivery.zasilkovna ? 'Kontaktní adresa' : 'Doručovací adresa' }</Typography>
                        <Typography className={classes.content}>
                            {customerAddress.street}<br />
                            {customerAddress.township}<br />
                            {customerAddress.zipCode}<br />
                            {customerAddress.country.name}<br />
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            { selectedDelivery.zasilkovna &&
                <Grid item xs={12} md={mdCols}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title}>Doručovací adresa</Typography>
                            <Typography className={classes.content}>
                                {selectedDelivery.type.readableName}<br />
                                {selectedDelivery.zasilkovna &&
                                    <>
                                        {selectedDelivery.zasilkovna.name}<br />
                                        {selectedDelivery.zasilkovna.city}<br />
                                        {selectedDelivery.zasilkovna.zip}<br />
                                        {selectedDelivery.zasilkovna.country.name}<br />
                                    </>
                                }
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            }
        </Grid>
    );
};

export default withStyles(styles)(CustomerInfo);