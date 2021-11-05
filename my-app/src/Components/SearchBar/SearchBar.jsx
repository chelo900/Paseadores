import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { getAllPaseadores } from "../../actions";
import { useDispatch } from "react-redux";

const SearchBar = ({ page, pageSize }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const token = localStorage.getItem("userToken");

  const handleOnChange = (event) => {
    setName(event.target.value);
  };

  const handleOnClick = () => {
    dispatch(getAllPaseadores({ name, token, page, pageSize }));
    setName("");
  };

  return (
    <div className={styles.buscarcaja}>
      <input
        className={styles.buscartxt}
        onChange={handleOnChange}
        value={name}
        type="text"
        placeholder="Search..."
      />
      <button className={styles.buscarbtn} onClick={handleOnClick}>
        <i class="fas fa-search"></i>
      </button>
    </div>
  );
};
export default SearchBar;
