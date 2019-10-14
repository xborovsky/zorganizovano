import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import withLoading from '../../../../components/hoc/WithLoading';

const DeliveryForm = ({ data, loading, error }) => {
    const [selectedDelivery, setSelectedDelivery] = useState(data ? data[0] : null);

    const handleDeliveryOptionChange = () => {
        console.log('handleDeliveryOptionChange');
    };

    return (
        !error &&
            <>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="delivery option" name="delivery-option" value={selectedDelivery} onChange={handleDeliveryOptionChange}>
                        {
                            data.map(deliveryOption => (
                                <FormControlLabel value={deliveryOption} control={<Radio />} label={deliveryOption} />
                            ))
                        }
                    </RadioGroup>
                </FormControl>
            </>
    );
};

const DeliveryFormWithLoading = withLoading('/order/new/delivery-options')(DeliveryForm);

export default DeliveryFormWithLoading;