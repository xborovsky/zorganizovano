import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/styles/withStyles';

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