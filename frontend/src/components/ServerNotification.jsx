import React from 'react';
import { makeStyles } from '@material-ui/styles';
import InfoIcon from '@material-ui/icons/Info';
import { Typography } from '@material-ui/core';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';

const GET_SERVER_NOTIFICATION = gql`
    {
        serverNotification {
            id
            text
        }
    }
`;

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
    const { data } = useQuery(GET_SERVER_NOTIFICATION);

    return (
        data ?
            <div className={classes.root}>
                <InfoIcon className={classes.infoIcon} />
                <Typography className={classes.text} component="span">
                    { data.serverNotification.text }
                </Typography>
            </div> :
            null
    );
};

export default ServerNotification;