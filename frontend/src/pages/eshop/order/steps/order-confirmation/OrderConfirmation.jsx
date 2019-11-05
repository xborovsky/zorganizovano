import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import { Formik, Form } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Link } from 'react-router-dom';

import WizardButtons from '../../components/WizardButtons';
import ShoppingCart from './components/ShoppingCart';
import CustomerInfo from './components/CustomerInfo';
import Section from './components/Section';
import DataFetcher from 'components/DataFetcher';

const styles = theme => ({
    totalPrice : {
        textAlign : 'right',
        fontWeight : 'bold',
        fontSize : '1.8rem',
        marginTop : '2rem',
        [theme.breakpoints.down('sm')] : {
            fontSize : '1.2rem',
            marginTop : '1rem'
        }
    }
});

const OrderConfirmation = ({
    onGoToPrevStep,
    onOrderConfirmed,
    onError,
    orderData,
    classes
}) => (
    <DataFetcher url='/order/delivery-options'>
        { data => {
            const selectedDelivery = data.find(deliveryOption => deliveryOption.name.toLowerCase() === orderData.shipmentType.toLowerCase());
            return (
                <Formik
                    initialValues={{ orderTermsApproval : false }}
                    validate={values => {
                        let errors = {};
                        
                        if (!values.orderTermsApproval) {
                            errors.orderTermsApproval = 'Tento údaj je povinný.';
                        }

                        return errors;
                    }}
                    onSubmit={onOrderConfirmed}>
                        {({
                            values,
                            errors,
                            touched,
                            handleChange
                        }) => (
                            <Form>
                                <div>
                                    <Section title='Objednáváte si tyto položky'>
                                        <ShoppingCart
                                            items={orderData.shoppingCart}
                                            selectedDelivery={selectedDelivery} />
                                    </Section>
                                    <Section title='Zkontrolujte, prosím, Vaše kontaktní údaje a doručovací adresu'>
                                        <CustomerInfo
                                            data={orderData.customerInfo}
                                            shipment={{
                                                shipmentType : orderData.shipmentType,
                                                shippingAddress : orderData.selectedZasilkovna
                                            }} />
                                    </Section>
                                    <Section className={classes.totalPrice}>
                                        Celková cena: {
                                            orderData.shoppingCart.reduce((a, b) => a + (b.quantity * b.priceSingle), 0) +
                                            selectedDelivery.price
                                        },- Kč
                                    </Section>
                                </div>
                                <FormControl error={touched.orderTermsApproval && !!errors.orderTermsApproval} fullWidth style={{ alignItems : 'flex-end', marginBottom : '-3rem' }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                id="orderTermsApproval"
                                                name="orderTermsApproval"
                                                checked={values.orderTermsApproval}
                                                onChange={handleChange}
                                                color="primary"
                                            />
                                        }
                                        label={<Link to='/eshop/terms'>Souhlasím s obchodními podmínkami</Link>}
                                    />
                                    <FormHelperText id="orderTermsApproval-error">
                                        {touched.orderTermsApproval && errors.orderTermsApproval}
                                    </FormHelperText>
                                </FormControl>
                                <WizardButtons
                                    prev={{
                                        show : true,
                                        onClick : onGoToPrevStep
                                    }}
                                    next={{
                                        finishOrder : true,
                                        disabled : !values.orderTermsApproval
                                    }}
                                />
                            </Form>
                        )
                    }
                </Formik>
            );
        } }
    </DataFetcher>
);

OrderConfirmation.propTypes = {
    onGoToPrevStep : PropTypes.func.isRequired,
    onOrderConfirmed : PropTypes.func.isRequired,
    onError : PropTypes.func.isRequired,
    orderData : PropTypes.shape({}).isRequired // TODO
};

export default withStyles(styles)(OrderConfirmation);