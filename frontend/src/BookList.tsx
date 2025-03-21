import { useEffect, useState } from "react";
import { Book } from "./types/Book";

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `http://localhost:5203/api/book?page=${pageNumber}&pageSize=5`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalPages(data.totalPages);
    };

    fetchBooks();
  }, [pageNumber]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageNumber(newPage);
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        {books.map((b) => (
          <div key={b.isbn} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title mb-0">{b.title}</h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Author:</strong> {b.author}
                </li>
                <li className="list-group-item">
                  <strong>Publisher:</strong> {b.publisher}
                </li>
                <li className="list-group-item">
                  <strong>ISBN:</strong> {b.isbn}
                </li>
                <li className="list-group-item">
                  <strong>Classification:</strong> {b.classification}
                </li>
                <li className="list-group-item">
                  <strong>Category:</strong> {b.category}
                </li>
                <li className="list-group-item">
                  <strong>Pages:</strong> {b.pageCount}
                </li>
                <li className="list-group-item">
                  <strong>Price:</strong> ${b.price}
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination Controls */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${pageNumber === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(pageNumber - 1)}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            return (
              <li
                key={page}
                className={`page-item ${pageNumber === page ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => handlePageChange(page)}>
                  {page}
                </button>
              </li>
            );
          })}
          <li className={`page-item ${pageNumber === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(pageNumber + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default BookList;