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

import WizardButtons from '../components/WizardButtons';
import ZasilkovnaInfo from '../components/ZasilkovnaInfo';
import DataFetcher from 'components/DataFetcher';

const PACKETA_API_KEY = '78f6dc3fd19b4bc1';
const ZASILKOVNA = 'zasilkovna';

const DeliveryForm = ({
    onGoToPrevStep,
    onGoToNextStep,
    initialFormData,
    onError
}) => {
    const [selectedZasilkovna, setSelectedZasilkovna] = useState(initialFormData.selectedZasilkovna);

    const handleSelectZasilkovna = () => {
        window.Packeta.Widget.pick(PACKETA_API_KEY, setSelectedPickupPoint);
    };

    const setSelectedPickupPoint = point => {
        setSelectedZasilkovna(point);
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
            selectedZasilkovna
        });
        return false;
    };

    return (
        <DataFetcher url='/order/delivery-options'>
            { data => (
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
            ) }
        </DataFetcher>
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

export default DeliveryForm;