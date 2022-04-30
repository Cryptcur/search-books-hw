import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Nav from './Nav';
import Home from './Home';
import Wishlist from './Wishlist';

const URL =
  "https://www.googleapis.com/books/v1/volumes?q=bookname&startIndex=0&maxResults=20";

const Books = () => {
  const [booklist, setBooklist] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    axios.get(URL).then((res) => {
      setBooklist(res.data.items);
    });
  }, []);

  return (
        <Routes>
          <Route path='/' element={<Nav booklist={booklist} />}>
            <Route path='/home' element={<Home booklist={booklist} wishlist={wishlist} setWishlist={setWishlist} />} />
            <Route path='/wishlist' element={<Wishlist booklist={booklist} wishlist={wishlist} />} />
          </Route>
        </Routes>
  );
};

export default Books;


// <ul className={style['books']}>
    //   {booklist.map((book) => {
    //     return (
    //       <li className={style['pic']} key={book.id}>
    //         <img alt='' src={book.volumeInfo.imageLinks.thumbnail} />
    //         <div className={style['book-info']}>
    //             <p>{book.volumeInfo.title}</p>
    //             <p>{book.volumeInfo.publisher}</p>
    //             <p>{book.volumeInfo.publisherDate}</p>
    //             {/* <p>{book.volumeInfo.}</p> */}
    //         </div>
    //       </li>
    //     );
    //   })}
    // </ul>