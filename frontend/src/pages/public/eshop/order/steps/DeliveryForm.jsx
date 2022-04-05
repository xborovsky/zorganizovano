import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Formik, Form } from 'formik';
import FormHelperText from '@mui/material/FormHelperText';
import { CircularProgress } from '@mui/material';

import WizardButtons from '../components/WizardButtons';
import ZasilkovnaInfo from '../components/ZasilkovnaInfo';
import OrderContext from '../OrderContext';
import useDeliveryOptions from '../hooks/use-delivery-options';

const PACKETA_API_KEY = '78f6dc3fd19b4bc1';
const ZASILKOVNA = 'zasilkovna';
const ZASIELKOVNA = 'zasielkovna';

const INITIAL_FORM_DATA = {
    deliveryOption : '', 
    paymentMethod : 'bankTransfer'
};

const DeliveryForm = ({
    onGoToPrevStep,
    onGoToNextStep,
}) => {
    const { selectedDelivery, setSelectedDelivery, shoppingCart, customerAddress } = useContext(OrderContext);
    const { isFetchingDeliveryOptions, deliveryOptions, deliveryOptionsFetchError } = useDeliveryOptions(shoppingCart.map(item => item.id), customerAddress.country.enumName);
    const initialFormValues = selectedDelivery ? {...selectedDelivery} : INITIAL_FORM_DATA;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSelectZasilkovna = setErrors => e => {
        setErrors({});
        window.Packeta.Widget.pick(PACKETA_API_KEY, setSelectedPickupPoint);
    };

    const setSelectedPickupPoint = point => {
        setSelectedDelivery({...selectedDelivery, zasilkovna : point});
    };

    const validateForm = values => {
        let errors = {};
        if (!values.deliveryOption || !values.deliveryOption.trim()) {
            errors.deliveryOption = 'Vyberte prosím způsob doručení!';
        }
        if ([ZASILKOVNA, ZASIELKOVNA].includes(values.deliveryOption.toLowerCase()) && !selectedDelivery?.zasilkovna) {
            errors.deliveryOption = 'Vyberte prosím zásilkovnu!';
        }
        return errors;
    };

    const handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        // TODO validace na serveru
        setSelectedDelivery({ 
            ...selectedDelivery, 
            type : deliveryOptions.find(deliveryOption => deliveryOption.name === values.deliveryOption) });
        onGoToNextStep();
    };

    return (
        <>
            { isFetchingDeliveryOptions && <CircularProgress /> }
            { (!isFetchingDeliveryOptions && !deliveryOptionsFetchError) &&
                <Formik
                    initialValues={initialFormValues}
                    validate={validateForm}
                    onSubmit={handleSubmit}>
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            isSubmitting,
                            setErrors
                        }) => {
                            return (
                            <Form>
                                <Typography variant="h6" gutterBottom>
                                    Vyberte typ dopravy
                                </Typography>
                                <FormControl component="fieldset" error={touched.deliveryOption && !!errors.deliveryOption} variant='standard'>
                                    <RadioGroup aria-label="delivery option" name="deliveryOption" value={values.deliveryOption} onChange={handleChange}>
                                        {
                                            deliveryOptions.filter(deliveryOption => deliveryOption.deliveryCountries.includes(customerAddress.country.enumName)).map(deliveryOption => (
                                                <div key={deliveryOption.name}>
                                                    <FormControlLabel
                                                        value={deliveryOption.name}
                                                        control={<Radio color="primary" />}
                                                        label={`${deliveryOption.readableName} - ${deliveryOption.price},- Kč`}
                                                    />
                                                    {
                                                        (values.deliveryOption &&
                                                            [ZASILKOVNA, ZASIELKOVNA].includes(values.deliveryOption.toLowerCase()) &&
                                                            [ZASILKOVNA, ZASIELKOVNA].includes(deliveryOption.name.toLowerCase())) ?
                                                            <>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    type="button"
                                                                    onClick={handleSelectZasilkovna(setErrors)}>
                                                                    Vyberte zásilkovnu
                                                                </Button>
                                                                { selectedDelivery?.zasilkovna &&
                                                                    <ZasilkovnaInfo
                                                                        street={selectedDelivery.zasilkovna.name}
                                                                        township={selectedDelivery.zasilkovna.city}
                                                                        zipCode={selectedDelivery.zasilkovna.zip}
                                                                        country={selectedDelivery.zasilkovna.country}
                                                                        openingHours={selectedDelivery.zasilkovna.openingHours.compactLong}
                                                                    />
                                                                }
                                                            </> :
                                                            null
                                                    }
                                                </div>
                                            ))
                                        }
                                    </RadioGroup>
                                    <FormHelperText id="deliveryOption-error">{touched.deliveryOption && errors.deliveryOption}</FormHelperText>
                                </FormControl>
                                <Typography variant="h6" gutterBottom>
                                    Platba
                                </Typography>
                                <FormControl component="fieldset" error={touched.paymentMethod && !!errors.paymentMethod} variant='standard'>
                                    <RadioGroup aria-label="delivery option" name="paymentMethod" value={values.paymentMethod} onChange={handleChange}>
                                        <FormControlLabel
                                            value="bankTransfer"
                                            control={<Radio color="primary" checked />}
                                            label="Bankovním převodem"
                                        />
                                    </RadioGroup>
                                    <FormHelperText id="paymentMethod-error">{touched.paymentMethod && errors.paymentMethod}</FormHelperText>
                                </FormControl>
                                <WizardButtons
                                    prev={{
                                        show : true,
                                        onClick : onGoToPrevStep
                                    }}
                                    next={{
                                        show : true,
                                        disabled : !values.deliveryOption,
                                        loading : isSubmitting
                                    }}
                                />
                            </Form>
                        )}}
                </Formik>
            }
        </>
    );
};

DeliveryForm.propTypes = {
    onGoToPrevStep : PropTypes.func.isRequired,
    onGoToNextStep : PropTypes.func.isRequired
};

export default DeliveryForm;