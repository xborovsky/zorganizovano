import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/styles';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Alert from 'components/Alert';
import FormHelperText from '@material-ui/core/FormHelperText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
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
                                console.log(res);
                                resetForm();
                                setSubmitting(false);
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
                                        <FormControl error={touched.username && !!errors.username} fullWidth>
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
                                        <FormControl error={touched.password && !!errors.password} fullWidth>
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
            </div>
        </Container>
    );
};

export default withStyles(styles)(Login);