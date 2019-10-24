import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    title : {
        fontSize : '1.5rem'
    }
});

const Transport = ({ title, additionalInfo, classes }) => (
    <>
        <Typography className={classes.title}>
            { title }
        </Typography>
        { additionalInfo &&
            <Typography>
                {additionalInfo.shipmentType}
                {additionalInfo.shippingAddress.street}<br />
                {additionalInfo.shippingAddress.township}<br />
                {additionalInfo.shippingAddress.zipCode}<br />
                {additionalInfo.shippingAddress.country}<br />
            </Typography>
        }
    </>
);

Transport.propTypes = {
    title : PropTypes.string.isRequired,
    additionalInfo : PropTypes.shape({
        shipmentType : PropTypes.string.isRequired,
        shippingAddress : PropTypes.shape({
            street : PropTypes.string.isRequired,
            township : PropTypes.string.isRequired,
            zipCode : PropTypes.string.isRequired,
            country : PropTypes.string.isRequired
        })
    })
};

export default withStyles(styles)(Transport);