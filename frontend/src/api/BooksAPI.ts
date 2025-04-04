import { Book } from "../types/Book";

interface FetchBooksResponse { 
    books: Book[];
    totalNumBooks: number; 
}

const API_URl = 'http://localhost:5203/api'

export const fetchBooks = async (

    pageNumber: number, 
    selectedCategories: string[],


): Promise<FetchBooksResponse> => {
    try{
const categoryParams = selectedCategories
    .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
    .join('&');



    const response = await fetch(
      `${API_URl}/book?page=${pageNumber}&pageSize=30${selectedCategories.length ? `&${categoryParams}`: ''}`
    );

    if(!response.ok){
        throw new Error('Failed to fetch projects');
        
    }
    return await response.json();

    } catch(error){

        console.error('error fetching the fetchin projects;', error);
        throw error;
    }
};

export const addBook = async(newBook: Book): Promise<Book> => {
    try{
        const response = await fetch(`${API_URl}/book/Add`, {
            method: 'POST',
            headers:{
                'Content-type': 'application/json',

            },
            body: 
            JSON.stringify(newBook)
            });

            if(!response.ok){
                throw new Error('Failed to add book');
            }

            return await response.json();
         }catch(error){
            console.error('Error adding book', error);
            throw error;
    }
};

export const UpdateBook = async(bookID: number, updatedBook: Book): Promise<Book> => {
    try{
        const response = await fetch(`${API_URl}/book/UpdateBook/${bookID}`, {
            method: 'PUT',
            headers:{
                'Content-type': 'application/json',
            },
            body: 
            JSON.stringify(updatedBook)
            });

            if(!response.ok){
                throw new Error('Failed to Update book');
            }

            return await response.json();
    }catch(error){
            console.error('Error Updating book', error);
            throw error;
    }
};

export const deleteBook = async(bookID :number): Promise<void> =>{
    try{

        const response = await fetch(`${API_URl}/book/DeleteBook/${bookID}`,{

            method: 'DELETE'
            }
        );

        if(!response.ok){
            throw new Error('Failed to delete book');
        }
    } catch(error){

        console.error('Error deleting book', error);
        throw error; 
    }


}