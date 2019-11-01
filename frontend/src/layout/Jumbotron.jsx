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
        height : 400,
        borderRadius : 0,
        [theme.breakpoints.down('sm')] : {
            height : 300
        },
        [theme.breakpoints.down('xs')] : {
            height : 200
        }
    },
    img : {
        objectFit : 'cover',
        width: '100%',
        height: '100%'
    }
});

const Jumbotron = ({ src, srcSet, classes }) => (
    <Paper className={classes.jumbotron}>
        {
            <img
                className={classes.img}
                src={src}
                srcSet={srcSet}
                alt="background"
            />
        }
    </Paper>
);

Jumbotron.propTypes = {
    src : PropTypes.string.isRequired,
    srcSet : PropTypes.string
};

export default withStyles(styles)(Jumbotron);