import {useEffect, useState} from 'react'
import './CategoryFilter.css';

function CategoryFilter({
    selectedCategories, 
    setSelectedCategories, 
}:{
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;

}){
    //List of the categories and types of things

    const[categories, setCategories] = useState<string[]>([]);
  
    
    useEffect(()=> {

        const fetchCategories = async () => {

            try{
            const response = await fetch("http://localhost:5203/api/book/Getbookstypes")
            const data = await response.json();

            setCategories(data);
            }
            catch(error){

            console.error('Error fetching cetegories', error);

            }
    }

        fetchCategories();
    }, []);

    function handleCheckBoxChange({target}: {target: HTMLInputElement}){
        // This checks the different categories and updates which ones are selected

        const updatedCategories = selectedCategories.includes(target.value) 
        ? selectedCategories.filter(c => c !== target.value) : [...selectedCategories, target.value];

        setSelectedCategories(updatedCategories);

    }

    return(
        <>
        <div className='category-filter'>

            <h5>Book Categories</h5>
            <div className='category-list'>
                {categories.map((c) =>(

                <div key ={c} className ='category-item'>
                    <input 
                    type ='checkbox' 
                    id={c} 
                    value={c} 
                    // className='category-checkbox'
                    // On change now puts it into change
                    checked={selectedCategories.includes(c)}
                    onChange = {handleCheckBoxChange}
                    />
                    <label htmlFor={c}> {c}

                    </label>
                    </div>

                )
            
                )}

            </div>

        </div>
        
        
        </>

    );
}

export default CategoryFilter