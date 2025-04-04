// import { useNavigate } from "react-router-dom"
// import { useCart } from "../context/CartContext";


// const CartSummary = () =>{
//         const navigate = useNavigate();
//         const {cart} = useCart();
//         const totalAmount = cart.reduce((sum,item) => sum + (item.price * item.quantityAmount), 0) 
//         const totalQuantity = cart.reduce((sum,item) => sum + (item.quantityAmount), 0) 
//     return(

//         <div
//         className="position-fixed top-0 end-0 m-3 p-3 bg-light rounded shadow"
//         style={{ cursor: 'pointer', fontSize: '16px' }}
//         onClick={() => navigate('/mycart')}
//         >
//         <div className="d-flex flex-column align-items-end">
//             <p className="mb-1">
//             🛒 <strong>${totalAmount.toFixed(2)}</strong>
//             </p>
//             <p className="mb-0">
//             <strong>Total Items: {totalQuantity}</strong>
//             </p>
//         </div>
//         </div>
        
//     );
// };

// export default CartSummary

import React from "react";
import { useCart } from "../context/CartContext";

const CartSummary = () => {
  const { cart } = useCart();
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantityAmount,
    0
  );
  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.quantityAmount,
    0
  );

  return (
    <div
      className="position-fixed top-0 end-0 m-3 p-3 bg-light rounded shadow"
      style={{ cursor: "pointer", fontSize: "16px" }}
      data-bs-toggle="offcanvas"
      data-bs-target="#cartOffcanvas"
      aria-controls="cartOffcanvas"
    >
      <div className="d-flex flex-column align-items-end">
        <p className="mb-1">
          🛒 <strong>${totalAmount.toFixed(2)}</strong>
        </p>
        <p className="mb-0">
          <strong>Total Items: {totalQuantity}</strong>
        </p>
      </div>
    </div>
  );
};

export default CartSummary;

