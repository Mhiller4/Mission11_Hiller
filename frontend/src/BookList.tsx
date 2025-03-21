import { useEffect, useState } from "react";

import {Book} from './types/Book'


function BookList(){

    const [books, setBooks] = useState<Book[]>([]);

    useEffect(()=> {
        const fetchBooks = async () => {
            const response = await fetch("http://localhost:5203/api/book");
            // This holds the data
            const data = await response.json();
            setBooks(data); 
        };
        fetchBooks();
    }, []);

    return(
        <>
        {/* This component will lists out the information for each book in the database */}
        {books.map((b) => 
        <div id="bookCard">
            <h3>
                {b.title}
            </h3>
            <ul>
                <li> {b.author} </li>
                <li> {b.publisher} </li>
                <li> {b.isbn} </li>
                <li> {b.classification} </li>
                <li> {b.category} </li>
                <li> {b.pageCount} </li>
                <li> {b.price} </li>

            </ul>


        </div>
        
        
        )} 

        
        </>
    );

}

export default BookList; 