import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Menu, MenuItem, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/logo.jpg';
import useStyles from './styles';

const Navbar = ({totalItems}) => {
    const classes = useStyles();
    const location = useLocation();

    return (
        <div>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} >
                        <img src={logo} alt="Sunny Karamel Art Shop" height="25px" className={classes.image} />
                        Sunny Karamel Art Shop
                    </Typography>
                </Toolbar>
                <div className={classes.grow} />
                {location.pathname === '/' && (
                    <div className={classes.button}>
                    <IconButton component={Link} to="/cart" aria-label="Show card items">
                        <Badge badgeContent={totalItems} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    </div>
                )}
                
            </AppBar>

        </div>
    );
}

export default Navbar;