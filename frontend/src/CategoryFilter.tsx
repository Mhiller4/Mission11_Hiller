import {useEffect, useState} from 'react'

function CategoryFilter()
{
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
    return(
        <>
        <p> hi</p>
        
        
        </>

    );
}

export default CategoryFilter