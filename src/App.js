import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import { Products, Navbar, Cart, Checkout } from './components';
import {commerce} from './lib/commerce';

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();

        setProducts(data);
    }

    const fectchCart = async () => {
        setCart(await commerce.cart.retrieve());
    }

    const handleAddToCard = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);

        setCart(item.cart);
    }

    const handleUpdateQuantity = async (productId, quantity) => {
        const responce = await commerce.cart.update(productId, {quantity});

        setCart(responce.cart);
    }

    const handleRemoveFromCart = async (productId) => {
        const responce = await commerce.cart.remove (productId);

        setCart(responce.cart);
    }

    const handleEmptyCart = async () => {
        const {cart} = await commerce.cart.empty();

        setCart(cart);
    }

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();

        setCart(newCart);
    }

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

            setOrder(incomingOrder);
            refreshCart();
        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    }

    useEffect(()=>{
        fetchProducts();
        fectchCart();
    }, []);
    
    return (
        <Router>
            <div>
                <Navbar totalItems = {cart.total_items} />
                 <Routes>
                    <Route path='/' element={<Products products = {products} onAddToCart = {handleAddToCard} />} />
                    <Route path='/cart' element={ <Cart cart={cart} handleUpdateQuantity={handleUpdateQuantity} handleRemoveFromCart={handleRemoveFromCart} handleEmptyCart={handleEmptyCart}/>} />
                    <Route path='/checkout' element={<Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App