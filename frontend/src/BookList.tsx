import { useEffect, useState } from "react";
import { Book } from "./types/Book";

function BookList({selectedCategories} : {selectedCategories: string[]}) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  // State to store sort order: "asc" or "desc"
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchBooks = async () => {

      const categoryParams = selectedCategories
      .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
      .join('&');



      const response = await fetch(
        `http://localhost:5203/api/book?page=${pageNumber}&pageSize=5${selectedCategories.length ? `&${categoryParams}`: ''}`
      );
      const data = await response.json();
      // Assume the API returns an object with a "books" array and "totalPages"
      setBooks(data.books);
      setTotalPages(data.totalPages);
    };

    fetchBooks();
  }, [pageNumber, selectedCategories]);

  // Create a sorted copy of the books array
  const sortedBooks = [...books].sort((a, b) => {
    const compareResult = a.title.localeCompare(b.title);
    return sortOrder === "asc" ? compareResult : -compareResult;
  });

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageNumber(newPage);
    }
  };

  const handleSortChange = (order: "asc" | "desc") => {
    setSortOrder(order);
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Book List</h2>
        {/* Sorting Controls */}
        <div>
          <label htmlFor="sortSelect" className="me-2">
            Sort by Book Name:
          </label>
          <select
            id="sortSelect"
            value={sortOrder}
            onChange={(e) =>
              handleSortChange(e.target.value as "asc" | "desc")
            }
            className="form-select d-inline-block w-auto"
          >
            <option value="asc">A to Z</option>
            <option value="desc">Z to A</option>
          </select>
        </div>
      </div>

      <div className="row">
        {sortedBooks.map((b) => (
          <div key={b.isbn} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm border border-secondary">
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