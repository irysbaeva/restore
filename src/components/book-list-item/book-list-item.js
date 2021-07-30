import React from "react";
import { Link } from "react-router-dom";
import "./book-list-item.css";

const BookListItem = ({ book, onAddedToCart }) => {
  const { title, authors, imageLinks, categories, price } = book.volumeInfo;

  return (
    <div className="book-list-item">
      <div className="book-cover">
        <img src={imageLinks?.thumbnail} alt="cover" />
      </div>
      <div className="book-details">
        <Link to={`${book.id}`}>
          <span className="book-title">{title}</span>
        </Link>
        <div className="book-author">Authors: {authors?.join(", ")}</div>
        <div className="book-price">$ {price}</div>
        <div className="book-categories">{categories ? categories[0] : ""}</div>
        <button onClick={onAddedToCart} className="btn btn-info add-to-cart">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default BookListItem;
