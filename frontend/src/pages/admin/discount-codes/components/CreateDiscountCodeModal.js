import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, FormHelperText, IconButton, Input, InputLabel, makeStyles } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CloseIcon from '@material-ui/icons/Close';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';
import { format, differenceInMilliseconds } from 'date-fns';
import { useMutation, useQueryClient } from 'react-query';

import { AuthContext } from '../../AuthProvider';
import Loader from '../../../../components/Loader';
import Alert from '../../../../components/Alert';

const useStyles = makeStyles({
    closeButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        color: '#aaa',
      },
});

const initialFormValues = {
    code : '',
    discount : 0,
    percentage : false,
    validUntil : new Date(),
    oneTime : false
};

const validationSchema = Yup.object().shape({
    code : Yup.string()
        .max(20, 'Kód je omezený na 20 znaků.')
        .required('Kód je povinný.'),
    discount : Yup.number()
        .min(1, 'Sleva není validní.'),
    validUntil : Yup.date()
        .min(initialFormValues.validUntil, 'Platnost do musí být v budoucnu.')
});

const CreateDiscountCodeModal = ({
    onClose,
    onSuccess
}) => {
    const classes = useStyles();
    const { auth } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const createQueryCodeMutation = useMutation(
        (postData) => axios({
            method : 'POST',
            url : `/admin/discount-codes`,
            headers : {
                'Authorization' : `Bearer ${auth}`
            },
            data : postData
        }),
        {
            onSuccess : res => {
                queryClient.invalidateQueries('admin-discount-codes');
                onSuccess(res.data)
            },
            onError : () => {
                setError('Formulář se nepodařilo odeslat.');
            }
        }
    );
    const [ error, setError ] = useState(undefined);

    const handleChangeValidUntil = setFieldValue => newVal => setFieldValue('validUntil', newVal);

    const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
        if (values.percentage && values.discount > 100) {
            setErrors({
                discount : 'Sleva vyšší než 100% není validní.'
            });
            setError('Formulář obsahuje chyby.');
            setSubmitting(false);
        } else if (differenceInMilliseconds(values.validUntil, new Date()) < 0) {
            setErrors({
                validUntil : 'Platnost do musí být v budoucnu.'
            });
            setError('Formulář obsahuje chyby.');
            setSubmitting(false);
        } else {
            createQueryCodeMutation.mutate(
                {
                    ...values,
                    validUntil : format(values.validUntil, `yyyy-MM-dd'T'HH:mm:ss.SSS`)
                }
            );
        }
    };

    return (
        <Dialog open={true} onClose={onClose} maxWidth='sm' fullWidth>
            <Formik
                initialValues={initialFormValues}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}>
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        isSubmitting,
                        setFieldValue
                    }) => (
                        <Form>
                            <DialogTitle>
                                Nový slevový kód
                                <IconButton onClick={onClose} className={classes.closeButton}>
                                    <CloseIcon />
                                </IconButton>
                            </DialogTitle>
                            <DialogContent>
                                { error && <Alert type="error">{error}</Alert> }
                                <FormControl error={touched.code && !!errors.code} fullWidth>
                                    <InputLabel htmlFor="code">Kód</InputLabel>
                                    <Input
                                        id="code"
                                        name="code"
                                        value={values.code}
                                        autoComplete="fcode"
                                        onChange={handleChange}
                                        inputProps={{
                                            maxLength : 20
                                        }}
                                        fullWidth
                                    />
                                    <FormHelperText id="code-error">{touched.code && errors.code}</FormHelperText>
                                </FormControl>
                                <FormControl error={touched.discount && !!errors.discount} fullWidth>
                                    <InputLabel htmlFor="discount">Sleva</InputLabel>
                                    <Input
                                        type="number"
                                        id="discount"
                                        name="discount"
                                        value={values.discount}
                                        onChange={handleChange}
                                        inputProps={{
                                            min : 0,
                                            step : 5
                                        }}
                                        fullWidth
                                    />
                                    <FormHelperText id="discount-error">{touched.discount && errors.discount}</FormHelperText>
                                </FormControl>
                                <FormGroup row>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <FormControl error={touched.validUntil && !!errors.validUntil} fullWidth>
                                            <DateTimePicker
                                                label="Platnost do"
                                                inputVariant="standard"
                                                value={values.validUntil}
                                                onChange={handleChangeValidUntil(setFieldValue)}
                                                fullWidth
                                                format="dd.MM.yyyy HH:mm:ss"
                                            />
                                            <FormHelperText id="code-validUntil">{touched.validUntil && errors.validUntil}</FormHelperText>
                                        </FormControl>
                                    </MuiPickersUtilsProvider>
                                </FormGroup>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={values.percentage}
                                                onChange={handleChange}
                                                value="percentage"
                                                id="percentage"
                                                color="primary"
                                            />
                                        }
                                        label="Procentuální"
                                    />
                                </FormGroup>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={values.oneTime}
                                                onChange={handleChange}
                                                value="oneTime"
                                                id="oneTime"
                                                color="primary"
                                            />
                                        }
                                        label="Jednorázový"
                                    />
                                </FormGroup>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={onClose} color="primary" disabled={createQueryCodeMutation.isLoading}>
                                    Zrušit
                                </Button>
                                <Button type="submit" color="primary" variant="contained" autoFocus disabled={createQueryCodeMutation.isLoading}>
                                    { createQueryCodeMutation.isLoading ? <Loader /> : 'Uložit' }
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
            </Formik>
        </Dialog>
    );
};

CreateDiscountCodeModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired
};

export default CreateDiscountCodeModal;