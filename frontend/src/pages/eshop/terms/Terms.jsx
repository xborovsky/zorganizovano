import React from 'react';
import { Typography, withStyles, Paper } from '@material-ui/core';

const styles = theme => ({
    root : {
        padding : '2rem 4rem'
    },
    font : {
        fontSize : 14,
        marginBottom : '1rem'
    }
});

const Terms = ({ classes }) => (
    <Paper className={classes.root}>
        <Typography variant="h1">Obchodní podmínky</Typography>
        <Typography className={classes.font}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Placerat in egestas erat imperdiet sed euismod nisi porta lorem. Eget nullam non nisi est sit amet facilisis. Odio aenean sed adipiscing diam donec. Volutpat diam ut venenatis tellus in metus vulputate. Volutpat maecenas volutpat blandit aliquam etiam erat. Ut aliquam purus sit amet luctus venenatis lectus. Aliquet nec ullamcorper sit amet. Vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus. Facilisi morbi tempus iaculis urna id volutpat lacus. Et magnis dis parturient montes nascetur.
        </Typography>
        <Typography className={classes.font}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Placerat in egestas erat imperdiet sed euismod nisi porta lorem. Eget nullam non nisi est sit amet facilisis. Odio aenean sed adipiscing diam donec. Volutpat diam ut venenatis tellus in metus vulputate. Volutpat maecenas volutpat blandit aliquam etiam erat. Ut aliquam purus sit amet luctus venenatis lectus. Aliquet nec ullamcorper sit amet. Vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus. Facilisi morbi tempus iaculis urna id volutpat lacus. Et magnis dis parturient montes nascetur.
        </Typography>
        <Typography className={classes.font}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Placerat in egestas erat imperdiet sed euismod nisi porta lorem. Eget nullam non nisi est sit amet facilisis. Odio aenean sed adipiscing diam donec. Volutpat diam ut venenatis tellus in metus vulputate. Volutpat maecenas volutpat blandit aliquam etiam erat. Ut aliquam purus sit amet luctus venenatis lectus. Aliquet nec ullamcorper sit amet. Vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus. Facilisi morbi tempus iaculis urna id volutpat lacus. Et magnis dis parturient montes nascetur.
        </Typography>
        <Typography className={classes.font}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Placerat in egestas erat imperdiet sed euismod nisi porta lorem. Eget nullam non nisi est sit amet facilisis. Odio aenean sed adipiscing diam donec. Volutpat diam ut venenatis tellus in metus vulputate. Volutpat maecenas volutpat blandit aliquam etiam erat. Ut aliquam purus sit amet luctus venenatis lectus. Aliquet nec ullamcorper sit amet. Vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus. Facilisi morbi tempus iaculis urna id volutpat lacus. Et magnis dis parturient montes nascetur.
        </Typography>
        <Typography className={classes.font}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Placerat in egestas erat imperdiet sed euismod nisi porta lorem. Eget nullam non nisi est sit amet facilisis. Odio aenean sed adipiscing diam donec. Volutpat diam ut venenatis tellus in metus vulputate. Volutpat maecenas volutpat blandit aliquam etiam erat. Ut aliquam purus sit amet luctus venenatis lectus. Aliquet nec ullamcorper sit amet. Vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus. Facilisi morbi tempus iaculis urna id volutpat lacus. Et magnis dis parturient montes nascetur.
        </Typography>
    </Paper>
);

export default withStyles(styles)(Terms);