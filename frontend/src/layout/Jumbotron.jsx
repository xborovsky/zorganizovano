import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/styles/withStyles';

const styles = theme => ({
    jumbotron : {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height : 500,
        borderRadius : 0
    }
});

const Jumbotron = ({ img, classes }) => (
    <Paper className={classes.jumbotron} style={{ backgroundImage : `url(${img})` }}>
        {
            <img
                style={{ display: 'none' }}
                src={img}
                alt="background"
            />
        }
    </Paper>
);

Jumbotron.propTypes = {
    img : PropTypes.string.isRequired
};

export default withStyles(styles)(Jumbotron);