import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { Grid, CircularProgress } from '@material-ui/core';

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
    showPrev = true,
    showNext = true,
    showFinishOrder = false,
    showLoading = false,
    onPrevClick,
    classes
}) => (
    <Grid container className={classes.root}>
        <Grid item xs={6}>
            {showPrev &&
                <Button
                    variant="contained"
                    onClick={onPrevClick}>
                    Zpět
                </Button>
            }
        </Grid>
        <Grid item xs={6} className={classes.right}>
            {showLoading ?
                <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    disabled>
                    <CircularProgress className={classes.loader} />
                </Button> :
                <>
                    { showNext &&
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit">
                            Další
                        </Button>
                    }
                    {showFinishOrder &&
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit">
                            Dokončit objednávku
                        </Button>
                    }
                </>
            }
        </Grid>
    </Grid>
);

WizardButtons.propTypes = {
    showPrev : PropTypes.bool,
    showNext : PropTypes.bool,
    showFinishOrder : PropTypes.bool,
    onPrevClick : PropTypes.func,
    showLaoding : PropTypes.bool
};

export default withStyles(styles)(WizardButtons);