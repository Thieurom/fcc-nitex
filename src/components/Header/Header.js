import React from 'react';
import styles from './Header.css';


const Header = () => (
    <header className={styles.header} role='header'>
        <div className={styles.container}>
            <div className={styles.inner}>
                <div className={styles.site}>
                    <a href='/' className={styles.logo}>Nitex</a>
                </div>
                <nav className={styles.nav} role='navigation'>
                    <button className={styles.button}><i className="fa fa-user-circle"></i></button>
                </nav>
            </div>
        </div>
    </header>
);


export default Header;
