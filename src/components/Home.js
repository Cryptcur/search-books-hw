import React, { useState } from "react";
import style from "./Home.module.css";
import Paginate from "./Pagination";


const Home = ({ booklist, wishlist, setWishlist }) => {
  const [search, useSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const HandleChange = (e) => {
    useSearch(e.target.value);
  };

  const addToWishlist = (e) => {
    if (wishlist.length > 0) {
      let wishlistBookId = wishlist.find((book) => book.id === e.target.id);
      if (wishlistBookId && wishlistBookId.id === e.target.id) {
          alert('Already added to wishlist')
        return [...wishlist];
      } else {
        booklist.forEach((book) => {
          if (book.id === e.target.id) {
            setWishlist([book, ...wishlist]);
          }
        });
      }
    } else {
      booklist.forEach((book) => {
        if (book.id === e.target.id) {
          setWishlist([book, ...wishlist]);
        }
      });
    }
  };

  const handleDelete = (e) => {
    let filteredArr = wishlist.filter((book) => book.id !== e.target.id);
    setWishlist(filteredArr);
  };

  return (
    <>
      <form onSubmit={(ev) => ev.preventDefault()}>
        <input value={search} onChange={HandleChange} />
      </form>
      <div className={style["home"]}>
        {!search ? (
            <Paginate setWishlist={setWishlist} wishlist={wishlist} addToWishlist={addToWishlist} currentPage={currentPage} onPageChange={setCurrentPage} totalCount={booklist.length} booklist={booklist} />
        ) : (
          <ul className={style['books']}>
            {booklist &&
              booklist
                .filter((book) =>
                  book.volumeInfo.title
                    .toLowerCase()
                    .match(new RegExp(search.toLowerCase()))
                )
                .map((book) => (
                  <li className={style["card"]} id={book.id} key={book.id}>
                    <img alt="" src={book.volumeInfo.imageLinks.thumbnail} />
                    <div className={style["book-info"]}>
                      <p>{book.volumeInfo.title}</p>
                      <p>{book.volumeInfo.publisher}</p>
                      <p>{book.volumeInfo.publisherDate}</p>
                    </div>
                  </li>
                ))}
          </ul>
        )}
        {wishlist && wishlist.length ? (
          <ul>
            {wishlist.map((book) => (
              <li className={style["home-wishlist"]} key={book.id}>
                {book.volumeInfo.title}{" "}
                <button id={book.id} onClick={handleDelete}>
                  X
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className={style['no-wishlist']}><h3>Nothing in wishlist</h3></div>
        )}
      </div>
    </>
  );
};

export default Home;

