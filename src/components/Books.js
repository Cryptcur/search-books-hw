import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Nav from './Nav';
import Home from './Home';
import Wishlist from './Wishlist';
import style from './Books.module.css'


const Books = ({booklist}) => {
  const [wishlist, setWishlist] = useState([]);

  
  return (
    <div className={style['books-routes']}>
        <Routes>
          <Route path='/' element={<Nav booklist={booklist} />}>
            <Route path='/home' element={<Home booklist={booklist} wishlist={wishlist} setWishlist={setWishlist} totalCount={booklist.length} />} />
            <Route path='/wishlist' element={<Wishlist booklist={booklist} wishlist={wishlist} />} />
          </Route>
        </Routes>
        </div>
  );
};

export default Books;
