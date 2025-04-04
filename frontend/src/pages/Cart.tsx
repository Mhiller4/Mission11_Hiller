import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/cart';
import React from 'react';

function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantityAmount, 0);

  return (
    <div className="container my-4">
      <h2 className="mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="list-group mb-4">
          {cart.map((item: CartItem) => {
            const subtotal = item.quantityAmount * item.price;
            return (
              <li key={item.bookID} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h4>{item.title}</h4>
                  <p className="mb-1">Quantity: {item.quantityAmount}</p>
                  <p className="mb-1">Price: ${item.price.toFixed(2)}</p>
                  <p className="mb-0">Subtotal: ${subtotal.toFixed(2)}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.bookID)} 
                  className="btn btn-danger btn-sm"
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <h3 className="mb-4">Total: ${totalAmount.toFixed(2)}</h3>
      <div className="d-flex justify-content-between">
        <button className="btn btn-success" type="button">
          Checkout
        </button>
        <button onClick={() => navigate('/')} className="btn btn-secondary" type="button">
          Continue Browsing
        </button>
      </div>
    </div>
  );
}

export default Cart;