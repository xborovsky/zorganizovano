import React from 'react';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGhost } from '@fortawesome/free-solid-svg-icons';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    iconWrapper: {
        textAlign: 'center',
        fontSize: '30pt',
        marginBottom: '2rem',
        [theme.breakpoints.down('xs')]: {
            marginTop: '2rem'
        }
    },
    textWrapper: {
        textAlign: 'center'
    },
    text: {
        fontSize: '20pt'
    }
}));

// TODO handle other status codes!

const Error = ({ statusCode }) => {
    const classes = useStyles();
    return (
        <Grid container>
            <Grid item xs={12} className={classes.iconWrapper}>
                <FontAwesomeIcon icon={faGhost} size="5x" />
            </Grid>
            <Grid item xs={12} className={classes.textWrapper}>
                <Typography className={classes.text}>404 Stránka se nenašla</Typography>
            </Grid>
        </Grid>
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode };
}

export default Error;