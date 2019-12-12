import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import { Formik, Form } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import Hidden from '@material-ui/core/Hidden';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

import WizardButtons from '../components/WizardButtons';
import ShoppingCart from './order-confirmation/ShoppingCart';
import CustomerInfo from './order-confirmation/CustomerInfo';
import Section from './order-confirmation/Section';
import ShoppingCartSm from './order-confirmation/ShoppingCartSm';
import { EMPTY_SHOPPING_CART } from '~/components/global-context/ShoppingCartActions';
import OrderCreated from './OrderCreated';

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
    deliveryOptions,
    onGoToPrevStep,
    onError,
    orderData,
    classes
}) => {

    const [orderCreatedData, setOrderCreatedData] = useState(undefined);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleFinishOrder = (values, { setSubmitting }) => {
        setSubmitting(true);
        const serverDataShoppingCart = orderData.shoppingCart.map(item => { return {itemId : item.id, quantity : item.quantity} });
        fetch(`${process.env.API_URL}/order/confirm`, {
            method : 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
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
            })
        })
        .then(res => res.json())
        .then(order => {
            setSubmitting(false);
            dispatch({ type : EMPTY_SHOPPING_CART });
            setOrderCreatedData({
                orderNum : order.orderNum,
                paymentInfo : order.paymentInfo
            });
         })
         .catch(err => {
            setSubmitting(false);
            console.error(err);
            if (err.response && err.response.status === 417) {
                onError('Je mi líto, požadované zboží již není skladem. Zboží bude naskladněco do 3 dnů.');
            } else {
                onError('Problém komunikace se serverem.');
            }
         });
    };

    const selectedDelivery = deliveryOptions.find(deliveryOption => deliveryOption.name.toLowerCase() === orderData.shipmentType.toLowerCase());

    if (orderCreatedData) {
        <OrderCreated
            orderNum={orderCreatedData.orderNum}
            paymentInfo={orderCreatedData.paymentInfo}
        />
    } else {
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
    }
};

OrderConfirmation.propTypes = {
    onGoToPrevStep : PropTypes.func.isRequired,
    onError : PropTypes.func.isRequired,
    orderData : PropTypes.shape({}).isRequired, // TODO
    // TODO deliveryOptions
};

export default withStyles(styles)(OrderConfirmation);