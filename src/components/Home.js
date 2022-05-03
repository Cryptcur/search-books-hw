import React, { useState, useMemo} from "react";
import style from "./Home.module.css";
import Paginate from "./Pagination";

let pageSize = 5;

const Home = ({ booklist, wishlist, setWishlist }) => {
  const [currentPage, setCurrentPage] = useState(1);

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

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIdx = firstPageIndex + pageSize;
    return booklist.slice(firstPageIndex, lastPageIdx);
  }, [currentPage, booklist]);

  const handleDelete = (e) => {
    let filteredArr = wishlist.filter((book) => book.id !== e.target.id);
    setWishlist(filteredArr);
  };

  return (
    <>
      <div className={style["home"]}>
      <Paginate pageSize={pageSize} setWishlist={setWishlist} wishlist={wishlist} addToWishlist={addToWishlist} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} totalCount={booklist.length} booklist={currentData} />
        
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

