import React, { useEffect, useContext } from 'react';
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
import { Link } from 'react-router-dom';

import WizardButtons from '../components/WizardButtons';
import OrderContext from '../OrderContext';

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
        .max(5, 'Prosím, zadejte PSČ o délce 5 znaků.')
        .matches(/^[0-9]{5}$/, 'Prosím, zadejte PSČ ve správném tvaru.')
        .required('Prosím, zadejte PSČ.'),
    township : Yup.string()
        .max(100, 'Zadaný údaj je moc dlouhý.')
        .required('Prosím, zadejte město.'),
    country : Yup.string()
        .oneOf(['CESKA_REPUBLIKA', 'SLOVENSKA_REPUBLIKA'], 'Země není validní.')
        .required('Prosím, zadejte zemi.'),
    personalDataHandleApproval : Yup.bool()
        .oneOf([true], 'Tento údaj je povinný.')
        .required('Tento údaj je povinný.')
});

const EMPTY_CUSTOMER_INFO = {
    firstName : '',
    lastName : '',
    email : '',
    phoneNo : '',
    personalDataHandleApproval : false
};

const EMPTY_CUSTOMER_ADDRESS = {
    street : '',
    zipCode : '',
    township : '',
    country : '',
};

const CustomerForm = ({ onGoToNextStep, onError }) => {
    const { customerInfo, customerAddress, setCustomerInfo, setCustomerAddress, allowedDeliveryCountries } = useContext(OrderContext);
    const initialCustomerInfo = customerInfo ? { ...customerInfo } : EMPTY_CUSTOMER_INFO;
    const initialCustomerAddress = customerAddress ? { ...customerAddress, country : customerAddress.country.enumName } : EMPTY_CUSTOMER_ADDRESS;
    const initialFormValues = { ...initialCustomerInfo, ...initialCustomerAddress };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
        setSubmitting(true);
        axios.post('/order/customer', {...values})
            .then(_res => {
                const customer = (({firstName, lastName, email, phoneNo, personalDataHandleApproval}) => ({firstName, lastName, email, phoneNo, personalDataHandleApproval}))(values);
                const address = (({street, township, zipCode}) => ({street, township, zipCode}))(values);
                address.country = allowedDeliveryCountries.find(deliveryCountry => deliveryCountry.enumName === values.country);

                setCustomerInfo(customer);
                setCustomerAddress(address);
                onGoToNextStep();
            })
            .catch(err => {
                setSubmitting(false);
                if (err.response && err.response.data && err.response.data.errors) {
                    let errors = {};
                    err.response.data.errors.map(backendError => {
                        errors[backendError.field] = backendError.defaultMessage;
                    });
                    setErrors(errors);
                    onError('Formulář obsahuje chyby.');
                } else {
                    onError('Problém komunikace se serverem.');
                }
            });
    };

    return (
        <Formik
            initialValues={initialFormValues}
            validationSchema={CustomerFormSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={handleFormSubmit}>
                {({
                    values,
                    errors,
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
                                        <FormControl error={!!errors.firstName} fullWidth>
                                            <InputLabel htmlFor="firstName">Jméno</InputLabel>
                                            <Input
                                                id="firstName"
                                                name="firstName"
                                                value={values.firstName}
                                                autoComplete="fname"
                                                onChange={handleChange}
                                                inputProps={{
                                                    maxLength : 50
                                                }}
                                            />
                                            <FormHelperText id="firstName-error">{errors.firstName}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl error={!!errors.lastName} fullWidth>
                                            <InputLabel htmlFor="lastName">Příjmení</InputLabel>
                                            <Input
                                                id="lastName"
                                                name="lastName"
                                                value={values.lastName}
                                                autoComplete="lname"
                                                onChange={handleChange}
                                                inputProps={{
                                                    maxLength : 50
                                                }}
                                            />
                                            <FormHelperText id="lastName-error">{errors.lastName}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl error={!!errors.email} fullWidth>
                                            <InputLabel htmlFor="email">Email</InputLabel>
                                            <Input
                                                id="email"
                                                name="email"
                                                value={values.email}
                                                autoComplete="email"
                                                onChange={handleChange}
                                            />
                                            <FormHelperText id="email-error">{errors.email}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl error={!!errors.phoneNo} fullWidth>
                                            <InputLabel htmlFor="phoneNo">Telefon</InputLabel>
                                            <Input
                                                id="phoneNo"
                                                name="phoneNo"
                                                value={values.phoneNo}
                                                autoComplete="phoneNo"
                                                onChange={handleChange}
                                            />
                                            <FormHelperText id="phoneNo-error">{errors.phoneNo}</FormHelperText>
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
                                        <FormControl error={!!errors.street} fullWidth>
                                            <InputLabel htmlFor="lastName">Ulice a č.p.</InputLabel>
                                            <Input
                                                id="street"
                                                name="street"
                                                value={values.street}
                                                autoComplete="billing street"
                                                onChange={handleChange}
                                                inputProps={{
                                                    maxLength : 100
                                                }}
                                            />
                                            <FormHelperText id="street-error">{errors.street}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl error={!!errors.zipCode} fullWidth>
                                            <InputLabel htmlFor="zipCode">PSČ</InputLabel>
                                            <Input
                                                id="zipCode"
                                                name="zipCode"
                                                value={values.zipCode}
                                                autoComplete="billing zipCode"
                                                onChange={handleChange}
                                                inputProps={{
                                                    maxLength : 5
                                                }}
                                            />
                                            <FormHelperText id="zipCode-error">{errors.zipCode}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl error={!!errors.township} fullWidth>
                                            <InputLabel htmlFor="township">Obec</InputLabel>
                                            <Input
                                                id="township"
                                                name="township"
                                                value={values.township}
                                                autoComplete="billing township"
                                                onChange={handleChange}
                                                inputProps={{
                                                    maxLength : 100
                                                }}
                                            />
                                            <FormHelperText id="township-error">{errors.township}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl error={!!errors.country} fullWidth>
                                            <InputLabel htmlFor="country">Země</InputLabel>
                                            <Select
                                                value={values.country}
                                                onChange={handleChange}
                                                inputProps={{
                                                    name: 'country',
                                                    id: 'country'
                                                }}>
                                                    { allowedDeliveryCountries.map(deliveryCountry => (
                                                        <MenuItem value={deliveryCountry.enumName} key={deliveryCountry.enumName}>{deliveryCountry.name}</MenuItem>
                                                    )) }
                                            </Select>
                                            <FormHelperText id="country-error">{errors.country}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} style={{ textAlign : 'right', marginTop : '-4rem', marginBottom : '-2rem' }}>
                                <FormControl error={!!errors.personalDataHandleApproval} fullWidth style={{ alignItems : 'flex-end' }}>
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
                                        label={<Link to='/eshop/personal-data-protection-terms' target="_blank">Souhlasím se zpracováním osobních údajů</Link>}
                                    />
                                    <FormHelperText id="personalDataHandleApproval-error">
                                        {errors.personalDataHandleApproval}
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
    onGoToNextStep : PropTypes.func.isRequired,
    onError : PropTypes.func.isRequired
};

export default CustomerForm;