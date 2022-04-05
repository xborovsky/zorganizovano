import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { makeStyles } from '@mui/styles';

import WizardButtons from '../components/WizardButtons';
import OrderContext from '../OrderContext';
import Loader from 'components/Loader';

const useStyles = makeStyles(theme => ({
    personalDataHandleApproval : {
        textAlign : 'right', 
        marginTop : '-4rem', 
        marginBottom : '-2rem',
        [theme.breakpoints.down('md')] : {
            textAlign : 'left'
        }
    }
}));

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
    phoneNo : Yup.number()
        .required('Prosím, zadejte platné telefonní číslo.'),
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
        .required('Tento údaj je povinný.'),
    isCompany : Yup.bool(),
    companyName : Yup.string()
        .max(100, 'Zadaný údaj je moc dlouhý.')
        .when('isCompany', {
            is : true,
            then : Yup.string().required('Tento údaj je povinný.')
        }),
    ico : Yup.string().matches(/^[0-9]{8}$/, 'Prosím zadejte IČ ve správném tvaru.')
        .when('isCompany', {
            is : true,
            then : Yup.string().required('Tento údaj je povinný.')
        }),
    dic : Yup.string()
        .min(2, 'Zadaný údaj je moc krátký.')
        .max(20, 'Zadaný údaj je moc dlouhý.')
});

const EMPTY_CUSTOMER_INFO = {
    firstName : '',
    lastName : '',
    email : '',
    phoneNoCode : '420',
    phoneNo : '',
    personalDataHandleApproval : false,
    isCompany : false,
    companyName : '',
    ico : '',
    dic : ''
};

const EMPTY_CUSTOMER_ADDRESS = {
    street : '',
    zipCode : '',
    township : '',
    country : 'CESKA_REPUBLIKA',
};

const CustomerForm = ({ onGoToNextStep, onError }) => {
    const classes = useStyles();
    const { customerInfo, customerAddress, setCustomerInfo, setCustomerAddress, allowedDeliveryCountries } = useContext(OrderContext);
    const initialCustomerInfo = customerInfo ? { ...customerInfo } : EMPTY_CUSTOMER_INFO;
    const initialCustomerAddress = customerAddress ? { ...customerAddress, country : customerAddress.country.enumName } : EMPTY_CUSTOMER_ADDRESS;
    const initialFormValues = { ...initialCustomerInfo, ...initialCustomerAddress };
    const { data:phoneNoCodes, isLoading:isLoadingPhoneNoCodes } = useQuery('phone-number-codes', () =>
        axios.get('/phone-number/codes').then(res => res.data)
    );

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
        setSubmitting(true);
        axios.post('/order/customer', {...values})
            .then(_res => {
                const customer = (({firstName, lastName, email, phoneNo, phoneNoCode, isCompany, companyName, ico, dic, personalDataHandleApproval}) => ({firstName, lastName, email, phoneNo, phoneNoCode, isCompany, companyName, ico, dic, personalDataHandleApproval}))(values);
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
                    Object.keys(err.response.data.errors).forEach(field => {
                        errors[field] = err.response.data.errors[field];
                    });
                    setErrors(errors);
                    onError('Formulář obsahuje chyby.');
                } else {
                    onError('Problém komunikace se serverem.');
                }
            });
    };

    return <>
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
                    isSubmitting,
                    setFieldValue
                }) => (
                    <Form>
                        <Grid container spacing={10}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" gutterBottom>
                                    Osobní údaje
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormControl error={!!errors.firstName} fullWidth variant='standard'>
                                            <InputLabel htmlFor="firstName">Jméno *</InputLabel>
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
                                        <FormControl error={!!errors.lastName} fullWidth variant='standard'>
                                            <InputLabel htmlFor="lastName">Příjmení *</InputLabel>
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
                                        <FormControl error={!!errors.email} fullWidth variant='standard'>
                                            <InputLabel htmlFor="email">Email *</InputLabel>
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
                                        <Grid container>
                                            <Grid item xs={4} md={2}>
                                                <FormControl variant='standard'>
                                                    <InputLabel htmlFor="phoneNoCode"></InputLabel>
                                                    { isLoadingPhoneNoCodes ?
                                                        <Loader /> :
                                                        <Select
                                                            value={values.phoneNoCode}
                                                            onChange={handleChange}
                                                            id='phoneNoCode'
                                                            name="phoneNoCode"
                                                            renderValue={value => `+${value}`}
                                                            variant="standard"
                                                        >
                                                            { phoneNoCodes?.map(phoneNoCode => 
                                                                <MenuItem key={phoneNoCode.code} value={`${phoneNoCode.code}`}>{phoneNoCode.region} (+{phoneNoCode.code})</MenuItem>) 
                                                            }
                                                        </Select>
                                                    }
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={8} md={10}>
                                                <FormControl error={!!errors.phoneNo} fullWidth variant='standard'>
                                                    <InputLabel htmlFor="phoneNo">Telefon *</InputLabel>
                                                    <Input
                                                        id="phoneNo"
                                                        name="phoneNo"
                                                        value={values.phoneNo}
                                                        autoComplete="phoneNo"
                                                        onChange={handleChange}
                                                        onBlur={() => setFieldValue('phoneNo', values.phoneNo.replace(/\s/g,''))}
                                                    />
                                                    <FormHelperText id="phoneNo-error">{errors.phoneNo}</FormHelperText>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth variant='standard'>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        id="isCompany"
                                                        name="isCompany"
                                                        checked={values.isCompany}
                                                        onChange={handleChange}
                                                        color="primary"
                                                    />
                                                }
                                                label='Nakupuji na firmu'
                                            />
                                        </FormControl>
                                    </Grid>
                                    { values.isCompany &&
                                        <>
                                            <Grid item xs={12}>
                                                <FormControl error={!!errors.companyName} fullWidth variant='standard'>
                                                    <InputLabel htmlFor="companyName">Název firmy *</InputLabel>
                                                    <Input
                                                        id="companyName"
                                                        name="companyName"
                                                        value={values.companyName}
                                                        autoComplete="companyName"
                                                        onChange={handleChange}
                                                    />
                                                    <FormHelperText id="companyName-error">{errors.companyName}</FormHelperText>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormControl error={!!errors.ico} fullWidth variant='standard'>
                                                    <InputLabel htmlFor="ico">IČ *</InputLabel>
                                                    <Input
                                                        id="ico"
                                                        name="ico"
                                                        value={values.ico}
                                                        autoComplete="ico"
                                                        onChange={handleChange}
                                                        inputProps={{
                                                            maxLength : 8
                                                        }}
                                                    />
                                                    <FormHelperText id="ico-error">{errors.ico}</FormHelperText>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormControl fullWidth variant='standard'>
                                                    <InputLabel htmlFor="ico">DIČ</InputLabel>
                                                    <Input
                                                        id="dic"
                                                        name="dic"
                                                        value={values.dic}
                                                        autoComplete="dic"
                                                        onChange={handleChange}
                                                    />
                                                    <FormHelperText id="dic-error">{errors.dic}</FormHelperText>
                                                </FormControl>
                                            </Grid>
                                        </>
                                    }
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" gutterBottom>
                                    Doručovací adresa
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormControl error={!!errors.street} fullWidth variant='standard'>
                                            <InputLabel htmlFor="lastName">Ulice a č.p. *</InputLabel>
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
                                        <FormControl error={!!errors.zipCode} fullWidth variant='standard'>
                                            <InputLabel htmlFor="zipCode">PSČ *</InputLabel>
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
                                        <FormControl error={!!errors.township} fullWidth variant='standard'>
                                            <InputLabel htmlFor="township">Obec *</InputLabel>
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
                                        <FormControl error={!!errors.country} fullWidthvariant='standard' fullWidth>
                                            <InputLabel htmlFor="country">Země *</InputLabel>
                                            <Select
                                                value={values.country}
                                                onChange={handleChange}
                                                variant="standard"
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
                            <Grid item xs={12} className={classes.personalDataHandleApproval}>
                                <FormControl error={!!errors.personalDataHandleApproval} fullWidth style={{ alignItems : 'flex-end' }} variant='standard'>
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
                                        label={<Link to='/eshop/personal-data-protection-terms' target="_blank">Souhlasím se zpracováním osobních údajů *</Link>}
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
        <div>* - povinné pole</div>
    </>;
};

CustomerForm.propTypes = {
    onGoToNextStep : PropTypes.func.isRequired,
    onError : PropTypes.func.isRequired
};

export default CustomerForm;