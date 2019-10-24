import React from 'react';
import Typography from '@material-ui/core/Typography';

const CustomerInfo = ({data}) => (
    <Typography>
        {data.firstName} {data.lastName}<br />
        {data.email}<br />
        {data.phoneNo}<br />
        {data.address.street}<br />
        {data.address.township}<br />
        {data.address.zipCode}<br />
        {data.address.country}<br />
    </Typography>
);

export default CustomerInfo;