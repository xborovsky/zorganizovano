import React from 'react';
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    footer : {
        padding: '3rem 1rem',
        marginTop: 'auto',
        backgroundColor : '#48665e',
        textAlign : 'center'
    }
});

const Footer = ({ classes }) => (
    <footer className={classes.footer}>
        <Container maxWidth="sm">
            <Typography variant="body2" color="secondary">TODO - footer</Typography>
        </Container>
    </footer>
);

export default withStyles(styles)(Footer);