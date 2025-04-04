
import { useNavigate } from "react-router-dom";



function Welcome(){
    const navigate = useNavigate();



    return(
  
      <>
    <div className="container-fluid bg-primary bg-gradient text-white p-4">
    <h1 className="display-4">Mission 11</h1>
    <h1 className="display-4">Online Bookstore</h1>
    <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#cartOffcanvas" aria-controls="cartOffcanvas"
    onClick={() => navigate('/mycart')}>
                    View Cart
                    </button>
    
    </div>   
      </>
    );
  
  }

export default Welcome 