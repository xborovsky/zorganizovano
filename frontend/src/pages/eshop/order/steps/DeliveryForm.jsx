import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import withLoading from '../../../../components/hoc/WithLoading';

const PACKETA_API_KEY = '78f6dc3fd19b4bc1';

const DeliveryForm = ({ data }) => {
    const [selectedDelivery, setSelectedDelivery] = useState(data ? data[0] : null);
    const [selectedZasilkovna, setSelectedZasilkovna] = useState(undefined);

    const handleDeliveryOptionChange = event => {
        setSelectedDelivery(event.currentTarget.value);
    };

    const handleSelectZasilkovna = () => {
        window.Packeta.Widget.pick(PACKETA_API_KEY, setSelectedPickupPoint);
    };

    const setSelectedPickupPoint = point => {
        setSelectedZasilkovna(
            point ?
                "Address: " + point.name + "\n" + point.zip + " " + point.city :
                undefined
        );
    };

    return (
            <>
                <Typography variant="h6" gutterBottom>
                    Vyberte typ dopravy
                </Typography>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="delivery option" name="delivery-option" value={selectedDelivery} onChange={handleDeliveryOptionChange}>
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
                                        selectedDelivery === 'ZASILKOVNA' && deliveryOption.name === 'ZASILKOVNA' ?
                                            <>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    type="button"
                                                    onClick={handleSelectZasilkovna}>
                                                    Vyberte zásilkovnu
                                                </Button>
                                                { selectedZasilkovna }
                                            </> :
                                            null
                                    }
                                </>
                            ))
                        }
                    </RadioGroup>
                </FormControl>
            </>
    );
};

const DeliveryFormWithLoading = withLoading('/order/delivery-options')(DeliveryForm);

export default DeliveryFormWithLoading;