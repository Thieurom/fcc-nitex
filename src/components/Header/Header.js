import React from 'react';
import PropTypes from 'prop-types';
import Search from '../Search/Search';
import styles from './Header.css';


const Header = (props) => {
    return (
        <header className={props.onExplore ? styles.headerAlt : styles.header} role='header'>
            <div className={styles.container}>
                <div className={styles.inner}>
                    <div className={styles.site}>
                        <a href='/' className={styles.logo}>Nitex</a>
                    </div>

                    {props.onExplore && (
                         <Search />)}

                    <nav className={styles.nav} role='navigation'>
                        <button className={styles.button}><i className="fa fa-user-circle"></i></button>
                    </nav>
                </div>
            </div>
        </header>
    );
};


Header.propTypes = {
    onExplore: PropTypes.bool
};


Header.defaultProps = {
    onExplore: false
};


export default Header;
