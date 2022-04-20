import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { Button, FormControl, InputLabel, TextField, Select, MenuItem, Grid } from '@mui/material';
import StockItemDetailsForm from 'pages/admin/stock-item-create/components/StockItemDetailsForm';
import { useMutation } from 'react-query';
import axios from 'axios';
import * as Yup from 'yup';

import NamesFormSection from './NamesFormSection';
import Loader from 'components/Loader';
import { AuthContext } from 'pages/admin/AuthProvider';
import { getChainedCategories } from 'util/category-chaining-util';
import GeneratedImageNames from './GeneratedImageNames';

const initialFormData = {
    subName : '',
    description : '',
    metaTitle : '',
    price : 0,
    quantity : 0,
    newSubcategories : '',
    imageNamePrefix : '',
    imageNameSuffix : ''
};

const StockItemCreateMultiForm = ({
    categories,
    onSubmitError,
    onSubmitSuccess
}) => {
    const [ names, setNames ] = useState(['']);
    const [ details, setDetails ] = useState([]);
    const [ category, setCategory ] = useState(1);

    const { auth } = useContext(AuthContext);
    const createMutation = useMutation(
        (data) => axios({
            method : 'POST',
            url : '/admin/stock-items/multiple',
            headers : {
                'Authorization' : `Bearer ${auth}`
            },
            ...data
        }),
        {
            onSuccess : () => {
                onSubmitSuccess();
            },
            onError : error => {
                onSubmitError(error);
            }
        }
    );
    const validationSchema = Yup.object().shape({
        subName : Yup.string()
            .max(200, 'Podnázev je omezený na 200 znaků.')
            .required('Podnázev je povinný.'),
        description : Yup.string()
            .required('Popis je povinný.'),
        metaTitle : Yup.string()
            .required('SEO popis je povinný.'),
        price : Yup.number()
            .min(1, 'Cena musí být kladná.'),
        quantity : Yup.number()
            .min(0, 'Počet kusů musí být kladný, nebo 0.'),
        quantity : Yup.number()
            .min(0, 'Počet kusů musí být kladný, nebo 0.')
    });

    const handleAddNameField = () => setNames([...names, '']);

    const handleDeleteNameField = idx => e => {
        const namesCpy = [...names];
        namesCpy.splice(idx, 1);
        setNames(namesCpy);
    };

    const handleChangeNameField = idx => e => {
        const namesCpy = [...names];
        namesCpy[idx] = e.currentTarget.value;
        setNames(namesCpy);
    };

    const handleDetailAddClick = e =>
        setDetails(prev => ([ ...prev, { key : '', value : '', priorityOrder : 0 } ]));

    const handleDetailDeleteClick = idx => {
        const detailsCpy = [...details];
        detailsCpy.splice(idx, 1);
        setDetails(detailsCpy);
    };

    const handleDetailChange = (cnt, field, value) => {
        const detailsCpy = [...details];
        detailsCpy[cnt][field] = field == 'priorityOrder' ? +value : value;
        setDetails(detailsCpy);
    };

    const handleChangeCategory = e => setCategory(e.target.value);

    const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
        const postData = { ...values, names, details, category };
        createMutation.mutate(
            {data : { ...postData}},
            {
                onError : error => {
                    setSubmitting(false);
                    setErrors(error.response?.data?.errors);
                }
            }
        );
    };

    const additionalValidation = values => {
        let errors = {};

        names.forEach((name, cnt) => {
            if (name.trim().length == 0) {
                errors[`name${cnt}`] = 'Jméno je povinné';
                return false;
            }
        });

        return errors;
    };

    return (
        <Formik
            initialValues={initialFormData}
            validationSchema={validationSchema}
            validate={additionalValidation}
            onSubmit={handleFormSubmit}>
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    isSubmitting
                }) => (
                    <Form>
                        <NamesFormSection
                            names={names}
                            onAddClick={handleAddNameField}
                            onChange={handleChangeNameField}
                            onDelete={handleDeleteNameField}
                            errors={errors}
                            touched={touched}
                        />

                        <TextField
                            id="subName"
                            name="subName"
                            label="Podnázev"
                            value={values.subName}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            error={touched.subName && !!errors.subName}
                            helperText={touched.subName && errors.subName}
                            onChange={handleChange}
                            InputProps={{
                                inputProps : {
                                    maxLength : 200
                                }
                            }}
                        />
                        <TextField
                            id="description"
                            name="description"
                            label="Popis"
                            value={values.description}
                            multiline
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            rows={5}
                            maxRows={20}
                            error={touched.description && !!errors.description}
                            helperText={touched.description && errors.description}
                            onChange={handleChange}
                        />
                        <TextField
                            id="metaTitle"
                            name="metaTitle"
                            label="SEO popis"
                            value={values.metaTitle}
                            multiline
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            rows={5}
                            maxRows={20}
                            error={touched.metaTitle && !!errors.metaTitle}
                            helperText={touched.metaTitle && errors.metaTitle}
                            onChange={handleChange}
                        />
                        <TextField
                            id="price"
                            name="price"
                            label="Cena"
                            type="number"
                            value={values.price}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            error={touched.price && !!errors.price}
                            helperText={touched.price && errors.price}
                            onChange={handleChange}
                            InputProps={{
                                inputProps : {
                                    min : 0
                                }
                            }}
                        />
                        <TextField
                            id="quantity"
                            name="quantity"
                            label="Počet kusů"
                            type="number"
                            value={values.quantity}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            error={touched.quantity && !!errors.quantity}
                            helperText={touched.quantity && errors.quantity}
                            onChange={handleChange}
                            InputProps={{
                                inputProps : {
                                    min : 0
                                }
                            }}
                        />
                        <FormControl variant="outlined" fullWidth margin="normal">
                            <InputLabel id="category">Kategorie</InputLabel>
                            <Select
                                value={category}
                                onChange={handleChangeCategory}
                                label="Kategorie"
                                inputProps={{
                                    name: 'category',
                                    id: 'category'
                                }}
                                variant="standard"
                            >
                                { getChainedCategories(categories).map(category => (
                                    <MenuItem value={category.id} key={category.id}>
                                        { category.name }
                                    </MenuItem>        
                                )) }
                            </Select>
                        </FormControl>
                        <TextField
                            id="newSubcategories"
                            name="newSubcategories"
                            label="Nová podkategorie"
                            value={values.newSubcategories}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            error={touched.newSubcategories && !!errors.newSubcategories}
                            helperText={(touched.newSubcategories && errors.newSubcategories) || 'Jako oddělovač podkategorií použijte kombinaci znaků "->"'}
                            onChange={handleChange}
                        />
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="imageNamePrefix"
                                    name="imageNamePrefix"
                                    label="Prefix názvu obrázku"
                                    value={values.imageNamePrefix}
                                    multiline
                                    margin="normal"
                                    variant="outlined"
                                    error={touched.imageNamePrefix && !!errors.imageNamePrefix}
                                    helperText={(touched.imageNamePrefix && errors.imageNamePrefix) || 'Bez "_" na konci'}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="imageNameSuffix"
                                    name="imageNameSuffix"
                                    label="Suffix názvu obrázku"
                                    value={values.imageNameSuffix}
                                    multiline
                                    margin="normal"
                                    variant="outlined"
                                    error={touched.imageNameSuffix && !!errors.imageNameSuffix}
                                    helperText={(touched.imageNameSuffix && errors.imageNameSuffix) || 'Bez "_" na začátku'}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <h3 style={{ marginTop : '3rem' }}>Generované jména obrázků</h3>
                        <GeneratedImageNames 
                            namePrefix={values.imageNamePrefix}
                            nameSuffix={values.imageNameSuffix}
                            itemNames={names}
                        />

                        <h3 style={{ marginTop : '3rem' }}>Detaily</h3>
                        <StockItemDetailsForm
                            details={details}
                            onDeleteClick={handleDetailDeleteClick}
                            onAddClick={handleDetailAddClick}
                            onChange={handleDetailChange}
                        />

                        <div style={{ marginTop : '3rem', textAlign : 'center', marginBottom : '2rem' }}>
                            <Button
                                type="submit" 
                                color="primary" 
                                variant="contained"
                                disabled={isSubmitting}>
                                { isSubmitting ? <Loader /> : 'Uložit do databáze' }
                            </Button>
                        </div>
                    </Form>
                )}
        </Formik>
    );
};

StockItemCreateMultiForm.propTypes = {
    categories : PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.number.isRequired,
        name : PropTypes.string.isRequired
    })).isRequired,
    onSubmitSuccess : PropTypes.func.isRequired,
    onSubmitError : PropTypes.func.isRequired
};

export default StockItemCreateMultiForm;