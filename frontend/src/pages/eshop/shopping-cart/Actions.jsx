import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import { useHistory, useLocation } from 'react-router-dom';

const styles = theme => ({
    root : {
        marginTop : '0.5rem'
    },
    right : {
        textAlign : 'right'
    }
});

const Actions = ({ classes }) => {
    const history = useHistory();
    const location = useLocation();

    const goToEshopMain = () => {
        history.push(`/eshop`);
    };

    const goToOrder = () => {
        history.push(`/eshop/order`);
    };

    return (
        <Grid container className={classes.root}>
            <Grid item xs={6}>
                <Button variant="contained" color="primary" onClick={goToEshopMain}>
                    Pokračovat v nákupu
                </Button>
            </Grid>
            <Grid item xs={6} className={classes.right}>
                <Button variant="contained" color="primary" onClick={goToOrder}>
                    Přejít k objednávce
                </Button>
            </Grid>
        </Grid>
    );
};

export default withStyles(styles)(Actions);