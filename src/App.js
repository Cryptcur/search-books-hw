import React, {  useState } from "react";
import axios from "axios";
import style from "./App.module.css";
import Books from "./components/Books";



function App() {
  const [booklist, setBooklist] = useState([]);
  const [inputValue, setInputValue] = useState([]);


  const HandleChange = (e) => {
    setInputValue(e.target.value);
    if (inputValue !== "" && booklist) {
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${e.target.value}&startIndex=0&maxResults=40`
        )
        .then((res) => setBooklist(res.data.items))
        .catch(err => console.error(err))
    }
    return;
  };

  return (
    <div className={style['App']}>
      <h1>Books</h1>
      <form className={style['form']} onSubmit={(ev) => ev.preventDefault()}>
        <label className={style['label']}>
          Search for books
          <input value={inputValue} onChange={HandleChange} />
        </label>
      </form>
      <Books booklist={booklist} />
    </div>
  );
}

export default App;
