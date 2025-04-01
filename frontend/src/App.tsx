import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import BooksPage from './pages/BooksPage';
import BookCart from './pages/BookCartPage';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext';
import CartSummary from './components/CartSummary';

function App() {
  return (
    <CartProvider>
      <Router>
        {/* Header with gradient background */}
        <header className="container-fluid bg-primary bg-gradient text-white py-4">
          <div className="container d-flex justify-content-between align-items-center">
            <h1 className="display-4">Online Bookstore</h1>
            {/* Optionally, you can still have a "View Cart" button here */}
          </div>
        </header>

        {/* Main content */}
        <div className="container my-4">
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/cart/:title/:price/:bookID" element={<BookCart />} />
            <Route path="/mycart" element={<Cart />} />
          </Routes>
        </div>

        {/* Offcanvas Shopping Cart Sidebar */}
        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="cartOffcanvas"
          aria-labelledby="cartOffcanvasLabel"
        >
          <div className="offcanvas-header">
            <h5 id="cartOffcanvasLabel">Shopping Cart</h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <Cart />
          </div>
        </div>

        {/* Render the CartSummary so it's always visible */}
        <CartSummary />
      </Router>
    </CartProvider>
  );
}

export default App;