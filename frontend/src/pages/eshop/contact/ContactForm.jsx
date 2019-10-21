import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { withStyles } from '@material-ui/styles';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';

import CharacterCounter from 'components/CharacterCounter';
import Alert from 'components/Alert';

const ContactFormSchema = Yup.object().shape({
    name : Yup.string()
        .max(100, 'Jméno je moc dlouhé.')
        .required('Prosím, zadejte jméno.'),
    email: Yup.string()
        .email('Prosím, zadejte email ve správném tvaru.')
        .required('Prosím, zadejte email.'),
    type : Yup.string()
        .required("Prosím, vyberte typ dotazu."),
    query : Yup.string()
        .max(10000, 'Dotaz je omezen na 10000 znaků.')
        .required('Prosím, zadejte dotaz.')
});

const queryTypes = [
    {
        value : 1,
        label :'Typ 1'
    },
    {
        value : 2,
        label :'Typ 2'
    },
    {
        value : 3,
        label :'Typ 3'
    }
];

const QUERY_MAX_LENGTH = 10000;

const styles = theme => ({
    root : {
        padding : '2rem 5vw'
    },
    submitBtnWrapper : {
        textAlign : 'center'
    },
    submitBtn : {
        marginTop : '2rem'
    },
    characterCounter : {
        textAlign : 'right'
    }
});

const ContactForm = ({ classes }) => {
    const [ ajaxResult, setAjaxResult ] = useState({});

    const showAlert = () => {
        if (ajaxResult.success) {
            return <Alert type="success">{ajaxResult.success}</Alert>
        } else if (ajaxResult.error) {
            return <Alert type="error">{ajaxResult.error}</Alert>
        }
        return null;
    };

    return (
        <Paper className={classes.root}>
            <Typography variant="h1">Kontaktní formulář</Typography>
            { showAlert() }
            <Formik
                initialValues={{
                    name : '',
                    email : '',
                    type : '',
                    query : ''
                }}
                validationSchema={ContactFormSchema}
                validate={values => {
                    let errors = {};

                    if (queryTypes.findIndex(type => type.value === values.type) === -1) {
                        errors.type = 'Prosím, vyberte typ dotazu.';
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    setAjaxResult({});
                    axios.post('/contact', values)
                        .then(_res => {
                            setAjaxResult({
                                success : 'Dotaz byl úspěšně odeslán, děkujeme.'
                            });
                            setSubmitting(false);
                            resetForm();
                        })
                        .catch(err => {
                            console.error(err);
                            setAjaxResult({
                                error : 'Dotaz se nepovedlo odeslat.'
                            });
                            setSubmitting(false);
                        });
                }}>
                    {({
                        values,
                        setFieldValue,
                        errors,
                        touched,
                        handleChange,
                        isSubmitting
                    }) => (
                        <Form>
                            <Grid container>
                                <Grid item xs={12}>
                                    <FormControl error={touched.name && !!errors.name} fullWidth>
                                        <InputLabel htmlFor="name">Jméno</InputLabel>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={values.name}
                                            autoComplete="name"
                                            onChange={handleChange}
                                        />
                                        <FormHelperText id="name-error">{touched.name && errors.name}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl error={touched.email && !!errors.email} fullWidth>
                                        <InputLabel htmlFor="email">Email</InputLabel>
                                        <Input
                                            id="email"
                                            name="email"
                                            value={values.email}
                                            autoComplete="email"
                                            type="email"
                                            onChange={handleChange}
                                        />
                                        <FormHelperText id="email-error">{touched.email && errors.email}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="type"
                                        name="type"
                                        select
                                        label="Typ dotazu"
                                        fullWidth
                                        value={values.type}
                                        onChange={handleChange}
                                        helperText={touched.type && errors.type}
                                        error={touched.type && !!errors.type}
                                        margin="normal"
                                    >
                                        { queryTypes.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="query"
                                        name="query"
                                        label="Dotaz"
                                        placeholder="Sem napište Váš dotaz"
                                        multiline
                                        margin="normal"
                                        variant="outlined"
                                        fullWidth
                                        rows={5}
                                        rowsMax={20}
                                        error={touched.query && !!errors.query}
                                        helperText={touched.query && errors.query}
                                        inputProps={{
                                            maxLength : QUERY_MAX_LENGTH
                                        }}
                                        onChange={handleChange}
                                    />
                                    <CharacterCounter
                                        count={values.query.length}
                                        max={QUERY_MAX_LENGTH}
                                        className={classes.characterCounter} />
                                </Grid>
                                <Grid item xs={12} className={classes.submitBtnWrapper}>
                                    { isSubmitting ?
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            className={classes.submitBtn}
                                            disabled>
                                            <CircularProgress />
                                        </Button> :
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            className={classes.submitBtn}>
                                            Odeslat dotaz
                                        </Button>
                                    }
                                </Grid>
                            </Grid>
                        </Form>
                    )}
            </Formik>
        </Paper>
    );
};

export default withStyles(styles)(ContactForm);