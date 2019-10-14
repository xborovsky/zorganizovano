import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    root : {
        marginTop : '0.5rem'
    },
    right : {
        textAlign : 'right'
    }
});

const Actions = ({ classes }) => (
    <Grid container className={classes.root}>
        <Grid item xs={6}>
            <Button variant="contained" color="primary">
                Pokračovat v nákupu
            </Button>
        </Grid>
        <Grid item xs={6} className={classes.right}>
            <Button variant="contained" color="primary">
                Přejít k objednávce
            </Button>
        </Grid>
    </Grid>
);

export default withStyles(styles)(Actions);