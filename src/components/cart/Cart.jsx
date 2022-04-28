import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import {Link} from 'react-router-dom';
import useStyles from './styles';
import CartItem from './cartItem/CartItem';

const Cart = ({cart, handleUpdateQuantity, handleRemoveFromCart, handleEmptyCart}) => {
    console.log(cart);
    const classes = useStyles();

    const EmptyCart = () => (
        <Typography variant="subtitle1">Empty Cart
            <Link to='/' className="classes.link">Start adding something</Link>
        </Typography>
        
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}> 
                {
                    cart.line_items.map((item) => (
                        <Grid item xs={12} xm={4} key={item.id}>
                            <CartItem item={item} onUpdateCartQty={handleUpdateQuantity} onRemoveFromCart={handleRemoveFromCart}/>
                        </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4" gutterBottom>
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                    <Button component={Link} to='/checkout' className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
        </>
    );

    if (!cart.line_items) return 'Loading...';

    return (
        <div>
            <Container>
                <div className={classes.toolbar}/>
                <Typography className={classes.title} variant="h3">Your Shopping Card</Typography>
                {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
            </Container>
        </div>
    );
};

export default Cart;