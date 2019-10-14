import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const CustomerForm = () => {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Doručovací adresa
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="Jméno"
                        fullWidth
                        autoComplete="fname"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Příjmení"
                        fullWidth
                        autoComplete="lname"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="street"
                        name="street"
                        label="Ulice a č.p."
                        fullWidth
                        autoComplete="billing street"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="Obec"
                        fullWidth
                        autoComplete="billing city"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="psc"
                        name="psc"
                        label="PSČ"
                        fullWidth
                        autoComplete="billing psc"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Země"
                        fullWidth
                        autoComplete="billing country"
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default CustomerForm;