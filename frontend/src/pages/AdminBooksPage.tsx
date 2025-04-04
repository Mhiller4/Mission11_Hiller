import { useEffect, useState } from 'react';
import { Book } from "../types/Book";
import { deleteBook, fetchBooks } from "../api/BooksAPI";
import Pagination from "../components/Pagination";
import NewBookForm from "../components/NewBookForm";
import EditBookForm from "../components/EditBookForm";
import React from 'react';


const AdminBooksPage = ()=> {
    //This is a lot of the same stuff from the BookList page
    const [books, setBooks] = useState<Book[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const[editingBook, setEditingBook] = useState<Book | null>(null)
    
  
    
    const[error, setError] = useState<string | null>(null);
    const[loading, setLoading] = useState(true); 
    const[showForm, setShowForm] = useState(false); 




    useEffect(() => {

        const loadBooks = async () => {
            try{
                //const data = await fetchBooks(3, [] );
                const data = await fetchBooks(pageNumber, [] );
                setBooks(data.books);
                setTotalPages(Number(data.totalPages));

            }catch (err){
                setError((err as Error).message)
            }finally{
                setLoading(false);
            }
    };

        loadBooks();
    }, [pageSize, pageNumber]);

    const handleDelete =async (bookID:number) => {
        const confirmDelete = window.confirm('Are yo usure you want to delete this book?')
        if (!confirmDelete) return;

        try{
            await deleteBook(bookID);
            setBooks(books.filter((b)=>b.bookID !== bookID));
        } catch(error){
        alert('Failed to delete book. Please try again')
        }
    };

    if (loading) return <p>Loading Projects. . .</p>
    if (error) return <p className="text-red-500">Error: {error}</p>
  

    return(

        <div>
            <h1>Admin - Books</h1>
            {!showForm &&(
                <button className="btn btn-success mb-3" onClick={() =>setShowForm(true)}
            > Add Book
            </button>    
            )

            }

            {showForm && (
            <NewBookForm
            onSuccess={() => {
                setShowForm(false);
                fetchBooks(pageNumber, []).then((data) =>
                setBooks(data.books)
            );
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingBook && (
        <EditBookForm book ={editingBook} onSuccess={() =>{
            setEditingBook(null);
            fetchBooks(pageNumber, []).then((data)=> setBooks(data.books)
            );
        }}  
        onCancel ={()=>setEditingBook(null)}
      />

      )}

            <table className ="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>ISBN</th>
                        <th>Classification</th>
                        <th>Category</th>
                        <th>Pages</th>
                        <th>Price</th>
                        <th>Buttons</th>
                    </tr>
                </thead>
                    <tbody>
                    {/* The map function works best */}
                    {
                        books.map((b) => (
                            <tr key ={b.bookID}>
                                <td>{b.bookID}</td>
                                <td>{b.title}</td>
                                <td>{b.author}</td>
                                <td>{b.publisher}</td>
                                <td>{b.isbn}</td>
                                <td>{b.classification}</td>
                                <td>{b.category}</td>
                                <td>{b.pageCount}</td>
                                <td>{b.price}</td>
                                <td>
                                    <button 
                                    className="btn btn-primary btn-sm w-100 mb-1" 
                                    onClick={()=> setEditingBook(b)}>Edit</button>
                                    <button 
                                    className="btn btn-primary btn-sm w-100 mb-1"
                                    onClick={()=> handleDelete(b.bookID)}>Delete</button>
                                </td>



                            </tr>

                        ))
                    }
                    </tbody>
            </table>

            <Pagination
                currentPage={pageNumber}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNumber}
                onPageSizeChange={(newSize) => {
                setPageSize(newSize);
                setPageNumber(1);
                }}
            />
        </div>

    ); 
}



export default AdminBooksPage;