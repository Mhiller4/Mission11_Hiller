import { useNavigate } from "react-router-dom";





function Cart(){
    const navigate =useNavigate();

return(

<>

<div>
    <h2>Your cart</h2>
    <h3>Total</h3>
    <button>Checkout</button>
    <button onClick={()=> navigate('/')}>Continue Browsing</button>
</div>

</>



);

}

export default Cart