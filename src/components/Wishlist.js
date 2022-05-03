import React from "react";
import style from './Wishlist.module.css';
import style1 from './Home.module.css';

const Wishlist = ({ wishlist }) => {
  return (
    <ul className={style1["wishlist-books-home"]}>
      {wishlist.map((book) => (
        <li id={book.id} key={book.id} className={style["card"]}>
        {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail ? <img alt="" src={book.volumeInfo.imageLinks.thumbnail} /> : <p>No Image</p>}
          <div className={style1["book-info"]}>
            <p>{book.volumeInfo.title}</p>
            <p>{book.volumeInfo.publisher}</p>
            <p>{book.volumeInfo.publisherDate}</p>
            {book.volumeInfo.description ? <p>{book.volumeInfo.description}</p> : <p></p>}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Wishlist;
