import React from 'react';
import PropTypes from 'prop-types';
import styles from './Search.css';


const Search = (props) => (
    <form method='GET' action='/explore'>
        <input className={props.fullForm ? styles.textFieldLarge : styles.textField}
               type='text' placeholder='Where you at' name='location' />

        {props.fullForm && (
             <input className={styles.submit} type='submit' value='Search' />
        )}
    </form>
);


Search.propTypes = {
    fullForm: PropTypes.bool
};


Search.defaultProps = {
    fullForm: false
};


export default Search;
