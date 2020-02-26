import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/styles/withStyles';

import { getImgServerUrl } from 'util/img-util';

const styles = theme => ({
    jumbotron : {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: 0,
        height : 250,
        borderRadius : 0,
        [theme.breakpoints.down('sm')] : {
            height : 200
        },
        [theme.breakpoints.down('xs')] : {
            height : 150
        }
    },
    img : {
        objectFit : 'cover',
        width: '100%',
        height: '100%'
    }
});

const Jumbotron = ({ src, classes }) => (
    <Paper className={classes.jumbotron}>
        {
            /*<img
                className={classes.img}
                src={getImgServerUrl(`other/${src}`)}
                alt="background"
            />*/
        }
    </Paper>
);

Jumbotron.propTypes = {
    src : PropTypes.string.isRequired
};

export default withStyles(styles)(Jumbotron);