import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    warehouseCnt : {
        color : '#6c815a',
        marginTop : '0.7rem'
    }
});

const ProductStockQuantity = ({
    stockQuantityLeft,
    classes
}) => (
    stockQuantityLeft > 5 ?
        <Typography variant="body2" className={classes.warehouseCnt}>
            Skladem &gt; 5 kusů
        </Typography> :
        stockQuantityLeft === 0 ?
            <Typography variant="body2" className={classes.warehouseCnt}>
                Není skladem
            </Typography> :
            <Typography variant="body2" className={classes.warehouseCnt}>
                Skladem {stockQuantityLeft} {stockQuantityLeft === 5 ? 'kusů' : stockQuantityLeft === 1 ? 'kus' : 'kusy'}
            </Typography>
);

ProductStockQuantity.propTypes = {
    stockQuantityLeft : PropTypes.number.isRequired
};

export default withStyles(styles)(ProductStockQuantity);