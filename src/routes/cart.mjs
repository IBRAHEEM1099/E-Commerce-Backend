import express from 'express';
import { addToCart, clearCart, decreaseProductQty, removeProductFromCart, userCart } from '../controllers/cart.mjs';
import { isAuthenticated } from '../Middleware/Auth.mjs';

const router = express.Router();

//add to cart
router.post('/add', isAuthenticated, addToCart);

//Get user cart
router.get('/user', isAuthenticated, userCart);

//Remove product from cart
router.delete('/remove/:productId', isAuthenticated, removeProductFromCart);

//Clear Cart user
router.delete('/clear', isAuthenticated, clearCart);

//decrease Item in cart
router.post('/--qty', isAuthenticated, decreaseProductQty)

export default router;