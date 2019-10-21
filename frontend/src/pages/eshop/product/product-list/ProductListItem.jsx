import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/styles/withStyles';
import { useHistory, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import { productShape } from '../product-prop-type';
import Price from '../../../../components/Price';

const styles = theme => ({
    card : {
        //cursor : 'pointer'
    },
    header : {
        backgroundColor : '#6c815a',
        color : '#fff',
        cursor : 'pointer',
        '&>.MuiCardHeader-content' : {
            '&>.MuiCardHeader-title' : {
                //fontSize : 18
            },
            '&>.MuiCardHeader-subheader' : {
                color : '#fff !important',
                //fontSize : 13
            }
        }
    },
    content : {
        cursor : 'pointer'
    },
    cover: {
        height: 200,
        cursor : 'pointer'
    },
    warehouseCnt : {
        color : '#6c815a',
        marginTop : '0.7rem'
    },
    textField: {
        width: 90
    },
    orderActionWrapper : {
        display : 'flex',
        justifyContent : 'flex-end',
        alignItems : 'baseline'
    }
});

const ProductListItem = ({ product, classes }) => {

    const history = useHistory();
    const location = useLocation();
    const [ quantity, setQuantity ] = useState(1);

    const goToDetail = () => {
        history.push(`${location.pathname}/products/${product.id}`);
    };

    const addToShoppingCart = product => {
        console.log('TODO add to shopping cart...');
    };

    const handleChangeQuantity = event => {
        setQuantity(event.currentTarget.value);
    };

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardHeader
                    title={product.name}
                    subheader={"TODO nejaky subheader"}
                    className={classes.header}
                    onClick={goToDetail}
                />
                <CardMedia
                    className={classes.cover}
                    image="http://www.tracyhensel.com/wp-content/uploads/2016/01/FullSizeRender-4-1024x795.jpg"
                    title="TODO - titulek"
                    onClick={goToDetail}
                />
                <CardContent onClick={goToDetail} className={classes.content}>
                    <Typography variant="body2">
                        { "TODO nejaka cast z description blabla bla..." }
                    </Typography>
                    <Typography variant="body2" className={classes.warehouseCnt}>
                        Skladem > 5 kusů (TODO)
                    </Typography>
                </CardContent>

                <CardActions>
                    <Grid container spacing={5} alignItems="center">
                        <Grid item xs={3}>
                            <Price value={product.price} />
                        </Grid>
                        <Grid item xs={9} className={classes.orderActionWrapper}>
                            <TextField
                                value={quantity}
                                onChange={handleChangeQuantity}
                                type="number"
                                className={classes.textField}
                                InputLabelProps={{ shrink: true }}
                                margin="dense"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">ks</InputAdornment>,
                                    inputProps: { min : 0, max: 99 }
                                }}
                            /> &nbsp;
                            <Button
                                variant="contained"
                                color="primary" size="large"
                                onClick={() => addToShoppingCart(product)}
                                title="Vložit do košíku">
                                Vložit do košíku
                            </Button>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </Grid>
    );
};

ProductListItem.propTypes = {
    product : productShape.isRequired
};

export default withStyles(styles)(ProductListItem);