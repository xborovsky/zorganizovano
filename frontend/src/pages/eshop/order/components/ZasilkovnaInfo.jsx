import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import ReactHtmlParser from 'react-html-parser';

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
            <Typography>{country === 'cz' ? 'Česká republika' : null}</Typography>
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