import React, { useState } from "react";
import BookListItem from "../book-list-item";
import { connect } from "react-redux";
import { useEffectWithoutFirstRender } from "../../utils/hooks";
import withBookstoreService from "../hoc";
import { fetchBooks, bookAddedToCart, booksRequested } from "../../actions";
import compose from "../../utils";
import "./book-list.css";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

const BookList = ({ books, onAddedToCart }) => {

  return (
    <ul className="book-list">
      {books.map((book) => {
        return (
          <li key={book.id}>
            <BookListItem
              book={book}
              onAddedToCart={() => onAddedToCart(book.id)}
            />
          </li>
        );
      })}
    </ul>
  );
};

const BookListContainer = ({
  books,
  loading,
  error,
  onAddedToCart,
  fetchBooks,
  booksRequested,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [orderedBy, setOrderedBy] = useState("relevance");
  const [category, setCategory] = useState("all");
  const [startIndex, setStartIndex] = useState(0);
  const isSearchButtonDisabled = !inputValue;

  useEffectWithoutFirstRender(
    () => fetchBooks(inputValue, category, startIndex, orderedBy),
    [startIndex]
  );
  if (error) {
    return <ErrorIndicator />;
  }


  return (
    <div className="book-list">
      <div className="searching-panel">
        <form
          className="d-flex"
          onSubmit={async (event) => {
            event.preventDefault();
            await booksRequested();
            await fetchBooks(inputValue, category, 0, orderedBy);
          }}
        >
          <input
            className="form-control me-sm-2"
            type="text"
            placeholder="Search"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            disabled={isSearchButtonDisabled}
            className="btn btn-secondary my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>

        <div className="sorting">
          <label htmlFor="orderBy">
            Sorting by
            <select
              name="orderBy"
              onChange={(e) => {
                setOrderedBy(e.target.value);
              }}
            >
              <option>relevance</option>
              <option>newest</option>
            </select>
          </label>
          <label htmlFor="categories">
            Categories
            <select
              name="categories"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option>all</option>
              <option>art</option>
              <option>biography</option>
              <option>computers</option>
              <option>history</option>
              <option>medical</option>
              <option>poetry</option>
            </select>
          </label>
        </div>
      </div>
      {books.length !== 0 ? <div>Found: {books.length} books</div> : null}
     {loading? <Spinner/>: null} 
      <BookList books={books} onAddedToCart={onAddedToCart} />
      {books.length !== 0 ? (
        <button
          className="btn btn-info my-3 my-sm-0 loading-button"
          onClick={() => {
            setStartIndex(startIndex + 30);
          }}
        >
          load more
        </button>
      ) : null}
    </div>
  );
};

const mapStateToProps = ({ bookList: { books, loading, error } }) => {
  return {
    books,
    loading,
    error,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { bookstoreService } = ownProps;
  return {
    fetchBooks: fetchBooks(bookstoreService, dispatch),
    onAddedToCart: (id) => dispatch(bookAddedToCart(id)),
    booksRequested: () => dispatch(booksRequested()),
  };
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);
