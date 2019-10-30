import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import WizardButtons from '../components/WizardButtons';

const CustomerFormSchema = Yup.object().shape({
    firstName : Yup.string()
        .min(2, 'Jméno je moc krátké.')
        .max(50, 'Jméno je moc dlouhé.')
        .required('Prosím, zadejte jméno.'),
    lastName : Yup.string()
        .min(2, 'Příjmení je moc krátké.')
        .max(50, 'Příjmení je moc dlouhé.')
        .required('Prosím, zadejte příjmení.'),
    email: Yup.string()
        .email('Prosím, zadejte email ve správném tvaru.')
        .required('Prosím, zadejte email.'),
    phoneNo : Yup.string()
        .required('Prosím, zadejte telefonní číslo.'),
    street : Yup.string()
        .max(100, 'Zadaný údaj je moc dlouhý.')
        .required('Prosím, zadejte ulici a číslo popisné.'),
    zipCode : Yup.string()
        .matches(/^[0-9]{5}$/, 'Prosím, zadejte PSČ ve správném tvaru.')
        .required('Prosím, zadejte PSČ.'),
    township : Yup.string()
        .max(100, 'Zadaný údaj je moc dlouhý.')
        .required('Prosím, zadejte město.'),
    country : Yup.string()
        .min(15, 'Zadaný údaj je moc krátký.')
        .max(15, 'Zadaný údaj je moc dlouhý.')
        .required('Prosím, zadejte zemi.'),
    personalDataHandleApproval : Yup.bool()
        .oneOf([true], 'Tento údaj je povinný.')
});

const EMPTY_FORM = {
    firstName : '',
    lastName : '',
    email : '',
    phoneNo : '',
    street : '',
    zipCode : '',
    township : '',
    country : 'Česká republika',
    personalDataHandleApproval : false
};

const CustomerForm = ({ onGoToNextStep, initialFormData, onError }) => {
    const initialFormValues = initialFormData ? {...initialFormData} : EMPTY_FORM;

    const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
        setSubmitting(true);
        axios.post('/order/customer', {...values})
            .then(_res => {
                const customer = (({firstName, lastName, email, phoneNo}) => ({firstName, lastName, email, phoneNo}))(values);
                const address = (({street, township, zipCode, country}) => ({street, township, zipCode, country}))(values);
                onGoToNextStep({
                    customerInfo : {
                        ...customer,
                        address
                    }
                })
            })
            .catch(err => {
                setSubmitting(false);
                if (err.response && err.response.data && err.response.data.errors) {
                    let errors = {};
                    err.response.data.errors.map(backendError => {
                        errors[backendError.field] = backendError.defaultMessage;
                    });
                    setErrors(errors);
                    onError('Formulář obsahuje chyby');
                } else {
                    onError('Problém komunikace se servrem');
                }
            });
    };

    return (
        <Formik
            initialValues={initialFormValues}
            validationSchema={CustomerFormSchema}
            onSubmit={handleFormSubmit}>
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    isSubmitting
                }) => (
                    <Form>
                        <Grid container spacing={10}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" gutterBottom>
                                    Osobní údaje
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormControl error={touched.firstName && !!errors.firstName} fullWidth>
                                            <InputLabel htmlFor="firstName">Jméno</InputLabel>
                                            <Input
                                                id="firstName"
                                                name="firstName"
                                                value={values.firstName}
                                                autoComplete="fname"
                                                onChange={handleChange}
                                            />
                                            <FormHelperText id="firstName-error">{touched.firstName && errors.firstName}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl error={touched.lastName && !!errors.lastName} fullWidth>
                                            <InputLabel htmlFor="lastName">Příjmení</InputLabel>
                                            <Input
                                                id="lastName"
                                                name="lastName"
                                                value={values.lastName}
                                                autoComplete="lname"
                                                onChange={handleChange}
                                            />
                                            <FormHelperText id="lastName-error">{touched.lastName && errors.lastName}</FormHelperText>
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
                                                onChange={handleChange}
                                            />
                                            <FormHelperText id="email-error">{touched.email && errors.email}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl error={touched.phoneNo && !!errors.phoneNo} fullWidth>
                                            <InputLabel htmlFor="phoneNo">Telefon</InputLabel>
                                            <Input
                                                id="phoneNo"
                                                name="phoneNo"
                                                value={values.phoneNo}
                                                autoComplete="phoneNo"
                                                onChange={handleChange}
                                            />
                                            <FormHelperText id="phoneNo-error">{touched.phoneNo && errors.phoneNo}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" gutterBottom>
                                    Doručovací adresa
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormControl error={touched.street && !!errors.street} fullWidth>
                                            <InputLabel htmlFor="lastName">Ulice a č.p.</InputLabel>
                                            <Input
                                                id="street"
                                                name="street"
                                                value={values.street}
                                                autoComplete="billing street"
                                                onChange={handleChange}
                                            />
                                            <FormHelperText id="street-error">{touched.street && errors.street}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl error={touched.zipCode && !!errors.zipCode} fullWidth>
                                            <InputLabel htmlFor="zipCode">PSČ</InputLabel>
                                            <Input
                                                id="zipCode"
                                                name="zipCode"
                                                value={values.zipCode}
                                                autoComplete="billing zipCode"
                                                onChange={handleChange}
                                            />
                                            <FormHelperText id="zipCode-error">{touched.zipCode && errors.zipCode}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl error={touched.township && !!errors.township} fullWidth>
                                            <InputLabel htmlFor="township">Obec</InputLabel>
                                            <Input
                                                id="township"
                                                name="township"
                                                value={values.township}
                                                autoComplete="billing township"
                                                onChange={handleChange}
                                            />
                                            <FormHelperText id="township-error">{touched.township && errors.township}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl error={touched.country && !!errors.country} fullWidth>
                                            <InputLabel htmlFor="country">Země</InputLabel>
                                            <Select
                                                value={values.country}
                                                onChange={handleChange}
                                                inputProps={{
                                                    name: 'country',
                                                    id: 'country'
                                                }}
                                                >
                                                <MenuItem value={'Česká republika'}>Česká republika</MenuItem>
                                            </Select>
                                            <FormHelperText id="country-error">{touched.country && errors.country}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} style={{ textAlign : 'right', marginTop : '-4rem', marginBottom : '-2rem' }}>
                                <FormControl error={touched.personalDataHandleApproval && !!errors.personalDataHandleApproval} fullWidth style={{ alignItems : 'flex-end' }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                id="personalDataHandleApproval"
                                                name="personalDataHandleApproval"
                                                checked={values.personalDataHandleApproval}
                                                onChange={handleChange}
                                                color="primary"
                                            />
                                        }
                                        label="Souhlasím se zpracováním osobních údajů"
                                    />
                                    <FormHelperText id="personalDataHandleApproval-error">
                                        {touched.personalDataHandleApproval && errors.personalDataHandleApproval}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <WizardButtons
                            prev={{ show : false }}
                            next={{ show : true, loading : isSubmitting }}
                        />
                    </Form>
                )}
        </Formik>
    );
};

CustomerForm.propTypes = {
    initialFormData : PropTypes.shape({
        firstName : PropTypes.string,
        lastName : PropTypes.string,
        email : PropTypes.string,
        phoneNo : PropTypes.string,
        street : PropTypes.string,
        zipCode : PropTypes.string,
        township : PropTypes.string,
        country : PropTypes.string
    }),
    onGoToNextStep : PropTypes.func.isRequired,
    onError : PropTypes.func.isRequired
};

export default CustomerForm;