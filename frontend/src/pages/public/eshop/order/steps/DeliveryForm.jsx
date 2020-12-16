import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Formik, Form } from 'formik';
import FormHelperText from '@material-ui/core/FormHelperText';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';

import WizardButtons from '../components/WizardButtons';
import ZasilkovnaInfo from '../components/ZasilkovnaInfo';

const PACKETA_API_KEY = '78f6dc3fd19b4bc1';
const ZASILKOVNA = 'zasilkovna';

const DeliveryForm = ({
    orderItemIds,
    onGoToPrevStep,
    onGoToNextStep,
    initialFormData,
    onError
}) => {
    const [selectedZasilkovna, setSelectedZasilkovna] = useState(initialFormData.selectedZasilkovna);
    const [isDeliveryOptionsLoading, seIsDeliveryOptionsLoading] = useState(true);
    const [deliveryOptions, setDeliveryOptions] = useState(undefined);
    const [deliveryOptionsLoadingError, setDeliveryOptionsLoadingError] = useState(false);

    useEffect(() => {
        const fetchData = () => {
            axios.post('/order/delivery-options', { orderItemIds })
                .then(res => {
                    setDeliveryOptions(res.data);
                    seIsDeliveryOptionsLoading(false);
                }).catch(err => {
                    onError('Ups, něco se pokazilo.');
                    setDeliveryOptionsLoadingError(true);
                    seIsDeliveryOptionsLoading(false);
                });
            };

        fetchData();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSelectZasilkovna = () => {
        window.Packeta.Widget.pick(PACKETA_API_KEY, setSelectedPickupPoint);
    };

    const setSelectedPickupPoint = point => {
        setSelectedZasilkovna(point);
    };

    const initialFormValues = initialFormData ?
        {...initialFormData} :
        { deliveryOption : '', paymentMethod : 'bankTransfer' };

    const validateForm = values => {
        let errors = {};
        if (!values.deliveryOption || !values.deliveryOption.trim()) {
            errors.deliveryOption = 'Vyberte prosím způsob doručení!';
        }
        if (values.deliveryOption.toLowerCase() === ZASILKOVNA && !selectedZasilkovna) {
            errors.deliveryOption = 'Vyberte prosím zásilkovnu!';
        }
        return errors;
    };

    const handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        // TODO validace na serveru
        onGoToNextStep({
            shipmentType : values.deliveryOption,
            selectedZasilkovna
        });
        return false;
    };

    return (
        <>
            { isDeliveryOptionsLoading && <CircularProgress /> }
            { (!isDeliveryOptionsLoading && !deliveryOptionsLoadingError) &&
                <Formik
                    initialValues={initialFormValues}
                    validate={validateForm}
                    onSubmit={handleSubmit}>
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            isSubmitting
                        }) => (
                            <Form>
                                <Typography variant="h6" gutterBottom>
                                    Vyberte typ dopravy
                                </Typography>
                                <FormControl component="fieldset" error={touched.deliveryOption && !!errors.deliveryOption}>
                                    <RadioGroup aria-label="delivery option" name="deliveryOption" value={values.deliveryOption} onChange={handleChange}>
                                        {
                                            deliveryOptions.map(deliveryOption => (
                                                <div key={deliveryOption.name}>
                                                    <FormControlLabel
                                                        value={deliveryOption.name}
                                                        control={<Radio color="primary" />}
                                                        label={`${deliveryOption.readableName} - ${deliveryOption.price},- Kč`}
                                                    />
                                                    {
                                                        (values.deliveryOption &&
                                                            values.deliveryOption.toLowerCase() === ZASILKOVNA &&
                                                            deliveryOption.name.toLowerCase() === ZASILKOVNA) ?
                                                            <>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    type="button"
                                                                    onClick={handleSelectZasilkovna}>
                                                                    Vyberte zásilkovnu
                                                                </Button>
                                                                { selectedZasilkovna &&
                                                                    <ZasilkovnaInfo
                                                                        street={selectedZasilkovna.name}
                                                                        township={selectedZasilkovna.city}
                                                                        zipCode={selectedZasilkovna.zip}
                                                                        country={selectedZasilkovna.country}
                                                                        openingHours={selectedZasilkovna.openingHours.compactLong}
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
                                <FormControl component="fieldset" error={touched.paymentMethod && !!errors.paymentMethod}>
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
                        )}
                </Formik>
            }
        </>
    );
};

DeliveryForm.propTypes = {
    orderItemIds : PropTypes.arrayOf(PropTypes.number).isRequired,
    onGoToPrevStep : PropTypes.func.isRequired,
    onGoToNextStep : PropTypes.func.isRequired,
    initialFormData : PropTypes.shape({
        deliveryoption : PropTypes.string
    }),
    onError : PropTypes.func.isRequired
};

export default DeliveryForm;