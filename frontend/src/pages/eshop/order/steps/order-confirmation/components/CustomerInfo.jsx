import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Grid, Card, CardContent } from '@material-ui/core';
import withStyles from '@material-ui/styles/withStyles';

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
    data,
    shipment,
    classes
}) => {
    const zasilkovna = shipment.shipmentType.toLowerCase() === 'zasilkovna';
    const mdCols = zasilkovna ? 4 : 6;

    return (
        <Grid container spacing={5}>
            <Grid item xs={12} md={mdCols}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title}>Osobní údaje</Typography>
                        <Typography className={classes.content}>
                            {data.firstName} {data.lastName}<br />
                            {data.email}<br />
                            {data.phoneNo}<br />
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={mdCols}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title}>{zasilkovna ? 'Kontaktní adresa' : 'Doručovací adresa' }</Typography>
                        <Typography className={classes.content}>
                            {data.address.street}<br />
                            {data.address.township}<br />
                            {data.address.zipCode}<br />
                            {data.address.country}<br />
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            { zasilkovna &&
                <Grid item xs={12} md={mdCols}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title}>Doručovací adresa</Typography>
                            <Typography className={classes.content}>
                                {shipment.shipmentType}<br />
                                {shipment.shippingAddress &&
                                    <>
                                        {shipment.shippingAddress.street}<br />
                                        {shipment.shippingAddress.township}<br />
                                        {shipment.shippingAddress.zipCode}<br />
                                        {shipment.shippingAddress.country}<br />
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

CustomerInfo.propTypes = {
    data : PropTypes.shape({
        firstName : PropTypes.string.isRequired,
        lastName : PropTypes.string.isRequired,
        email : PropTypes.string.isRequired,
        phoneNo : PropTypes.string.isRequired,
        address : PropTypes.shape({
            street : PropTypes.string.isRequired,
            township : PropTypes.string.isRequired,
            zipCode : PropTypes.string.isRequired,
            country : PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    shipment : PropTypes.shape({
        shipmentType : PropTypes.string.isRequired,
        shippingAddress : PropTypes.shape({
            street : PropTypes.string.isRequired,
            township : PropTypes.string.isRequired,
            zipCode : PropTypes.string.isRequired,
            country : PropTypes.string.isRequired
        })
    }).isRequired
};

export default withStyles(styles)(CustomerInfo);