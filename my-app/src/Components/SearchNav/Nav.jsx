import React from "react";
import styles from "./Nav.module.css"




function Nav() {

  const [raza, setRaza] = React.useState({
    name: '',
  })

  function handleChange(e) {
    setRaza({
      ...setRaza,
      [e.target.name]: e.target.value
    });
  }

  function handleOnClick(e) {
    e.preventDefault();
 
  }

  return (
    <nav className={styles.nav}>
      <div>
        <input className={styles.search} type="search" name="name" placeholder="Enter breed..." onChange={handleChange} value={raza.name} />
        <button className={styles.buttonSearch} onClick={e => handleOnClick(e) }>Search </button>
      </div>
    </nav>
  );
}

export default Nav;