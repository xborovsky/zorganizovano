import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

const styles = theme => ({
    root : {
        marginTop : '3rem',
        marginBottom : '0.5rem'
    },
    right : {
        textAlign : 'right'
    }
});

const WizardButtons = ({
    showPrev,
    showNext,
    showFinishOrder,
    onPrevClick,
    onNextClick,
    onFinishOrderClick,
    classes
}) => (
    <Grid container className={classes.root}>
        <Grid item xs={6}>
            {showPrev &&
                <Button onClick={onPrevClick}>
                    Zpět
                </Button>
            }
        </Grid>
        <Grid item xs={6} className={classes.right}>
            {showNext &&
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onNextClick}>
                    Další
                </Button>
            }
            {showFinishOrder &&
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onFinishOrderClick}>
                    Dokončit objednávku
                </Button>
            }
        </Grid>
    </Grid>
);

WizardButtons.propTypes = {
    showPrev : PropTypes.bool.isRequired,
    showNext : PropTypes.bool.isRequired,
    showFinishOrder : PropTypes.bool.isRequired,
    onPrevClick : PropTypes.func.isRequired,
    onNextClick : PropTypes.func.isRequired,
    onFinishOrderClick : PropTypes.func.isRequired
};

export default withStyles(styles)(WizardButtons);