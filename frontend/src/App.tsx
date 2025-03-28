
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import BooksPage from './pages/BooksPage'
import BookCart from './pages/BookCartPage'
import Cart from './pages/Cart'



function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<BooksPage/>}/>
        <Route path='/cart/:title/:price' element={<BookCart/>}/>
        <Route path='/mycart' element={<Cart/>}/>
      </Routes>
    </Router>  
    </>
  )
}

export default App
