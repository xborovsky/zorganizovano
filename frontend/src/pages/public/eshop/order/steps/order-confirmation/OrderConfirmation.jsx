import React, { useState, useEffect } from 'react';
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
import ShoppingCartSm from './components/ShoppingCartSm';
import { EMPTY_SHOPPING_CART } from '../../../shopping-cart/state-management/ShoppingCartActions';
import useShoppingCartContext from '../../../shopping-cart/state-management/use-shopping-cart-context';
import DiscountCodeSetup from './components/DiscountCodeSetup';
import { calculateCartSum } from 'pages/public/eshop/shopping-cart/util/cart-sum-calculator';
import Alert from 'components/Alert';
import { CircularProgress } from '@material-ui/core';

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

    const { dispatch, discountCode, setDiscountCode } = useShoppingCartContext();
    const history = useHistory();
    const [isLoadingDeliveryOptions, seIsLoadingDeliveryOptions] = useState(true);
    const [deliveryOptions, setDeliveryOptions] = useState(undefined);
    const [deliveryOptionsFetchError, setDeliveryOptionsFetchError] = useState(false);
    const selectedDelivery = deliveryOptions?.find(deliveryOption => deliveryOption.name.toLowerCase() === orderData.shipmentType.toLowerCase());
    const cartSum = calculateCartSum(
        orderData.shoppingCart.reduce((a, b) => a + (b.quantity * b.priceSingle), 0),
        selectedDelivery?.price || 0,
        discountCode
    );

    useEffect(() => {
        const fetchData = () => {
            axios.post('/order/delivery-options', { orderItemIds : orderData.shoppingCart.map(item => item.id) })
                .then(res => {
                    setDeliveryOptions(res.data);
                    seIsLoadingDeliveryOptions(false);
                }).catch(err => {
                    onError('Ups, něco se pokazilo.');
                    setDeliveryOptionsFetchError(true);
                    seIsLoadingDeliveryOptions(false);
                });
            };

        fetchData();
    }, []);

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
            },
            discountCode : discountCode?.code
         }).then(res => {
            setSubmitting(false);
            dispatch({ type : EMPTY_SHOPPING_CART });
            setDiscountCode(undefined);
            history.push({ pathname : '/eshop/order-created', state : { order : res.data } });
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

    const onFormKeyDown = e => {
        if ((e.charCode || e.keyCode) === 13) {
            e.preventDefault();
        }
    };

    if (deliveryOptionsFetchError) {
        return <Alert type="error">Problém komunikace se serverem.</Alert>;
    } else if (isLoadingDeliveryOptions) {
        return <CircularProgress />;
    }

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
                    <Form onKeyDown={onFormKeyDown}>
                        <div>
                            <Section title='Objednáváte si tyto položky'>
                                <Hidden smDown>
                                    <ShoppingCart
                                        intermediateSum={cartSum.cartIntermediateSum}
                                        totalSum={cartSum.totalSum}
                                        items={orderData.shoppingCart}
                                        selectedDelivery={selectedDelivery}
                                        discountValue={cartSum.discountCodeDisplayValue}
                                    />
                                </Hidden>
                                <Hidden mdUp>
                                    <ShoppingCartSm
                                        intermediateSum={cartSum.cartIntermediateSum}
                                        totalSum={cartSum.totalSum}
                                        items={orderData.shoppingCart}
                                        selectedDelivery={selectedDelivery} 
                                        discountValue={cartSum.discountCodeDisplayValue}
                                    />
                                </Hidden>
                                <DiscountCodeSetup />
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
                                Celková cena: { cartSum.totalSum },- Kč
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
};

OrderConfirmation.propTypes = {
    onGoToPrevStep : PropTypes.func.isRequired,
    onError : PropTypes.func.isRequired,
    orderData : PropTypes.shape({}).isRequired // TODO
};

export default withStyles(styles)(OrderConfirmation);