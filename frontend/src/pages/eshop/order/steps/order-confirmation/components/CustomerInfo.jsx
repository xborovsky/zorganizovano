import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const CustomerInfo = ({
    data,
    shipment
}) => (
    <Grid container>
        <Grid item xs={12} md={4}>
            <Typography>
                {data.firstName} {data.lastName}<br />
                {data.email}<br />
                {data.phoneNo}<br />
            </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
            <Typography>
                {data.address.street}<br />
                {data.address.township}<br />
                {data.address.zipCode}<br />
                {data.address.country}<br />
            </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
            <Typography>
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
        </Grid>
    </Grid>
);

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

export default CustomerInfo;