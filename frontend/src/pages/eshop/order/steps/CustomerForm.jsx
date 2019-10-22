import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

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
    psc : Yup.string()
        .matches(/^[0-9]{5}$/, 'Prosím, zadejte PSČ ve správném tvaru.')
        .required('Prosím, zadejte PSČ.'),
    city : Yup.string()
        .max(100, 'Zadaný údaj je moc dlouhý.')
        .required('Prosím, zadejte město.'),
    country : Yup.string()
        .min(15, 'Zadaný údaj je moc krátký.')
        .max(15, 'Zadaný údaj je moc dlouhý.')
        .required('Prosím, zadejte zemi.')
});

const CustomerForm = ({ onGoToNextStep, initialFormData }) => {
    return (
        <Formik
            initialValues={
                initialFormData ?
                    {...initialFormData} :
                    {
                        firstName : '',
                        lastName : '',
                        email : '',
                        phoneNo : '',
                        street : '',
                        psc : '',
                        city : '',
                        country : ''
                    }
            }
            validationSchema={CustomerFormSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                console.log(values);
                // TODO validace na serveru
                onGoToNextStep(values);
                return false;
            }}>
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
                                        <FormControl error={touched.psc && !!errors.psc} fullWidth>
                                            <InputLabel htmlFor="psc">PSČ</InputLabel>
                                            <Input
                                                id="psc"
                                                name="psc"
                                                value={values.psc}
                                                autoComplete="billing psc"
                                                onChange={handleChange}
                                            />
                                            <FormHelperText id="psc-error">{touched.psc && errors.psc}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl error={touched.city && !!errors.city} fullWidth>
                                            <InputLabel htmlFor="city">Obec</InputLabel>
                                            <Input
                                                id="city"
                                                name="city"
                                                value={values.city}
                                                autoComplete="billing city"
                                                onChange={handleChange}
                                            />
                                            <FormHelperText id="city-error">{touched.city && errors.city}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl error={touched.country && !!errors.country} fullWidth>
                                            <InputLabel htmlFor="country">Země</InputLabel>
                                            <Input
                                                id="country"
                                                name="country"
                                                value={values.country}
                                                autoComplete="billing country"
                                                onChange={handleChange}
                                            />
                                            <FormHelperText id="country-error">{touched.country && errors.country}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <WizardButtons
                            showPrev={false}
                            showNext={!isSubmitting}
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
        psc : PropTypes.string,
        city : PropTypes.string,
        country : PropTypes.string
    }),
    onGoToNextStep : PropTypes.func.isRequired
};

export default CustomerForm;