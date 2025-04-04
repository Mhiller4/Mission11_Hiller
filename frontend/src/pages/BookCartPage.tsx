import { useNavigate, useParams} from 'react-router-dom';
import Welcome from '../components/Welcome'
import { useCart } from '../context/CartContext';
import {useState} from 'react'
import { CartItem } from '../types/cart';




function BookCart(){
    const navigate = useNavigate();
    const {title, price, bookID} = useParams();
    const {addToCart} = useCart();
    const [quantityAmount, setQuantityAmount] =useState<number>(0);

    // Calls a function to handle adding to cart
    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookID: Number(bookID),
            title: title || 'No title Found',
            price: Number(price),
            quantityAmount}
            addToCart(newItem);
            navigate('/mycart');
        };

    


    return(
        <>
        <Welcome />
      <div className="container my-4">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h2 className="mb-0">Add to Cart: {title}</h2>
          </div>
          <div className="card-body">
            <h4 className="card-title">Price: ${Number(price).toFixed(2)}</h4>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantity:
              </label>
              <input
                id="quantity"
                type="number"
                className="form-control"
                placeholder="Quantity"
                value={quantityAmount}
                onChange={(e) => setQuantityAmount(Number(e.target.value))}
              />
            </div>
            <div className="d-flex justify-content-between">
              <button onClick={handleAddToCart} className="btn btn-success">
                Add to Cart
              </button>
              <button
                onClick={() => navigate(-1)}
                className="btn btn-secondary"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
    );
}

export default BookCart;