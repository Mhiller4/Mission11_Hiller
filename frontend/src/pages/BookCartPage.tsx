import { useNavigate, useParams} from 'react-router-dom';
import Welcome from '../components/Welcome'
import { useCart } from '../context/CartContext';
import {useState} from 'react'



function BookCart(){
    const navigate = useNavigate();
    const {title, price, bookID} = useParams();
    const {addToCart} = useCart();
    const [quantityAmount, setQuantityAmount] =useState<number>(0);

    // Calls a function to handle adding to cart
    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookID,
            title,
            price,
            quantityAmount}
            addToCart(newItem);
            navigate('mycart');
        };

    }


    return(
        <>
        <Welcome/>
        <h2>Add to cart {title} </h2>
        <h1>Price {price}</h1>
        <h1> {bookID}</h1>
        <div>
        <input type="number" placeholder="Quanity"/>
        <button onClick = {()=> navigate('/mycart')}>Add to Cart</button>


        </div>
        <div>

            <button onClick ={()=>navigate(-1)} className='btn-primary'>Continue Shopping</button>
        
        </div>
        
        
        </>
    );
}

export default BookCart;