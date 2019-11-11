import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import { Formik, Form } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Link } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import WizardButtons from '../../components/WizardButtons';
import ShoppingCart from './components/ShoppingCart';
import CustomerInfo from './components/CustomerInfo';
import Section from './components/Section';
import DataFetcher from 'components/DataFetcher';
import ShoppingCartSm from './components/ShoppingCartSm';
import ShoppingCartContext from '../../../shopping-cart/state-management/ShoppingCartContext';
import { EMPTY_SHOPPING_CART } from '../../../shopping-cart/state-management/ShoppingCartActions';

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
    onError,
    orderData,
    classes
}) => {

    const { dispatch } = useContext(ShoppingCartContext);
    const history = useHistory();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleFinishOrder = (values, { setSubmitting }) => {
        setSubmitting(true);
        const serverDataShoppingCart = orderData.shoppingCart.map(item => { return {itemId : item.id, quantity : item.quantity} });
        axios.post(
            '/order/confirm', {
            ...orderData,
            shippingAddress : orderData.selectedZasilkovna ? {
                street : orderData.selectedZasilkovna.name,
                township : orderData.selectedZasilkovna.city,
                zipCode : orderData.selectedZasilkovna.zip,
                country : 'Česká republika'
            } : null,
            shoppingCart : {
                items : serverDataShoppingCart
            }
         }).then(res => {
            setSubmitting(false);
            dispatch({ type : EMPTY_SHOPPING_CART });
            history.push({ pathname : '/eshop/order-created', state : { order : res.data } });
         })
         .catch(err => {
            setSubmitting(false);
            console.error(err);
            onError('Problém komunikace se servrem');
         });
    };
    return (
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
                        onSubmit={handleFinishOrder}>
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                isSubmitting
                            }) => (
                                <Form>
                                    <div>
                                        <Section title='Objednáváte si tyto položky'>
                                            <Hidden smDown>
                                                <ShoppingCart
                                                    items={orderData.shoppingCart}
                                                    selectedDelivery={selectedDelivery} />
                                            </Hidden>
                                            <Hidden mdUp>
                                                <ShoppingCartSm
                                                    items={orderData.shoppingCart}
                                                    selectedDelivery={selectedDelivery} />
                                            </Hidden>
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
                                            label={<Link to='/eshop/terms' target="_blank">Souhlasím s obchodními podmínkami</Link>}
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
                                            loading : isSubmitting,
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
};

OrderConfirmation.propTypes = {
    onGoToPrevStep : PropTypes.func.isRequired,
    onError : PropTypes.func.isRequired,
    orderData : PropTypes.shape({}).isRequired // TODO
};

export default withStyles(styles)(OrderConfirmation);