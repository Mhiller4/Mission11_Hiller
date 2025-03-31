import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/cart";





function Cart(){
    const navigate =useNavigate();
    const {cart, removeFromCart} = useCart();
    const totalAmount = cart.reduce((sum,item) => sum + (item.price * item.quantityAmount), 0) 
  


return(

<>

<div>
    <h2>Your cart</h2>
    <div>
    {cart.length === 0 ?
    (<p>Your cart is empty</p>) : 
    (<ul>   
        {cart.map((item: CartItem) =>
            <li key= {item.bookID}>
                {item.title}: Quantity {item.quantityAmount} <br /> ${item.price.toFixed(2)}
                <button onClick={()=> removeFromCart(item.bookID)}>Remove</button>
            </li>
        
        )}

    </ul>)}</div>

    <h3>Total: ${totalAmount}</h3>
    <button>Checkout</button>
    <button onClick={()=> navigate('/')}>Continue Browsing</button>
</div>

</>



);

}

export default Cart