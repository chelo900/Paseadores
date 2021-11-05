import style from "./UsersCards.module.css";

function Pagination({ handleNextPage, handlePrevPage }) {
  return (
    <div>
      <button className={style.prev} onClick={handlePrevPage}>
        <p>&#60;</p>
      </button>
      <button className={style.next} onClick={handleNextPage}>
        <p>&#62;</p>
      </button>
    </div>
  );
}

export default Pagination;
