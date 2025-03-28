import { useNavigate, useParams} from 'react-router-dom';
import Welcome from '../components/Welcome'



function BookCart(){
    const navigate = useNavigate();
    const {title} = useParams();
    const {price} = useParams();



    return(
        <>
        <Welcome/>
        <h2>Add to cart {title} </h2>
        <h1>Price {price}</h1>
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