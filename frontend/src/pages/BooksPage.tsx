import { useState } from 'react'
import BookList from '../components/BookList';
import CategoryFilter from '../components/CategoryFilter';
import Welcome from '../components/Welcome';
import 'bootstrap/dist/css/bootstrap.min.css';





function BooksPage(){
  const[selectedCategories, setSelectedCategories] =useState<string[]>([])


  return(
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
  );

}  


export default BooksPage