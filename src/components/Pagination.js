import React, { useMemo } from "react";
import { usePagination } from "./usePagination";
import style from "./Home.module.css";
let pageSize = 5;

const Paginate = ({
  setWishlist,
  wishlist,
  currentPage,
  totalCount,
  booklist,
  onPageChange,
}) => {
  const siblingCount = 1;
  const currentData = useMemo(() => {
    const firstPageIdx = (currentPage - 1) * pageSize;
    const lastPageIdx = firstPageIdx + pageSize;
    return booklist.slice(firstPageIdx, lastPageIdx);
  }, [currentPage, booklist]);

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };
  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const addToWishlist = (e) => {
    if (wishlist.length > 0) {
      let wishlistBookId = wishlist.find((book) => book.id === e.target.id);
      if (wishlistBookId && wishlistBookId.id === e.target.id) {
        alert("Already added to wishlist");
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

  // let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className={style["paginate"]}>
      <ul className={style["books"]}>
        {currentData.map((book) => (
          <li
            id={book.id}
            className={style["card"]}
            key={book.id}
            onClick={addToWishlist}
          >
            <img alt="" src={book.volumeInfo.imageLinks.thumbnail} />
            <div className={style["book-info"]}>
              <p>{book.volumeInfo.title}</p>
              <p>{book.volumeInfo.publisher}</p>
              <p>{book.volumeInfo.publisherDate}</p>
            </div>
          </li>
        ))}
      </ul>
      <ul className={style["pages"]}>
        <button onClick={onPrevious}>Prev</button>
        {paginationRange.map((pageNumber, idx) => {
          return (
            <button key={idx} onClick={() => onPageChange(pageNumber)}>
              {pageNumber}
            </button>
          );
        })}
        <button onClick={onNext}>Next</button>
      </ul>
    </div>
  );
};

export default Paginate;
