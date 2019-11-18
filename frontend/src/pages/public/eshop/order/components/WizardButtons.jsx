import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    root : {
        marginTop : '3rem',
        marginBottom : '0.5rem'
    },
    right : {
        textAlign : 'right'
    },
    loader : {
        width : '25px !important',
        height : '25px !important',
        marginLeft : 6,
        marginRight : 6
    }
});

const WizardButtons = ({
    prev,
    next,
    classes
}) => (
    <Grid container className={classes.root}>
        <Grid item xs={4}>
            {prev.show &&
                <Button
                    variant="contained"
                    onClick={prev.onClick}>
                    Zpět
                </Button>
            }
        </Grid>
        <Grid item xs={8} className={classes.right}>
            {next.loading ?
                <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    disabled>
                    <CircularProgress className={classes.loader} />
                </Button> :
                <>
                    {
                        next.finishOrder ?
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={next.disabled}
                                type="submit">
                                Dokončit objednávku
                            </Button> :
                                next.show &&
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={next.disabled}
                                        type="submit">
                                        Další
                                    </Button>
                    }
                </>
            }
        </Grid>
    </Grid>
);

WizardButtons.propTypes = {
    prev : PropTypes.shape({
        show : PropTypes.bool,
        onClick : PropTypes.func
    }).isRequired,
    next : PropTypes.shape({
        show : PropTypes.bool,
        loading : PropTypes.bool,
        finishOrder : PropTypes.bool,
        disabled : PropTypes.bool
    }).isRequired
};

export default withStyles(styles)(WizardButtons);