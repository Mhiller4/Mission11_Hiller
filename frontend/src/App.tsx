import { useState } from 'react'

import './App.css'
import BookList from './BookList';
import 'bootstrap/dist/css/bootstrap.min.css';

function Welcome(){

  return(

    <>
    <h1> Mission 11</h1>
    <h1> <strong> Online Bookstore</strong></h1>
    
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
