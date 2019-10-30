import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Formik, Form } from 'formik';
import FormHelperText from '@material-ui/core/FormHelperText';

import withLoading from '../../../../components/hoc/WithLoading';
import WizardButtons from '../components/WizardButtons';
import ZasilkovnaInfo from '../components/ZasilkovnaInfo';

const PACKETA_API_KEY = '78f6dc3fd19b4bc1';
const ZASILKOVNA = 'zasilkovna';

const DeliveryForm = ({ data, onGoToPrevStep, onGoToNextStep, initialFormData, onError }) => {
    const [selectedZasilkovna, setSelectedZasilkovna] = useState(undefined);

    const handleSelectZasilkovna = () => {
        window.Packeta.Widget.pick(PACKETA_API_KEY, setSelectedPickupPoint);
    };

    const setSelectedPickupPoint = point => {
        setSelectedZasilkovna(
            {
                street : point.name,
                township : point.city,
                zipCode : point.zip,
                country : point.country,
                openingHours : point.openingHours
            }
        );
    };

    const initialFormValues = initialFormData ? {...initialFormData} : { deliveryOption : '' };

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
            shippingAddress : selectedZasilkovna ? {
                street : selectedZasilkovna.street,
                township : selectedZasilkovna.township,
                city : selectedZasilkovna.city,
                zipCode : selectedZasilkovna.zipCode,
                country : 'Česká republika' // TODO
            } : undefined
        });
        return false;
    };

    return (
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
                                    data.map(deliveryOption => (
                                        <div key={deliveryOption.name}>
                                            <FormControlLabel
                                                value={deliveryOption.name}
                                                control={<Radio color="primary" />}
                                                label={deliveryOption.readableName}
                                            />
                                            {
                                                values.deliveryOption.toLowerCase() === ZASILKOVNA && deliveryOption.name.toLowerCase() === ZASILKOVNA ?
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
                                                                street={selectedZasilkovna.street}
                                                                township={selectedZasilkovna.township}
                                                                zipCode={selectedZasilkovna.zipCode}
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
    );
};

DeliveryForm.propTypes = {
    onGoToPrevStep : PropTypes.func.isRequired,
    onGoToNextStep : PropTypes.func.isRequired,
    initialFormData : PropTypes.shape({
        deliveryoption : PropTypes.string
    }),
    onError : PropTypes.func.isRequired
};

const DeliveryFormWithLoading = withLoading('/order/delivery-options')(DeliveryForm);

export default DeliveryFormWithLoading;