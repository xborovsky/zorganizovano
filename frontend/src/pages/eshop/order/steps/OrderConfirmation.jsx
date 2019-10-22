import React from 'react';
import PropTypes from 'prop-types';

import WizardButtons from '../components/WizardButtons';

const OrderConfirmation = ({ onGoToPrevStep, onOrderConfirmed }) => (
    <form onSubmit={onOrderConfirmed}>
        Potvrzení objednávky
        TODO - nějaký souhrn
        <WizardButtons
            showNext={false}
            showFinishOrder={true}
            onPrevClick={onGoToPrevStep}
        />
    </form>
);

OrderConfirmation.propTypes = {
    onGoToPrevStep : PropTypes.func.isRequired,
    onOrderConfirmed : PropTypes.func.isRequired
};

export default OrderConfirmation;