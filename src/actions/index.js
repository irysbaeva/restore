const booksLoaded = (newBooks) => {
  return { type: "FETCH_BOOKS_SUCCESS", payload: newBooks };
};

const booksRequested = () => {
  return { type: "FETCH_BOOKS_REQUEST" };
};

const booksError = (error) => {
  return { type: "FETCH_BOOKS_FAILURE", payload: error };
};

const fetchBooks = (bookstoreService, dispatch) => (
  word,
  category,
  startIndex,
  order
) => {
  // dispatch(booksRequested());
  bookstoreService
    .getBooks(word, category, startIndex, order)
    .then((data) => {
      data.map((book) => (book.volumeInfo.price = 10));
      dispatch(booksLoaded(data));
    })
    .catch((err) => dispatch(booksError(err)));
};
const bookAddedToCart = (bookId) => {
  return {
    type: "BOOK_ADDED_TO_CART",
    payload: bookId,
  };
};

const bookRemovedFromCart = (bookId) => {
  return {
    type: "BOOK_REMOVED_FROM_CART",
    payload: bookId,
  };
};

const allBooksRemovedFromCart = (bookId) => {
  return {
    type: "ALL_BOOKS_REMOVED_FROM_CART",
    payload: bookId,
  };
};

export {
  fetchBooks,
  bookAddedToCart,
  allBooksRemovedFromCart,
  bookRemovedFromCart,
  booksRequested
};
