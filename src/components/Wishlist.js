import React from "react";
import style from './Wishlist.module.css';

const Wishlist = ({ wishlist }) => {
  return (
    <ul className={style["books"]}>
      {wishlist.map((book) => (
        <li id={book.id} key={book.id} className={style["card"]}>
          <img alt="" src={book.volumeInfo.imageLinks.thumbnail} />
          <div className={style["book-info"]}>
            <p>{book.volumeInfo.title}</p>
            <p>{book.volumeInfo.publisher}</p>
            <p>{book.volumeInfo.publisherDate}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Wishlist;
