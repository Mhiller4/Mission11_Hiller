import { Book } from "../types/Book";

interface FetchBooksResponse { 
    books: Book[];
    totalNumBooks: number; 
}

export const fetchBooks = async (

    pageNumber: number, 
    selectedCategories: string[],


): Promise<FetchBooksResponse> => {
    try{
const categoryParams = selectedCategories
    .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
    .join('&');



    const response = await fetch(
      `http://localhost:5203/api/book?page=${pageNumber}&pageSize=30${selectedCategories.length ? `&${categoryParams}`: ''}`
    );

    if(!response.ok){
        throw new Error('Failed to fetch projects');
        
    }
    return await response.json();

    } catch(error){

        console.error('error fetching the fetchin projects;', error);
        throw error;
    }
}