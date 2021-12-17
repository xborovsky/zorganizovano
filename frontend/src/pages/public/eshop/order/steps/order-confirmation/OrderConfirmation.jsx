import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import { Formik, Form } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
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
import { getCountryEnumName } from '../../../../../../util/country-util';
import DiscountCodeSetup from './components/DiscountCodeSetup';
import { calculateCartSum } from 'pages/public/eshop/shopping-cart/util/cart-sum-calculator';
import OrderContext from '../../OrderContext';

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
    classes
}) => {
    const { dispatch, discountCode, setDiscountCode } = useShoppingCartContext();
    const { customerInfo, customerAddress, selectedDelivery, shoppingCart } = useContext(OrderContext);
    const history = useHistory();
    const cartSum = calculateCartSum(
        shoppingCart.reduce((a, b) => a + (b.quantity * b.priceSingle), 0),
        selectedDelivery.type.price || 0,
        discountCode
    );

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleFinishOrder = (values, { setSubmitting }) => {
        setSubmitting(true);
        const serverDataShoppingCart = shoppingCart.map(item => { return {itemId : item.id, quantity : item.quantity} });
        axios.post(
            '/order/confirm', {
            customerInfo : {
                ...customerInfo,
                address : {
                    ...customerAddress,
                    country : customerAddress.country.enumName
                }
            },
            shipmentType : selectedDelivery.type.name,
            shippingAddress : selectedDelivery.zasilkovna ? {
                street : selectedDelivery.zasilkovna.name,
                township : selectedDelivery.zasilkovna.city,
                zipCode : selectedDelivery.zasilkovna.zip,
                country : getCountryEnumName(selectedDelivery.zasilkovna.country)
            } : null,
            shoppingCart : {
                items : serverDataShoppingCart
            },
            discountCode : discountCode?.code,
            note : values.note?.trim()
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
                onError('Je mi líto, požadované zboží již není skladem. Zboží bude naskladněno do 5 dnů.');
            } else {
                onError('Problém komunikace se serverem.');
            }
         });
    };

    return (
        <Formik
            initialValues={{ orderTermsApproval : false, note : '' }}
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
                                        intermediateSum={cartSum.cartIntermediateSum}
                                        totalSum={cartSum.totalSum}
                                        discountValue={cartSum.discountCodeDisplayValue}
                                    />
                                </Hidden>
                                <Hidden mdUp>
                                    <ShoppingCartSm
                                        intermediateSum={cartSum.cartIntermediateSum}
                                        totalSum={cartSum.totalSum}
                                        discountValue={cartSum.discountCodeDisplayValue}
                                    />
                                </Hidden>
                                <DiscountCodeSetup />
                            </Section>
                            <Section title='Zkontrolujte, prosím, Vaše kontaktní údaje a doručovací adresu'>
                                <CustomerInfo />
                            </Section>
                            <Section className={classes.totalPrice}>
                                Celková cena: { cartSum.totalSum },- Kč
                            </Section>
                        </div>
                        <TextField
                            id="note"
                            name="note"
                            label="Poznámka"
                            fullWidth
                            multiline
                            rows={4}
                            value={values.note}
                            onChange={handleChange}
                            margin="normal"
                            variant='outlined'
                        />
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
};

export default withStyles(styles)(OrderConfirmation);