import React from "react";
import { usePagination, DOTS } from "./usePagination";
import style from "./Home.module.css";

const Paginate = ({
  setWishlist,
  wishlist,
  currentPage,
  totalCount,
  booklist,
  onPageChange,
  pageSize
}) => {
  const siblingCount = 1;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  let lastPage = paginationRange[paginationRange.length - 1];
  
  const onNext = () => {
    if(currentPage === lastPage){
      return;
    }
      onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    let firstPage = paginationRange[0];
    if(firstPage === currentPage){
      return;
    }
    onPageChange(currentPage - 1);
  };

  const addToWishlist = (e) => {
    if (wishlist.length > 0) {
      let wishlistBookId = wishlist.find((book) => {
        return (
          book.id === e.target.id ||
          book.id === e.target.parentElement.parentNode.id
        );
      });
      if (
        wishlistBookId &&
        (wishlistBookId.id === e.target.id ||
        wishlistBookId.id === e.target.parentElement.parentNode.id)
      ) {
        alert("Already added to wishlist");
        return [...wishlist];
      } else {
        booklist.forEach((book) => {
          if (
            book.id === e.target.id ||
            book.id === e.target.parentElement.parentNode.id
          ) {
            setWishlist([book, ...wishlist]);
          }
        });
      }
    } else {
      booklist.forEach((book) => {
        if (book.id === e.target.id || e.target.parentElement.parentNode.id) {
          setWishlist([book, ...wishlist]);
        }
      });
    }
  };

  return (
    <div className={style["paginate"]}>
      <ul className={style["books"]}>
        {booklist.map((book) => (
          <li
            id={book.id}
            className={style["card"]}
            key={book.id}
            onClick={addToWishlist}
          >
            {book.volumeInfo.imageLinks? (
              <img className={style['img']} alt="" src={book.volumeInfo.imageLinks.thumbnail} />
            ) : (
              <h3 className={style['no-img']}>No Image</h3>
            )}
            <div className={style["book-info"]}>
              <p>{book.volumeInfo.title}</p>
              <p>{book.volumeInfo.publisher}</p>
              <p>{book.volumeInfo.publisherDate}</p>
              {book.volumeInfo.description ? (
                <p>{book.volumeInfo.description}</p>
              ) : (
                <p></p>
              )}
            </div>
          </li>
        ))}
      </ul>
      {paginationRange.length > 0 ? <ul className={style["pages"]}>
        <button onClick={onPrevious}>Prev</button>
        {paginationRange.map((pageNumber, idx) => {
          if (pageNumber === DOTS) {
            return <li key={idx}>...</li>;
          }
          
          return (
            <button key={idx} onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
            </button>
          );
        })}
        <button onClick={onNext}>Next</button>
      </ul> : <div>Search for books and then go through pages</div>}
    </div>
  );
};

export default Paginate;
