import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import { Button, ButtonGroup, FormControl, FormHelperText, IconButton, Input, InputLabel, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Alert from 'components/Alert';
import Loader from 'components/Loader';
import { editItemPropTypes } from '../../prop-types/todo-items.prop-types';

const useStyles = makeStyles({
    closeButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        color: '#aaa',
      },
});

const emptyInitialFormValues = {
    name : '',
    description : ''
};

const validationSchema = Yup.object().shape({
    name : Yup.string()
        .max(255, 'Název je omezený na 255 znaků.')
        .required('Název je povinný.'),
    description : Yup.string()
        .required(1, 'Popis je povinný.')
});

const priorityMapper = {
    fromString : str => {
        if (!str) return 1;
        switch (str.toUpperCase()) {
            case 'LOW': return 0;
            case 'HIGH': return 2;
            default: return 1;
        }
    },
    toString : num => {
        switch (num) {
            case 0: return 'LOW';
            case 2: return 'HIGH';
            default: return 'NORMAL';
        }
    }
};

const CreateEditTodoItemDialog = ({
    item,
    isDataLoading = false,
    onClose,
    onSubmit,
    errorMsg,
    isSubmitLoading = false
}) => {
    const classes = useStyles();
    const [ selectedPriority, setSelectedPriority ] = useState(1);

    const initialFormValues = item ? 
        {
            name : item.name,
            description : item.description
        } : emptyInitialFormValues;

    useEffect(() => {
        item && setSelectedPriority(priorityMapper.fromString(item?.priority));
    }, [item]);

    const handlePriorityBtnClick = priority => e => setSelectedPriority(priority);

    const handleFormSubmit = values => onSubmit({...values, priority: priorityMapper.toString(selectedPriority)});

    return (
        <Dialog open={true} onClose={onClose} maxWidth='sm' fullWidth>
            { isDataLoading && <Loader /> }
            { !isDataLoading &&
                <Formik
                    initialValues={initialFormValues}
                    validationSchema={validationSchema}
                    onSubmit={handleFormSubmit}>
                        {({
                            values,
                            errors,
                            touched,
                            handleChange
                        }) => (
                            <Form>
                                <DialogTitle>
                                    Nová TODO položka
                                    <IconButton onClick={onClose} className={classes.closeButton} size="large">
                                        <CloseIcon />
                                    </IconButton>
                                </DialogTitle>
                                <DialogContent>
                                    { errorMsg && <Alert type="error">{errorMsg}</Alert> }
                                    <FormControl error={touched.name && !!errors.name} fullWidth style={{ marginTop : '1rem' }}>
                                        <InputLabel htmlFor="name">Název</InputLabel>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={values.name}
                                            autoComplete="fname"
                                            onChange={handleChange}
                                            inputProps={{
                                                maxLength : 255
                                            }}
                                            fullWidth
                                            variant='standard'
                                        />
                                        <FormHelperText id="name-error">{touched.name && errors.name}</FormHelperText>
                                    </FormControl>
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
                                        error={touched.description && !!errors.description}
                                        helperText={touched.description && errors.description}
                                        onChange={handleChange}
                                    />
                                    <FormControl error={touched.name && !!errors.name} fullWidth>
                                        <InputLabel htmlFor="priority">Priorita</InputLabel>
                                        <br /><br />
                                        <ButtonGroup disableElevation  variant="contained" aria-label="outlined primary button group">
                                            <Button onClick={handlePriorityBtnClick(0)} color={selectedPriority === 0 ? "secondary" : "primary"}>Nízká</Button>
                                            <Button onClick={handlePriorityBtnClick(1)} color={selectedPriority === 1 ? "secondary" : "primary"}>Normální</Button>
                                            <Button onClick={handlePriorityBtnClick(2)} color={selectedPriority === 2 ? "secondary" : "primary"}>Vysoká</Button>
                                        </ButtonGroup>
                                    </FormControl>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={onClose} color="primary" disabled={isSubmitLoading}>
                                        Zrušit
                                    </Button>
                                    <Button type="submit" color="primary" variant="contained" autoFocus disabled={isSubmitLoading}>
                                        { isSubmitLoading ? <Loader /> : 'Uložit' }
                                    </Button>
                                </DialogActions>
                            </Form>
                        )}
                </Formik>
            }
        </Dialog>
    );
};

CreateEditTodoItemDialog.propTypes = {
    item : editItemPropTypes,
    isDataLoading : PropTypes.bool,
    onClose : PropTypes.func.isRequired,
    onSuccess : PropTypes.func.isRequired,
    isSubmitLoading : PropTypes.bool
};

export default CreateEditTodoItemDialog;