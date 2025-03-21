import { useState } from 'react'

import './App.css'
import BookList from './BookList';
import 'bootstrap/dist/css/bootstrap.min.css';

function Welcome(){

  return(

    <>
    <div className="container text-center my-4">
    <h1 className="display-4">Mission 11</h1>
    <h1 className="display-5 fw-bold">Online Bookstore</h1>
  </div>
    </>
  );

}



function App() {
 

  return (
    <>
     <Welcome />
    {/* Booklist conponent is added to the App.tsx file  */}
     <BookList/>

    </>
  )
}

export default App
