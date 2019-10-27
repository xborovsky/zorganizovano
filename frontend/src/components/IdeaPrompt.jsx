import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const IdeaPrompt = ({ className }) => (
    <Grid container className={className}>
        <Grid item xs={4} sm={2} md={1}>
            <FontAwesomeIcon icon={faLightbulb} size="5x" />
        </Grid>
        <Grid item xs={8} sm={10} md={11}>
            <Typography variant="h4">
                Chybí Vám něco u tohoto produktu?
            </Typography>
            <Typography variant="body1">
                Pomozte mi, prosím, jej zdokonalit a napište své nápady, či připomínky <Link to='/contact'>zde</Link>.
            </Typography>
        </Grid>
    </Grid>
);

export default IdeaPrompt;