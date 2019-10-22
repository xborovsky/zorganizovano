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

const PACKETA_API_KEY = '78f6dc3fd19b4bc1';
const ZASILKOVNA = 'zasilkovna';

const DeliveryForm = ({ data, onGoToPrevStep, onGoToNextStep, initialFormData }) => {
    const [selectedZasilkovna, setSelectedZasilkovna] = useState(undefined);

    const handleSelectZasilkovna = () => {
        window.Packeta.Widget.pick(PACKETA_API_KEY, setSelectedPickupPoint);
    };

    const setSelectedPickupPoint = point => {
        setSelectedZasilkovna(
            point ?
                { street : point.name, township : point.city, zipCode : point.zipCode, country : point.country } :
                undefined
        );
    };

    return (
        <Formik
            initialValues={
                initialFormData ?
                    {...initialFormData} :
                    {
                        deliveryOption : '',
                        zasilkovnaAddress : selectedZasilkovna
                    }
            }
            validate={values => {
                let errors = {};
                if (!values.deliveryOption || !values.deliveryOption.trim()) {
                    errors.deliveryOption = 'Vyberte prosím způsob doručení!';
                }
                if (values.deliveryOption.toLowerCase() === ZASILKOVNA && !values.zasilkovnaAddress) {
                    errors.zasilkovnaAddress = 'Vyberte prosím zásilkovnu!';
                }
                return errors;
            }}
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
                        <Typography variant="h6" gutterBottom>
                            Vyberte typ dopravy
                        </Typography>
                        <FormControl component="fieldset" error={touched.deliveryOption && !!errors.deliveryOption}>
                            <RadioGroup aria-label="delivery option" name="deliveryOption" value={values.deliveryOption} onChange={handleChange}>
                                {
                                    data.map(deliveryOption => (
                                        <> {/* TODO key or some custom component or something */}
                                            <FormControlLabel
                                                key={deliveryOption.name}
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
                                                        { values.zasilkovnaAddress }
                                                        <FormHelperText id="zasilkovnaAddress-error">{touched.zasilkovnaAddress && errors.zasilkovnaAddress}</FormHelperText>
                                                    </> :
                                                    null
                                            }
                                        </>
                                    ))
                                }
                            </RadioGroup>
                            <FormHelperText id="deliveryOption-error">{touched.deliveryOption && errors.deliveryOption}</FormHelperText>
                        </FormControl>
                        <WizardButtons
                            showPrev={true}
                            showNext={!isSubmitting}
                            onPrevClick={onGoToPrevStep}
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
    })
};

const DeliveryFormWithLoading = withLoading('/order/delivery-options')(DeliveryForm);

export default DeliveryFormWithLoading;