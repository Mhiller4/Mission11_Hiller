
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import BooksPage from './pages/BooksPage'
import BookCart from './pages/BookCartPage'
import Cart from './pages/Cart'
import { CartProvider } from './context/CartContext'



function App() {


  return (
    <>
    <CartProvider>

    <Router>
          <Routes>
            <Route path='/' element={<BooksPage/>}/>
            <Route path='/cart/:title/:price/:bookID' element={<BookCart/>}/>
            <Route path='/mycart' element={<Cart/>}/>
          </Routes>
    </Router>  

    </CartProvider>
   
    </>
  )
}

export default App
