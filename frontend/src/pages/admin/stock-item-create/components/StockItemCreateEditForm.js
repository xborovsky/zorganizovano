import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import StockItemDetailsForm from './StockItemDetailsForm';
import StockItemPicturesForm from './StockItemPicturesForm';
import Loader from 'components/Loader';
import { AuthContext } from 'pages/admin/AuthProvider';

const initialFormData = {
    name : '',
    subName : '',
    description : '',
    metaTitle : '',
    price : 0,
    enableOnlineShipment : false,
    thumbnailLocation : ''
};

const StockItemCreateEditForm = ({
    stockItem = initialFormData,
    categories,
    onSubmitSuccess,
    onSubmitError
}) => {
    const [ pictures, setPictures ] = useState(stockItem.pictures || []);
    const [ details, setDetails ] = useState(stockItem.itemDetails || []);
    const [ category, setCategory ] = useState(stockItem.itemCategory?.id || 1);
    const { auth } = useContext(AuthContext);

    const validationSchema = Yup.object().shape({
        name : Yup.string()
            .max(100, 'Název může obsahovat maximálně 100 znaků.')
            .required('Název je povinný.'),
        subName : Yup.string()
            .max(200, 'Podnázev může obsahovat maximálně 200 znaků.')
            .required('Podnázev je povinný.'),
        description : Yup.string()
            .required('Popis je povinný.'),
        metaTitle : Yup.string()
            .required('SEO popis je povinný.'),
        price : Yup.number()
            .min(1, 'Cena musí být kladné číslo.'),
        thumbnailLocation : Yup.string()
            .required('Cloudinary název obrázku pro náhled je povinný.')
    });

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
    }

    const handlePictureChange = (cnt, field, value) => {
        const picturesCpy = [...pictures];
        picturesCpy[cnt][field] = value;
        setPictures(picturesCpy);
    }

    const handlePictureAddClick = e =>
        setPictures(prev => ([ ...prev, { src : '', main : false } ]));

    const handlePictureDeleteClick = idx => {
        const picturesCpy = [...pictures];
        picturesCpy.splice(idx, 1);
        setPictures(picturesCpy);
    };

    const handleChangeCategory = e => setCategory(e.target.value);

    const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
        axios({
            method : 'POST',
            url : stockItem.id ? `/admin/stock-items/${stockItem.id}` : '/admin/stock-items',
            headers : {
                'Authorization' : `Bearer ${auth}`
            },
            data : { ...values, pictures, details, category }
        }).then(res => onSubmitSuccess())
            .catch(err => {
                // TODO validation errors?
                console.error(err);
                onSubmitError(err);
                setSubmitting(false);
            });
    };

    return (
        <Formik
            initialValues={stockItem}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}>
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    isSubmitting
                }) => (
                    <Form>
                        <TextField
                            id="name"
                            name="name"
                            label="Název"
                            value={values.name}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            error={touched.name && !!errors.name}
                            helperText={touched.name && errors.name}
                            onChange={handleChange}
                            InputProps={{
                                inputProps : {
                                    maxLength : 100
                                }
                            }}
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
                            rowsMax={20}
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
                            rowsMax={20}
                            error={touched.metaTitle && !!errors.metaTitle}
                            helperText={touched.metaTitle && errors.metaTitle}
                            onChange={handleChange}
                        />
                        <TextField
                            id="price"
                            name="price"
                            label="Cena"
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
                            >
                                { categories.map(category => (
                                    <MenuItem value={category.id} key={category.id}>
                                        { category.name }
                                    </MenuItem>        
                                )) }
                            </Select>
                        </FormControl>
                        <FormControl error={touched.enableOnlineShipment && !!errors.enableOnlineShipment} fullWidth>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={values.enableOnlineShipment}
                                    onChange={handleChange}
                                    name="enableOnlineShipment"
                                    color="primary"
                                />
                                }
                                label="Povolit online doručení"
                            />
                            <FormHelperText id="enableOnlineShipment-error">{touched.enableOnlineShipment && errors.enableOnlineShipment}</FormHelperText>
                        </FormControl>
                        <TextField
                            id="thumbnailLocation"
                            name="thumbnailLocation"
                            label="Cloudinary název obrázku pro náhled"
                            value={values.thumbnailLocation}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            error={touched.thumbnailLocation && !!errors.thumbnailLocation}
                            helperText={touched.thumbnailLocation && errors.thumbnailLocation}
                            onChange={handleChange}
                        />

                        <h3 style={{ marginTop : '3rem' }}>Detaily</h3>
                        <StockItemDetailsForm 
                            details={details}
                            onDeleteClick={handleDetailDeleteClick}
                            onAddClick={handleDetailAddClick}
                            onChange={handleDetailChange}
                        />

                        <h3 style={{ marginTop : '3rem' }}>Obrázky</h3>
                        <StockItemPicturesForm
                            pictures={pictures}
                            onDeleteClick={handlePictureDeleteClick}
                            onAddClick={handlePictureAddClick}
                            onChange={handlePictureChange}
                        />

                        <div style={{ marginTop : '3rem', textAlign : 'center', marginBottom : '2rem' }}>
                            <Button 
                                type="submit" 
                                color="primary" 
                                variant="contained"
                                disabled={isSubmitting}>
                                { isSubmitting ? <Loader /> : 'Uložit položku do databáze' }
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
    );
};

StockItemCreateEditForm.propTypes = {
    stockItem : PropTypes.shape({
        id : PropTypes.number.isRequired,
        name : PropTypes.string.isRequired,
        subName : PropTypes.string.isRequired,
        description : PropTypes.string.isRequired,
        metaTitle : PropTypes.string.isRequired,
        price : PropTypes.number.isRequired,
        enableOnlineShipment : PropTypes.bool.isRequired,
        thumbnailLocation : PropTypes.string.isRequired,
        itemCategory : PropTypes.shape({
            id : PropTypes.number.isRequired
        }).isRequired
    }),
    categories : PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.number.isRequired,
        name : PropTypes.string.isRequired
    })).isRequired,
    onSubmitSuccess : PropTypes.func.isRequired,
    onSubmitError : PropTypes.func.isRequired
};

export default StockItemCreateEditForm;