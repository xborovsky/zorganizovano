import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import withStyles from '@mui/styles/withStyles';
import ReactHtmlParser from 'react-html-parser';

import { getCountryName } from '../../../../../util/country-util';

const styles = theme => ({
    root : {
        border : '1px solid #ccc',
        marginTop : '0.5rem'
    }
});

const ZasilkovnaInfo = ({
    classes,
    street,
    township,
    zipCode,
    country,
    openingHours
}) => (
    <Card className={classes.root}>
        <CardContent>
            <Typography>{street}</Typography>
            <Typography>{township}</Typography>
            <Typography>{zipCode}</Typography>
            <Typography>{getCountryName(country)}</Typography>
            <br />
            <Typography>Otevírací doba</Typography>
            <Typography>{ ReactHtmlParser(openingHours) }</Typography>
        </CardContent>
    </Card>
);

ZasilkovnaInfo.propTypes = {
    street : PropTypes.string.isRequired,
    township : PropTypes.string.isRequired,
    zipCode : PropTypes.string.isRequired,
    country : PropTypes.string.isRequired,
    openingHours : PropTypes.string.isRequired
};

export default withStyles(styles)(ZasilkovnaInfo);