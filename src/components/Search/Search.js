import React from 'react';
import styles from './Search.css';


const Search = () => (
    <form className={styles.form} method='GET' action='/explore'>
        <input className={styles.textField} type='text' placeholder='Where you at' name='location' />
        <input className={styles.submit} type='submit' value='Search' />
    </form>
);


export default Search;
