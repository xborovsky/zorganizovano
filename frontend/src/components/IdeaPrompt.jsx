import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

const IdeaPrompt = () => (
    <Grid container>
        <Grid item xs={4} sm={2} md={1}>
            <FontAwesomeIcon icon={faLightbulb} size="5x" />
        </Grid>
        <Grid item xs={8} sm={10} md={11}>
            <Typography variant="h4">
                Napadá Vás jak tento produkt vylepšit?
            </Typography>
            <Typography variant="body1">
                TODO - text
            </Typography>
        </Grid>
    </Grid>
);

export default IdeaPrompt;