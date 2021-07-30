import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import "./book-details.css";

const BookDetails = ({ bookList }) => {
  const { id } = useParams();
  const [book, setBook] = useState();
  useEffect(() => {
    setBook(bookList.books.find((book) => book.id === id));
  }, [book]);

  return (
    <div>
      {book ? (
        <div className="book-details">
          <div className="book-cover">
            <img src={book.volumeInfo.imageLinks?.thumbnail} alt="cover" />
          </div>
          <div className="details">
                      <h3>{book.volumeInfo.title}</h3> 
            <div className="categories"> {book.volumeInfo.categories?.join(", ")}</div>
            <div className="authors"> {book.volumeInfo.authors?.join("/ ")}</div>
          </div>
          <div className="description"> {book.volumeInfo.description}</div>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(BookDetails);
