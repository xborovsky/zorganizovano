import React, { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import { withStyles } from '@mui/styles';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Alert from 'components/Alert';
import FormHelperText from '@mui/material/FormHelperText';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../AuthProvider';

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding : '20px'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    btnWrapper : {
        textAlign : 'center'
    }
});

const LoginFormSchema = Yup.object().shape({
    username : Yup.string()
        .required('Prosím, zadejte jméno.'),
    password: Yup.string()
        .required('Prosím, zadejte heslo.')
});

const Login = ({ classes }) => {

    const [ error, setError ] = useState(undefined);
    const { updateAuth } = useContext(AuthContext);
    const history = useHistory();

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h6">
                    Přihlášení do admin konzole
                </Typography>
                { error && <Alert type="error">{error}</Alert> }
                <Formik
                    initialValues={{
                        username : '',
                        password : ''
                    }}
                    validationSchema={LoginFormSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setSubmitting(true);
                        axios.post('/auth/login', { ...values })
                            .then(res => {
                                updateAuth(JSON.stringify(res.data));
                                resetForm();
                                setSubmitting(false);
                                history.push('/admin/orders');
                            })
                            .catch(err => {
                                console.error(err);
                                if (err.response && err.response.status === 401) {
                                    setError('Jméno nebo heslo není správné.');
                                } else {
                                    setError('Chyba na serveru.');
                                }
                                setSubmitting(false);
                            });
                    }}>
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            isSubmitting
                        }) => (
                            <Form className={classes.form}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <FormControl error={touched.username && !!errors.username} fullWidth variant='standard'>
                                            <InputLabel htmlFor="username">Uživatel</InputLabel>
                                            <Input
                                                id="username"
                                                name="username"
                                                value={values.username}
                                                autoComplete="username"
                                                onChange={handleChange}
                                            />
                                            <FormHelperText id="username-error">{touched.username && errors.username}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl error={touched.password && !!errors.password} fullWidth variant='standard'>
                                            <InputLabel htmlFor="password">Heslo</InputLabel>
                                            <Input
                                                id="password"
                                                name="password"
                                                type="password"
                                                value={values.password}
                                                autoComplete="password"
                                                onChange={handleChange}
                                            />
                                            <FormHelperText id="password-error">{touched.password && errors.password}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} className={classes.btnWrapper}>
                                        { isSubmitting ?
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                className={classes.submitBtn}
                                                disabled>
                                                <CircularProgress />
                                            </Button> :
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                className={classes.submitBtn}>
                                                Prihlásit
                                            </Button>
                                        }
                                    </Grid>
                                </Grid>
                            </Form>
                        )
                    }
                </Formik>
            </Paper>
        </Container>
    );
};

export default withStyles(styles)(Login);