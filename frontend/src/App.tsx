import { useState } from 'react'

import './App.css'
import BookList from './BookList';

function Welcome(){

  return(

    <>
    <h1> This is a website for Books </h1>
    
    </>
  );

}



function App() {
 

  return (
    <>
     <Welcome />

     <BookList/>

    </>
  )
}

export default App
