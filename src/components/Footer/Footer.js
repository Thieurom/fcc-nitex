import React from 'react';
import styles from './Footer.css';


const Footer = () => (
    <footer className={styles.footer}>
        <div className={styles.container}>
            <span>2017. <a className={styles.link} href='/'>Nitex</a>. Made by <a className={styles.link} href='https://doanthieu.com'>doanthieu</a>.
            </span>
        </div>
    </footer>
);


export default Footer;
