import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import withStyles from '@mui/styles/withStyles';

const styles = theme => ({
    question : {
        fontSize : '1.8rem',
        [theme.breakpoints.down('md')] : {
            fontSize : '1.2rem'
        },
        [theme.breakpoints.down('sm')] : {
            fontSize : '1rem'
        }
    }
});

const IdeaPrompt = ({ className, classes }) => (
    <Grid container className={className}>
        <Grid item xs={4} sm={2} md={1}>
            <FontAwesomeIcon icon={faLightbulb} size="5x" />
        </Grid>
        <Grid item xs={8} sm={10} md={11}>
            <Typography className={classes.question}>
                Chybí Vám něco u tohoto produktu?
            </Typography>
            <Typography variant="body1">
                Pomozte mi, prosím, jej zdokonalit a napište své nápady, či připomínky <Link to='/contact'>zde</Link>.
            </Typography>
        </Grid>
    </Grid>
);

export default withStyles(styles)(IdeaPrompt);