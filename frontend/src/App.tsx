import { useState } from 'react'

import './App.css'
import BookList from './BookList';
import CategoryFilter from './CategoryFilter';
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
  const[selectedCategories, setSelectedCategories] =useState<string[]>([])
 

  return (
    <>
     <Welcome />
    {/* Booklist conponent is added to the App.tsx file  */}

    <div className = 'container'>
      <div className = "row">
        <div className = "col-md-3">

        <CategoryFilter 
        selectedCategories = {selectedCategories} 
        setSelectedCategories={setSelectedCategories}
        />

        </div>

        <div className = "col-md-9" >
        
        <BookList selectedCategories ={selectedCategories}/>

        </div>
      
      </div>
     </div>
    </>
  )
}

export default App
