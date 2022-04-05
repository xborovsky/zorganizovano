import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import InfoIcon from '@mui/icons-material/Info';
import { Typography } from '@mui/material';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    root : {
        width : '100%',
        margin : 0,
        padding : '.5rem 1rem',
        backgroundColor : '#444',
        color : '#fff',
        textAlign : 'center'
    },
    infoIcon : {
        display : 'inline-block',
        verticalAlign : 'bottom',
        marginRight : 5
    },
    text : {
        fontSize : 14,
        color : '#fff'
    }
}));

const ServerNotification = () => {
    const classes = useStyles();
    const [ notificationMsg, setNotificationMsg ] = useState(undefined);

    useEffect(() => {
        axios.get('/server-notification')
            .then(res => setNotificationMsg(res.data))
            .catch(err => {
                if (!err.response || err.response.status !== 404) {
                    console.error(err);
                }
            });
    }, []);

    return (
        notificationMsg ?
            <div className={classes.root}>
                <InfoIcon className={classes.infoIcon} />
                <Typography className={classes.text} component="span">
                    { notificationMsg }
                </Typography>
            </div> :
            null
    );
};

export default ServerNotification;