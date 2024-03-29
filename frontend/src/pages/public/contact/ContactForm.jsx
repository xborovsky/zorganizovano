import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import withStyles from '@mui/styles/withStyles';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";

import CharacterCounter from 'components/CharacterCounter';
import Alert from 'components/Alert';
import { RECAPTCHA_SITE_KEY } from 'App';

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

const QUERY_MAX_LENGTH = 10000;

const styles = theme => ({
    root : {
        padding : '2rem 5vw',
        marginTop : '5vh',
        marginBottom : '2vh'
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
const ContactForm = ({ queryTypes, classes }) => {
    const [ ajaxResult, setAjaxResult ] = useState({});
    const [ recaptchaToken, setRecaptchaToken ] = useState(undefined);

    const showAlert = () => {
        if (ajaxResult.success) {
            return <Alert type="success">{ajaxResult.success}</Alert>
        } else if (ajaxResult.error) {
            return <Alert type="error">{ajaxResult.error}</Alert>
        }
        return null;
    };

    const handleRecaptchaChange = value => setRecaptchaToken(value);

    return (
        <Paper className={classes.root}>
            <Typography variant="h1">Napište mi</Typography>
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

                    if (queryTypes.findIndex(queryType => queryType.id === values.type) === -1) {
                        errors.type = 'Prosím, vyberte typ dotazu.';
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    setAjaxResult({});
                    axios.post('/contact', {...values, recaptchaToken})
                        .then(_res => {
                            setAjaxResult({
                                success : 'Dotaz byl úspěšně odeslán, děkujeme.'
                            });
                            setSubmitting(false);
                            resetForm();
                        })
                        .catch(err => {
                            console.error(err);
                            if (err.response && err.response.status === 403) {
                                setAjaxResult({
                                    error : `Je mi líto, systém Vás vyhodnotil jako robota. 
                                            Pokud nejste robot, zkuste to, prosím, znovu. 
                                            Případně můžete dotaz odeslat přímo na můj email.`
                                });    
                            } else {
                                setAjaxResult({
                                    error : 'Dotaz se nepovedlo odeslat.'
                                });
                            }
                            setSubmitting(false);
                        });
                }}>
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        isSubmitting
                    }) => (
                        <Form>
                            <Grid container>
                                <Grid item xs={12}>
                                    <FormControl error={touched.name && !!errors.name} fullWidth variant='standard'>
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
                                    <FormControl error={touched.email && !!errors.email} fullWidth variant='standard'>
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
                                        label="Čeho se to týká"
                                        fullWidth
                                        value={values.type}
                                        onChange={handleChange}
                                        helperText={touched.type && errors.type}
                                        error={touched.type && !!errors.type}
                                        margin="normal"
                                        variant='standard'
                                    >
                                        { queryTypes.map(option => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.type}
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
                                        value={values.query}
                                        multiline
                                        margin="normal"
                                        variant="outlined"
                                        fullWidth
                                        rows={5}
                                        maxRows={20}
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
                                <Grid item xs={12}>
                                    <ReCAPTCHA
                                        id='recaptcha'
                                        sitekey={RECAPTCHA_SITE_KEY}
                                        onChange={handleRecaptchaChange}
                                    />
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

ContactForm.propTypes = {
    queryTypes : PropTypes.arrayOf(
        PropTypes.shape({
            id : PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            type : PropTypes.string.isRequired
        })
    ).isRequired
};

export default withStyles(styles)(ContactForm);